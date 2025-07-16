# Soccer Hunter Mobile App

## نظرة عامة
تطبيق Soccer Hunter للهواتف المحمولة يمكّن المستخدمين من الوصول إلى منصة Soccer Hunter من أجهزة Android و iOS. يستخدم التطبيق React Native للواجهة الأمامية ويتواصل مع نفس واجهة API الخلفية التي يستخدمها موقع الويب.

## المميزات الرئيسية
- دعم لغات متعدد (8 لغات)
- تصميم متجاوب لشاشات مختلفة
- تصفح اللاعبين والمدربين والأندية
- تسجيل الدخول وإدارة الحساب
- إشعارات في الوقت الحقيقي
- مشاهدة الفيديوهات والصور
- التواصل عبر الدردشة
- مؤتمرات الفيديو

## متطلبات النظام
- Node.js >= 16
- React Native >= 0.71
- Xcode (للتطوير على نظام iOS)
- Android Studio (للتطوير على نظام Android)

## هيكل المشروع

```
mobile/
  ├── android/              # ملفات خاصة بنظام Android
  ├── ios/                  # ملفات خاصة بنظام iOS
  ├── src/
  │   ├── api/              # واجهات API والطلبات
  │   ├── assets/           # الصور والخطوط والموارد الثابتة
  │   ├── components/       # مكونات قابلة لإعادة الاستخدام
  │   ├── contexts/         # سياقات React (مثل المصادقة واللغة)
  │   ├── hooks/            # hooks مخصصة
  │   ├── localization/     # ملفات الترجمة
  │   ├── navigation/       # إعداد التنقل
  │   ├── screens/          # شاشات التطبيق
  │   ├── styles/           # أنماط عامة وقواعد UI
  │   ├── types/            # تعريفات TypeScript
  │   └── utils/            # وظائف مساعدة
  ├── .gitignore
  ├── app.json
  ├── babel.config.js
  ├── index.js              # نقطة الدخول للتطبيق
  ├── package.json
  ├── tsconfig.json
  └── README.md
```

## متطلبات التثبيت
1. تثبيت React Native CLI
```bash
npm install -g react-native-cli
```

2. تثبيت تبعيات المشروع
```bash
cd mobile
npm install
```

3. تشغيل التطبيق على iOS
```bash
npx react-native run-ios
```

4. تشغيل التطبيق على Android
```bash
npx react-native run-android
```

## الاتصال بالخادم الخلفي
يستخدم التطبيق نفس واجهة API الموجودة في الموقع، مع إعدادات للعمل مع كل من بيئة التطوير والإنتاج.