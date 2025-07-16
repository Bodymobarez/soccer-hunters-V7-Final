<?php
/**
 * سكريبت تثبيت Soccer Hunter
 */

// التحقق من وجود PHP 7.4 كحد أدنى
if (version_compare(PHP_VERSION, '7.4.0', '<')) {
    die("خطأ: يتطلب Soccer Hunter PHP 7.4 أو أعلى. الإصدار الحالي: " . PHP_VERSION);
}

// التحقق من توفر الامتدادات المطلوبة
$requiredExtensions = ['pdo', 'pdo_mysql', 'gd', 'fileinfo', 'json', 'mbstring', 'openssl'];
$missingExtensions = [];

foreach ($requiredExtensions as $ext) {
    if (!extension_loaded($ext)) {
        $missingExtensions[] = $ext;
    }
}

if (!empty($missingExtensions)) {
    die("خطأ: الامتدادات التالية مطلوبة ولكنها غير مثبتة: " . implode(', ', $missingExtensions));
}

// التحقق من وجود مجلدات التحميل وإذا كانت قابلة للكتابة
$uploadDirs = ['../uploads/images', '../uploads/videos', '../uploads/documents'];
$notWriteable = [];

foreach ($uploadDirs as $dir) {
    if (!file_exists($dir)) {
        // إنشاء المجلد إذا لم يكن موجوداً
        mkdir($dir, 0755, true);
    }
    
    if (!is_writable($dir)) {
        $notWriteable[] = $dir;
    }
}

if (!empty($notWriteable)) {
    echo "تحذير: المجلدات التالية ليست قابلة للكتابة: " . implode(', ', $notWriteable) . "<br>";
    echo "الرجاء ضبط صلاحيات هذه المجلدات للسماح بالكتابة فيها.<br>";
}

// التحقق من وجود ملف تكوين قاعدة البيانات
if (!file_exists('../config/database.php')) {
    die("خطأ: لم يتم العثور على ملف تكوين قاعدة البيانات. الرجاء التأكد من تثبيت الملفات بشكل صحيح.");
}

// التحقق من وجود ملف إعداد قاعدة البيانات
if (!file_exists('database.sql')) {
    die("خطأ: لم يتم العثور على ملف إعداد قاعدة البيانات (database.sql). الرجاء التأكد من تثبيت الملفات بشكل صحيح.");
}

// إعداد الطلب
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;
$error = '';
$success = '';

