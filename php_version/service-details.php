<?php
/**
 * صفحة تفاصيل الخدمة
 */
require_once 'includes/header.php';

// التحقق من وجود معرف الخدمة
if (!isset($_GET['id']) || empty($_GET['id'])) {
    redirect('/');
}

// الحصول على معرف الخدمة
$serviceId = (int) $_GET['id'];

// إنشاء كائن المواهب
$talent = new Talent();
$mediaObj = new Media();

// الحصول على تفاصيل الخدمة
$service = $talent->getTalentById($serviceId);

if (!$service) {
    setAlert('الخدمة غير موجودة', 'danger');
    redirect('/');
}

// الحصول على ملفات الوسائط المتعلقة بالخدمة
$media = $mediaObj->getMediaByTalent($serviceId);

// تصنيف الوسائط حسب النوع
$images = array_filter($media, function($item) {
    return $item['file_type'] === 'image';
});

$videos = array_filter($media, function($item) {
    return $item['file_type'] === 'video';
});

$documents = array_filter($media, function($item) {
    return $item['file_type'] === 'document';
});

// هل الخدمة هي مدرب
function isCoachService($service) {
    return in_array($service['category_id'], [2, 4, 5]);
}

// إذا تم إرسال استفسار
if (isLoggedIn() && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['send_inquiry'])) {
    $subject = sanitize($_POST['subject']);
    $message = sanitize($_POST['message']);
    
    if (empty($subject) || empty($message)) {
        setAlert('الرجاء ملئ جميع الحقول', 'danger');
    } else {
        // هنا يمكن إضافة رمز لإرسال الاستفسار
        setAlert('تم إرسال استفسارك بنجاح. سيتم الرد عليك قريباً.', 'success');
    }
}
?>

