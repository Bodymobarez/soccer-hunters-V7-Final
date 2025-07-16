/**
 * الملف الرئيسي للجافاسكريبت لموقع Soccer Hunter
 */

// انتظار تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // التعامل مع نماذج التسجيل والدخول
    setupForms();
    
    // تهيئة مشغل الفيديو
    setupVideoPlayers();
    
    // إعداد التنقل بين علامات التبويب
    setupTabs();
    
    // تهيئة إشعارات التنبيه
    setupAlerts();
});

/**
 * إعداد نماذج التسجيل والدخول
 */
function setupForms() {
    // التحقق من صحة نموذج التسجيل
    const registerForm = document.querySelector('form[name="register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = document.getElementById('reg-password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                e.preventDefault();
                alert('كلمات المرور غير متطابقة');
                return false;
            }
        });
    }
}

/**
 * إعداد مشغلات الفيديو
 */
function setupVideoPlayers() {
    // تعيين مستوى الصوت الافتراضي لجميع مشغلات الفيديو
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.volume = 0.5;
    });
}

/**
 * إعداد علامات التبويب
 */
function setupTabs() {
    // تنشيط علامة التبويب عند النقر
    const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع علامات التبويب
            tabLinks.forEach(link => link.classList.remove('active'));
            // إضافة الفئة النشطة إلى العنصر الذي تم النقر عليه
            this.classList.add('active');
        });
    });
}

/**
 * إعداد إشعارات التنبيه
 */
function setupAlerts() {
    // إخفاء إشعارات التنبيه تلقائيًا بعد 5 ثوان
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.add('fade');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    });
}

/**
 * تبديل وضع اللغة
 */
function toggleLanguage(lang) {
    window.location.href = window.location.pathname + '?lang=' + lang;
}

/**
 * عرض/إخفاء كلمة المرور
 */
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.querySelector(`#${inputId} + .input-group-text i`);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}