<?php
/**
 * كلاس الوسائط المتعددة
 */
class Media {
    private $db;
    
    public function __construct() {
        $this->db = connectDB();
    }
    
    /**
     * الحصول على ملفات الوسائط لمستخدم
     */
    public function getMediaByUser($userId) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM media_files WHERE user_id = ?");
            $stmt->execute([$userId]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetMediaByUser Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على ملفات الوسائط لموهبة
     */
    public function getMediaByTalent($talentId) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM media_files WHERE talent_id = ?");
            $stmt->execute([$talentId]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetMediaByTalent Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على ملف وسائط بواسطة المعرف
     */
    public function getMediaById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM media_files WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log('GetMediaById Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * إضافة ملف وسائط جديد
     */
    public function addMedia($data) {
        try {
            $stmt = $this->db->prepare("INSERT INTO media_files (user_id, talent_id, file_type, file_url, description, file_name, file_size, is_public, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
            
            $stmt->execute([
                $data['user_id'],
                $data['talent_id'] ?? null,
                $data['file_type'],
                $data['file_url'],
                $data['description'] ?? null,
                $data['file_name'],
                $data['file_size'],
                $data['is_public'] ?? 1
            ]);
            
            return ['success' => true, 'media_id' => $this->db->lastInsertId()];
        } catch (PDOException $e) {
            error_log('AddMedia Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء إضافة الوسائط'];
        }
    }
    
    /**
     * تحديث ملف وسائط
     */
    public function updateMedia($id, $data) {
        try {
            $allowedFields = ['talent_id', 'description', 'is_public'];
            
            $updates = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                $dbKey = str_replace('_', '_', $key);
                if (in_array($key, $allowedFields)) {
                    $updates[] = "$dbKey = ?";
                    $params[] = $value;
                }
            }
            
            if (empty($updates)) {
                return ['success' => false, 'message' => 'لا توجد حقول للتحديث'];
            }
            
            $params[] = $id;
            $stmt = $this->db->prepare("UPDATE media_files SET " . implode(', ', $updates) . " WHERE id = ?");
            $stmt->execute($params);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('UpdateMedia Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء تحديث الوسائط'];
        }
    }
    
    /**
     * حذف ملف وسائط
     */
    public function deleteMedia($id) {
        try {
            // الحصول على معلومات الملف قبل الحذف
            $media = $this->getMediaById($id);
            
            if (!$media) {
                return ['success' => false, 'message' => 'ملف الوسائط غير موجود'];
            }
            
            // حذف الملف من قاعدة البيانات
            $stmt = $this->db->prepare("DELETE FROM media_files WHERE id = ?");
            $stmt->execute([$id]);
            
            // حذف الملف من الخادم إذا كان موجوداً
            $filePath = $_SERVER['DOCUMENT_ROOT'] . $media['file_url'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('DeleteMedia Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء حذف الوسائط'];
        }
    }
}