// معالجة مراحل التثبيت
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($step === 1 && isset($_POST['db_host'], $_POST['db_name'], $_POST['db_user'], $_POST['db_pass'])) {
        // محاولة الاتصال بقاعدة البيانات
        try {
            $dsn = "mysql:host={$_POST['db_host']};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $pdo = new PDO($dsn, $_POST['db_user'], $_POST['db_pass'], $options);
            
            // التحقق مما إذا كانت قاعدة البيانات موجودة
            $dbExists = $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '{$_POST['db_name']}'");
            
            if (!$dbExists->fetch()) {
                // إنشاء قاعدة البيانات إذا لم تكن موجودة
                $pdo->exec("CREATE DATABASE `{$_POST['db_name']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            }
            
            // الاتصال بقاعدة البيانات المحددة
            $pdo = new PDO("mysql:host={$_POST['db_host']};dbname={$_POST['db_name']};charset=utf8mb4", $_POST['db_user'], $_POST['db_pass'], $options);
            
            // تحديث ملف تكوين قاعدة البيانات
            $configFile = file_get_contents('../config/database.php');
            $configFile = str_replace("define('DB_HOST', 'localhost')", "define('DB_HOST', '{$_POST['db_host']}')", $configFile);
            $configFile = str_replace("define('DB_NAME', 'soccer_hunter')", "define('DB_NAME', '{$_POST['db_name']}')", $configFile);
            $configFile = str_replace("define('DB_USER', 'root')", "define('DB_USER', '{$_POST['db_user']}')", $configFile);
            $configFile = str_replace("define('DB_PASS', '')", "define('DB_PASS', '{$_POST['db_pass']}')", $configFile);
            
            file_put_contents('../config/database.php', $configFile);
            
            // الانتقال إلى الخطوة التالية
            $step = 2;
            $success = "تم الاتصال بقاعدة البيانات بنجاح. يمكنك الانتقال إلى الخطوة التالية.";
        } catch (PDOException $e) {
            $error = "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage();
        }
    } elseif ($step === 2 && isset($_POST['import_db'])) {
        // استيراد قاعدة البيانات
        require_once '../config/database.php';
        
        try {
            $pdo = connectDB();
            
            if ($pdo) {
                // قراءة ملف SQL
                $sql = file_get_contents('database.sql');
                
                // تقسيم الملف إلى استعلامات فردية
                $statements = explode(';', $sql);
                
                foreach ($statements as $statement) {
                    $statement = trim($statement);
                    if (!empty($statement)) {
                        $pdo->exec($statement);
                    }
                }
                
                // الانتقال إلى الخطوة التالية
                $step = 3;
                $success = "تم إنشاء قاعدة البيانات بنجاح. يمكنك الانتقال إلى الخطوة التالية.";
            } else {
                $error = "خطأ في الاتصال بقاعدة البيانات. الرجاء التحقق من إعدادات الاتصال.";
            }
        } catch (PDOException $e) {
            $error = "خطأ في استيراد قاعدة البيانات: " . $e->getMessage();
        }
    } elseif ($step === 3 && isset($_POST['admin_username'], $_POST['admin_password'], $_POST['admin_email'])) {
        // إنشاء حساب المشرف
        require_once '../config/database.php';
        
        try {
            $pdo = connectDB();
            
            if ($pdo) {
                // تشفير كلمة المرور
                $hashedPassword = password_hash($_POST['admin_password'], PASSWORD_DEFAULT);
                
                // التحقق مما إذا كان المستخدم موجوداً بالفعل
                $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'admin'");
                $stmt->execute();
                
                if ($stmt->fetch()) {
                    // تحديث المستخدم الحالي
                    $stmt = $pdo->prepare("UPDATE users SET username = ?, password = ?, email = ? WHERE username = 'admin'");
                    $stmt->execute([$_POST['admin_username'], $hashedPassword, $_POST['admin_email']]);
                } else {
                    // إنشاء مستخدم جديد
                    $stmt = $pdo->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 'admin')");
                    $stmt->execute([$_POST['admin_username'], $hashedPassword, $_POST['admin_email']]);
                }
                
                // الانتقال إلى الخطوة النهائية
                $step = 4;
                $success = "تم إنشاء حساب المشرف بنجاح. يمكنك الانتقال إلى الخطوة النهائية.";
            } else {
                $error = "خطأ في الاتصال بقاعدة البيانات. الرجاء التحقق من إعدادات الاتصال.";
            }
        } catch (PDOException $e) {
            $error = "خطأ في إنشاء حساب المشرف: " . $e->getMessage();
        }
    }
}

