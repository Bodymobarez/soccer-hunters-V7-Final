<?php
session_start();
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/../includes/translations.php';

// تحميل الكلاسات
require_once __DIR__ . '/../classes/User.php';
require_once __DIR__ . '/../classes/Talent.php';
require_once __DIR__ . '/../classes/Media.php';

// إعداد اللغة
$currentLang = getCurrentLanguage();
?>
<!DOCTYPE html>
<html lang="<?php echo $currentLang; ?>" dir="<?php echo $currentLang === 'ar' ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soccer Hunter - <?php echo translate('site_title', $currentLang); ?></title>
    <!-- Bootstrap RTL للغة العربية -->
    <?php if ($currentLang === 'ar'): ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <?php else: ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <?php endif; ?>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/public/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src="/public/images/logo.png" alt="Soccer Hunter" width="40" class="me-2">
                    Soccer Hunter
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <?php if (isLoggedIn()): ?>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/"><?php echo translate('home', $currentLang); ?></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <?php echo translate('categories', $currentLang); ?>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/category.php?id=1"><?php echo translate('players', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/category.php?id=2"><?php echo translate('coaches', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/category.php?id=3"><?php echo translate('goalkeepers', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/category.php?id=4"><?php echo translate('technical_directors', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/category.php?id=5"><?php echo translate('goalkeeper_coaches', $currentLang); ?></a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/news.php"><?php echo translate('news', $currentLang); ?></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/stadiums.php"><?php echo translate('stadiums', $currentLang); ?></a>
                        </li>
                        <?php if (hasRole('admin')): ?>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/"><?php echo translate('admin_panel', $currentLang); ?></a>
                        </li>
                        <?php endif; ?>
                    </ul>
                    <div class="d-flex">
                        <div class="dropdown me-3">
                            <a class="btn btn-outline-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i class="fas fa-globe"></i> <?php echo strtoupper($currentLang); ?>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="?lang=ar">العربية</a></li>
                                <li><a class="dropdown-item" href="?lang=en">English</a></li>
                                <li><a class="dropdown-item" href="?lang=fr">Français</a></li>
                                <li><a class="dropdown-item" href="?lang=de">Deutsch</a></li>
                                <li><a class="dropdown-item" href="?lang=es">Español</a></li>
                                <li><a class="dropdown-item" href="?lang=it">Italiano</a></li>
                                <li><a class="dropdown-item" href="?lang=pt">Português</a></li>
                                <li><a class="dropdown-item" href="?lang=la">Latina</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-outline-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i class="fas fa-user"></i> <?php echo $_SESSION['username']; ?>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="/profile.php"><i class="fas fa-id-card"></i> <?php echo translate('profile', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/messages.php"><i class="fas fa-envelope"></i> <?php echo translate('messages', $currentLang); ?></a></li>
                                <li><a class="dropdown-item" href="/meetings.php"><i class="fas fa-video"></i> <?php echo translate('video_meetings', $currentLang); ?></a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/logout.php"><i class="fas fa-sign-out-alt"></i> <?php echo translate('logout', $currentLang); ?></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </nav>
    </header>
    
    <main class="container py-4">
        <?php displayAlert(); ?>