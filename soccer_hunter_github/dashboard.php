<?php
/**
 * صفحة لوحة المعلومات
 */
require_once 'includes/header.php';

// التحقق من تسجيل دخول المستخدم
requireLogin();

// إنشاء الكائنات
$talentObj = new Talent();
$mediaObj = new Media();

// الحصول على المواهب المميزة
$featuredTalents = $talentObj->getFeaturedTalents();
?>

<div class="row">
    <div class="col-md-3">
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <i class="fas fa-user me-2"></i> <?php echo translate('user_profile', $currentLang); ?>
            </div>
            <div class="card-body text-center">
                <div class="mb-3">
                    <img src="/public/images/user-avatar.jpg" alt="<?php echo $_SESSION['username']; ?>" class="rounded-circle img-thumbnail" style="width: 120px; height: 120px; object-fit: cover;">
                </div>
                <h5><?php echo $_SESSION['username']; ?></h5>
                <p class="badge bg-<?php echo $_SESSION['user_role'] === 'admin' ? 'danger' : 'primary'; ?>">
                    <?php echo $_SESSION['user_role']; ?>
                </p>
                <div class="d-grid gap-2 mt-3">
                    <a href="profile.php" class="btn btn-sm btn-outline-primary">
                        <i class="fas fa-edit me-1"></i> <?php echo translate('edit_profile', $currentLang); ?>
                    </a>
                    <a href="messages.php" class="btn btn-sm btn-outline-info position-relative">
                        <i class="fas fa-envelope me-1"></i> <?php echo translate('messages', $currentLang); ?>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <i class="fas fa-sliders-h me-2"></i> <?php echo translate('quick_links', $currentLang); ?>
            </div>
            <div class="list-group list-group-flush">
                <a href="talent-management.php" class="list-group-item list-group-item-action">
                    <i class="fas fa-user-plus me-2"></i> <?php echo translate('manage_talents', $currentLang); ?>
                </a>
                <a href="media-management.php" class="list-group-item list-group-item-action">
                    <i class="fas fa-photo-video me-2"></i> <?php echo translate('manage_media', $currentLang); ?>
                </a>
                <a href="appointments.php" class="list-group-item list-group-item-action">
                    <i class="fas fa-calendar-alt me-2"></i> <?php echo translate('appointments', $currentLang); ?>
                </a>
                <a href="meetings.php" class="list-group-item list-group-item-action">
                    <i class="fas fa-video me-2"></i> <?php echo translate('video_meetings', $currentLang); ?>
                </a>
                <?php if ($_SESSION['user_role'] === 'admin'): ?>
                <a href="admin/" class="list-group-item list-group-item-action text-danger">
                    <i class="fas fa-user-shield me-2"></i> <?php echo translate('admin_panel', $currentLang); ?>
                </a>
                <?php endif; ?>
            </div>
        </div>
    </div>
    
    <div class="col-md-9">
        <!-- بطاقات الإحصائيات -->
        <div class="row mb-4">
            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card h-100 border-primary">
                    <div class="card-body text-center">
                        <div class="display-4 mb-2 text-primary">
                            <i class="fas fa-users"></i>
                        </div>
                        <h5 class="card-title"><?php echo translate('total_talents', $currentLang); ?></h5>
                        <p class="card-text display-6 mb-0">24</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card h-100 border-success">
                    <div class="card-body text-center">
                        <div class="display-4 mb-2 text-success">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <h5 class="card-title"><?php echo translate('upcoming_meetings', $currentLang); ?></h5>
                        <p class="card-text display-6 mb-0">5</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-info">
                    <div class="card-body text-center">
                        <div class="display-4 mb-2 text-info">
                            <i class="fas fa-eye"></i>
                        </div>
                        <h5 class="card-title"><?php echo translate('profile_views', $currentLang); ?></h5>
                        <p class="card-text display-6 mb-0">158</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- المواهب المميزة -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas fa-star me-2"></i> <?php echo translate('featured_talents', $currentLang); ?>
                </div>
                <a href="category.php?id=1" class="btn btn-sm btn-light">
                    <?php echo translate('view_all', $currentLang); ?> <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
            <div class="card-body">
                <div class="row">
                    <?php if (empty($featuredTalents)): ?>
                    <div class="col-12">
                        <div class="alert alert-info">
                            <?php echo translate('no_featured_talents', $currentLang); ?>
                        </div>
                    </div>
                    <?php else: ?>
                        <?php foreach (array_slice($featuredTalents, 0, 3) as $talent): ?>
                        <div class="col-md-4 mb-3 mb-md-0">
                            <div class="card h-100 talent-card">
                                <img src="<?php echo $talent['image_url']; ?>" class="card-img-top" alt="<?php echo $talent['name']; ?>" style="height: 180px; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title"><?php echo $talent['name']; ?></h5>
                                    <p class="card-text text-muted small mb-2"><?php echo mb_substr($talent['description'], 0, 60); ?>...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="badge bg-primary">
                                            <?php echo $talent['position'] ?? $talent['specialization'] ?? ''; ?>
                                        </span>
                                        <div class="small">
                                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                                <?php if ($i <= $talent['rating']): ?>
                                                    <i class="fas fa-star text-warning"></i>
                                                <?php else: ?>
                                                    <i class="far fa-star text-warning"></i>
                                                <?php endif; ?>
                                            <?php endfor; ?>
                                        </div>
                                    </div>
                                    <a href="service-details.php?id=<?php echo $talent['id']; ?>" class="btn btn-sm btn-primary w-100">
                                        <i class="fas fa-eye me-1"></i> <?php echo translate('view_profile', $currentLang); ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- المواعيد القادمة -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <i class="fas fa-calendar-day me-2"></i> <?php echo translate('upcoming_appointments', $currentLang); ?>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="table-light">
                            <tr>
                                <th><?php echo translate('title', $currentLang); ?></th>
                                <th><?php echo translate('date', $currentLang); ?></th>
                                <th><?php echo translate('with', $currentLang); ?></th>
                                <th><?php echo translate('status', $currentLang); ?></th>
                                <th><?php echo translate('actions', $currentLang); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- مثال على المواعيد -->
                            <tr>
                                <td>اجتماع مناقشة العقد</td>
                                <td>2025-05-05 10:00</td>
                                <td>نادي الأهلي</td>
                                <td><span class="badge bg-success">مؤكد</span></td>
                                <td>
                                    <a href="meeting-room.php?id=1" class="btn btn-sm btn-primary">
                                        <i class="fas fa-video"></i>
                                    </a>
                                    <a href="appointments.php?action=edit&id=1" class="btn btn-sm btn-info">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>جلسة تدريبية</td>
                                <td>2025-05-07 16:30</td>
                                <td>محمد صلاح</td>
                                <td><span class="badge bg-warning text-dark">قيد الانتظار</span></td>
                                <td>
                                    <a href="appointments.php?action=confirm&id=2" class="btn btn-sm btn-success">
                                        <i class="fas fa-check"></i>
                                    </a>
                                    <a href="appointments.php?action=edit&id=2" class="btn btn-sm btn-info">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>فحص طبي</td>
                                <td>2025-05-10 09:00</td>
                                <td>د. محمد إبراهيم</td>
                                <td><span class="badge bg-info text-dark">مقترح</span></td>
                                <td>
                                    <a href="appointments.php?action=confirm&id=3" class="btn btn-sm btn-success">
                                        <i class="fas fa-check"></i>
                                    </a>
                                    <a href="appointments.php?action=edit&id=3" class="btn btn-sm btn-info">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer text-center">
                <a href="appointments.php" class="btn btn-outline-primary btn-sm">
                    <?php echo translate('manage_all_appointments', $currentLang); ?>
                </a>
            </div>
        </div>
        
        <!-- آخر الأنشطة -->
        <div class="card">
            <div class="card-header bg-primary text-white">
                <i class="fas fa-history me-2"></i> <?php echo translate('recent_activity', $currentLang); ?>
            </div>
            <div class="list-group list-group-flush">
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">تم تحديث ملف عصام الحضري</h6>
                        <small>3 دقائق مضت</small>
                    </div>
                    <p class="mb-1 small text-muted">تم تحميل فيديو جديد للتدريب</p>
                </div>
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">رسالة جديدة من نادي الزمالك</h6>
                        <small>27 دقيقة مضت</small>
                    </div>
                    <p class="mb-1 small text-muted">طلب تفاصيل حول المهارات والخبرات التدريبية</p>
                </div>
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">تم تأكيد موعد الاجتماع</h6>
                        <small>3 ساعات مضت</small>
                    </div>
                    <p class="mb-1 small text-muted">اجتماع مناقشة العقد مع نادي الأهلي</p>
                </div>
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">تم تحديث الملف الشخصي</h6>
                        <small>1 يوم مضى</small>
                    </div>
                    <p class="mb-1 small text-muted">تم تحديث المعلومات والصورة الشخصية</p>
                </div>
            </div>
            <div class="card-footer text-center">
                <a href="activity-log.php" class="btn btn-outline-primary btn-sm">
                    <?php echo translate('view_all_activity', $currentLang); ?>
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>