// عرض صفحة التثبيت
?><!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تثبيت Soccer Hunter</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background-color: #f8f9fa;
        }
        .install-container {
            max-width: 800px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            padding: 30px;
        }
        .install-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .install-header img {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .step-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            position: relative;
        }
        .step-indicator::before {
            content: '';
            position: absolute;
            top: 14px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #e9ecef;
            z-index: 1;
        }
        .step {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #6c757d;
            position: relative;
            z-index: 2;
        }
        .step.active {
            background-color: #1e3c72;
            color: #fff;
        }
        .step.completed {
            background-color: #28a745;
            color: #fff;
        }
        .step-content {
            display: none;
        }
        .step-content.active {
            display: block;
        }
        .btn-primary {
            background-color: #1e3c72;
            border-color: #1e3c72;
        }
        .btn-primary:hover {
            background-color: #0d2c5d;
            border-color: #0d2c5d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="install-container">
            <div class="install-header">
                <img src="../public/images/logo.png" alt="Soccer Hunter" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI1OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWUzYzcyIiBzdHJva2Utd2lkdGg9IjQiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWUzYzcyIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjEwLDQiLz48dGV4dCB4PSI2MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFlM2M3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlNvY2NlciBIdW50ZXI8L3RleHQ+PC9zdmc+';" />
                <h1 class="mt-3">تثبيت Soccer Hunter</h1>
                <p class="text-muted">مرحباً بك في معالج تثبيت منصة Soccer Hunter</p>
            </div>
            
            <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <?php if (!empty($success)): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
            <?php endif; ?>
            
            <div class="step-indicator">
                <div class="step <?php echo $step >= 1 ? 'active' : ''; ?> <?php echo $step > 1 ? 'completed' : ''; ?>">1</div>
                <div class="step <?php echo $step >= 2 ? 'active' : ''; ?> <?php echo $step > 2 ? 'completed' : ''; ?>">2</div>
                <div class="step <?php echo $step >= 3 ? 'active' : ''; ?> <?php echo $step > 3 ? 'completed' : ''; ?>">3</div>
                <div class="step <?php echo $step >= 4 ? 'active' : ''; ?>">4</div>
            </div>
            
            <!-- الخطوة 1: إعداد قاعدة البيانات -->
            <div class="step-content <?php echo $step == 1 ? 'active' : ''; ?>">
                <h3>إعداد قاعدة البيانات</h3>
                <p>الرجاء إدخال معلومات الاتصال بقاعدة البيانات MySQL:</p>
                
                <form method="POST" action="?step=1">
                    <div class="mb-3">
                        <label for="db_host" class="form-label">خادم قاعدة البيانات</label>
                        <input type="text" class="form-control" id="db_host" name="db_host" value="localhost" required>
                    </div>
                    <div class="mb-3">
                        <label for="db_name" class="form-label">اسم قاعدة البيانات</label>
                        <input type="text" class="form-control" id="db_name" name="db_name" value="soccer_hunter" required>
                    </div>
                    <div class="mb-3">
                        <label for="db_user" class="form-label">اسم مستخدم قاعدة البيانات</label>
                        <input type="text" class="form-control" id="db_user" name="db_user" value="root" required>
                    </div>
                    <div class="mb-3">
                        <label for="db_pass" class="form-label">كلمة مرور قاعدة البيانات</label>
                        <input type="password" class="form-control" id="db_pass" name="db_pass">
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">اختبار الاتصال والمتابعة</button>
                    </div>
                </form>
            </div>
            
            <!-- الخطوة 2: استيراد قاعدة البيانات -->
            <div class="step-content <?php echo $step == 2 ? 'active' : ''; ?>">
                <h3>استيراد قاعدة البيانات</h3>
                <p>سنقوم الآن بإنشاء جداول قاعدة البيانات المطلوبة لتشغيل Soccer Hunter.</p>
                
                <form method="POST" action="?step=2">
                    <input type="hidden" name="import_db" value="1">
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">استيراد قاعدة البيانات</button>
                        <a href="?step=1" class="btn btn-outline-secondary">رجوع</a>
                    </div>
                </form>
            </div>
            
            <!-- الخطوة 3: إنشاء حساب المشرف -->
            <div class="step-content <?php echo $step == 3 ? 'active' : ''; ?>">
                <h3>إنشاء حساب المشرف</h3>
                <p>الرجاء إنشاء حساب مشرف لإدارة موقع Soccer Hunter.</p>
                
                <form method="POST" action="?step=3">
                    <div class="mb-3">
                        <label for="admin_username" class="form-label">اسم المستخدم</label>
                        <input type="text" class="form-control" id="admin_username" name="admin_username" value="admin" required>
                    </div>
                    <div class="mb-3">
                        <label for="admin_email" class="form-label">البريد الإلكتروني</label>
                        <input type="email" class="form-control" id="admin_email" name="admin_email" value="admin@soccerhunter.com" required>
                    </div>
                    <div class="mb-3">
                        <label for="admin_password" class="form-label">كلمة المرور</label>
                        <input type="password" class="form-control" id="admin_password" name="admin_password" required>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">إنشاء حساب المشرف</button>
                        <a href="?step=2" class="btn btn-outline-secondary">رجوع</a>
                    </div>
                </form>
            </div>
            
            <!-- الخطوة 4: الانتهاء -->
            <div class="step-content <?php echo $step == 4 ? 'active' : ''; ?>">
                <div class="text-center">
                    <div class="mb-4">
                        <i class="fas fa-check-circle" style="font-size: 80px; color: #28a745;"></i>
                    </div>
                    <h3>تم تثبيت Soccer Hunter بنجاح!</h3>
                    <p>يمكنك الآن تسجيل الدخول إلى الموقع باستخدام معلومات حساب المشرف التي قمت بإنشائها.</p>
                    
                    <div class="alert alert-warning">
                        <b>مهم:</b> لأسباب أمنية، يجب عليك حذف مجلد التثبيت (<code>setup</code>) بعد الانتهاء من تثبيت الموقع.
                    </div>
                    
                    <div class="d-grid gap-2 mt-4">
                        <a href="../index.php" class="btn btn-primary btn-lg">اذهب إلى الموقع</a>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 text-center text-muted small">
                <p>Soccer Hunter &copy; <?php echo date('Y'); ?> - جميع الحقوق محفوظة</p>
            </div>
        </div>
    </div>
    
    <!-- Font Awesome for icons -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
</body>
</html>