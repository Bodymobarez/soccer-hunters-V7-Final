<?php
/**
 * ملف الترجمات
 */

// إعداد اللغة من الرابط
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    
    // التحقق من اللغة المتاحة
    $allowedLangs = ['ar', 'en', 'fr', 'de', 'es', 'it', 'pt', 'la'];
    if (in_array($lang, $allowedLangs)) {
        setLanguage($lang);
    }
    
    // إعادة توجيه إلى نفس الصفحة بدون معلمة اللغة
    $redirectUrl = strtok($_SERVER['REQUEST_URI'], '?');
    if (!empty($_GET)) {
        $params = $_GET;
        unset($params['lang']);
        if (!empty($params)) {
            $redirectUrl .= '?' . http_build_query($params);
        }
    }
    header("Location: $redirectUrl");
    exit;
}

// قاموس الترجمات
$translations = [
    'ar' => [
        'site_title' => 'موقع البحث عن مواهب كرة القدم',
        'home' => 'الرئيسية',
        'categories' => 'الفئات',
        'players' => 'اللاعبين',
        'coaches' => 'المدربين',
        'goalkeepers' => 'حراس المرمى',
        'technical_directors' => 'المدراء الفنيين',
        'goalkeeper_coaches' => 'مدربي حراس المرمى',
        'news' => 'الأخبار',
        'stadiums' => 'الملاعب',
        'admin_panel' => 'لوحة التحكم',
        'profile' => 'الملف الشخصي',
        'messages' => 'الرسائل',
        'video_meetings' => 'الاجتماعات المرئية',
        'logout' => 'تسجيل الخروج',
        'login' => 'تسجيل الدخول',
        'register' => 'تسجيل جديد',
        'username' => 'اسم المستخدم',
        'password' => 'كلمة المرور',
        'email' => 'البريد الإلكتروني',
        'remember_me' => 'تذكرني',
        'forgot_password' => 'نسيت كلمة المرور',
        'search' => 'بحث',
        'search_placeholder' => 'ابحث عن لاعبين، مدربين...',
        'featured_talents' => 'المواهب المميزة',
        'latest_news' => 'أحدث الأخبار',
        'read_more' => 'قراءة المزيد',
        'view_profile' => 'عرض الملف',
        'age' => 'العمر',
        'position' => 'المركز',
        'club' => 'النادي',
        'nationality' => 'الجنسية',
        'height' => 'الطول',
        'weight' => 'الوزن',
        'foot' => 'القدم المفضلة',
        'rating' => 'التقييم',
        'videos' => 'فيديوهات',
        'images' => 'صور',
        'documents' => 'مستندات',
        'contact' => 'اتصل',
        'upload' => 'رفع',
        'submit' => 'إرسال',
        'cancel' => 'إلغاء',
        'save' => 'حفظ',
        'footer_description' => 'منصة متخصصة لتسويق اللاعبين والمدربين والكوادر الفنية في كرة القدم',
        'quick_links' => 'روابط سريعة',
        'contact_us' => 'اتصل بنا',
        'contact_info' => 'معلومات الاتصال',
        'address' => 'القاهرة، مصر',
        'all_rights_reserved' => 'جميع الحقوق محفوظة'
    ],
    'en' => [
        'site_title' => 'Football Talent Scouting Platform',
        'home' => 'Home',
        'categories' => 'Categories',
        'players' => 'Players',
        'coaches' => 'Coaches',
        'goalkeepers' => 'Goalkeepers',
        'technical_directors' => 'Technical Directors',
        'goalkeeper_coaches' => 'Goalkeeper Coaches',
        'news' => 'News',
        'stadiums' => 'Stadiums',
        'admin_panel' => 'Admin Panel',
        'profile' => 'Profile',
        'messages' => 'Messages',
        'video_meetings' => 'Video Meetings',
        'logout' => 'Logout',
        'login' => 'Login',
        'register' => 'Register',
        'username' => 'Username',
        'password' => 'Password',
        'email' => 'Email',
        'remember_me' => 'Remember Me',
        'forgot_password' => 'Forgot Password',
        'search' => 'Search',
        'search_placeholder' => 'Search for players, coaches...',
        'featured_talents' => 'Featured Talents',
        'latest_news' => 'Latest News',
        'read_more' => 'Read More',
        'view_profile' => 'View Profile',
        'age' => 'Age',
        'position' => 'Position',
        'club' => 'Club',
        'nationality' => 'Nationality',
        'height' => 'Height',
        'weight' => 'Weight',
        'foot' => 'Preferred Foot',
        'rating' => 'Rating',
        'videos' => 'Videos',
        'images' => 'Images',
        'documents' => 'Documents',
        'contact' => 'Contact',
        'upload' => 'Upload',
        'submit' => 'Submit',
        'cancel' => 'Cancel',
        'save' => 'Save',
        'footer_description' => 'A specialized platform for marketing football players, coaches, and technical staff',
        'quick_links' => 'Quick Links',
        'contact_us' => 'Contact Us',
        'contact_info' => 'Contact Info',
        'address' => 'Cairo, Egypt',
        'all_rights_reserved' => 'All Rights Reserved'
    ],
    // ممكن إضافة المزيد من اللغات هنا
    'fr' => [
        'site_title' => 'Plateforme de Détection de Talents de Football',
        'home' => 'Accueil',
        'categories' => 'Catégories',
        // المزيد من الترجمات...
    ],
    'de' => [
        'site_title' => 'Fußballtalent-Scouting-Plattform',
        'home' => 'Startseite',
        'categories' => 'Kategorien',
        // المزيد من الترجمات...
    ],
    'es' => [
        'site_title' => 'Plataforma de Búsqueda de Talento Futbolístico',
        'home' => 'Inicio',
        'categories' => 'Categorías',
        // المزيد من الترجمات...
    ],
    'it' => [
        'site_title' => 'Piattaforma di Ricerca Talenti Calcistici',
        'home' => 'Home',
        'categories' => 'Categorie',
        // المزيد من الترجمات...
    ],
    'pt' => [
        'site_title' => 'Plataforma de Observação de Talentos de Futebol',
        'home' => 'Início',
        'categories' => 'Categorias',
        // المزيد من الترجمات...
    ],
    'la' => [
        'site_title' => 'Exploratio Talenti Pediludii',
        'home' => 'Domus',
        'categories' => 'Categoriae',
        // المزيد من الترجمات...
    ]
];