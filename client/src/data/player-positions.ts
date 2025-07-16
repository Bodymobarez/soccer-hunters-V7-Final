// بيانات مراكز اللاعبين في كرة القدم

export interface PlayerPosition {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
}

export const playerPositions: PlayerPosition[] = [
  {
    id: 'goalkeeper',
    nameAr: 'حارس مرمى',
    nameEn: 'Goalkeeper',
    description: 'اللاعب المسؤول عن حماية المرمى وصد الكرات'
  },
  {
    id: 'centerback',
    nameAr: 'مدافع',
    nameEn: 'Center Back',
    description: 'مدافع قلب المركز الذي يحمي منطقة وسط الدفاع'
  },
  {
    id: 'sweeper',
    nameAr: 'مساك',
    nameEn: 'Sweeper',
    description: 'يلعب خلف خط الدفاع ويعمل على تنظيف الكرات الخطيرة'
  },
  {
    id: 'rightback',
    nameAr: 'مدافع أيمن',
    nameEn: 'Right Back',
    description: 'مدافع يلعب على الجهة اليمنى من خط الدفاع'
  },
  {
    id: 'leftback',
    nameAr: 'مدافع أيسر',
    nameEn: 'Left Back',
    description: 'مدافع يلعب على الجهة اليسرى من خط الدفاع'
  },
  {
    id: 'defensivemid',
    nameAr: 'وسط مدافع',
    nameEn: 'Defensive Midfielder',
    description: 'لاعب وسط يركز على الواجبات الدفاعية وقطع الكرات'
  },
  {
    id: 'attackingmid',
    nameAr: 'وسط مهاجم',
    nameEn: 'Attacking Midfielder',
    description: 'لاعب وسط يركز على صناعة اللعب والهجوم'
  },
  {
    id: 'rightwing',
    nameAr: 'وينج أيمن',
    nameEn: 'Right Wing',
    description: 'لاعب هجومي يلعب على الجهة اليمنى من الملعب'
  },
  {
    id: 'leftwing',
    nameAr: 'وينج أيسر',
    nameEn: 'Left Wing',
    description: 'لاعب هجومي يلعب على الجهة اليسرى من الملعب'
  },
  {
    id: 'striker',
    nameAr: 'مهاجم',
    nameEn: 'Striker',
    description: 'المهاجم الذي يتمركز في منطقة جزاء الخصم ويسجل الأهداف'
  }
];

// وظيفة للحصول على مركز اللاعب حسب الاسم العربي
export const getPositionByArabicName = (arabicName: string): PlayerPosition | undefined => {
  return playerPositions.find(pos => pos.nameAr === arabicName);
};

// وظيفة للحصول على مركز اللاعب حسب المعرف
export const getPositionById = (id: string): PlayerPosition | undefined => {
  return playerPositions.find(pos => pos.id === id);
};

// الحصول على قائمة المراكز للعرض في القوائم المنسدلة
export const getPositionsForDropdown = () => {
  return playerPositions.map(pos => ({
    value: pos.id,
    label: pos.nameAr
  }));
};
