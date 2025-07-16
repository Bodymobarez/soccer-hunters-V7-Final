<?php
/**
 * كلاس المستخدم
 */
class User {
    private $db;
    
    public function __construct() {
        $this->db = connectDB();
    }
    
    /**
     * تسجيل مستخدم جديد
     */
    public function register($username, $password, $email, $role = 'user') {
        try {
            // التحقق من وجود المستخدم
            if ($this->getUserByUsername($username)) {
                return ['success' => false, 'message' => 'اسم المستخدم موجود بالفعل'];
            }
            
            if ($this->getUserByEmail($email)) {
                return ['success' => false, 'message' => 'البريد الإلكتروني مسجل بالفعل'];
            }
            
            // تشفير كلمة المرور
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // إعداد الاستعلام
            $stmt = $this->db->prepare("INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, NOW())");
            $stmt->execute([$username, $hashedPassword, $email, $role]);
            
            return ['success' => true, 'user_id' => $this->db->lastInsertId()];
        } catch (PDOException $e) {
            error_log('Registration Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء التسجيل'];
        }
    }
    
    /**
     * تسجيل الدخول
     */
    public function login($username, $password) {
        try {
            // الحصول على المستخدم
            $user = $this->getUserByUsername($username);
            
            if (!$user) {
                return ['success' => false, 'message' => 'اسم المستخدم غير موجود'];
            }
            
            // التحقق من كلمة المرور
            if (!password_verify($password, $user['password'])) {
                return ['success' => false, 'message' => 'كلمة المرور غير صحيحة'];
            }
            
            // إنشاء جلسة المستخدم
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_role'] = $user['role'];
            
            return ['success' => true, 'user' => $user];
        } catch (PDOException $e) {
            error_log('Login Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء تسجيل الدخول'];
        }
    }
    
    /**
     * تسجيل الخروج
     */
    public function logout() {
        unset($_SESSION['user_id']);
        unset($_SESSION['username']);
        unset($_SESSION['user_role']);
        session_destroy();
    }
    
    /**
     * الحصول على مستخدم بواسطة المعرف
     */
    public function getUserById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log('GetUserById Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على مستخدم بواسطة اسم المستخدم
     */
    public function getUserByUsername($username) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log('GetUserByUsername Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على مستخدم بواسطة البريد الإلكتروني
     */
    public function getUserByEmail($email) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log('GetUserByEmail Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على جميع المستخدمين
     */
    public function getAllUsers() {
        try {
            $stmt = $this->db->query("SELECT * FROM users");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetAllUsers Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * تحديث بيانات المستخدم
     */
    public function updateUser($id, $data) {
        try {
            $allowedFields = ['username', 'email', 'role'];
            $updates = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                if (in_array($key, $allowedFields)) {
                    $updates[] = "$key = ?";
                    $params[] = $value;
                }
            }
            
            if (empty($updates)) {
                return ['success' => false, 'message' => 'لا توجد حقول للتحديث'];
            }
            
            $params[] = $id;
            $stmt = $this->db->prepare("UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?");
            $stmt->execute($params);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('UpdateUser Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء تحديث البيانات'];
        }
    }
    
    /**
     * تغيير كلمة المرور
     */
    public function changePassword($id, $currentPassword, $newPassword) {
        try {
            $user = $this->getUserById($id);
            
            if (!$user) {
                return ['success' => false, 'message' => 'المستخدم غير موجود'];
            }
            
            if (!password_verify($currentPassword, $user['password'])) {
                return ['success' => false, 'message' => 'كلمة المرور الحالية غير صحيحة'];
            }
            
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $stmt = $this->db->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->execute([$hashedPassword, $id]);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('ChangePassword Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء تغيير كلمة المرور'];
        }
    }
    
    /**
     * حذف مستخدم
     */
    public function deleteUser($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('DeleteUser Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء حذف المستخدم'];
        }
    }
}