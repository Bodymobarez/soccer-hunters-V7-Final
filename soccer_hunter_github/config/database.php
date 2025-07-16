<?php
/**
 * تكوين قاعدة البيانات
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'soccer_hunter');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

/**
 * إنشاء اتصال بقاعدة البيانات
 */
function connectDB() {
    try {
        $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // سجل الخطأ في ملف السجل بدلاً من عرضه للمستخدم
        error_log('Database Connection Error: ' . $e->getMessage());
        return false;
    }
}
