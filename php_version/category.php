<?php
/**
 * صفحة الفئات
 */
require_once 'includes/header.php';

// التحقق من وجود معرف الفئة
if (!isset($_GET['id']) || empty($_GET['id'])) {
    redirect('/');
}

// الحصول على معرف الفئة
$categoryId = (int) $_GET['id'];

// للحصول على الصفحة الحالية للتصفح
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = 12;
$offset = ($page - 1) * $limit;

// للحصول على منطقة البحث الحالية
$searchQuery = isset($_GET['search']) ? sanitize($_GET['search']) : '';

// الحصول على الفئة
function getCategoryName($id) {
    $categories = [
        1 => 'اللاعبين',
        2 => 'المدربين',
        3 => 'حراس المرمى',
        4 => 'المدراء الفنيين',
        5 => 'مدربي حراس المرمى'
    ];
    
    return isset($categories[$id]) ? $categories[$id] : 'فئة غير معروفة';
}

// هل هذه فئة مدربين
function isCoach($categoryId) {
    return in_array($categoryId, [2, 4, 5]);
}

// للحصول على عنوان الصفحة
$categoryName = getCategoryName($categoryId);

// إنشاء كائن المواهب
$talent = new Talent();

// الحصول على المواهب حسب الفئة
if (!empty($searchQuery)) {
    $talents = $talent->searchTalents($searchQuery);
    // تصفية النتائج حسب الفئة
    if (!empty($talents)) {
        $talents = array_filter($talents, function($item) use ($categoryId) {
            return $item['category_id'] == $categoryId;
        });
    }
} else {
    $talents = $talent->getTalentsByCategory($categoryId);
}

// إجمالي عدد المواهب
$totalTalents = count($talents);

// تحديد عدد صفحات التصفح
$totalPages = ceil($totalTalents / $limit);

// الحصول على المواهب للعرض في الصفحة الحالية
$displayTalents = array_slice($talents, $offset, $limit);
?>

<div class="row mb-4">
    <div class="col-md-6">
        <h2 class="mb-3"><?php echo $categoryName; ?></h2>
        <p class="text-muted"><?php echo translate('total_results', $currentLang); ?>: <?php echo $totalTalents; ?></p>
    </div>
    <div class="col-md-6">
        <form action="" method="GET" class="d-flex">
            <input type="hidden" name="id" value="<?php echo $categoryId; ?>">
            <input type="text" name="search" class="form-control me-2" placeholder="<?php echo translate('search_placeholder', $currentLang); ?>" value="<?php echo $searchQuery; ?>">
            <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> <?php echo translate('search', $currentLang); ?></button>
        </form>
    </div>
</div>

<?php if (empty($displayTalents)): ?>
<div class="alert alert-info">
    لا توجد نتائج مطابقة لبحثك.
</div>
<?php else: ?>

<div class="row">
    <?php foreach ($displayTalents as $item): ?>
    <div class="col-md-4 col-sm-6 mb-4">
        <div class="card talent-card h-100 shadow-sm">
            <img src="<?php echo $item['image_url']; ?>" class="card-img-top" alt="<?php echo $item['name']; ?>" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title"><?php echo $item['name']; ?></h5>
                <p class="card-text text-muted small"><?php echo mb_substr($item['description'], 0, 100); ?>...</p>
                
                <div class="talent-details mb-3">
                    <?php if (isCoach($categoryId)): ?>
                    <div class="talent-detail-item">
                        <i class="fas fa-chalkboard-teacher me-1"></i> <?php echo $item['specialization'] ?? ''; ?>
                    </div>
                    <?php else: ?>
                    <div class="talent-detail-item">
                        <i class="fas fa-running me-1"></i> <?php echo $item['position'] ?? ''; ?>
                    </div>
                    <?php endif; ?>
                    
                    <div class="talent-detail-item">
                        <i class="fas fa-flag me-1"></i> <?php echo $item['nationality'] ?? ''; ?>
                    </div>
                    
                    <?php if (!empty($item['rating'])): ?>
                    <div class="talent-detail-item">
                        <div class="rating">
                            <?php for($i = 1; $i <= 5; $i++): ?>
                                <?php if($i <= $item['rating']): ?>
                                    <i class="fas fa-star text-warning"></i>
                                <?php else: ?>
                                    <i class="far fa-star text-warning"></i>
                                <?php endif; ?>
                            <?php endfor; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
                
                <a href="service-details.php?id=<?php echo $item['id']; ?>" class="btn btn-primary w-100">
                    <i class="fas fa-eye me-1"></i> <?php echo translate('view_profile', $currentLang); ?>
                </a>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- أزرار التنقل بين الصفحات -->
<?php if ($totalPages > 1): ?>
<nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-center">
        <?php if ($page > 1): ?>
        <li class="page-item">
            <a class="page-link" href="?id=<?php echo $categoryId; ?>&page=<?php echo $page - 1; ?><?php echo !empty($searchQuery) ? '&search='.$searchQuery : ''; ?>">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
        <?php endif; ?>
        
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
        <li class="page-item <?php echo $i === $page ? 'active' : ''; ?>">
            <a class="page-link" href="?id=<?php echo $categoryId; ?>&page=<?php echo $i; ?><?php echo !empty($searchQuery) ? '&search='.$searchQuery : ''; ?>">
                <?php echo $i; ?>
            </a>
        </li>
        <?php endfor; ?>
        
        <?php if ($page < $totalPages): ?>
        <li class="page-item">
            <a class="page-link" href="?id=<?php echo $categoryId; ?>&page=<?php echo $page + 1; ?><?php echo !empty($searchQuery) ? '&search='.$searchQuery : ''; ?>">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
        <?php endif; ?>
    </ul>
</nav>
<?php endif; ?>

<?php endif; ?>

<style>
.talent-details {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 15px;
}
.talent-detail-item {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
}
.rating {
    display: flex;
}
.talent-card {
    transition: transform 0.3s;
}
.talent-card:hover {
    transform: translateY(-5px);
}
</style>

<?php require_once 'includes/footer.php'; ?>