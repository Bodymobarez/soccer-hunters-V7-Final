<?php
/**
 * صفحة تسجيل الخروج
 */
require_once 'includes/functions.php';

// حذف متغيرات الجلسة
unset($_SESSION['user_id']);
unset($_SESSION['username']);
unset($_SESSION['user_role']);

// تدمير الجلسة
session_destroy();

// إعادة التوجيه إلى صفحة تسجيل الدخول
header('Location: index.php');
exit;