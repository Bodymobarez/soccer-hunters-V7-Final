<?php
/**
 * ملف الدوال المساعدة
 */

/**
 * تنظيف المدخلات
 */
function sanitize($input) {
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = sanitize($value);
        }
        return $input;
    }
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * التحقق من جلسة المستخدم
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * التحقق من دور المستخدم
 */
function hasRole($role) {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === $role;
}

/**
 * توجيه المستخدم
 */
function redirect($location) {
    header("Location: $location");
    exit;
}

/**
 * عرض رسالة تنبيه
 */
function setAlert($message, $type = 'info') {
    $_SESSION['alert'] = [
        'message' => $message,
        'type' => $type
    ];
}

/**
 * عرض رسائل التنبيه
 */
function displayAlert() {
    if (isset($_SESSION['alert'])) {
        $alert = $_SESSION['alert'];
        $message = $alert['message'];
        $type = $alert['type'];
        
        echo "<div class='alert alert-$type'>$message</div>";
        
        // مسح الرسالة بعد عرضها
        unset($_SESSION['alert']);
    }
}

/**
 * تقييد الوصول للصفحات المحمية
 */
function requireLogin() {
    if (!isLoggedIn()) {
        setAlert('يجب تسجيل الدخول للوصول إلى هذه الصفحة', 'warning');
        redirect('/login.php');
    }
}

/**
 * التحقق من دور الإدارة
 */
function requireAdmin() {
    requireLogin();
    if (!hasRole('admin')) {
        setAlert('لا يمكنك الوصول إلى هذه الصفحة', 'danger');
        redirect('/');
    }
}

/**
 * عرض التاريخ بتنسيق مناسب
 */
function formatDate($date) {
    return date('Y-m-d H:i', strtotime($date));
}

/**
 * التحقق من وجود قيمة
 */
function getValue($array, $key, $default = '') {
    return isset($array[$key]) ? $array[$key] : $default;
}

/**
 * ترجمة النصوص
 */
function translate($key, $lang = 'ar') {
    global $translations;
    
    if (!isset($translations[$lang][$key])) {
        return $key;
    }
    
    return $translations[$lang][$key];
}

/**
 * تغيير اللغة
 */
function setLanguage($lang) {
    $_SESSION['lang'] = $lang;
}

/**
 * الحصول على اللغة الحالية
 */
function getCurrentLanguage() {
    return isset($_SESSION['lang']) ? $_SESSION['lang'] : 'ar';
}

/**
 * تحميل ملف
 */
function uploadFile($file, $targetDir, $allowedTypes = []) {
    // التحقق من الأخطاء
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => 'حدث خطأ أثناء تحميل الملف'];
    }
    
    // التحقق من نوع الملف
    $fileType = pathinfo($file['name'], PATHINFO_EXTENSION);
    if (!empty($allowedTypes) && !in_array($fileType, $allowedTypes)) {
        return ['success' => false, 'message' => 'نوع الملف غير مسموح به'];
    }
    
    // إنشاء اسم فريد للملف
    $fileName = time() . '_' . basename($file['name']);
    $targetFilePath = $targetDir . $fileName;
    
    // تحميل الملف
    if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
        return [
            'success' => true,
            'fileName' => $fileName,
            'filePath' => $targetFilePath,
            'fileType' => $fileType,
            'fileSize' => $file['size']
        ];
    } else {
        return ['success' => false, 'message' => 'حدث خطأ أثناء حفظ الملف'];
    }
}
