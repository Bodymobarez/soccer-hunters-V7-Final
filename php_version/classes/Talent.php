<?php
/**
 * كلاس المواهب الرياضية
 */
class Talent {
    private $db;
    
    public function __construct() {
        $this->db = connectDB();
    }
    
    /**
     * الحصول على جميع المواهب
     */
    public function getAllTalents() {
        try {
            $stmt = $this->db->query("SELECT * FROM talents");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetAllTalents Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على المواهب حسب الفئة
     */
    public function getTalentsByCategory($categoryId) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM talents WHERE category_id = ?");
            $stmt->execute([$categoryId]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetTalentsByCategory Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على موهبة بواسطة المعرف
     */
    public function getTalentById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM talents WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log('GetTalentById Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * الحصول على المواهب المميزة
     */
    public function getFeaturedTalents() {
        try {
            $stmt = $this->db->query("SELECT * FROM talents WHERE is_featured = 1 LIMIT 6");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('GetFeaturedTalents Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * البحث عن مواهب
     */
    public function searchTalents($query) {
        try {
            $query = "%$query%";
            $stmt = $this->db->prepare("SELECT * FROM talents WHERE name LIKE ? OR description LIKE ? OR position LIKE ?");
            $stmt->execute([$query, $query, $query]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log('SearchTalents Error: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * إضافة موهبة جديدة
     */
    public function addTalent($data) {
        try {
            $stmt = $this->db->prepare("INSERT INTO talents (name, description, category_id, image_url, video_url, age, height, weight, position, secondary_position, foot, nationality, current_team, contract_end, market_value, is_available, rating, created_at, user_id, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)");
            
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['category_id'],
                $data['image_url'],
                $data['video_url'] ?? null,
                $data['age'] ?? null,
                $data['height'] ?? null,
                $data['weight'] ?? null,
                $data['position'] ?? null,
                $data['secondary_position'] ?? null,
                $data['foot'] ?? null,
                $data['nationality'] ?? null,
                $data['current_team'] ?? null,
                $data['contract_end'] ?? null,
                $data['market_value'] ?? null,
                $data['is_available'] ?? 1,
                $data['rating'] ?? null,
                $data['user_id'],
                $data['is_featured'] ?? 0
            ]);
            
            return ['success' => true, 'talent_id' => $this->db->lastInsertId()];
        } catch (PDOException $e) {
            error_log('AddTalent Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء إضافة الموهبة'];
        }
    }
    
    /**
     * تحديث موهبة
     */
    public function updateTalent($id, $data) {
        try {
            $allowedFields = ['name', 'description', 'category_id', 'image_url', 'video_url', 'age', 'height', 'weight', 'position', 'secondary_position', 'foot', 'nationality', 'current_team', 'contract_end', 'market_value', 'is_available', 'rating', 'is_featured'];
            
            $updates = [];
            $params = [];
            
            foreach ($data as $key => $value) {
                $dbKey = str_replace('_', '_', $key);
                if (in_array($key, $allowedFields)) {
                    $updates[] = "$dbKey = ?";
                    $params[] = $value;
                }
            }
            
            if (empty($updates)) {
                return ['success' => false, 'message' => 'لا توجد حقول للتحديث'];
            }
            
            $params[] = $id;
            $stmt = $this->db->prepare("UPDATE talents SET " . implode(', ', $updates) . " WHERE id = ?");
            $stmt->execute($params);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('UpdateTalent Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء تحديث الموهبة'];
        }
    }
    
    /**
     * حذف موهبة
     */
    public function deleteTalent($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM talents WHERE id = ?");
            $stmt->execute([$id]);
            
            return ['success' => true];
        } catch (PDOException $e) {
            error_log('DeleteTalent Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'حدث خطأ أثناء حذف الموهبة'];
        }
    }
}