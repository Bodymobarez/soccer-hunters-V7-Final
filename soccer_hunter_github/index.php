<?php
/**
 * صفحة تسجيل الدخول (الصفحة الرئيسية)
 */
require_once 'includes/header.php';

// إذا كان المستخدم مسجل دخوله بالفعل، قم بتوجيهه إلى لوحة المعلومات
if (isLoggedIn()) {
    redirect('/dashboard.php');
}

// معالجة نموذج تسجيل الدخول
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = sanitize($_POST['username']);
    $password = $_POST['password'];
    
    if (empty($username) || empty($password)) {
        setAlert('الرجاء ملئ جميع الحقول', 'danger');
    } else {
        $user = new User();
        $result = $user->login($username, $password);
        
        if ($result['success']) {
            redirect('/dashboard.php');
        } else {
            setAlert($result['message'], 'danger');
        }
    }
}

// معالجة نموذج التسجيل الجديد
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $username = sanitize($_POST['username']);
    $email = sanitize($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];
    
    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        setAlert('الرجاء ملئ جميع الحقول', 'danger');
    } elseif ($password !== $confirmPassword) {
        setAlert('كلمات المرور غير متطابقة', 'danger');
    } elseif (strlen($password) < 6) {
        setAlert('يجب أن تكون كلمة المرور 6 أحرف على الأقل', 'danger');
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        setAlert('البريد الإلكتروني غير صالح', 'danger');
    } else {
        $user = new User();
        $result = $user->register($username, $password, $email);
        
        if ($result['success']) {
            setAlert('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن', 'success');
        } else {
            setAlert($result['message'], 'danger');
        }
    }
}
?>

<div class="row">
    <div class="col-md-6 p-5">
        <div class="login-form-container shadow-sm p-4 mb-5 bg-white rounded">
            <div class="mb-4 text-center">
                <img src="/public/images/logo.png" alt="Soccer Hunter" width="80" class="mb-3">
                <h2 class="fw-bold"><?php echo translate('login', $currentLang); ?></h2>
                <p class="text-muted"><?php echo translate('site_title', $currentLang); ?></p>
            </div>
            
            <!-- نموذج تسجيل الدخول -->
            <form method="POST" action="">
                <div class="mb-3">
                    <label for="username" class="form-label"><?php echo translate('username', $currentLang); ?></label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label"><?php echo translate('password', $currentLang); ?></label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="remember-me" name="remember_me">
                        <label class="form-check-label" for="remember-me">
                            <?php echo translate('remember_me', $currentLang); ?>
                        </label>
                    </div>
                    <a href="forgot-password.php"><?php echo translate('forgot_password', $currentLang); ?>?</a>
                </div>
                <button type="submit" name="login" class="btn btn-primary w-100 mb-3"><?php echo translate('login', $currentLang); ?></button>
            </form>
            
            <hr>
            
            <!-- نموذج تسجيل جديد -->
            <h4 class="mb-3 mt-4 text-center"><?php echo translate('register', $currentLang); ?></h4>
            <form method="POST" action="">
                <div class="mb-3">
                    <label for="reg-username" class="form-label"><?php echo translate('username', $currentLang); ?></label>
                    <input type="text" class="form-control" id="reg-username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label"><?php echo translate('email', $currentLang); ?></label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                    <label for="reg-password" class="form-label"><?php echo translate('password', $currentLang); ?></label>
                    <input type="password" class="form-control" id="reg-password" name="password" required>
                </div>
                <div class="mb-3">
                    <label for="confirm-password" class="form-label"><?php echo translate('password', $currentLang); ?> (تأكيد)</label>
                    <input type="password" class="form-control" id="confirm-password" name="confirm_password" required>
                </div>
                <button type="submit" name="register" class="btn btn-success w-100"><?php echo translate('register', $currentLang); ?></button>
            </form>
        </div>
    </div>
    
    <div class="col-md-6 p-0 d-none d-md-block">
        <div class="login-hero h-100 d-flex flex-column justify-content-center align-items-center text-white">
            <div class="p-5 text-center">
                <h1 class="display-4 fw-bold mb-4">Soccer Hunter</h1>
                <p class="lead mb-4"><?php echo translate('footer_description', $currentLang); ?></p>
                <div class="features mb-4 text-start">
                    <div class="feature-item mb-2">
                        <i class="fas fa-check-circle me-2"></i> منصة متكاملة لعرض المواهب الرياضية
                    </div>
                    <div class="feature-item mb-2">
                        <i class="fas fa-check-circle me-2"></i> محادثات مباشرة ومؤتمرات فيديو
                    </div>
                    <div class="feature-item mb-2">
                        <i class="fas fa-check-circle me-2"></i> لوحة تحكم مخصصة للاعبين والمدربين
                    </div>
                    <div class="feature-item mb-2">
                        <i class="fas fa-check-circle me-2"></i> متعدد اللغات ومتوافق مع الأجهزة المحمولة
                    </div>
                </div>
                <div class="app-badges mt-4">
                    <a href="#" class="me-2">
                        <img src="/public/images/google-play-badge.png" alt="Google Play" height="48">
                    </a>
                    <a href="#">
                        <img src="/public/images/app-store-badge.png" alt="App Store" height="48">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .login-hero {
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        position: relative;
        overflow: hidden;
    }
    .login-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/public/images/soccer-background.jpg') center/cover no-repeat;
        opacity: 0.15;
        z-index: 0;
    }
    .login-hero > div {
        position: relative;
        z-index: 1;
    }
    .feature-item {
        font-size: 1.1rem;
    }
    .feature-item i {
        color: #8ed1fc;
    }
</style>

<?php require_once 'includes/footer.php'; ?>