<div class="service-detail-page">
    <div class="row mb-4">
        <div class="col-lg-4 mb-4 mb-lg-0">
            <div class="service-profile-card bg-white shadow-sm rounded-3 p-3 text-center">
                <div class="service-profile-image mb-3">
                    <img src="<?php echo $service['image_url']; ?>" alt="<?php echo $service['name']; ?>" class="rounded-circle img-thumbnail" style="width: 200px; height: 200px; object-fit: cover;">
                </div>
                <h3 class="service-name mb-2"><?php echo $service['name']; ?></h3>
                
                <?php if (isCoachService($service)): ?>
                <div class="service-position mb-3 badge bg-primary">
                    <?php echo $service['specialization'] ?? ''; ?>
                </div>
                <?php else: ?>
                <div class="service-position mb-3 badge bg-primary">
                    <?php echo $service['position'] ?? ''; ?>
                </div>
                <?php endif; ?>
                
                <div class="service-bio mb-3">
                    <p class="text-muted"><?php echo $service['description']; ?></p>
                </div>
                
                <?php if (!empty($service['rating'])): ?>
                <div class="service-rating mb-3">
                    <?php for($i = 1; $i <= 5; $i++): ?>
                        <?php if($i <= $service['rating']): ?>
                            <i class="fas fa-star text-warning"></i>
                        <?php else: ?>
                            <i class="far fa-star text-warning"></i>
                        <?php endif; ?>
                    <?php endfor; ?>
                </div>
                <?php endif; ?>
                
                <div class="service-stats">
                    <div class="row g-0 text-center">
                        <div class="col-4 p-2 border-end">
                            <div class="stat-value"><?php echo $service['age'] ?? '-'; ?></div>
                            <div class="stat-label small text-muted"><?php echo translate('age', $currentLang); ?></div>
                        </div>
                        <div class="col-4 p-2 border-end">
                            <div class="stat-value"><?php echo $service['height'] ?? '-'; ?></div>
                            <div class="stat-label small text-muted"><?php echo translate('height', $currentLang); ?></div>
                        </div>
                        <div class="col-4 p-2">
                            <div class="stat-value"><?php echo $service['weight'] ?? '-'; ?></div>
                            <div class="stat-label small text-muted"><?php echo translate('weight', $currentLang); ?></div>
                        </div>
                    </div>
                </div>
                
                <hr>
                
                <div class="service-contact-info mb-3">
                    <div class="contact-item mb-2">
                        <i class="fas fa-flag me-2"></i> <?php echo $service['nationality'] ?? '-'; ?>
                    </div>
                    <?php if (!empty($service['current_team'])): ?>
                    <div class="contact-item mb-2">
                        <i class="fas fa-building me-2"></i> <?php echo $service['current_team']; ?>
                    </div>
                    <?php endif; ?>
                    <?php if (!empty($service['foot'])): ?>
                    <div class="contact-item mb-2">
                        <i class="fas fa-shoe-prints me-2"></i> <?php echo $service['foot']; ?>
                    </div>
                    <?php endif; ?>
                </div>
                
                <?php if (isLoggedIn()): ?>
                <a href="#contact-form" class="btn btn-primary w-100 mt-3">
                    <i class="fas fa-envelope me-2"></i> <?php echo translate('contact', $currentLang); ?>
                </a>
                <?php else: ?>
                <a href="/login.php" class="btn btn-primary w-100 mt-3">
                    <i class="fas fa-sign-in-alt me-2"></i> <?php echo translate('login_to_contact', $currentLang); ?>
                </a>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="col-lg-8">
            <!-- علامات التبويب -->
            <ul class="nav nav-tabs mb-4" id="serviceTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="media-tab" data-bs-toggle="tab" data-bs-target="#media-tab-pane" type="button">
                        <i class="fas fa-photo-video me-2"></i> <?php echo translate('media', $currentLang); ?>
                    </button>
                </li>
                <?php if (!isCoachService($service)): ?>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats-tab-pane" type="button">
                        <i class="fas fa-chart-bar me-2"></i> <?php echo translate('statistics', $currentLang); ?>
                    </button>
                </li>
                <?php endif; ?>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="achievements-tab" data-bs-toggle="tab" data-bs-target="#achievements-tab-pane" type="button">
                        <i class="fas fa-trophy me-2"></i> <?php echo translate('achievements', $currentLang); ?>
                    </button>
                </li>
            </ul>
            
            <!-- محتوى علامات التبويب -->
            <div class="tab-content" id="serviceTabContent">
                <!-- علامة تبويب الوسائط -->
                <div class="tab-pane fade show active" id="media-tab-pane" role="tabpanel" aria-labelledby="media-tab" tabindex="0">
                    <div class="media-section">
                        <?php if (empty($images) && empty($videos) && empty($documents)): ?>
                        <div class="alert alert-info">
                            لا توجد وسائط متوفرة حالياً
                        </div>
                        <?php else: ?>
                            
                            <!-- عرض الصور -->
                            <?php if (!empty($images)): ?>
                            <h4 class="mb-3"><i class="fas fa-images me-2"></i> <?php echo translate('images', $currentLang); ?></h4>
                            <div class="row mb-4">
                                <?php foreach($images as $image): ?>
                                <div class="col-md-4 col-sm-6 mb-3">
                                    <a href="<?php echo $image['file_url']; ?>" class="image-popup" data-title="<?php echo $image['description']; ?>">
                                        <img src="<?php echo $image['file_url']; ?>" alt="<?php echo $image['description']; ?>" class="img-fluid rounded shadow-sm" style="width: 100%; height: 200px; object-fit: cover;">
                                        <?php if (!empty($image['description'])): ?>
                                        <div class="image-caption mt-1 small text-muted"><?php echo $image['description']; ?></div>
                                        <?php endif; ?>
                                    </a>
                                </div>
                                <?php endforeach; ?>
                            </div>
                            <?php endif; ?>
                            
                            <!-- عرض الفيديوهات -->
                            <?php if (!empty($videos)): ?>
                            <h4 class="mb-3"><i class="fas fa-video me-2"></i> <?php echo translate('videos', $currentLang); ?></h4>
                            <div class="row mb-4">
                                <?php foreach($videos as $video): ?>
                                <div class="col-md-6 mb-3">
                                    <div class="video-container mb-2 rounded overflow-hidden shadow-sm">
                                        <video controls class="w-100">
                                            <source src="<?php echo $video['file_url']; ?>" type="video/mp4">
                                            المتصفح الخاص بك لا يدعم عنصر الفيديو.
                                        </video>
                                    </div>
                                    <?php if (!empty($video['description'])): ?>
                                    <div class="video-caption small text-muted"><?php echo $video['description']; ?></div>
                                    <?php endif; ?>
                                </div>
                                <?php endforeach; ?>
                            </div>
                            <?php endif; ?>
                            
                            <!-- عرض المستندات -->
                            <?php if (!empty($documents)): ?>
                            <h4 class="mb-3"><i class="fas fa-file-alt me-2"></i> <?php echo translate('documents', $currentLang); ?></h4>
                            <div class="row mb-4">
                                <?php foreach($documents as $document): ?>
                                <div class="col-md-6 mb-3">
                                    <div class="document-item p-3 border rounded shadow-sm">
                                        <h5 class="mb-2">
                                            <i class="fas fa-file-pdf text-danger me-2"></i>
                                            <?php echo $document['file_name']; ?>
                                        </h5>
                                        <?php if (!empty($document['description'])): ?>
                                        <p class="small text-muted mb-3"><?php echo $document['description']; ?></p>
                                        <?php endif; ?>
                                        <a href="<?php echo $document['file_url']; ?>" class="btn btn-sm btn-outline-primary" target="_blank">
                                            <i class="fas fa-download me-1"></i> <?php echo translate('download', $currentLang); ?>
                                        </a>
                                    </div>
                                </div>
                                <?php endforeach; ?>
                            </div>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- علامة تبويب الإحصائيات -->
                <?php if (!isCoachService($service)): ?>
                <div class="tab-pane fade" id="stats-tab-pane" role="tabpanel" aria-labelledby="stats-tab" tabindex="0">
                    <div class="stats-section">
                        <!-- يمكن إضافة إحصائيات اللاعب هنا -->
                        <div class="alert alert-info">
                            يتم تحديث الإحصائيات بشكل دوري.
                        </div>
                        
                        <!-- جدول إحصائيات اللاعب (مثال) -->
                        <div class="card mb-4">
                            <div class="card-header bg-primary text-white">
                                <i class="fas fa-chart-line me-2"></i> إحصائيات الموسم 2023/2024
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>المسابقة</th>
                                                <th>المباريات</th>
                                                <th>الأهداف</th>
                                                <th>التمريرات الحاسمة</th>
                                                <th>البطاقات الصفراء</th>
                                                <th>البطاقات الحمراء</th>
                                                <th>الدقائق</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>الدوري المصري</td>
                                                <td>28</td>
                                                <td>15</td>
                                                <td>7</td>
                                                <td>3</td>
                                                <td>0</td>
                                                <td>2430</td>
                                            </tr>
                                            <tr>
                                                <td>كأس مصر</td>
                                                <td>5</td>
                                                <td>3</td>
                                                <td>1</td>
                                                <td>0</td>
                                                <td>0</td>
                                                <td>450</td>
                                            </tr>
                                            <tr>
                                                <td>دوري أبطال أفريقيا</td>
                                                <td>8</td>
                                                <td>4</td>
                                                <td>2</td>
                                                <td>1</td>
                                                <td>0</td>
                                                <td>720</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="table-primary">
                                                <th>المجموع</th>
                                                <th>41</th>
                                                <th>22</th>
                                                <th>10</th>
                                                <th>4</th>
                                                <th>0</th>
                                                <th>3600</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
                
                <!-- علامة تبويب الإنجازات -->
                <div class="tab-pane fade" id="achievements-tab-pane" role="tabpanel" aria-labelledby="achievements-tab" tabindex="0">
                    <div class="achievements-section">
                        <!-- يمكن إضافة إنجازات اللاعب/المدرب هنا -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="achievement-card p-3 border rounded shadow-sm">
                                    <div class="achievement-icon mb-3 text-center">
                                        <i class="fas fa-trophy text-warning fa-3x"></i>
                                    </div>
                                    <h5 class="achievement-title text-center mb-3">كأس أمم أفريقيا</h5>
                                    <div class="achievement-details text-center">
                                        <div class="badge bg-primary mb-2">4 مرات</div>
                                        <p class="small text-muted">2006, 2008, 2010, 2017</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="achievement-card p-3 border rounded shadow-sm">
                                    <div class="achievement-icon mb-3 text-center">
                                        <i class="fas fa-medal text-primary fa-3x"></i>
                                    </div>
                                    <h5 class="achievement-title text-center mb-3">الدوري المصري</h5>
                                    <div class="achievement-details text-center">
                                        <div class="badge bg-primary mb-2">8 مرات</div>
                                        <p class="small text-muted">2000, 2005, 2006, 2007, 2008, 2009, 2010, 2011</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="achievement-card p-3 border rounded shadow-sm">
                                    <div class="achievement-icon mb-3 text-center">
                                        <i class="fas fa-award text-success fa-3x"></i>
                                    </div>
                                    <h5 class="achievement-title text-center mb-3">دوري أبطال أفريقيا</h5>
                                    <div class="achievement-details text-center">
                                        <div class="badge bg-primary mb-2">5 مرات</div>
                                        <p class="small text-muted">2001, 2005, 2006, 2008, 2012</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="achievement-card p-3 border rounded shadow-sm">
                                    <div class="achievement-icon mb-3 text-center">
                                        <i class="fas fa-star text-info fa-3x"></i>
                                    </div>
                                    <h5 class="achievement-title text-center mb-3">إنجازات شخصية</h5>
                                    <div class="achievement-details">
                                        <ul class="list-unstyled">
                                            <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i> أفضل حارس مرمى في أفريقيا 4 مرات</li>
                                            <li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i> أكبر لاعب يشارك في كأس العالم 2018</li>
                                            <li><i class="fas fa-check-circle text-success me-2"></i> رقم قياسي في عدم استقبال أهداف لمدة 1340 دقيقة</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- نموذج الاتصال -->
            <?php if (isLoggedIn()): ?>
            <div class="contact-form-section mt-5 p-4 bg-light rounded shadow-sm" id="contact-form">
                <h4 class="mb-4"><i class="fas fa-paper-plane me-2"></i> <?php echo translate('contact', $currentLang); ?> <?php echo $service['name']; ?></h4>
                <form method="POST" action="">
                    <div class="mb-3">
                        <label for="subject" class="form-label"><?php echo translate('subject', $currentLang); ?></label>
                        <input type="text" class="form-control" id="subject" name="subject" required>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label"><?php echo translate('message', $currentLang); ?></label>
                        <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" name="send_inquiry" class="btn btn-primary">
                        <i class="fas fa-paper-plane me-2"></i> <?php echo translate('send', $currentLang); ?>
                    </button>
                </form>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<style>
.service-profile-card {
    position: sticky;
    top: 20px;
}
.service-stats .stat-value {
    font-size: 1.25rem;
    font-weight: bold;
}
.service-stats .stat-label {
    font-size: 0.8rem;
    color: #6c757d;
}
.video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}
.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.document-item {
    transition: all 0.3s;
}
.document-item:hover {
    background-color: #f8f9fa;
}
.achievement-card {
    transition: all 0.3s;
}
.achievement-card:hover {
    transform: translateY(-5px);
}
</style>

<?php require_once 'includes/footer.php'; ?>