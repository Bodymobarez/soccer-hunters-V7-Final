// simple i18n implementation
// For a production app, consider using a more robust solution like react-i18next

export type Locale = "ar" | "en" | "fr" | "es" | "de" | "pt" | "it" | "la";

// Default locale (English)
export const defaultLocale: Locale = "en";

// Supported locales
export const locales: Locale[] = [
  "ar",
  "en",
  "fr",
  "es",
  "de",
  "pt",
  "it",
  "la",
];

// Human-readable names for each locale
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  la: "Latina",
};

// Define the type for our messages object to make TypeScript happy
type Messages = {
  [locale in Locale]: {
    [namespace: string]: {
      [key: string]: string;
    };
  };
};

// These translations are only the essential ones for UI elements
// In a production app, you would load these from files or an API
export const messages: Messages = {
  ar: {
    common: {
      tagline: "وجهتك الأولى للمواهب الرياضية",
      soccerHunter: "صقر هانتر",
      worldClassPlatform: "منصة عالمية المستوى",
      home: "الرئيسية",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      myAccount: "حسابي",
      players: "اللاعبين",
      coaches: "المدربين",
      technicalDirector: "المدير الفني",
      supportStaff: "الجهاز المعاون",
      goalkeepers: "حراس المرمى",
      fitnessCoaches: "مدربي اللياقة",
      goalkeepingCoaches: "مدربي الحراس",
      clubs: "الأندية",
      agents: "الوكلاء",
      doctors: "الأطباء",
      news: "الأخبار",
      about: "حول الموقع",
      contact: "اتصل بنا",
      services: "الخدمات",
      categories: "الفئات",
      searchPlayers: "البحث عن لاعبين",
      searchCoaches: "البحث عن مدربين",
      openMenu: "فتح القائمة",
      assistant: "المساعد",
      analyst: "المحلل",
      physiotherapist: "أخصائي العلاج الطبيعي",
      nutritionist: "أخصائي التغذية",
      teamManager: "مدير الفريق",
      kitManager: "مسؤول الملابس",
      scoutingTeam: "فريق الكشافة",
      language: "اللغة",
      changeLanguage: "تغيير اللغة",

      // Player positions
      striker: "مهاجم",
      attackingMid: "وسط مهاجم",
      defensiveMid: "وسط مدافع",
      leftWing: "جناح أ��سر",
      rightWing: "جناح أيمن",
      leftBack: "ظهير أيسر",
      rightBack: "ظهير أيمن",
      centerBack: "مدافع وسط",
      goalkeeper: "حارس مرمى",
      allPlayers: "جميع اللاعبين",

      // Coach types
      headCoach: "مدرب رئيسي",
      assistantCoach: "مدرب مساعد",
      allCoaches: "جميع المدربين",

      // Dashboard types
      adminDashboard: "لوحة تحكم المدير",
      userDashboard: "لوحة تحكم ال��ستخدم",
      playerDashboard: "لوحة تحكم اللاعب",
      coachDashboard: "لوحة تحكم المدرب",
      clubDashboard: "لوحة تحكم النادي",
      agentDashboard: "لوحة تحكم الوكيل",
      doctorDashboard: "لوحة تحكم الطبيب",

      // Accessibility
      skipToContent: "تخطي إلى المحتوى الرئيسي",
      accessibilityAndLanguage: "خيارات الوصول واللغة",
      accessibilitySettings: "إعدادات سهولة الوصول",
      displayMode: "وضع العرض",
      lightMode: "فاتح",
      darkMode: "داكن",
      systemMode: "نظام",
      highContrast: "تباين عالي",
      fontSize: "حجم الخط",
      voiceNavigation: "التنقل الصوتي",
      reduceMotion: "تقليل الحركة",
      resetSettings: "إعادة تعيين الإعدادات",
      overview: "نظرة عامة",
      files: "الملفات",

      // Admin Dashboard
      adminPanel: "لوحة تحكم المدير",
      manageFromHere: "يمكنك إدارة المنصة من هنا",
      exportReport: "تصدير التقارير",
      addNewUser: "إضافة مستخدم جديد",
      communication: "التواصل",
      settings: "الإعدادات",

      // Communication Module
      communicationSystem: "نظام التواصل",
      manageUserCommunication:
        "إدارة النظام التواصل بين المستخدمين والإشعار��ت",
      newMessages: "الرسائل الجديدة",
      activeChats: "المحادثات النشطة",
      sentNotifications: "الإشعارات المرسلة",
      sendGeneralNotification: "إرسال إشعار عام",
      notificationTitle: "عنوان الإشعار",
      notificationText: "نص الإشعار...",
      sendToAll: "إرسال للجميع",
      sendToGroup: "إرسال لمجموعة محددة",

      // Settings Module
      systemSettings: "إعدادات النظام",
      platformGeneralSettings: "تكوين وإدارة إعدادات المنصة العامة",
      securitySettings: "إعدادات الأمان",
      enableTwoFactor: "تفعيل التحقق بخطوتين",
      enableLogging: "تسجيل العمليات",
      sessionTimeout: "انتهاء صلاحية الجلسة (دقيقة)",
      platformSettings: "إعدادات المنصة",
      allowNewRegistration: "السماح بالتسجيل الجديد",
      maintenanceMode: "وضع الصيانة",
      maxAttempts: "عدد المحاولات المسموحة",
      apiSettings: "إعدادات API",
      baseApiUrl: "رابط API الأساسي",
      apiKey: "مفتاح API",
      testConnection: "اختبار الا��صال",
      saveSettings: "حفظ الإعدادات",
      backupManagement: "إدارة النسخ الاحتياطية",
      autoBackup: "النسخة الاحتياطية التلقائية",
      lastBackup: "آخر نسخة احتياطية: اليوم 03:00 ص",
      downloadBackup: "تنزيل",
      createBackup: "إنشاء نسخة",

      // Not Found Page
      pageNotFound: "404 - الصفحة غير موجودة",
      pageNotFoundDescription: "عذراً، الصفحة التي تبحث عنها غير موجودة",

      // Health Check Page
      checking: "جاري الفحص...",
      workingSuccessfully: "يعمل بنجاح ✅",
      demoModeNoAPI: "وضع التجربة (لا يوجد API خلفي) 🟡",
      demoModeNetworkError: "وضع التجربة (خطأ في الشبكة) 🟡",
      error: "خطأ",
      connectionError: "خطأ في الاتصال",

      // Common Dashboard Terms
      loading: "جاري التحميل...",
      saving: "جاري الحفظ...",
      success: "نجح",
      failed: "فشل",
      name: "الاسم",
      status: "الحالة",
      actions: "الإجراءات",
      edit: "تعديل",
      delete: "حذف",
      view: "عرض",
      save: "حفظ",
      cancel: "إلغاء",
      search: "بحث",
      filter: "تصفية",
      all: "الكل",
      active: "نشط",
      inactive: "غير نشط",

      // About Page
      aboutPageDescription:
        "منصة صقر هانتر هي الوجهة الرائدة لاكتشاف وتطوير المواهب الرياضية في منطقة الشرق الأوسط وشمال أفريقيا، حيث نربط اللاعبين والمدربين والأندية والوكلاء في نظام بيئي متكامل لكرة القدم",
      establishedIn: "تأسست في",
      activeUsers: "المستخدمين النشطين",
      successfulMatches: "المطابقات الناجحة",
      countries: "الدول",
      userRating: "تقييم المستخدمين",
      featured: "مميز",
      exploreCategory: "استكشف الفئة",
      specializations: "التخصصات",
      partneredClubs: "الأندية الشريكة",

      // Home Page - Position Names
      strikers: "المهاجمين",
      defensiveMidfielders: "لاعبي الوسط الدفاعي",

      // Home Page - Position Descriptions
      goalkeeperDescription: "خط الدفاع الأول وحامي المرمى",
      strikerDescription: "هدافين ومهاجمين محترفين",
      leftWingDescription: "لاعبي الجناح الأيسر السريعين",
      rightWingDescription: "لاعبي الجناح الأيمن المبدعين",
      attackingMidDescription: "صناع الأهداف ولاعبي الوسط المهاجم",
      defensiveMidfielderDescription: "محاربي الوسط والمدافعين",

      // Home Page - Service Descriptions
      coachesDescription: "مدربين محترف��ن ومؤهلين",
      doctorsDescription: "أطباء متخصصين في الطب الرياضي",
      clubsDescription: "أندية محترفة وأكاديميات",
      agentsDescription: "وكلاء لاعبين معتمدين",

      // Home Page - Specialties
      headCoach: "المدرب الرئيسي",
      assistantCoach: "المدرب المساعد",
      sportsMedicine: "الطب الرياضي",
      physiotherapy: "العلاج الطبيعي",
      sportsNutrition: "التغذية الرياضية",
      sportsPsychology: "علم النفس الرياضي",
      professionalClubs: "الأندية المحترفة",
      academies: "الأكاديميات",
      youthDevelopment: "تطوير الشباب",
      scouting: "الاستطلاع",
      talentManagement: "إدارة المواهب",
      contractNegotiation: "التفاوض على العقود",
      careerDevelopment: "تطوير المسيرة المهنية",
      transfers: "الانتقالات",

      // Home Page - Other
      searchPlaceholder: "ابحث عن لاعبين، مدربين، أندية...",
      featuredPlayerCategories: "فئات اللاعبين المميزة",
      explorePlayerPositions:
        "استكشف مراكز اللاعب��ن المختلفة واعثر على المواهب المناسبة",
      professionalServices: "الخدمات المهنية",
      comprehensiveSportsEcosystem: "نظام بيئي رياضي شامل يلبي جميع احتياجاتك",
      exploreService: "استكشف الخدمة",
      quickActions: "الإجراءات السريعة",
      getStartedToday: "ابدأ رحلتك الرياضية اليوم",
      createProfile: "إنشاء ملف شخصي",
      createProfileDescription: "أنشئ ملفك الشخصي واعرض مواهبك للعالم",
      findTalent: "اعثر على المواهب",
      findTalentDescription: "ابحث عن أفضل المواهب الرياضية في منطقتك",
      startSearching: "ابدأ البحث",
      getSupport: "احصل على الدعم",
      getSupportDescription: "تواصل مع فريق الدعم للحصول على المساعدة",
      joinSoccerHunter: "انضم إلى صقر هانتر",
      joinDescription: "انضم إلى آلاف المواهب الرياضية واكتشف فرصاً لا محدودة",
      joinNow: "انضم الآن",
      learnMore: "اعرف المزيد",

      coreValues: "قيمنا الأساسية",
      ourServices: "خدماتنا",
      missionVision: "الرسالة والرؤية",
      ourTeam: "فريقنا",
      ourJourney: "رحلتنا",
      ourMission: "رسالتنا",
      ourVision: "رؤيتنا",
      missionDescription:
        "نهدف إلى إحداث ثورة في إدارة المواهب الرياضية من خلال توفير منصة تقنية متطورة تربط ا��مواهب بالفرص المناسبة، وتمكن اللاعبين من الوصول إلى إمكاناتهم الكاملة",
      visionDescription:
        "أن نصبح المنصة الرائدة عالمياً في اكتشاف وتطوير المواهب الرياضية، ونساهم في بناء مستقبل أفضل لكرة القدم في ال��نطقة والعالم",
      missionPoint1: "توفير أدوات متقدمة لاكتشاف وتقييم المواهب الرياضية",
      missionPoint2: "ربط اللاعبين بالفرص المناسبة في الأندية المحترفة",
      missionPoint3: "دعم تطوير المهارات والقدرات الفنية للمواهب الشابة",
      visionPoint1: "أن نكون الخيار الأول للمواهب الرياضية في المنطقة",
      visionPoint2: "تحقيق الريادة في تقنيات اكتشاف وتطوير المواهب",
      visionPoint3: "المساهمة في رفع مستوى كرة القدم العربية عالمياً",
      meetOurTeam: "تعرف على فريقنا",
      teamDescription:
        "فريق من الخبراء المتخصصين في مجال الرياضة والتكنولوجيا، يعملون بشغف لتحقيق رؤية صقر هانتر",
      specialization: "التخصص",
      achievements: "الإنجازات",
      journeyDescription:
        "رحلة من النمو والتطوير المستمر منذ التأسيس حتى اليوم",
      joinOurMission: "انضم إلى مهمتنا",
      joinMissionDescription:
        "كن جزءاً من مستقبل كرة القدم واكتشف إمكاناتك اللامحدودة معنا",
      getStarted: "ابدأ الآن",
      contactUs: "اتصل بنا",
      emailUs: "راسلنا",
      callUs: "اتصل بنا",
      visitUs: "زوروا مكاتبنا",
      headquartersLocation: "الرياض، المملكة العربية السعودية",
      meetings: "الاجتماعات",
      totalUsers: "إجمالي المستخدمين",
      newUsers: "مستخدمين جدد",
      totalChats: "إجمالي المحادثات",
      activeAppointments: "المواعيد النشطة",
      lastMonth: "من الشهر الماضي",
      userGrowth: "نمو المستخدمين",
      userGrowthStats: "إحصائيات نمو المستخدمين خلال الستة أشهر الماضية",
      userTypeDistribution: "توزيع أنوا�� المستخدمين",
      userTypeRatio: "نس��ة توزيع المستخدمين حسب النوع",
      latestPlayers: "أحدث اللاعبين",
      latestCoaches: "أحدث المدربين",
      latestChats: "آخر المحادثات",
      loading: "جاري التحميل...",
      active: "نشط",
      minutesAgo: "منذ {minutes} دقائق",
      hoursAgo: "منذ {hours} ساعة",
      footballPlayer: "لاعب كرة قدم",
      footballCoach: "مدرب كرة قدم",
      uploadNewFile: "رفع ملف جديد",
      uploadFileDescription:
        "قم برفع ملف صورة أو فيديو أو مستند للاعب أو مدرب أو نادي أو وكيل",
      fileTitle: "عنوان الملف",
      fileDescription: "وصف الملف",
      fileDescriptionOptional: "وصف الملف (اختياري)",
      fileType: "نوع الملف",
      selectFileType: "اختر نوع الملف",
      relatedTo: "متعلق بـ",
      selectRelatedType: "اختر النوع المتعلق",
      chooseFile: "اختر الملف",
      uploadFile: "رفع الملف",
      fileUploadedSuccess: "تم رفع الملف",
      fileUploadedSuccessDesc: "تم رفع الملف بنجاح",
      preview: "معاينة",
      published: "منشور",
      inReview: "قيد المراجعة",
      image: "صورة",
      video: "فيديو",
      document: "مستند",
      fileSize: "حجم الملف",
      view: "عرض",
      viewFile: "عرض الملف",
      viewing: "عرض",
      editFile: "تعديل الملف",
      editingInfo: "تعديل معلومات",
      deleteFile: "حذف الملف",
      fileDeletedSuccess: "تم حذف",
      searchMeeting: "بحث عن اجتماع...",
      meetingStatus: "حالة الاجتماع",
      allMeetings: "كل الاجتماعات",
      scheduled: "مجدولة",
      completed: "مكتملة",
      canceled: "ملغية",
      scheduleNewMeeting: "جدولة اجتماع جديد",
      scheduleNewVideoMeeting: "جدولة اجتماع فيديو جديد",
      createLiveVideoMeeting:
        "قم بإنشاء اجتماع فيديو مباشر لإجراء مقابلة أو مناقشة",
      meetingTitle: "عنوان الاجتماع",
      meetingTitlePlaceholder: "عنوان الاجتماع",
      meetingDescription: "وصف الاجتماع",
      meetingDescriptionPlaceholder: "وصف الاجتماع (اختياري)",
      meetingDate: "تاريخ الاجتماع",
      selectDate: "اختر تا��يخ",
      meetingTime: "وقت الاجتماع",
      meetingDuration: "مدة الاجتماع (بالدقائق)",
      meetingAttendees: "المشاركون في الاجتماع",
      addAttendees: "أضف مشاركين",
      noAttendeesAdded: "لم يتم إضافة مشاركين بعد",
      player: "لاعب",
      coach: "مدرب",
      club: "نادي",
      agent: "وكيل",
      doctor: "طبيب",
      recordMeeting: "تسجيل الا��تماع",
      scheduleMeeting: "جدولة الاجتماع",
      videoMeetings: "اجتماعات الفيديو",
      videoMeetingsDescription: "قائمة كل اجتماعات الفيديو المجدولة والماضية",
      forwards: "مهاجمين",
      midfielders: "لاعبي وسط",
      defenders: "مدافعين",
      wingbacks: "ظهيري جنب",
      allPlayers: "كل اللاعبين",

      // View options
      gridView: "عرض شبكي",
      listView: "عرض قائمة",

      // Dashboard common
      welcome: "مرحباً",
      edit: "تعديل",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      close: "إغلاق",
      search: "��حث",
      filter: "تصفية",
      status: "الحالة",
      date: "التاريخ",
      time: "الوقت",
      actions: "الإجراءات",
      details: "التفاصيل",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      page: "صفحة",
      of: "من",
      noData: "لا توجد بيانات",
      noResults: "لا توجد نتائج",
      success: "نجح",
      error: "خطأ",
      warning: "تحذير",
      info: "معلومات",
      confirm: "تأكيد",
      yes: "نعم",
      no: "لا",
      required: "مطلوب",
      optional: "اختياري",
      submit: "إرسال",
      reset: "إعادة تعيين",
      clear: "مسح",
      select: "اختر",
      selectAll: "اختر الكل",
      deselectAll: "إلغاء تحديد الكل",
      export: "تصدير",
      import: "استيراد",
      print: "طباعة",
      download: "تحميل",
      upload: "رفع",
      share: "مشاركة",
      copy: "نسخ",
      cut: "قص",
      paste: "ل��ق",
      undo: "تراجع",
      redo: "إعادة",
      refresh: "تحديث",
      reload: "إعادة تحميل",
      settings: "الإعدادات",
      preferences: "التفضيلات",
      profile: "الملف الشخصي",
      account: "الحساب",
      dashboard: "لوحة التحكم",
      menu: "القائمة",
      navigation: "ال��نقل",
      sidebar: "الشريط الجانبي",
      header: "الرأس",
      footer: "التذييل",
      content: "المحتوى",
      main: "الرئيسي",
      help: "مساعدة",
      support: "الدعم",
      contact: "اتصل بنا",
      about: "حول",
      privacy: "الخصوصية",
      terms: "الشروط",
      cookies: "ملفات تعريف الارتباط",
      legal: "القانونية",
      copyright: "حقوق الطبع والنشر",
      version: "الإصدار",
      update: "تحديث",
      upgrade: "ترقية",
      downgrade: "تقليل الرتبة",
      install: "تثبيت",
      uninstall: "إلغاء التثبيت",
      enable: "تمكين",
      disable: "تعطيل",
      activate: "تفعيل",
      deactivate: "إلغاء التفعيل",
      online: "متصل",
      offline: "غير متصل",
      connected: "متصل",
      disconnected: "منقطع",
      available: "متاح",
      unavailable: "غير متاح",
      busy: "مشغول",
      away: "بعيد",
      idle: "خامل",
      pending: "قيد الانتظار",
      processing: "قيد المعالجة",
      completed: "مكتمل",
      failed: "فشل",
      cancelled: "ملغي",
      approved: "موافق عليه",
      rejected: "مرفوض",
      draft: "مسودة",
      published: "منشور",
      archived: "مؤرشف",
      deleted: "محذوف",
      suspended: "معلق",
      banned: "محظور",
      verified: "موثق",
      unverified: "غير موثق",
      public: "عام",
      private: "خاص",
      internal: "داخلي",
      external: "خارجي",
      local: "محلي",
      remote: "بعيد",
      global: "عالمي",
      regional: "إقليمي",
      national: "وطني",
      international: "دولي",
      male: "ذكر",
      female: "أنثى",
      other: "آخر",
      unknown: "غير معروف",
      none: "لا شيء",
      all: "الكل",
      any: "أي",
      some: "بعض",
      many: "كثير",
      few: "قليل",
      several: "عدة",
      multiple: "متعدد",
      single: "واحد",
      first: "الأول",
      last: "الأخير",
      new: "جديد",
      old: "قديم",
      recent: "حديث",
      latest: "الأحدث",
      earliest: "الأقدم",
      current: "الحالي",
      previous: "السابق",
      following: "التالي",
      today: "اليوم",
      yesterday: "أمس",
      tomorrow: "غداً",
      week: "أسبوع",
      month: "شهر",
      year: "سنة",
      day: "يوم",
      hour: "ساعة",
      minute: "دقيقة",
      second: "ثانية",
      morning: "صباح",
      afternoon: "بعد الظهر",
      evening: "مساء",
      night: "ليل",
      weekend: "عطلة نهاية الأسبوع",
      weekday: "يوم عمل",
      holiday: "عطلة",
      vacation: "إجازة",
      break: "استراحة",
      lunch: "غداء",
      dinner: "عشاء",
      breakfast: "فطار",
      snack: "وجبة خفيفة",
      meeting: "اجتماع",
      appointment: "موعد",
      event: "حدث",
      conference: "مؤتمر",
      workshop: "ورشة عمل",
      seminar: "ندوة",
      training: "تدريب",
      course: "دورة",
      lesson: "درس",
      class: "فصل",
      session: "جلسة",
      interview: "مقابلة",
      test: "اختبار",
      exam: "امتحان",
      quiz: "اختبار قصير",
      assignment: "مهمة",
      project: "مش��وع",
      task: "مهمة",
      job: "وظيفة",
      work: "عمل",
      career: "مهنة",
      profession: "مهنة",
      occupation: "وظيفة",
      position: "موقع",
      role: "دور",
      responsibility: "مسؤولية",
      duty: "واجب",
      obligation: "التزام",
      commitment: "التزام",
      promise: "وعد",
      agreement: "اتفاقية",
      contract: "عقد",
      deal: "صفقة",
      negotiation: "تفاوض",
      discussion: "مناقشة",
      conversation: "محادثة",
      chat: "دردشة",
      message: "رسالة",
      email: "بريد إلكتروني",
      phone: "هاتف",
      call: "مكالمة",
      video: "فيديو",
      audio: "صوت",
      text: "نص",
      image: "صورة",
      photo: "صورة",
      picture: "صورة",
      graphic: "رسم",
      chart: "مخطط",
      graph: "رسم بياني",
      table: "جدول",
      list: "قائمة",
      item: "عنصر",
      element: "عنصر",
      component: "مكون",
      part: "جزء",
      section: "ق��م",
      chapter: "فصل",
      page: "صفحة",
      document: "مستند",
      file: "��لف",
      folder: "مجلد",
      directory: "دليل",
      path: "مسار",
      url: "رابط",
      link: "رابط",
      website: "موقع ويب",
      web: "ويب",
      internet: "إنترنت",
      network: "شبكة",
      connection: "اتصال",
      server: "خادم",
      database: "قاعدة بيانات",
      data: "بيانات",
      information: "معلومات",
      knowledge: "معرفة",
      wisdom: "حكمة",
      experience: "خبرة",
      skill: "مهارة",
      talent: "موهبة",
      ability: "قدرة",
      capability: "قدرة",
      capacity: "سعة",
      potential: "إمكانية",
      opportunity: "فرصة",
      chance: "فرصة",
      possibility: "إمكانية",
      probability: "احتمال",
      risk: "مخاطرة",
      danger: "خطر",
      threat: "تهديد",
      challenge: "تحدي",
      problem: "مشكلة",
      issue: "قضية",
      concern: "قلق",
      worry: "قلق",
      fear: "خوف",
      anxiety: "قلق",
      stress: "ضغط",
      pressure: "ضغط",
      tension: "توتر",
      conflict: "صراع",
      dispute: "نزاع",
      argument: "جدا��",
      debate: "مناقشة",
      opinion: "رأي",
      view: "وجهة نظر",
      perspective: "منظور",
      point: "نقطة",
      idea: "فكرة",
      concept: "مفهوم",
      theory: "نظرية",
      hypothesis: "فرضية",
      assumption: "افتراض",
      belief: "اعتقاد",
      faith: "إيمان",
      trust: "ثقة",
      confidence: "ثقة",
      hope: "أمل",
      dream: "حلم",
      goal: "هدف",
      objective: "هدف",
      target: "هدف",
      aim: "هدف",
      purpose: "غرض",
      intention: "نية",
      plan: "خطة",
      strategy: "استراتيجية",
      tactic: "تكتيك",
      method: "طريقة",
      approach: "نهج",
      technique: "تقنية",
      procedure: "إجراء",
      process: "عملية",
      workflow: "سير العمل",
      system: "نظام",
      structure: "هيكل",
      framework: "إطار عمل",
      foundation: "أساس",
      base: "قاعدة",
      ground: "أرض",
      floor: "أرضية",
      ceiling: "سقف",
      roof: "سطح",
      wall: "جدار",
      door: "باب",
      window: "نافذة",
      room: "غرفة",
      space: "مساحة",
      area: "منطقة",
      zone: "منطقة",
      region: "منطقة",
      territory: "إقليم",
      country: "بلد",
      nation: "أمة",
      state: "دولة",
      province: "مقاطعة",
      city: "مدينة",
      town: "بلدة",
      village: "قرية",
      neighborhood: "حي",
      district: "منطقة",
      address: "عنوان",
      location: "موقع",
      place: "مكان",
      position: "موضع",
      spot: "بقعة",
      point: "نقطة",
      coordinate: "إحداثي",
      latitude: "خط العرض",
      longitude: "خط الطول",
      altitude: "ارتفاع",
      elevation: "ارتفاع",
      height: "ارتفاع",
      width: "عرض",
      length: "طول",
      depth: "عمق",
      size: "حجم",
      scale: "مقياس",
      level: "مستوى",
      grade: "درجة",
      rank: "رتبة",
      rating: "تقييم",
      score: "نتيجة",
      result: "نتيجة",
      outcome: "نتيجة",
      consequence: "نتيجة",
      effect: "تأثير",
      impact: "تأثير",
      influence: "تأثير",
      power: "قوة",
      strength: "قوة",
      force: "قوة",
      energy: "طاقة",
      effort: "جهد",
      attempt: "محاولة",
      try: "محاولة",
      test: "اختبار",
      trial: "تجربة",
      experiment: "تجربة",
      research: "بحث",
      study: "دراسة",
      analysis: "تحليل",
      review: "مراجعة",
      evaluation: "تقييم",
      assessment: "تقييم",
      judgment: "حكم",
      decision: "قرار",
      choice: "اختيار",
      option: "خيار",
      alternative: "بديل",
      solution: "حل",
      answer: "إجابة",
      response: "رد",
      reply: "رد",
      feedback: "تعليق",
      comment: "تعليق",
      note: "ملاحظة",
      remark: "ملاحظة",
      observation: "ملاحظة",
      notice: "إشعار",
      notification: "إشعار",
      alert: "تنبيه",
      reminder: "تذكير",
      warning: "تحذير",
      caution: "تحذير",
      attention: "انتباه",
      focus: "تركيز",
      concentration: "تركيز",
      dedication: "تفاني",
      commitment: "التزا��",
      loyalty: "ولاء",
      faithfulness: "إخلاص",
      honesty: "صدق",
      integrity: "نزاهة",
      truth: "حقيقة",
      fact: "حقيقة",
      reality: "واقع",
      existence: "وجود",
      being: "كائن",
      life: "حياة",
      living: "عيش",
      survival: "بقاء",
      death: "موت",
      birth: "ولادة",
      age: "عمر",
      youth: "شباب",
      adult: "بالغ",
      child: "طفل",
      baby: "طفل رضيع",
      infant: "رضيع",
      toddler: "طفل صغير",
      teenager: "مراهق",
      adolescent: "مراهق",
      senior: "كبير السن",
      elder: "كبير",
      elderly: "مسن",
      old: "كبير السن",
      young: "شاب",
      middle: "متوسط",
      junior: "صغير",
      senior: "كبير",
      beginner: "مبتدئ",
      novice: "مبتدئ",
      amateur: "هاو",
      professional: "محترف",
      expert: "خبير",
      specialist: "متخصص",
      master: "سيد",
      teacher: "معلم",
      instructor: "مدرب",
      trainer: "مدرب",
      educator: "مربي",
      mentor: "موجه",
      guide: "دليل",
      leader: "قائد",
      manager: "مدير",
      supervisor: "مشرف",
      director: "مدي��",
      executive: "تنفيذي",
      officer: "ضابط",
      official: "مسؤول",
      representative: "ممثل",
      delegate: "مندوب",
      ambassador: "سفير",
      agent: "وكيل",
      broker: "وسيط",
      dealer: "تاجر",
      seller: "بائع",
      buyer: "مشتري",
      customer: "عميل",
      client: "عميل",
      patron: "راعي",
      sponsor: "راعي",
      supporter: "مؤيد",
      fan: "مشجع",
      follower: "متابع",
      subscriber: "مشترك",
      member: "عضو",
      participant: "مشارك",
      contributor: "مساهم",
      volunteer: "متطوع",
      worker: "عامل",
      employee: "موظف",
      staff: "موظفون",
      team: "فريق",
      group: "مجموعة",
      organization: "منظمة",
      company: "شركة",
      business: "أعمال",
      enterprise: "مؤسسة",
      corporation: "شركة",
      firm: "شركة",
      agency: "وكالة",
      bureau: "مكتب",
      office: "مكتب",
      department: "قسم",
      division: "قسم",
      branch: "فرع",
      unit: "وحدة",
      section: "قسم",
      segment: "قطعة",
      part: "جزء",
      piece: "قطعة",
      portion: "جزء",
      share: "سهم",
      percentage: "نسبة مئوية",
      fraction: "كسر",
      ratio: "نسبة",
      proportion: "نسبة",
      rate: "معدل",
      speed: "سرعة",
      velocity: "سرعة",
      acceleration: "تسارع",
      momentum: "زخم",
      motion: "حركة",
      movement: "حركة",
      action: "عمل",
      activity: "نشاط",
      operation: "عملية",
      function: "وظيفة",
      performance: "أداء",
      execution: "تنفيذ",
      implementation: "تنفيذ",
      realization: "تحقيق",
      achievement: "إنجاز",
      accomplishment: "إنجاز",
      success: "نجاح",
      victory: "انتصار",
      win: "فوز",
      triumph: "انتصار",
      conquest: "فتح",
      defeat: "هزيمة",
      loss: "خسارة",
      failure: "فشل",
      mistake: "خطأ",
      error: "خطأ",
      fault: "خطأ",
      bug: "خطأ",
      glitch: "خلل",
      issue: "مشكلة",
      problem: "مشكلة",
      trouble: "مشكلة",
      difficulty: "صعوبة",
      challenge: "تحدي",
      obstacle: "عقبة",
      barrier: "حاجز",
      block: "حاجز",
      wall: "جدار",
      fence: "سياج",
      gate: "بوابة",
      entrance: "مدخل",
      exit: "مخرج",
      way: "طريق",
      path: "مسار",
      route: "طريق",
      road: "طريق",
      street: "شارع",
      avenue: "شارع",
      boulevard: "شارع",
      highway: "طريق سريع",
      freeway: "طريق سريع",
      expressway: "طريق سريع",
      motorway: "طريق سريع",
      bridge: "جسر",
      tunnel: "نفق",
      crossing: "عبور",
      intersection: "تقاطع",
      junction: "تقاطع",
      corner: "زاوية",
      turn: "منعطف",
      curve: "منحنى",
      bend: "منحنى",
      straight: "مستقيم",
      line: "خط",
      row: "صف",
      column: "عمود",
      stack: "كومة",
      pile: "كومة",
      heap: "كومة",
      collection: "مجموعة",
      set: "مجموعة",
      series: "سلسلة",
      sequence: "تسلسل",
      order: "ترتيب",
      arrangement: "ترتيب",
      organization: "تنظيم",
      structure: "هيكل",
      layout: "تخطيط",
      design: "تص��يم",
      pattern: "نمط",
      template: "قالب",
      format: "تنسيق",
      style: "أسلوب",
      appearance: "مظهر",
      look: "مظهر",
      view: "منظر",
      sight: "منظر",
      scene: "مشهد",
      picture: "صورة",
      image: "صورة",
      photo: "صورة",
      photograph: "صورة فوتوغرافية",
      snapshot: "لقطة",
      shot: "لقطة",
      capture: "التقاط",
      record: "سجل",
      log: "سجل",
      history: "تاريخ",
      past: "ماضي",
      present: "حاضر",
      future: "مستقبل",
      forecast: "توقع",
      prediction: "تنبؤ",
      projection: "إسقاط",
      estimate: "تقدير",
      calculation: "حساب",
      computation: "حساب",
      math: "رياضيات",
      mathematics: "رياضيات",
      number: "رقم",
      digit: "رقم",
      figure: "رقم",
      amount: "كمية",
      quantity: "كمية",
      volume: "حجم",
      capacity: "سعة",
      weight: "وزن",
      mass: "كتلة",
      density: "كث��فة",
      pressure: "ضغط",
      temperature: "درجة الحرارة",
      heat: "حرارة",
      cold: "برد",
      warm: "دافئ",
      cool: "بارد",
      hot: "حار",
      freezing: "متجمد",
      boiling: "غليان",
      melting: "ذوبان",
      solid: "صلب",
      liquid: "سائل",
      gas: "غاز",
      vapor: "بخار",
      steam: "بخار",
      smoke: "دخان",
      fire: "نار",
      flame: "لهب",
      spark: "شرارة",
      light: "ضوء",
      brightness: "سطوع",
      darkness: "ظلام",
      shadow: "ظل",
      shade: "ظل",
      color: "لون",
      hue: "لون",
      tint: "صبغة",
      tone: "نبرة",
      shade: "ظل",
      contrast: "تباين",
      difference: "اخت��اف",
      similarity: "تشابه",
      comparison: "مقارنة",
      relation: "علاقة",
      relationship: "علاقة",
      connection: "اتصال",
      link: "رابط",
      bond: "رابطة",
      tie: "رابطة",
      attachment: "ملحق",
      association: "جمعية",
      partnership: "شراكة",
      collaboration: "تعاون",
      cooperation: "تعاون",
      teamwork: "عمل جماعي",
      unity: "وحدة",
      union: "اتحاد",
      alliance: "تحالف",
      coalition: "ائتلاف",
      federation: "اتحاد",
      league: "دوري",
      club: "نادي",
      society: "مجتمع",
      community: "مجتمع",
      neighborhood: "حي",
      family: "عائلة",
      household: "أسرة",
      home: "الرئيسية",
      house: "منزل",
      building: "مبنى",
      structure: "هيكل",
      construction: "بناء",
      architecture: "هندسة معمارية",
      engineering: "هندسة",
      technology: "تكنولوجيا",
      science: "علم",
      research: "بحث",
      development: "تطوير",
      innovation: "ابتكار",
      invention: "اختراع",
      discovery: "اكتشاف",
      creation: "إبداع",
      production: "إنتاج",
      manufacturing: "تصنيع",
      industry: "صناعة",
      factory: "مصنع",
      plant: "مصنع",
      facility: "منشأة",
      equipment: "معدات",
      tool: "أداة",
      instrument: "أداة",
      device: "جهاز",
      machine: "آلة",
      engine: "محرك",
      motor: "محرك",
      generator: "مولد",
      pump: "مضخة",
      compressor: "ضاغط",
      fan: "مروحة",
      heater: "سخان",
      cooler: "مبرد",
      refrigerator: "ثلاجة",
      freezer: "مجمد",
      oven: "فرن",
      stove: "موقد",
      microwave: "ميكروو��ف",
      toaster: "محمصة",
      blender: "خلاط",
      mixer: "خلاط",
      processor: "معالج",
      computer: "حاسوب",
      laptop: "حاسوب محمول",
      desktop: "حاسوب مكتبي",
      tablet: "جهاز لوحي",
      smartphone: "هاتف ذكي",
      cellphone: "هاتف محمول",
      telephone: "هاتف",
      radio: "ناديو",
      television: "تلفزيون",
      monitor: "شاشة",
      screen: "شاشة",
      display: "عرض",
      keyboard: "لوحة مفاتيح",
      mouse: "فأرة",
      printer: "طابعة",
      scanner: "ماسح ضوئي",
      camera: "كاميرا",
      microphone: "ميكروفون",
      speaker: "مكبر صوت",
      headphones: "سماعات رأس",
      earphones: "سماعات أذن",
      cable: "كابل",
      wire: "سلك",
      cord: "سلك",
      plug: "قابس",
      socket: "مقبس",
      outlet: "مخرج",
      switch: "مفتاح",
      button: "زر",
      knob: "مقبض",
      handle: "مقبض",
      lever: "رافعة",
      pedal: "دواسة",
      wheel: "عجلة",
      tire: "إطار",
      gear: "ترس",
      belt: "حزام",
      chain: "سلسلة",
      rope: "حبل",
      string: "خيط",
      thread: "خيط",
      fabric: "قماش",
      cloth: "قماش",
      material: "مادة",
      substance: "مادة",
      element: "عنصر",
      component: "مكون",
      ingredient: "مكون",
      recipe: "وصفة",
      formula: "صيغة",
      equation: "معادلة",
      solution: "محلول",
      mixture: "خليط",
      combination: "مزيج",
      blend: "مزج",
      fusion: "دمج",
      integration: "تكامل",
      synthesis: "تركيب",
      analysis: "تحليل",
      breakdown: "تفكيك",
      separation: "فصل",
      division: "قسمة",
      multiplication: "ضرب",
      addition: "جمع",
      subtraction: "طرح",
      percentage: "نسبة مئوية",
      decimal: "عشري",
      fraction: "كسر",
      integer: "عدد صحيح",
      whole: "كامل",
      half: "نصف",
      quarter: "ربع",
      third: "ثلث",
      double: "مضاعف",
      triple: "ثلاثي",
      quadruple: "رباعي",
      multiple: "متعدد",
      single: "واحد",
      pair: "زوج",
      couple: "زوجين",
      dozen: "دزينة",
      hundred: "مائة",
      thousand: "ألف",
      million: "مليون",
      billion: "مليار",
      trillion: "تريليون",
      infinity: "ما لا نهاية",
      zero: "صفر",
      one: "واحد",
      two: "اثنان",
      three: "ثلاثة",
      four: "أربعة",
      five: "خمسة",
      six: "ستة",
      seven: "سبعة",
      eight: "ثمانية",
      nine: "تسعة",
      ten: "عشرة",

      // Months
      january: "يناير",
      february: "فبراير",
      march: "مارس",
      april: "أبريل",
      may: "مايو",
      june: "يونيو",
      july: "يوليو",
      august: "أغسطس",
      september: "سبتمبر",
      october: "أكتوبر",
      november: "نوفمبر",
      december: "ديسمبر",

      // Days of week
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
      sunday: "الأحد",

      // Dashboard specific
      myProfile: "ملفي الشخصي",
      media: "الوسائط",
      statistics: "الإحصائيات",
      messages: "الرسائل",
      achievements: "الإنجازات",
      contracts: "العقود",
      negotiations: "المفاوضات",
      appointments: "المواعيد",
      schedule: "الجدول",
      calendar: "التقويم",
      notification: "الإشعارات",
      alerts: "التنبيهات",
      inbox: "صندوق الوارد",
      outbox: "��ندوق الصادر",
      drafts: "المسودات",
      sent: "المرسل",
      trash: "المحذوفات",
      archive: "الأرشيف",
      bookmark: "المفضلة",
      favorites: "المفضلة",
      recent: "الحديثة",
      history: "التاريخ",
      analytics: "التحليلات",
      reports: "التقارير",
      charts: "المخططات",
      graphs: "الرسوم البيانية",
      tables: "الجداول",
      forms: "النماذج",
      surveys: "الاستطلاعات",
      polls: "الاستفتاءات",
      votes: "الأصوات",
      ratings: "التقييمات",
      reviews: "المراجعات",
      comments: "التعليقات",
      feedback: "التعليقات",
      suggestions: "الاقتراحات",
      recommendations: "التوصيات",
      tips: "النصائح",
      hints: "الإرشادات",
      guides: "الأدلة",
      tutorials: "الدروس التعليمية",
      manuals: "الكتيبات",
      documentation: "الوثائق",
      references: "المراجع",
      resources: "الموارد",
      tools: "الأدوات",
      utilities: "المرافق",
      plugins: "الإضافات",
      extensions: "الامتدادات",
      addons: "الملحقات",
      modules: "الوحدات",
      components: "المكونات",
      widgets: "الأدوات المصغرة",
      gadgets: "الأجهزة",
      applications: "التطبيقات",
      programs: "البرامج",
      software: "البرمجيات",
      hardware: "الأجهزة",
      firmware: "البرامج الثابتة",
      operating: "التشغيل",
      system: "النظام",
      platform: "المنصة",
      framework: "إطار العمل",
      library: "المكتبة",
      database: "قاعدة البيانات",
      server: "الخادم",
      client: "العميل",
      browser: "المتصفح",
      website: "الموقع الإلكتروني",
      webpage: "صفحة الويب",
      portal: "البوابة",
      gateway: "المدخل",
      interface: "الواجهة",
      dashboard: "لوحة التحكم",
      panel: "اللوحة",
      toolbar: "شريط الأدوات",
      menubar: "شريط القوائم",
      statusbar: "شريط ال��الة",
      sidebar: "الشريط الجانبي",
      navbar: "شريط التنقل",
      breadcrumb: "مسار التنق��",
      pagination: "ترقيم الصفحات",
      tabs: "التبويبات",
      accordion: "الأكورديون",
      dropdown: "القائمة المنسدلة",
      popup: "النافذة المنبثقة",
      modal: "النافذة المشروطة",
      dialog: "مربع الحوار",
      tooltip: "تلميح الأداة",
      badge: "الشارة",
      label: "التسمية",
      tag: "العلامة",
      category: "الفئة",
      group: "المجموعة",
      section: "القسم",
      chapter: "الفصل",
      article: "المقال",
      post: "المنشور",
      entry: "الدخول",
      record: "السجل",
      row: "الصف",
      column: "العمو��",
      cell: "الخلية",
      field: "الحقل",
      value: "القيمة",
      property: "الخاصية",
      attribute: "السمة",
      parameter: "المعامل",
      argument: "الوسيطة",
      variable: "المتغير",
      constant: "الثابت",
      function: "الدالة",
      method: "الطريقة",
      procedure: "الإجراء",
      routine: "الروتين",
      algorithm: "الخوارزمية",
      logic: "المنطق",
      condition: "الشرط",
      rule: "القاعدة",
      policy: "السياسة",
      regulation: "اللائحة",
      law: "القانون",
      standard: "المعيار",
      specification: "المواصفة",
      requirement: "المتطلب",
      criteria: "المعايير",
      guideline: "الدليل الإرشادي",
      protocol: "البروتوكول",
      procedure: "الإجراء",
      workflow: "سير العمل",
      process: "العملية",
      step: "الخطوة",
      stage: "المرحلة",
      phase: "المرحلة",
      cycle: "الدورة",
      loop: "الحلقة",
      iteration: "التكرار",
      repetition: "التكرار",
      sequence: "التس��سل",
      order: "الترتيب",
      arrangement: "الترتيب",
      organization: "التنظيم",
      structure: "الهيكل",
      hierarchy: "التسلسل الهرمي",
      tree: "الشجرة",
      branch: "الفرع",
      leaf: "الورقة",
      root: "الجذر",
      node: "العقدة",
      edge: "الحافة",
      connection: "��لاتصال",
      relationship: "العلاقة",
      association: "الجمعية",
      dependency: "التبعية",
      inheritance: "الوراثة",
      composition: "التركيب",
      aggregation: "التجميع",
      encapsulation: "التغليف",
      abstraction: "التجريد",
      polymorphism: "تعدد الأشكال",
      interface: "الواجهة",
      implementation: "التنفيذ",
      execution: "التنفيذ",
      runtime: "وقت التشغيل",
      compile: "الترجمة",
      build: "البناء",
      deploy: "النشر",
      release: "الإصدار",
      version: "الإصدار",
      update: "التحديث",
      upgrade: "الترقية",
      patch: "التصحيح",
      fix: "الإصلاح",
      bug: "الخطأ",
      issue: "المشكلة",
      ticket: "التذكرة",
      request: "الطلب",
      feature: "الميزة",
      enhancement: "التحسين",
      improvement: "التحسين",
      optimization: "التحسين",
      performance: "الأداء",
      speed: "السرعة",
      efficiency: "الكفاءة",
      productivity: "الإنتاجية",
      quality: "الجودة",
      reliability: "الموثوقية",
      stability: "الاستقرار",
      security: "الأمان",
      safety: "السلامة",
      protection: "الحماية",
      prevention: "الوقاية",
      maintenance: "الصيانة",
      support: "الدعم",
      service: "الخدمة",
      assistance: "المساعدة",
      help: "المساعدة",
      guidance: "التوجيه",
      instruction: "التعليمات",
      direction: "الاتجاه",
      navigation: "التنقل",
      route: "المسار",
      path: "المسار",
      journey: "الرحلة",
      trip: "الرحلة",
      travel: "السفر",
      destination: "الوجهة",
      arrival: "الوصول",
      departure: "المغادرة",
      start: "البداية",
      beginning: "البداية",
      end: "النها��ة",
      finish: "الانتهاء",
      complete: "مكتمل",
      done: "انتهى",
      ready: "جاهز",
      prepared: "محضر",
      available: "متاح",
      accessible: "قابل للوصول",
      reachable: "قابل للوصول",
      obtainable: "قابل للحصول عليه",
      achievable: "قابل للتحقيق",
      possible: "مم��ن",
      feasible: "قابل للتنفيذ",
      viable: "قابل للحياة",
      practical: "عملي",
      realistic: "واقعي",
      reasonable: "معقول",
      logical: "منطقي",
      rational: "عقلاني",
      sensible: "حكيم",
      wise: "حكيم",
      smart: "ذكي",
      intelligent: "ذكي",
      clever: "ماهر",
      skillful: "ماهر",
      talented: "موهوب",
      gifted: "موهوب",
      capable: "قادر",
      competent: "مختص",
      qualified: "مؤهل",
      experienced: "ذو خبرة",
      knowledgeable: "على دراية",
      informed: "مطلع",
      aware: "واعي",
      conscious: "واعي",
      alert: "متيقظ",
      attentive: "منتبه",
      focused: "مركز",
      concentrated: "مركز",
      dedicated: "مخصص",
      committed: "ملتزم",
      devoted: "مخلص",
      loyal: "مخلص",
      faithful: "مؤمن",
      trustworthy: "جدير بالثقة",
      reliable: "موثوق",
      dependable: "يمكن الاعتماد عليه",
      consistent: "ثابت",
      stable: "مستقر",
      steady: "ثابت",
      constant: "ثابت",
      permanent: "دائ��",
      temporary: "مؤقت",
      brief: "مختصر",
      short: "قصير",
      long: "طويل",
      tall: "طويل",
      high: "عالي",
      low: "منخفض",
      deep: "عميق",
      shallow: "ضحل",
      wide: "عريض",
      narrow: "ضيق",
      broad: "واسع",
      thin: "رفيع",
      thick: "سميك",
      fat: "سمين",
      slim: "نحيف",
      lean: "نحيف",
      heavy: "ثقيل",
      light: "خفيف",
      strong: "قوي",
      weak: "ضعيف",
      powerful: "قوي",
      mighty: "جبار",
      tough: "قاسي",
      hard: "صعب",
      soft: "ناعم",
      smooth: "أملس",
      rough: "خشن",
      sharp: "حاد",
      dull: "كليل",
      bright: "مشرق",
      dark: "مظلم",
      clear: "واضح",
      cloudy: "غائم",
      transparent: "شفاف",
      opaque: "غير شفاف",
      visible: "مرئي",
      invisible: "غير مرئي",
      obvious: "واضح",
      hidden: "مخفي",
      secret: "سري",
      confidential: "سري",
      classified: "مصنف",
      restricted: "مقيد",
      limited: "محدود",
      unlimited: "غير م��دود",
      infinite: "لا محدود",
      finite: "محدود",
      bounded: "محاط",
      unbounded: "غير محاط",
      open: "مفتوح",
      closed: "مغلق",
      locked: "مقفل",
      unlocked: "غير مقفل",
      secured: "آمن",
      unsecured: "غير آمن",
      safe: "آم��",
      unsafe: "غير آمن",
      dangerous: "خطير",
      risky: "محفوف بالمخاطر",
      harmful: "ضار",
      beneficial: "مفيد",
      useful: "مفيد",
      useless: "عديم الفائدة",
      valuable: "قيم",
      worthless: "عديم القيمة",
      important: "مهم",
      unimportant: "غير مهم",
      significant: "مهم",
      insignificant: "غير مهم",
      major: "رئيسي",
      minor: "ثانوي",
      primary: "أساسي",
      secondary: "ثانوي",
      main: "رئيسي",
      auxiliary: "مساعد",
      essential: "أساسي",
      optional: "اختياري",
      necessary: "ضروري",
      unnecessary: "غير ضروري",
      required: "مطلوب",
      mandatory: "إجباري",
      compulsory: "إجباري",
      voluntary: "طوعي",
      automatic: "تلقائي",
      manual: "يدوي",
      digital: "رقمي",
      analog: "تناظري",
      electronic: "إلكتروني",
      mechanical: "م��كانيكي",
      electrical: "كهربائي",
      magnetic: "مغناطيسي",
      optical: "بصري",
      acoustic: "صوتي",
      thermal: "حراري",
      chemical: "كيميائي",
      biological: "بيولوجي",
      physical: "جسدي",
      mental: "عقلي",
      emotional: "عاطفي",
      spiritual: "روحي",
      social: "اجتماعي",
      cultural: "ثقافي",
      political: "سياسي",
      economic: "اقتصادي",
      financial: "مالي",
      commercial: "تجاري",
      industrial: "صناعي",
      agricultural: "زراعي",
      educational: "تعليمي",
      medical: "طبي",
      legal: "قانوني",
      military: "عسكري",
      civilian: "مدني",
      government: "حكومي",
      private: "خاص",
      public: "عام",
      personal: "شخصي",
      individual: "فردي",
      collective: "جماعي",
      group: "مجموعة",
      team: "فريق",
      organization: "منظمة",
      institution: "مؤسسة",
      establishment: "منشأة",
      foundation: "مؤسسة",
      corporation: "شركة",
      company: "شركة",
      business: "عمل",
      enterprise: "مؤسسة",
      venture: "مشروع",
      startup: "شركة ناشئة",
      initiative: "مبادرة",
      project: "مشروع",
      program: "برنامج",
      scheme: "مخطط",
      plan: "خطة",
      strategy: "استراتيجية",
      tactic: "تكتيك",
      approach: "نهج",
      method: "طريقة",
      technique: "تقنية",
      procedure: "إجراء",
      process: "عملية",
      operation: "عملية",
      action: "عمل",
      activity: "نشاط",
      function: "وظيفة",
      role: "دور",
      purpose: "غرض",
      objective: "هدف",
      goal: "هدف",
      target: "هدف",
      aim: "هدف",
      intention: "نية",
      motive: "دافع",
      reason: "سبب",
      cause: "سبب",
      origin: "أصل",
      source: "مصدر",
      foundation: "أساس",
      basis: "أساس",
      ground: "أرضية",
      background: "خلفية",
      context: "سياق",
      environment: "بيئة",
      setting: "إعداد",
      situation: "وضع",
      condition: "حالة",
      state: "حالة",
      status: "حالة",
      position: "موضع",
      location: "موقع",
      place: "مكان",
      area: "منطقة",
      region: "منطقة",
      zone: "منطقة",
      territory: "إقليم",
      domain: "مجال",
      field: "حقل",
      sphere: "مجال",
      scope: "نطاق",
      range: "مدى",
      extent: "مدى",
      limit: "حد",
      boundary: "حدود",
      border: "حدود",
      edge: "حافة",
      margin: "هامش",
      frame: "إطار",
      outline: "مخطط",
      shape: "شكل",
      form: "شكل",
      structure: "هيكل",
      format: "تنسيق",
      layout: "تخطيط",
      design: "تصميم",
      pattern: "نمط",
      model: "نموذج",
      template: "قالب",
      sample: "عينة",
      example: "مثال",
      instance: "مثيل",
      case: "حالة",
      scenario: "سيناريو",
      situation: "وضع",
      circumstance: "ظرف",
      event: "حدث",
      occurrence: "حدوث",
      incident: "حادث",
      accident: "حادث",
      emergency: "طوارئ",
      crisis: "أزمة",
      disaster: "كارثة",
      catastrophe: "كارثة",
      tragedy: "مأساة",
      comedy: "كوميديا",
      drama: "دراما",
      story: "قصة",
      tale: "حكاية",
      narrative: "سرد",
      account: "حساب",
      report: "تقرير",
      description: "وصف",
      explanation: "شرح",
      interpretation: "تفسير",
      translation: "ترجمة",
      conversion: "تحويل",
      transformation: "تحويل",
      change: "تغيير",
      modification: "تعديل",
      alteration: "تغيير",
      adjustment: "تعديل",
      adaptation: "تكيف",
      evolution: "تطور",
      development: "تطوير",
      growth: "نمو",
      expansion: "توسع",
      extension: "امتداد",
      enlargement: "توسيع",
      increase: "زيادة",
      decrease: "نقصا��",
      reduction: "تقليل",
      decline: "انحدار",
      fall: "سقوط",
      drop: "انخفاض",
      rise: "ارتفاع",
      climb: "تسلق",
      ascent: "صعود",
      descent: "نزول",
      movement: "حركة",
      motion: "حركة",
      flow: "تدفق",
      stream: "تيار",
      current: "تيار",
      wave: "موجة",
      cycle: "دورة",
      rhythm: "إيقاع",
      beat: "ضربة",
      pulse: "نبضة",
      vibration: "اهتزاز",
      oscillation: "تذبذب",
      frequency: "تردد",
      wavelength: "طول الموجة",
      amplitude: "سعة",
      intensity: "شدة",
      magnitude: "حجم",
      scale: "مقياس",
      dimension: "بعد",
      measurement: "قياس",
      unit: "وحدة",
      metric: "متري",
      standard: "معيار",
      norm: "معيار",
      average: "متوسط",
      mean: "متوسط",
      median: "وسيط",
      mode: "نمط",
      minimum: "الحد الأدنى",
      maximum: "الحد الأقصى",
      optimum: "الأمثل",
      ideal: "مثالي",
      perfect: "مثالي",
      excellent: "ممتاز",
      outstanding: "متميز",
      exceptional: "استثنائي",
      extraordinary: "غير عادي",
      remarkable: "ملحوظ",
      notable: "جدير بالملاحظة",
      significant: "مهم",
      important: "مهم",
      crucial: "بالغ الأهمية",
      critical: "حرج",
      vital: "حيوي",
      essential: "أساسي",
      fundamental: "أساسي",
      basic: "أساسي",
      elementary: "ابتدائي",
      simple: "بسيط",
      complex: "معقد",
      complicated: "معقد",
      difficult: "صعب",
      hard: "صعب",
      tough: "قاسي",
      challenging: "تحدي",
      demanding: "مطالب",
      rigorous: "صارم",
      strict: "صارم",
      severe: "شديد",
      harsh: "قاسي",
      rough: "خشن",
      gentle: "لطيف",
      mild: "خفيف",
      soft: "ناعم",
      smooth: "أملس",
      easy: "��هل",
      simple: "بسيط",
      straightforward: "مباشر",
      direct: "مباشر",
      immediate: "فوري",
      instant: "فوري",
      quick: "سريع",
      fast: "سريع",
      rapid: "سريع",
      swift: "سريع",
      speedy: "سريع",
      slow: "بطيء",
      gradual: "تدريجي",
      steady: "ثابت",
      stable: "مستقر",
      consistent: "ثابت",
      reliable: "موثوق",
      dependable: "يمكن الاعتماد عليه",
      trustworthy: "جدير بالثقة",
      honest: "صادق",
      truthful: "صادق",
      genuine: "حقيقي",
      authentic: "أصيل",
      real: "حقيقي",
      actual: "ف��لي",
      true: "صحيح",
      correct: "صحيح",
      right: "صحيح",
      accurate: "دقيق",
      precise: "دقيق",
      exact: "دقيق",
      specific: "محدد",
      particular: "خاص",
      special: "خاص",
      unique: "فريد",
      distinctive: "مميز",
      characteristic: "مميز",
      typical: "نموذجي",
      normal: "عادي",
      ordinary: "عادي",
      common: "شائع",
      usual: "عادي",
      regular: "منتظم",
      standard: "معياري",
      conventional: "تقليدي",
      traditional: "تقليدي",
      classical: "كلاسيكي",
      modern: "حديث",
      contemporary: "معاصر",
      current: "حالي",
      present: "حاضر",
      existing: "موجود",
      available: "متاح",
      accessible: "قابل للوصول",
      obtainable: "قابل للحصول عليه",
      achievable: "قابل للتحقيق",
      possible: "ممكن",
      probable: "محتمل",
      likely: "محتمل",
      unlikely: "غير محتمل",
      impossible: "مستحيل",
      certain: "مؤكد",
      sure: "متأكد",
      definite: "محدد",
      absolute: "مطلق",
      complete: "كامل",
      total: "إجمالي",
      entire: "كامل",
      whole: "كامل",
      full: "ممتلئ",
      empty: "فارغ",
      vacant: "شاغر",
      occupied: "مشغول",
      busy: "مشغول",
      free: "حر",
      available: "متاح",
      unavailable: "غير متاح",
      present: "حاضر",
      absent: "غائب",
      missing: "مفقود",
      lost: "ضائع",
      found: "موجود",
      discovered: "مكتشف",
      detected: "مكتشف",
      identified: "محدد",
      recognized: "معترف به",
      acknowledged: "مقر به",
      accepted: "مقبول",
      approved: "موافق عليه",
      confirmed: "مؤكد",
      verified: "موثق",
      validated: "صالح",
      certified: "معتمد",
      authorized: "مخول",
      permitted: "مسموح",
      allowed: "مسموح",
      prohibited: "محظور",
      forbidden: "ممنوع",
      banned: "محظور",
      restricted: "مقيد",
      limited: "محدود",
      controlled: "مراقب",
      regulated: "منظم",
      managed: "مدار",
      administered: "مدار",
      supervised: "مشرف عليه",
      monitored: "مراقب",
      observed: "ملاحظ",
      watched: "مراقب",
      tracked: "متتبع",
      followed: "متابع",
      pursued: "مطارد",
      chased: "مطارد",
      hunted: "مطارد",
      searched: "مبحوث عنه",
      sought: "مطلوب",
      wanted: "مطلوب",
      needed: "مطلوب",
      required: "مطلوب",
      desired: "مرغوب",
      preferred: "مفضل",
      chosen: "مختار",
      selected: "مختار",
      picked: "مختار",
      elected: "منتخب",
      appointed: "معين",
      assigned: "مخصص",
      allocated: "مخصص",
      distributed: "موزع",
      shared: "مشترك",
      divided: "مقسم",
      separated: "منفصل",
      isolated: "معزول",
      independent: "مستقل",
      autonomous: "مستقل",
      self: "ذات",
      automatic: "تلقائي",
      manual: "يدوي",
      human: "بشري",
      artificial: "اصطناعي",
      natural: "طبيعي",
      synthetic: "تركيبي",
      organic: "عضوي",
      inorganic: "غير عضوي",
      living: "حي",
      dead: "ميت",
      alive: "حي",
      animated: "متحرك",
      static: "ثابت",
      dynamic: "ديناميكي",
      active: "نشط",
      passive: "سلبي",
      reactive: "تفاعلي",
      interactive: "تفاعلي",
      responsive: "متج��وب",
      sensitive: "حساس",
      insensitive: "غير حساس",
      aware: "واعي",
      unaware: "غير واعي",
      conscious: "واعي",
      unconscious: "غير واعي",
      awake: "مستيقظ",
      asleep: "نائم",
      alert: "متيقظ",
      drowsy: "نعسان",
      tired: "متعب",
      exhausted: "منهك",
      energetic: "نشيط",
      vigorous: "قوي",
      lively: "حيوي",
      animated: "متحمس",
      enthusiastic: "متحمس",
      excited: "متحمس",
      thrilled: "متحمس",
      delighted: "مسرور",
      pleased: "مسرور",
      satisfied: "راضي",
      content: "راضي",
      happy: "سعيد",
      joyful: "فرح",
      cheerful: "مرح",
      glad: "مسرور",
      elated: "منتش",
      euphoric: "منتش",
      ecstatic: "منتش",
      blissful: "سعيد",
      peaceful: "مسالم",
      calm: "هادئ",
      quiet: "هادئ",
      silent: "صامت",
      still: "ساكن",
      motionless: "بلا حراك",
      stationary: "ثابت",
      fixed: "ثابت",
      stable: "مستقر",
      steady: "ثابت",
      constant: "ثابت",
      continuous: "مستمر",
      ongoing: "جاري",
      persistent: "مستمر",
      lasting: "دائم",
      enduring: "دائم",
      permanent: "دائم",
      eternal: "أبدي",
      infinite: "لانهائي",
      endless: "لا نهاية له",
      limitless: "بلا حدود",
      boundless: "بلا حدود",
      unlimited: "غير محدود",
      unrestricted: "غير مقيد",
      unconstrained: "غير مقيد",
      free: "حر",
      liberated: "محرر",
      released: "مُحرر",
      discharged: "مُفرج عنه",
      dismissed: "مُقال",
      fired: "مطرود",
      hired: "مُوظف",
      employed: "موظف",
      unemployed: "عاطل",
      jobless: "بلا عمل",
      working: "يعمل",
      retired: "متقاعد",
      student: "طالب",
      teacher: "معلم",
      professor: "أستاذ",
      doctor: "طبيب",
      nurse: "ممرض",
      engineer: "مهندس",
      architect: "معمار",
      lawyer: "محامي",
      judge: "��اضي",
      policeman: "شرطي",
      soldier: "جندي",
      pilot: "طيار",
      driver: "سائق",
      mechanic: "ميكانيكي",
      electrician: "كهربا��ي",
      plumber: "سباك",
      carpenter: "نجار",
      painter: "رسام",
      musician: "موسيقي",
      artist: "فنان",
      writer: "كاتب",
      journalist: "صحفي",
      photographer: "مصور",
      chef: "طباخ",
      waiter: "نادل",
      cashier: "أمين صندوق",
      salesperson: "بائع",
      manager: "مدير",
      supervisor: "مشرف",
      executive: "تنفيذي",
      director: "مدير",
      president: "رئيس",
      secretary: "سكرتير",
      assistant: "مساعد",
      clerk: "كاتب",
      accountant: "محاسب",
      banker: "مصرفي",
      economist: "اقتصادي",
      analyst: "محلل",
      consultant: "استشاري",
      advisor: "مستشار",
      counselor: "مستشار",
      therapist: "معالج",
      psychologist: "عالم نفس",
      psychiatrist: "طبيب نفسي",
      scientist: "عالم",
      researcher: "باحث",
      inventor: "مخترع",
      designer: "مصمم",
      developer: "مطور",
      programmer: "مبرمج",
      technician: "فني",
      operator: "مشغل",
      administrator: "مدير",
      coordinator: "منسق",
      organizer: "منظم",
      planner: "مخطط",
      strategist: "استراتيجي",
      specialist: "متخصص",
      expert: "خبير",
      professional: "محترف",
      amateur: "هاو",
      beginner: "مبتدئ",
      novice: "مبتدئ",
      apprentice: "متدرب",
      trainee: "متد��ب",
      intern: "متدرب",
      volunteer: "متطوع",
      participant: "مشارك",
      contributor: "مساهم",
      supporter: "مؤيد",
      sponsor: "راعي",
      donor: "مانح",
      investor: "مستثمر",
      partner: "شريك",
      collaborator: "متعاون",
      colleague: "زميل",
      teammate: "زميل فريق",
      competitor: "منافس",
      rival: "منافس",
      opponent: "خصم",
      enemy: "عدو",
      friend: "صديق",
      ally: "حليف",
      acquaintance: "معرفة",
      stranger: "غريب",
      neighbor: "جار",
      relative: "قريب",
      family: "عائلة",
      parent: "والد",
      child: "طفل",
      sibling: "شقيق",
      spouse: "زوج",
      partner: "شريك",
      boyfriend: "صديق",
      girlfriend: "صديقة",
      husband: "زوج",
      wife: "زوجة",
      son: "ابن",
      daughter: "ابنة",
      brother: "أخ",
      sister: "أخت",
      father: "أب",
      mother: "أم",
      grandfather: "جد",
      grandmother: "جدة",
      uncle: "عم",
      aunt: "عمة",
      cousin: "ابن عم",
      nephew: "ابن أخ",
      niece: "ابنة أخ",
      guest: "ضيف",
      host: "مضيف",
      visitor: "زائر",
      tourist: "سائح",
      traveler: "مسافر",
      passenger: "راكب",
      pedestrian: "مشاة",
      citizen: "مواطن",
      resident: "مقيم",
      inhabitant: "ساكن",
      native: "أصلي",
      foreigner: "أجنبي",
      immigrant: "مهاجر",
      refugee: "لاجئ",
      exile: "منفي",
      nomad: "بدوي",
      wanderer: "متجول",
      explorer: "مستكشف",
      adventurer: "مغامر",
      pioneer: "رائد",
      leader: "قائد",
      follower: "تابع",
      guide: "دليل",
      mentor: "موجه",
      coach: "مد��ب",
      trainer: "مدرب",
      instructor: "مدرب",
      teacher: "معلم",
      educator: "مربي",
      tutor: "مدرس خصوصي",
      professor: "أستاذ",
      lecturer: "محاضر",
      speaker: "متحدث",
      presenter: "مقدم",
      performer: "فنان",
      entertainer: "مؤدي",
      comedian: "كوميدي",
      actor: "ممثل",
      actress: "ممثلة",
      dancer: "راقص",
      singer: "مغني",
      musician: "موسيقي",
      composer: "مؤلف موسيقي",
      conductor: "قائد أوركسترا",
      director: "مخرج",
      producer: "منتج",
      editor: "محرر",
      publisher: "ناشر",
      author: "مؤلف",
      writer: "كاتب",
      poet: "شاعر",
      novelist: "روائي",
      journalist: "صحفي",
      reporter: "مراسل",
      correspondent: "مراسل",
      commentator: "معلق",
      announcer: "مذيع",
      broadcaster: "مذيع",
      host: "مقدم برامج",
      interviewer: "محاور",
      moderator: "مُيَسِّر",
      facilitator: "مُيَسِّر",
      mediator: "وسيط",
      negotiator: "مفاوض",
      diplomat: "دبلوماسي",
      ambassador: "سفير",
      representative: "ممثل",
      delegate: "مندوب",
      envoy: "مبعوث",
      messenger: "رسول",
      courier: "ساع��",
      deliverer: "موصل",
      supplier: "مورد",
      provider: "مزود",
      vendor: "بائع",
      merchant: "تاجر",
      trader: "تاجر",
      dealer: "تاجر",
      broker: "وسيط",
      agent: "وكيل",
      representative: "ممثل",
      salesperson: "بائع",
      customer: "عميل",
      client: "عميل",
      buyer: "مشتري",
      purchaser: "مشتري",
      consumer: "مستهلك",
      user: "مستخدم",
      patron: "راع��",
      subscriber: "مشترك",
      member: "عضو",
      participant: "مشارك",
      attendee: "حاضر",
      observer: "مراقب",
      witness: "شاهد",
      spectator: "متفرج",
      audience: "جمهور",
      crowd: "حشد",
      mob: "غوغاء",
      group: "مجموعة",
      team: "فريق",
      crew: "طاقم",
      staff: "موظفون",
      personnel: "الموظفون",
      workforce: "القوى العاملة",
      labor: "عمال",
      union: "نقابة",
      association: "جمعية",
      society: "مجتمع",
      organization: "منظمة",
      institution: "مؤسسة",
      establishment: "منشأة",
      foundation: "مؤسسة",
      corporation: "شركة",
      company: "شركة",
      firm: "شركة",
      business: "عمل",
      enterprise: "مؤسسة",
      venture: "مشروع",
      startup: "شركة ناشئة",
      industry: "صناعة",
      sector: "قطاع",
      market: "سوق",
      economy: "اقتصاد",
      finance: "مالية",
      banking: "مصرفية",
      investment: "استثمار",
      trading: "تجارة",
      commerce: "تجارة",
      retail: "تج��رة التجزئة",
      wholesale: "تجارة الجملة",
      manufacturing: "تصنيع",
      production: "إنتاج",
      construction: "بناء",
      engineering: "هندسة",
      technology: "تكنولوجيا",
      innovation: "ابتكار",
      research: "بحث",
      development: "تطوير",
      science: "علم",
      education: "تعليم",
      healthcare: "رعاية صحية",
      medicine: "طب",
      law: "قانون",
      government: "حكومة",
      politics: "سياسة",
      military: "عسكرية",
      defense: "دفاع",
      security: "أمن",
      police: "شرطة",
      justice: "عدالة",
      court: "محكمة",
      trial: "م��اكمة",
      case: "قضية",
      lawsuit: "دعوى قضائية",
      crime: "جريمة",
      punishment: "عقاب",
      penalty: "غرامة",
      fine: "غرامة",
      sentence: "حكم",
      verdict: "حكم",
      judgment: "حكم",
      decision: "قرار",
      ruling: "حكم",
      order: "��مر",
      command: "أمر",
      instruction: "تعليمات",
      direction: "اتجاه",
      guidance: "توجيه",
      advice: "نصيحة",
      suggestion: "اقتراح",
      recommendation: "توصية",
      proposal: "اقتراح",
      offer: "عرض",
      deal: "صفقة",
      contract: "عقد",
      agreement: "اتفاقية",
      treaty: "معاهدة",
      pact: "اتفاق",
      alliance: "تحالف",
      partnership: "شراكة",
      collaboration: "تعاون",
      cooperation: "تعاون",
      competition: "منافسة",
      contest: "مسابقة",
      tournament: "بطولة",
      championship: "بطولة",
      league: "دوري",
      match: "مباراة",
      game: "لعبة",
      sport: "رياضة",
      exercise: "تمرين",
      workout: "تمرين",
      training: "تدريب",
      practice: "ممارسة",
      drill: "تدريب",
      session: "جلسة",
      lesson: "درس",
      class: "فصل",
      course: "دورة",
      program: "برنامج",
      curriculum: "منهج",
      syllabus: "منهج",
      schedule: "جدول",
      timetable: "جدول زمني",
      calendar: "تقوي��",
      agenda: "جدول أعمال",
      plan: "خطة",
      strategy: "استراتيجية",
      tactic: "تكتيك",
      approach: "نهج",
      method: "طريقة",
      technique: "تقنية",
      procedure: "إجراء",
      process: "عملية",
      system: "نظام",
      structure: "هيكل",
      framework: "إطار عمل",
      model: "نموذج",
      template: "قالب",
      pattern: "نمط",
      design: "تصميم",
      layout: "تخطيط",
      format: "تنسيق",
      style: "أسلوب",
      theme: "موضوع",
      topic: "موضوع",
      subject: "موضوع",
      matter: "مسألة",
      issue: "قضية",
      problem: "مشكلة",
      challenge: "تحدي",
      difficulty: "صعوبة",
      obstacle: "عقبة",
      barrier: "حاجز",
      hurdle: "عقبة",
      impediment: "عائق",
      hindrance: "عائق",
      blockage: "انسداد",
      restriction: "قيد",
      limitation: "حد",
      constraint: "قيد",
      boundary: "حد",
      limit: "حد",
      edge: "حافة",
      border: "حدود",
      frontier: "حدود",
      threshold: "عتبة",
      point: "نقطة",
      line: "خط",
      curve: "منحنى",
      circle: "دائرة",
      square: "مربع",
      rectangle: "مستطيل",
      triangle: "مث��ث",
      polygon: "مضلع",
      shape: "شكل",
      form: "شكل",
      figure: "شكل",
      image: "صورة",
      picture: "صورة",
      photo: "صورة",
      illustration: "رسم توضيحي",
      diagram: "رسم تخطيطي",
      chart: "مخطط",
      graph: "رسم بياني",
      table: "جدول",
      list: "قائمة",
      menu: "قائمة",
      catalog: "كتالوج",
      directory: "دليل",
      index: "فهرس",
      register: "سجل",
      record: "سجل",
      file: "ملف",
      document: "مستند",
      paper: "ورقة",
      report: "تقرير",
      summary: "ملخص",
      abstract: "ملخص",
      overview: "نظرة عامة",
      outline: "مخطط",
      synopsis: "ملخص",
      brief: "موجز",
      description: "وصف",
      explanation: "شرح",
      definition: "تعريف",
      meaning: "معنى",
      sense: "معنى",
      significance: "أهمية",
      importance: "أهمية",
      value: "قيمة",
      worth: "قيمة",
      benefit: "فائدة",
      advantage: "ميزة",
      profit: "ربح",
      gain: "مكسب",
      loss: "خسارة",
      cost: "ت��لفة",
      price: "سعر",
      fee: "رسوم",
      charge: "رسوم",
      expense: "نفقات",
      budget: "ميزانية",
      fund: "صندوق",
      capital: "رأس مال",
      money: "مال",
      currency: "عملة",
      cash: "نقد",
      credit: "ائتمان",
      debt: "دين",
      loan: "قرض",
      mortgage: "رهن عقاري",
      interest: "فائدة",
      rate: "معدل",
      percentage: "نسبة مئوية",
      ratio: "نسبة",
      proportion: "نسبة",
      share: "سهم",
      portion: "جزء",
      part: "جزء",
      piece: "قطعة",
      segment: "قطعة",
      section: "قسم",
      division: "قسم",
      department: "قسم",
      unit: "وحدة",
      component: "مكون",
      element: "عنصر",
      factor: "عامل",
      aspect: "جانب",
      feature: "ميزة",
      characteristic: "خاصية",
      quality: "جودة",
      property: "خاصية",
      attribute: "سمة",
      trait: "صفة",
      skill: "مهارة",
      ability: "قدرة",
      capability: "قدرة",
      capacity: "سعة",
      potential: "إمكانية",
      talent: "موهبة",
      gift: "هدية",
      strength: "قوة",
      weakness: "ضعف",
      advantage: "ميزة",
      disadvantage: "عيب",
      pro: "إيجابي",
      con: "سلبي",
      positive: "إيجابي",
      negative: "سلبي",
      good: "جيد",
      bad: "سيء",
      excellent: "ممتاز",
      poor: "فقير",
      best: "الأفضل",
      worst: "الأسوأ",
      better: "أفضل",
      worse: "أسوأ",
      superior: "متفوق",
      inferior: "أدنى",
      high: "عالي",
      low: "منخفض",
      top: "أعلى",
      bottom: "أسفل",
      upper: "علوي",
      lower: "سفلي",
      front: "أمام",
      back: "خلف",
      left: "يسار",
      right: "يمين",
      center: "وسط",
      middle: "وسط",
      side: "جانب",
      corner: "زاوية",
      inside: "داخل",
      outside: "خارج",
      interior: "داخلي",
      exterior: "خارجي",
      internal: "داخلي",
      external: "خارجي",
      inner: "داخلي",
      outer: "خارجي",
      above: "فوق",
      below: "تحت",
      over: "فوق",
      under: "تحت",
      up: "أعلى",
      down: "أسفل",
      forward: "إلى الأمام",
      backward: "إلى الخلف",
      ahead: "إلى الأمام",
      behind: "خلف",
      before: "قبل",
      after: "بعد",
      during: "أثناء",
      while: "بينما",
      when: "متى",
      where: "أين",
      what: "ماذا",
      who: "من",
      why: "لماذا",
      how: "كيف",
      which: "أي",
      whose: "لمن",
      whom: "لمن",
      this: "هذا",
      that: "ذلك",
      these: "هؤلاء",
      those: "أولئك",
      here: "هنا",
      there: "هناك",
      everywhere: "في كل مكان",
      nowhere: "لا مكان",
      somewhere: "مكان ما",
      anywhere: "أي مكان",
      always: "دائماً",
      never: "أبداً",
      sometimes: "أحياناً",
      often: "غالباً",
      rarely: "نادراً",
      seldom: "نادراً",
      usually: "عادة",
      normally: "عادة",
      generally: "عموماً",
      typically: "عادة",
      commonly: "عادة",
      frequently: "بشكل متكرر",
      occasionally: "أحياناً",
      regularly: "بانتظام",
      constantly: "باستمرار",
      continuously: "باستمرار",
      permanently: "بشكل دائم",
      temporarily: "مؤقتاً",
      briefly: "بإيجاز",
      shortly: "قريباً",
      soon: "قريباً",
      later: "لاحقاً",
      earlier: "في وقت سابق",
      immediately: "فوراً",
      instantly: "على الفور",
      quickly: "بسرعة",
      slowly: "ببطء",
      gradually: "تدريجياً",
      suddenly: "فجأة",
      unexpectedly: "بشكل غير متوقع",
      surprisingly: "بشكل مفاجئ",
      obviously: "بوضوح",
      clearly: "بوضوح",
      definitely: "بالتأكيد",
      certainly: "بالتأكيد",
      probably: "على الأرجح",
      possibly: "ربما",
      maybe: "ربما",
      perhaps: "ربما",
      surely: "بالتأكيد",
      absolutely: "بالتأكيد",
      completely: "تماماً",
      totally: "تماماً",
      entirely: "تماماً",
      fully: "بالكامل",
      partially: "جزئياً",
      partly: "جزئياً",
      slightly: "قليلاً",
      barely: "بالكاد",
      hardly: "بالكاد",
      almost: "تقريباً",
      nearly: "تقريباً",
      approximately: "تقريباً",
      roughly: "تقريباً",
      exactly: "بدقة",
      precisely: "بدقة",
      accurately: "بدقة",
      correctly: "بشكل صحيح",
      properly: "بشكل صحيح",
      appropriately: "بشكل مناسب",
      suitably: "بشكل مناسب",
      adequately: "بشكل كافٍ",
      sufficiently: "بشكل كافٍ",
      enough: "كافي",
      too: "أيضاً",
      also: "أيضاً",
      as: "كما",
      well: "جيد",
      either: "إما",
      neither: "لا هذا ولا ذاك",
      both: "كلاهما",
      all: "الكل",
      every: "كل",
      each: "كل",
      some: "بعض",
      any: "أي",
      many: "كثير",
      much: "كثير",
      few: "قليل",
      little: "قليل",
      several: "عدة",
      various: "متنوع",
      different: "مختلف",
      same: "نفس",
      similar: "مشابه",
      equal: "مساوي",
      equivalent: "مكافئ",
      identical: "مطابق",
      unique: "فريد",
      special: "خاص",
      particular: "خاص",
      specific: "محدد",
      general: "عام",
      common: "شائع",
      ordinary: "عادي",
      normal: "عادي",
      regular: "عادي",
      standard: "معياري",
      typical: "نموذجي",
      unusual: "غير عادي",
      strange: "غريب",
      odd: "غريب",
      weird: "غريب",
      bizarre: "غريب",
      curious: "فضولي",
      interesting: "مثير للاهتمام",
      boring: "مملل",
      exciting: "مثير",
      thrilling: "مثير",
      amazing: "مدهش",
      wonderful: "رائع",
      fantastic: "رائع",
      marvelous: "رائع",
      incredible: "لا يصدق",
      unbelievable: "لا يصدق",
      remarkable: "ملحوظ",
      extraordinary: "غير عادي",
      outstanding: "متميز",
      excellent: "ممتاز",
      perfect: "مثالي",
      ideal: "مثالي",
      beautiful: "جميل",
      pretty: "جميل",
      attractive: "جذاب",
      lovely: "جميل",
      gorgeous: "رائع",
      stunning: "مذهل",
      magnificent: "رائع",
      splendid: "رائع",
      superb: "رائع",
      brilliant: "رائع",
      great: "عظيم",
      fine: "جيد",
      nice: "لطيف",
      pleasant: "لطيف",
      enjoyable: "ممتع",
      delightful: "ممتع",
      charming: "ساحر",
      adorable: "محبوب",
      cute: "لطيف",
      sweet: "حلو",
      kind: "لطيف",
      gentle: "لطيف",
      friendly: "ودود",
      warm: "دافئ",
      cool: "رائع",
      hot: "حار",
      cold: "بارد",
      fresh: "طازج",
      new: "جديد",
      old: "قديم",
      young: "صغير",
      mature: "ناضج",
      adult: "بالغ",
      senior: "كبير السن",
      junior: "صغير",
      big: "كبير",
      small: "صغير",
      large: "كبير",
      tiny: "صغير",
      huge: "ضخم",
      enormous: "هائل",
      giant: "عملاق",
      massive: "ضخم",
      vast: "واسع",
      immense: "هائل",
      tremendous: "ها��ل",
      colossal: "ضخم",
      gigantic: "عملاق",
      miniature: "مصغر",
      microscopic: "مجهري",
      narrow: "ضيق",
      wide: "عريض",
      broad: "واسع",
      thick: "سميك",
      thin: "رفيع",
      fat: "سمين",
      slim: "نحيف",
      lean: "نحيف",
      skinny: "نحيف جداً",
      heavy: "ثقيل",
      light: "خفيف",
      dense: "كثيف",
      sparse: "��تناثر",
      crowded: "مزدحم",
      empty: "فارغ",
      full: "ممتلئ",
      packed: "مكتظ",
      busy: "مشغول",
      quiet: "هادئ",
      silent: "صامت",
      loud: "عالي",
      noisy: "صا��ب",
      peaceful: "مسالم",
      calm: "هادئ",
      still: "ساكن",
      moving: "متحرك",
      fast: "سريع",
      slow: "بطيء",
      quick: "سرية",
      rapid: "سريع",
      swift: "سريع",
      speedy: "سريع",
      gradual: "تدريجي",
      sudden: "مفاجئ",
      immediate: "فوري",
      instant: "فوري",
      delayed: "متأخر",
      late: "متأخر",
      early: "مبكر",
      timely: "في الوقت المناسب",
      prompt: "سريع",
      punctual: "دقيق في المواعيد",
      accurate: "دقيق",
      precise: "دقيق",
      exact: "دقيق",
      correct: "صحيح",
      right: "صحيح",
      wrong: "خاطئ",
      false: "خاطئ",
      true: "صحيح",
      real: "حقيقي",
      genuine: "حقيقي",
      authentic: "أصيل",
      original: "أصلي",
      unique: "فريد",
      rare: "نادر",
      scarce: "شحيح",
      abundant: "وفير",
      plentiful: "وفير",
      ample: "وافر",
      sufficient: "كافي",
      adequate: "كافي",
      enough: "كافي",
      excessive: "مفرط",
      extreme: "متطرف",
      moderate: "معتدل",
      reasonable: "معقول",
      fair: "عادل",
      unfair: "غير عادل",
      just: "عادل",
      unjust: "غير عادل",
      equal: "مساوي",
      unequal: "غير متساوي",
      balanced: "متوازن",
      unbalanced: "غير متوازن",
      stable: "مستقر",
      unstable: "غير مستقر",
      steady: "ثابت",
      unsteady: "غير ثابت",
      solid: "صلب",
      liquid: "سائل",
      gas: "غاز",
      hard: "صعب",
      soft: "��اعم",
      smooth: "أملس",
      rough: "خشن",
      sharp: "حاد",
      dull: "كليل",
      bright: "مشرق",
      dark: "مظلم",
      light: "ضوء",
      shadow: "ظل",
      color: "لون",
      black: "أسود",
      white: "أبيض",
      red: "أحمر",
      blue: "أزرق",
      green: "أخضر",
      yellow: "أصفر",
      orange: "برتقالي",
      purple: "بنفسجي",
      pink: "وردي",
      brown: "بني",
      gray: "رمادي",
      transparent: "شفاف",
      opaque: "غير شفاف",
      clear: "واضح",
      cloudy: "غائم",
      visible: "مرئي",
      invisible: "غير مرئي",
      obvious: "واضح",
      hidden: "مخفي",
      open: "مفتوح",
      closed: "مغلق",
      locked: "مقفل",
      unlocked: "غير مقفل",
      safe: "آمن",
      dangerous: "خطير",
      secure: "آمن",
      insecure: "غير آمن",
      protected: "محمي",
      unprotected: "غير محمي",
      public: "عام",
      private: "خاص",
      personal: "شخصي",
      individual: "فردي",
      collective: "جماعي",
      social: "اجتماعي",
      political: "سياسي",
      economic: "اقتصادي",
      cultural: "ثقافي",
      religious: "ديني",
      spiritual: "روحي",
      physical: "جسدي",
      mental: "عقلي",
      emotional: "عاطفي",
      psychological: "نفسي",
      medical: "طبي",
      legal: "قانوني",
      educational: "تعليمي",
      professional: "مهني",
      academic: "أكاديمي",
      scientific: "علمي",
      technical: "تقني",
      technological: "تكنولوجي",
      digital: "رقمي",
      electronic: "إلكتروني",
      mechanical: "ميكانيكي",
      automatic: "تلقائي",
      manual: "يدوي",
      natural: "طبيعي",
      artificial: "اصطناعي",
      synthetic: "تركيبي",
      organic: "عضوي",
      inorganic: "غير عضوي",
      biological: "بيولوجي",
      chemical: "كيميائي",
      physical: "فيزيائي",
      mathematical: "رياضي",
      statistical: "إحصائي",
      numerical: "عددي",
      alphabetical: "أبجدي",
      chronological: "زمني",
      logical: "منطقي",
      rational: "عقلاني",
      reasonable: "معقول",
      sensible: "حكيم",
      practical: "عملي",
      theoretical: "نظري",
      abstract: "مجرد",
      concrete: "ملموس",
      specific: "محدد",
      general: "عام",
      detailed: "مفصل",
      brief: "موجز",
      comprehensive: "شامل",
      complete: "كامل",
      incomplete: "غير كامل",
      partial: "جزئي",
      total: "إجمالي",
      final: "نهائي",
      initial: "ابتدائي",
      temporary: "مؤقت",
      permanent: "دائم",
      lasting: "دائم",
      eternal: "أبدي",
      infinite: "لانهائي",
      limited: "محدود",
      unlimited: "غير محدود",
      restricted: "مقيد",
      unrestricted: "غير مقيد",
      controlled: "مراقب",
      uncontrolled: "غير مراقب",
      organized: "منظم",
      disorganized: "غير منظم",
      structured: "منظ��",
      unstructured: "غير منظم",
      formal: "رسمي",
      informal: "غير رسمي",
      official: "رسمي",
      unofficial: "غير رسمي",
      legal: "قانوني",
      illegal: "غير قانوني",
      valid: "صالح",
      invalid: "غير صالح",
      effective: "فعال",
      ineffective: "غير فعال",
      efficient: "كفء",
      inefficient: "غير كفء",
      productive: "منتج",
      unproductive: "غير منتج",
      successful: "ناجح",
      unsuccessful: "غير ناجح",
      positive: "إيجابي",
      negative: "سلبي",
      optimistic: "متفائل",
      pessimistic: "متشائم",
      confident: "واثق",
      insecure: "غير آمن",
      brave: "شجاع",
      coward: "جبان",
      strong: "قوي",
      weak: "ضعيف",
      healthy: "صحي",
      sick: "مريض",
      wealthy: "ثري",
      poor: "فقير",
      rich: "غني",
      expensive: "غالي",
      cheap: "رخيص",
      free: "مجاني",
      costly: "مكلف",
      valuable: "قيم",
      worthless: "عديم القيمة",
      useful: "مفيد",
      useless: "عديم الفائدة",
      helpful: "مفيد",
      harmful: "ضار",
      beneficial: "مفيد",
      detrimental: "ضار",
      advantageous: "مفيد",
      disadvantageous: "ضار",
      favorable: "مؤات",
      unfavorable: "غير مؤات",
      convenient: "مريح",
      inconvenient: "غير مريح",
      comfortable: "مريح",
      uncomfortable: "غير مريح",
      pleasant: "لطيف",
      unpleasant: "غير لطيف",
      enjoyable: "ممتع",
      boring: "مملل",
      interesting: "مثير للاهتمام",
      dull: "مملل",
      exciting: "مثير",
      calm: "هادئ",
      relaxing: "مريح",
      stressful: "مرهق",
      tiring: "متعب",
      refreshing: "منعش",
      energizing: "منشط",
      exhausting: "منهك",
      satisfying: "مرضي",
      unsatisfying: "غير مرضي",
      fulfilling: "مشبع",
      disappointing: "مخيب للآمال",
      surprising: "مفاجئ",
      expected: "متوقع",
      unexpected: "غير مت��قع",
      predictable: "قابل للتنبؤ",
      unpredictable: "غير قابل للتنبؤ",
      reliable: "موثوق",
      unreliable: "غير موثوق",
      consistent: "ثابت",
      inconsistent: "غير ثابت",
      regular: "منتظم",
      irregular: "غير منتظم",
      normal: "��بيعي",
      abnormal: "غير طبيعي",
      typical: "نموذجي",
      atypical: "غير نموذجي",
      standard: "معياري",
      nonstandard: "غير معياري",
      common: "شائع",
      uncommon: "غير شائع",
      rare: "نادر",
      frequent: "متكرر",
      infrequent: "نادر",
      occasional: "أحياناً",
      constant: "ثابت",
      variable: "متغير",
      changing: "متغير",
      stable: "مستقر",
      flexible: "مرن",
      rigid: "جامد",
      strict: "صارم",
      lenient: "متساهل",
      harsh: "قاسي",
      gentle: "لطيف",
      kind: "لطيف",
      cruel: "قاسي",
      mean: "شرير",
      nice: "لطيف",
      friendly: "ودود",
      hostile: "عدائي",
      polite: "مهذب",
      rude: "وقح",
      respectful: "محترم",
      disrespectful: "غير محترم",
      honest: "صادق",
      dishonest: "غير صادق",
      truthful: "صادق",
      lying: "كاذب",
      trustworthy: "جدير بالثقة",
      untrustworthy: "غير جدير بالثقة",
      loyal: "مخلص",
      disloyal: "غير مخلص",
      faithful: "مؤمن",
      unfaithful: "غير مؤمن",
      committed: "ملتزم",
      uncommitted: "غير ملتزم",
      dedicated: "مخصص",
      lazy: "كسول",
      hardworking: "مجتهد",
      diligent: "مجتهد",
      careless: "مهمل",
      careful: "حذر",
      cautious: "حذر",
      reckless: "متهور",
      responsible: "مسؤول",
      irresponsible: "غير مسؤول",
      mature: "ناضج",
      immature: "غير ناضج",
      wise: "حكيم",
      foolish: "أحمق",
      smart: "ذكي",
      stupid: "غبي",
      intelligent: "ذكي",
      ignorant: "جاهل",
      knowledgeable: "على دراية",
      educated: "متعلم",
      uneducated: "غير متعلم",
      skilled: "ماهر",
      unskilled: "غير ماهر",
      talented: "موهوب",
      untalented: "غير موهوب",
      creative: "مبدع",
      uncreative: "غير مبدع",
      artistic: "فني",
      unartistic: "غير فني",
      musical: "موسيقي",
      athletic: "رياضي",
      fit: "لائق",
      unfit: "غير لائق",
      active: "نشط",
      inactive: "غير نشط",
      energetic: "نشيط",
      lethargic: "خامل",
      motivated: "متحفز",
      unmotivated: "غ��ر متحفز",
      ambitious: "طموح",
      unambitious: "غير طموح",
      determined: "مصمم",
      undetermined: "غير مصمم",
      persistent: "مثابر",
      giving: "يستسلم",
      patient: "صبور",
      impatient: "غير صبور",
      tolerant: "متسامح",
      intolerant: "غير متسامح",
      understanding: "متفهم",
      misunderstanding: "سوء تفاهم",
      sympathetic: "متعاطف",
      unsympathetic: "غير متعاطف",
      compassionate: "رحيم",
      merciless: "بلا رحمة",
      generous: "كريم",
      selfish: "أناني",
      selfless: "غير أناني",
      humble: "متواضع",
      arrogant: "متكبر",
      modest: "متواضع",
      boastful: "متباهي",
      proud: "فخور",
      ashamed: "خجلان",
      confident: "واثق",
      shy: "خجول",
      outgoing: "اجتماعي",
      introverted: "انطوائي",
      extroverted: "منفتح",
      sociable: "اجتماعي",
      antisocial: "غير اجتماعي",
      popular: "شعبي",
      unpopular: "غير شعبي",
      famous: "مشهور",
      unknown: "غير معروف",
      celebrated: "محت��ى به",
      ignored: "مهمل",
      respected: "محترم",
      disrespected: "غير محترم",
      admired: "معجب به",
      despised: "محتقر",
      loved: "محبوب",
      hated: "مكروه",
      liked: "محبوب",
      disliked: "غير محبوب",
      appreciated: "مقدر",
      unappreciated: "غير مقدر",
      valued: "مقدر",
      undervalued: "مقدر بأقل من قيمته",
      overvalued: "مقدر بأكثر من قيمته",
      prized: "مقدر",
      cherished: "عزيز",
      treasured: "مكنوز",
      precious: "ثمين",
      priceless: "لا يقدر بثمن",
      invaluable: "لا يقدر بثمن",
      worthwhile: "يستحق العناء",
      pointless: "لا طائل منه",
      meaningful: "ذو معنى",
      meaningless: "بلا م��نى",
      significant: "مهم",
      insignificant: "غير مهم",
      important: "مهم",
      unimportant: "غير مهم",
      essential: "أساسي",
      nonessential: "غير أساسي",
      necessary: "ضروري",
      unnecessary: "غير ضروري",
      vital: "حيوي",
      trivial: "تافه",
      critical: "حرج",
      noncritical: "غير حرج",
      urgent: "عاجل",
      nonurgent: "غير عاجل",
      immediate: "فوري",
      delayed: "متأخر",
      priority: "أولوية",
      secondary: "ثانوي",
      primary: "أساسي",
      auxiliary: "مساعد",
      main: "رئيسي",
      minor: "طفيف",
      major: "رئيسي",
      central: "مركزي",
      peripheral: "هامشي",
      core: "جوهر",
      surface: "سطح",
      fundamental: "أساسي",
      superficial: "سطحي",
      deep: "عميق",
      shallow: "ضحل",
      profound: "عميق",
      trivial: "تافه",
      complex: "معقد",
      simple: "بسيط",
      complicated: "معقد",
      straightforward: "مباشر",
      difficult: "صعب",
      easy: "سهل",
      hard: "صعب",
      challenging: "تحدي",
      demanding: "مطالب",
      effortless: "بلا جهد",
      strenuous: "شاق",
      exhausting: "منهك",
      relaxing: "مريح",
      peaceful: "مسالم",
      chaotic: "فوضوي",
      organized: "منظم",
      messy: "فوضوي",
      neat: "مرتب",
      tidy: "مرتب",
      clean: "نظيف",
      dirty: "قذر",
      pure: "نقي",
      impure: "غير نقي",
      fresh: "طازج",
      stale: "بائت",
      spoiled: "فاسد",
      rotten: "فاسد",
      healthy: "صحي",
      unhealthy: "غير صحي",
      nutritious: "مغذي",
      junk: "غير مغذي",
      delicious: "لذيذ",
      tasteless: "بلا طعم",
      flavorful: "لذيذ",
      bland: "بلا طعم",
      spicy: "حار",
      mild: "خفيف",
      sweet: "حلو",
      sour: "حامض",
      bitter: "مر",
      salty: "مالح",
      savory: "مالح",
      crispy: "مقرمش",
      soft: "ناعم",
      chewy: "مطاطي",
      crunchy: "مقرمش",
      smooth: "أملس",
      creamy: "كريمي",
      thick: "سميك",
      thin: "رفيع",
      dense: "كثيف",
      light: "خفيف",
      heavy: "ثقيل",
      solid: "صلب",
      hollow: "أجوف",
      full: "ممتلئ",
      empty: "فارغ",
      loaded: "محمل",
      unloaded: "غير محمل",
      filled: "مملوء",
      unfilled: "غير مملوء",
      occupied: "مشغول",
      vacant: "شاغر",
      available: "متاح",
      unavailable: "غير متاح",
      accessible: "قابل للوصول",
      inaccessible: "غير قابل للوصول",
      reachable: "قابل للوصول",
      unreachable: "غير قابل للوصول",
      visible: "مرئي",
      invisible: "غير مرئي",
      clear: "واضح",
      unclear: "غير واضح",
      obvious: "واضح",
      obscure: "غامض",
      apparent: "ظاهر",
      hidden: "مخفي",
      evident: "واضح",
      vague: "غامض",
      specific: "محدد",
      ambiguous: "غامض",
      definite: "محدد",
      indefinite: "غير محدد",
      certain: "مؤكد",
      uncertain: "غير مؤكد",
      sure: "متأكد",
      unsure: "غير متأكد",
      confident: "واثق",
      doubtful: "مشكوك فيه",
      positive: "إيجابي",
      negative: "سلبي",
      optimistic: "متفائل",
      pessimistic: "متشائم",
      hopeful: "متفائل",
      hopeless: "يائس",
      encouraging: "مشجع",
      discouraging: "محبط",
      motivating: "محفز",
      demotivating: "محبط",
      inspiring: "ملهم",
      uninspiring: "غير ملهم",
      uplifting: "مرفع للمعنويات",
      depressing: "محبط",
      cheerful: "مرح",
      gloomy: "كئيب",
      bright: "مشرق",
      dim: "خافت",
      brilliant: "رائع",
      dull: "كليل",
      shiny: "لامع",
      matte: "غي�� لامع",
      glossy: "لامع",
      rough: "خشن",
      smooth: "أملس",
      bumpy: "وعر",
      even: "متساوي",
      uneven: "غير متساوي",
      level: "مستوي",
      slanted: "مائل",
      straight: "مستقيم",
      curved: "منحني",
      bent: "مثني",
      twisted: "ملتوي",
      round: "دائري",
      square: "مربع",
      rectangular: "مستطيل",
      triangular: "مثلث",
      circular: "دائري",
      oval: "بيضاوي",
      spherical: "كروي",
      cylindrical: "أسطواني",
      conical: "مخروطي",
      flat: "مسطح",
      three: "ثلاثي الأبعاد",
      two: "ثنائي الأبعاد",
      dimensional: "أبعاد",
      spatial: "مكاني",
      temporal: "زمني",
      linear: "خطي",
      nonlinear: "غير خطي",
      parallel: "متوازي",
      perpendicular: "عمودي",
      horizontal: "أفقي",
      vertical: "عمودي",
      diagonal: "قطري",
      angular: "زاو��",
      acute: "حاد",
      obtuse: "منفرج",
      right: "قائم",
      acute: "حاد",
      reflex: "منعكس",
      interior: "داخلي",
      exterior: "خارجي",
      internal: "داخلي",
      external: "خارجي",
      inner: "داخلي",
      outer: "خارجي",
      central: "مركزي",
      marginal: "هامشي",
      peripheral: "هامشي",
      core: "جوهر",
      edge: "حافة",
      center: "مركز",
      middle: "وسط",
      side: "جانب",
      top: "أعلى",
      bottom: "أسفل",
      front: "أمام",
      back: "خلف",
      left: "يسار",
      right: "يمين",
      north: "شمال",
      south: "جنوب",
      east: "شرق",
      west: "غرب",
      northeast: "شمال شرق",
      northwest: "شمال غرب",
      southeast: "جنوب شرق",
      southwest: "جنوب غرب",
      upward: "إلى أعلى",
      downward: "إلى أسفل",
      forward: "إلى الأمام",
      backward: "إلى الخلف",
      inward: "إلى الداخل",
      outward: "إلى الخارج",
      clockwise: "باتجاه عقارب الساعة",
      counterclockwise: "عكس عقارب الساعة",
      ascending: "تصاعدي",
      descending: "تنازلي",
      increasing: "متزايد",
      decreasing: "متناقص",
      rising: "ارتفاع",
      falling: "سقوط",
      growing: "نمو",
      shrinking: "انكماش",
      expanding: "توسع",
      contracting: "انقباض",
      extending: "امتداد",
      retracting: "انكماش",
      stretching: "تمدد",
      compressing: "ضغط",
      inflating: "انتفاخ",
      deflating: "انكماش",
      opening: "فتح",
      closing: "إغلاق",
      starting: "بداية",
      stopping: "توقف",
      beginning: "بداية",
      ending: "نهاية",
      continuing: "استمرار",
      pausing: "توقف مؤقت",
      resuming: "استئناف",
      interrupting: "مقاطعة",
      connecting: "اتصال",
      disconnecting: "قطع الاتصال",
      joining: "انضمام",
      separating: "فصل",
      combining: "دمج",
      dividing: "قسمة",
      uniting: "توحيد",
      splitting: "تقسيم",
      merging: "دمج",
      branching: "تفرع",
      converging: "تلاقي",
      diverging: "تفرق",
      meeting: "لقاء",
      parting: "فراق",
      approaching: "اقتراب",
      receding: "ابتعاد",
      advancing: "تقدم",
      retreating: "تراجع",
      progressing: "تقدم",
      regressing: "تراجع",
      improving: "تحسن",
      deteriorating: "تدهور",
      developing: "تطوير",
      declining: "انحدار",
      evolving: "تطور",
      devolving: "تراجع",
      transforming: "تحويل",
      changing: "تغيير",
      remaining: "باقي",
      staying: "بقاء",
      moving: "تحرك",
      stationary: "ثابت",
      mobile: "مت��رك",
      immobile: "غير متحرك",
      portable: "محمول",
      fixed: "ثابت",
      removable: "قابل للإزالة",
      permanent: "دائم",
      temporary: "مؤقت",
      lasting: "دائم",
      fleeting: "عابر",
      enduring: "دائم",
      transient: "عابر",
      stable: "مستقر",
      unstable: "غير مستقر",
      steady: "ثابت",
      unsteady: "غير ثابت",
      consistent: "ثابت",
      inconsistent: "غير ثابت",
      reliable: "موثوق",
      unreliable: "غير موثوق",
      dependable: "يمكن الاعتماد عليه",
      undependable: "لا يمكن الاعتماد عليه",
      trustworthy: "جدير بالثقة",
      untrustworthy: "غير جدير بالثقة",
      credible: "موثوق",
      incredible: "غير موثوق",
      believable: "قابل للتصديق",
      unbelievable: "غير قابل للتصديق",
      plausible: "معقول",
      implausible: "غير معقول",
      possible: "ممكن",
      impossible: "مستحيل",
      probable: "محتمل",
      improbable: "غير محتمل",
      likely: "محتمل",
      unlikely: "غير محتمل",
      feasible: "قابل للتنفيذ",
      infeasible: "غير قابل للتنفيذ",
      practical: "عملي",
      impractical: "غير عملي",
      realistic: "واقعي",
      unrealistic: "غير واقعي",
      achievable: "قابل للتحقيق",
      unachievable: "غير قابل للتحقيق",
      attainable: "قابل للوصول",
      unattainable: "غير قابل للوصول",
      reachable: "قابل للوصول",
      unreachable: "غير قابل للوصول",
      accessible: "قابل للوصول",
      inaccessible: "غير قابل للوصول",
      available: "متاح",
      unavailable: "غير متاح",
      obtainable: "قابل للحصول عليه",
      unobtainable: "غير قابل للحصول عليه",
      affordable: "معقول السعر",
      unaffordable: "غير معقول السعر",
      reasonable: "معقول",
      unreasonable: "غير معقول",
      acceptable: "مقبول",
      unacceptable: "غير مقبول",
      tolerable: "محتمل",
      intolerable: "غير محتمل",
      bearable: "محتمل",
      unbearable: "غير محتمل",
      manageable: "قابل للإدارة",
      unmanageable: "غير قابل للإدار��",
      controllable: "قابل للسيطرة",
      uncontrollable: "غير قابل للسيطرة",
      predictable: "قابل للتنبؤ",
      unpredictable: "غير قابل للتنبؤ",
      expected: "متوقع",
      unexpected: "غير متوقع",
      surprising: "مفاجئ",
      unsurprising: "غير مفاجئ",
      shocking: "صادم",
      unsurprising: "غير مفاجئ",
      amazing: "مدهش",
      ordinary: "عادي",
      extraordinary: "غير عادي",
      remarkable: "ملحوظ",
      unremarkable: "غير ملحوظ",
      notable: "جدير بالملاحظة",
      unnotable: "غير جدير بالملاحظة",
      outstanding: "متميز",
      mediocre: "متوسط",
      exceptional: "استثنائي",
      average: "متوسط",
      superior: "متفوق",
      inferior: "أدنى",
      excellent: "ممتاز",
      poor: "فقير",
      perfect: "مثالي",
      imperfect: "غير مثالي",
      flawless: "بلا عيوب",
      flawed: "معيب",
      ideal: "مثالي",
      nonideal: "غير مثالي",
      optimal: "أمثل",
      suboptimal: "دون الأمثل",
      maximum: "أقصى",
      minimum: "أدنى",
      highest: "أعلى",
      lowest: "أدنى",
      greatest: "أعظم",
      least: "أقل",
      best: "أفضل",
      worst: "أسوأ",
      first: "أول",
      last: "آخر",
      earliest: "أقدم",
      latest: "أحدث",
      newest: "أحدث",
      oldest: "أقدم",
      youngest: "أصغر",
      eldest: "أكبر",
      senior: "كبير",
      junior: "صغير",
      primary: "أساسي",
      secondary: "ثانوي",
      tertiary: "ثالث",
      initial: "ابتدائي",
      final: "نهائي",
      original: "أصلي",
      duplicate: "مكرر",
      copy: "نسخة",
      genuine: "أصلي",
      fake: "مزيف",
      authentic: "أصيل",
      artificial: "اصطناعي",
      real: "حقيقي",
      imaginary: "تخيلي",
      actual: "فعلي",
      virtual: "افتراضي",
      physical: "جسدي",
      digital: "رقمي",
      analog: "تناظري",
      mechanical: "ميكانيكي",
      electronic: "إلكتروني",
      manual: "يدوي",
      automatic: "تلقائي",
      automated: "آلي",
      computerized: "محوسب",
      technological: "تكنولوجي",
      traditional: "ت��ليدي",
      modern: "حديث",
      contemporary: "معاصر",
      current: "حالي",
      outdated: "قديم",
      obsolete: "عفا عليه الزمن",
      archaic: "قديم",
      ancient: "قديم",
      recent: "حديث",
      fresh: "طازج",
      stale: "بائت",
      updated: "محدث",
      upgraded: "مطور",
      improved: "محسن",
      enhanced: "محسن",
      advanced: "متقدم",
      basic: "أساسي",
      fundamental: "أساسي",
      elementary: "ابتدائي",
      sophisticated: "متطور",
      complex: "معقد",
      simple: "بسيط",
      complicated: "معقد",
      intricate: "معقد",
      elaborate: "مفصل",
      detailed: "مفصل",
      comprehensive: "شامل",
      thorough: "شامل",
      complete: "كامل",
      incomplete: "غير كامل",
      partial: "جزئي",
      total: "إجمالي",
      whole: "كامل",
      entire: "كامل",
      full: "ممتلئ",
      half: "نصف",
      quarter: "ربع",
      third: "ثلث",
      majority: "أغلبية",
      minority: "أقلية",
      most: "معظم",
      few: "قليل",
      many: "كثير",
      several: "عدة",
      numerous: "عديد",
      countless: "لا يحصى",
      infinite: "لانهائي",
      finite: "محدود",
      limited: "محدود",
      unlimited: "غير محدود",
      boundless: "بلا حدود",
      endless: "لا نهاية له",
      eternal: "أبدي",
      temporary: "مؤقت",
      permanent: "دائم",
      everlasting: "دائم",
      immortal: "��الد",
      mortal: "فانٍ",
      living: "حي",
      dead: "ميت",
      alive: "حي",
      deceased: "متوفى",
      born: "مولود",
      unborn: "غير مولود",
      existing: "موجود",
      nonexistent: "غير موجود",
      present: "حاضر",
      absent: "غائب",
      here: "هنا",
      there: "هناك",
      everywhere: "في كل مكان",
      nowhere: "لا مكان",
      somewhere: "مكان ما",
      anywhere: "أي مكان",
      local: "محلي",
      global: "عالمي",
      international: "دولي",
      national: "وطني",
      regional: "إقليمي",
      domestic: "محلي",
      foreign: "أجنبي",
      native: "أصلي",
      immigrant: "مهاجر",
      citizen: "مواطن",
      alien: "أجنبي",
      resident: "مقيم",
      visitor: "زائر",
      guest: "ضيف",
      host: "مضيف",
      owner: "مالك",
      tenant: "مستأجر",
      landlord: "مالك العقار",
      renter: "مستأجر",
      buyer: "مشتري",
      seller: "بائع",
      customer: "عميل",
      client: "عميل",
      consumer: "مستهلك",
      user: "مستخدم",
      member: "عضو",
      nonmember: "��ير عضو",
      subscriber: "مشترك",
      participant: "مشارك",
      observer: "مراقب",
      spectator: "متفرج",
      audience: "جمهور",
      performer: "فنان",
      actor: "ممثل",
      actress: "ممثلة",
      player: "لاعب",
      athlete: "رياضي",
      competitor: "منافس",
      opponent: "خصم",
      rival: "منافس",
      teammate: "ز��يل فريق",
      partner: "شريك",
      ally: "حليف",
      enemy: "عدو",
      friend: "صديق",
      acquaintance: "معرفة",
      stranger: "غريب",
      neighbor: "جار",
      colleague: "زميل",
      coworker: "زميل عمل",
      employee: "موظف",
      employer: "صاحب عمل",
      worker: "عامل",
      boss: "رئيس",
      manager: "مدير",
      supervisor: "مشرف",
      subordinate: "مرؤوس",
      leader: "قائد",
      follower: "تابع",
      guide: "دليل",
      student: "طالب",
      teacher: "معلم",
      instructor: "مدرب",
      professor: "أستاذ",
      tutor: "مدرس خصوصي",
      mentor: "موجه",
      coach: "مدرب",
      trainer: "مدرب",
      expert: "خبير",
      specialist: "متخصص",
      professional: "محترف",
      amateur: "هاو",
      beginner: "مبتدئ",
      novice: "مبتدئ",
      experienced: "ذو خبرة",
      skilled: "ماهر",
      unskilled: "غير ماهر",
      qualified: "مؤهل",
      unqualified: "غير مؤهل",
      certified: "معتمد",
      uncertified: "غير معتمد",
      licensed: "مرخص",
      unlicensed: "غير مرخص",
      authorized: "مخول",
      unauthorized: "غير مخول",
      approved: "موافق عليه",
      unapproved: "غير موافق عليه",
      accepted: "مقبول",
      rejected: "مرفوض",
      admitted: "مقبول",
      denied: "مرفوض",
      allowed: "مسموح",
      forbidden: "ممن��ع",
      permitted: "مسموح",
      prohibited: "محظور",
      legal: "قانوني",
      illegal: "غير قانوني",
      legitimate: "شرعي",
      illegitimate: "غير شرعي",
      valid: "صالح",
      invalid: "غير صالح",
      official: "رسمي",
      unofficial: "غير رسمي",
      formal: "رسمي",
      informal: "غير رسمي",
      proper: "مناسب",
      improper: "غير مناسب",
      appropriate: "مناسب",
      inappropriate: "غير مناسب",
      suitable: "مناسب",
      unsuitable: "غير مناسب",
      fitting: "مناسب",
      unfitting: "غير مناسب",
      relevant: "ذو صلة",
      irrelevant: "غير ذي صلة",
      related: "مرتبط",
      unrelated: "غير مرتبط",
      connected: "متصل",
      disconnected: "منقطع",
      linked: "مرتبط",
      unlinked: "غير مرتبط",
      attached: "مرفق",
      detached: "منفصل",
      joined: "منضم",
      separated: "منفصل",
      united: "متحد",
      divided: "مقسم",
      together: "معاً",
      apart: "منفصل",
      close: "قريب",
      distant: "بعيد",
      near: "قريب",
      far: "بعيد",
      adjacent: "مجاور",
      remote: "بعيد",
      neighboring: "مجاور",
      surrounding: "محيط",
      central: "مركزي",
      peripheral: "هامشي",
      inside: "داخل",
      outside: "خارج",
      within: "داخل",
      beyond: "خارج",
      above: "فوق",
      below: "تحت",
      over: "فوق",
      under: "تحت",
      on: "على",
      off: "خارج",
      in: "في",
      out: "خارج",
      into: "إلى داخل",
      onto: "على",
      through: "عبر",
      across: "عبر",
      along: "على طول",
      around: "حول",
      beside: "بجانب",
      between: "بين",
      among: "بين",
      amid: "وسط",
      against: "ضد",
      toward: "نحو",
      away: "بعيداً",
      from: "من",
      to: "إلى",
      with: "مع",
      without: "بدون",
      for: "لـ",
      by: "بواسطة",
      of: "من",
      about: "حول",
      like: "مثل",
      unlike: "على عكس",
      as: "كما",
      than: "من",
      but: "لكن",
      and: "و",
      or: "أو",
      not: "ليس",
      no: "لا",
      yes: "نعم",
      maybe: "ربما",
      perhaps: "ربما",
      possibly: "ربما",
      probably: "على الأرجح",
      definitely: "بالتأكيد",
      certainly: "بالتأكيد",
      surely: "بالتأكيد",
      absolutely: "بالتأكيد",
      exactly: "بدقة",
      precisely: "بدقة",
      approximately: "تقريباً",
      roughly: "تقريباً",
      about: "حول",
      around: "حوالي",
      nearly: "تقريباً",
      almost: "تقريباً",
      quite: "تماماً",
      very: "جداً",
      extremely: "للغاية",
      highly: "للغاية",
      really: "حقاً",
      truly: "حقاً",
      actually: "فعلاً",
      indeed: "حقاً",
      certainly: "بالتأكيد",
      obviously: "بوضوح",
      clearly: "بوضوح",
      apparently: "على ما يبدو",
      seemingly: "على ما يبدو",
      evidently: "بوضوح",
      presumably: "من المفترض",
      supposedly: "على ما يفترض",
      allegedly: "زعماً",
      reportedly: "حسب التقارير",
      apparently: "على ما يبدو",
      obviously: "بوضوح",
      naturally: "طبيعياً",
      normally: "عادة",
      usually: "عادة",
      typically: "عادة",
      generally: "عموماً",
      commonly: "عادة",
      frequently: "بشكل متكرر",
      often: "غالباً",
      sometimes: "أحياناً",
      occasionally: "أحياناً",
      rarely: "نادراً",
      seldom: "نادراً",
      never: "أبداً",
      always: "دائماً",
      constantly: "باستمرار",
      continuously: "باستمرار",
      regularly: "بانتظام",
      irregularly: "بشكل غير منتظم",
      consistently: "باستمرار",
      inconsistently: "بشكل غير منتظم",
      systematically: "بشكل منهجي",
      randomly: "عشوائياً",
      deliberately: "عمداً",
      intentionally: "عمداً",
      purposely: "عمداً",
      accidentally: "عن طريق الخطأ",
      unintentionally: "غير مقصود",
      mistakenly: "عن طريق الخطأ",
      carelessly: "بإهمال",
      carefully: "بحذر",
      cautiously: "بحذر",
      safely: "بأمان",
      dangerously: "بخطر",
      securely: "بأمان",
      insecurely: "بدون أمان",
      privately: "بخصوصية",
      publicly: "علناً",
      openly: "بصراحة",
      secretly: "سراً",
      confidentially: "بسرية",
      personally: "شخصياً",
      professionally: "مهنياً",
      officially: "رسمياً",
      unofficially: "غير رسمي",
      formally: "رسمياً",
      informally: "غير رسمي",
      legally: "قانونياً",
      illegally: "بشكل غير قانوني",
      legitimately: "بشكل شرعي",
      rightfully: "بحق",
      wrongfully: "بالخطأ",
      correctly: "بشكل صحيح",
      incorrectly: "بشكل خاطئ",
      properly: "بشكل صحيح",
      improperly: "بشكل خاط��",
      appropriately: "بشكل مناسب",
      inappropriately: "بشكل غير مناسب",
      suitably: "بشكل مناسب",
      unsuitably: "بشكل غير مناسب",
      effectively: "بفعالية",
      ineffectively: "بدون فعالية",
      efficiently: "بكفاءة",
      inefficiently: "بدون كفاءة",
      successfully: "بنجاح",
      unsuccessfully: "بدون نجاح",
      productively: "بإنتاجية",
      unproductively: "بدون إنتاجية",
      positively: "بإيجابية",
      negatively: "بسلبية",
      optimistically: "بتفاؤل",
      pessimistically: "بتشاؤم",
      hopefully: "بأمل",
      hopelessly: "بيأس",
      confidently: "بثقة",
      doubtfully: "بشك",
      certainly: "بيقين",
      uncertainly: "بعدم يقين",
      clearly: "بوضوح",
      unclearly: "بعدم وضوح",
      obviously: "بوضوح",
      vaguely: "بغموض",
      specifically: "بتحديد",
      generally: "بشكل عام",
      particularly: "بشكل خاص",
      especially: "خاصة",
      mainly: "بشكل رئيسي",
      mostly: "معظمها",
      primarily: "بشكل أساسي",
      secondarily: "بشكل ثانوي",
      initially: "في البداية",
      finally: "أخيراً",
      eventually: "في النهاية",
      ultimately: "في النهاية",
      immediately: "فوراً",
      instantly: "على الفور",
      quickly: "بسرعة",
      slowly: "ببطء",
      rapidly: "بسرعة",
      gradually: "تدريجياً",
      suddenly: "فجأة",
      unexpectedly: "بشكل غير متوقع",
      surprisingly: "بشكل مفاجئ",
      predictably: "بشكل متوقع",
      understandably: "بشكل مفهوم",
      reasonably: "بشكل معقول",
      unreasonably: "بشكل غير معقول",
      logically: "منطقياً",
      illogically: "بشكل غير منطقي",
      rationally: "بعقلانية",
      irrationally: "بشكل غير عقلاني",
      sensibly: "بحكمة",
      foolishly: "بحماقة",
      wisely: "بحكمة",
      stupidly: "بغباء",
      intelligently: "بذكاء",
      ignorantly: "بجهل",
      skillfully: "بمهارة",
      clumsily: "بخرق",
      expertly: "بخبرة",
      amateurishly: "بطريقة هاوية",
      professionally: "بمهنية",
      unprofessionally: "بطريقة ��ير مهنية",
      competently: "بكفاءة",
      incompetently: "بعدم كفاءة",
      accurately: "بدقة",
      inaccurately: "بعدم دقة",
      precisely: "بدقة",
      imprecisely: "بعدم ��قة",
      exactly: "بدقة",
      approximately: "تقريباً",
      roughly: "تقريباً",
      closely: "عن قرب",
      distantly: "عن بعد",
      directly: "مباشرة",
      indirectly: "بشكل غير مباشر",
      straightforwardly: "بوضوح",
      complexly: "بطريقة معقدة",
      simply: "ببساطة",
      complicatedly: "بطريقة معقدة",
      easily: "بسهولة",
      difficultly: "بصعوبة",
      effortlessly: "بدون جهد",
      strenuously: "بجهد شاق",
      smoothly: "بسلاسة",
      roughly: "بخشونة",
      gently: "بلطف",
      harshly: "بقسوة",
      kindly: "بلطف",
      cruelly: "بقسوة",
      nicely: "بلطف",
      meanly: "بخبث",
      friendly: "بود",
      hostilely: "بعداء",
      politely: "بأدب",
      rudely: "بوقاحة",
      respectfully: "باحترام",
      disrespectfully: "بعدم احترام",
      honestly: "بصدق",
      dishonestly: "بعدم صدق",
      truthfully: "بصدق",
      falsely: "بكذب",
      genuinely: "بصدق",
      artificially: "بطريقة مصطنعة",
      naturally: "بطبيعية",
      unnaturally: "��طريقة غير طبيعية",
      spontaneously: "بعفوية",
      deliberately: "بتعمد",
      voluntarily: "طوعاً",
      involuntarily: "لا إرادياً",
      willingly: "برغبة",
      unwillingly: "بعدم رغبة",
      eagerly: "بحماس",
      reluctantly: "بتردد",
      enthusiastically: "بحماس",
      apathetically: "بلامبالاة",
      passionately: "بشغف",
      indifferently: "بلامبالاة",
      actively: "بنشاط",
      passively: "بسلبية",
      aggressively: "بعدوانية",
      peacefully: "بسلام",
      violently: "بعنف",
      calmly: "بهدوء",
      angrily: "بغضب",
      happily: "بسعادة",
      sadly: "بحزن",
      joyfully: "بفرح",
      sorrowfully: "بحزن",
      cheerfully: "بمرح",
      gloomily: "بكآبة",
      optimistically: "بتفاؤل",
      pessimistically: "بتشاؤم",
      hopefully: "بأمل",
      hopelessly: "بيأس",
      bravely: "بشجاعة",
      cowardly: "بجبن",
      courageously: "بشجاعة",
      fearfully: "بخوف",
      boldly: "بجرأة",
      timidly: "بخجل",
      confidently: "بثقة",
      shyly: "بخجل",
      proudly: "بفخر",
      humbly: "بتواضع",
      arrogantly: "بغطرسة",
      modestly: "بتواضع",
      generously: "بكرم",
      selfishly: "بأنانية",
      selflessly: "بنكران ذات",
      greedily: "بجشع",
      patiently: "بصبر",
      impatiently: "بعدم صبر",
      tolerantly: "بتسامح",
      intolerantly: "بعدم تسامح",
      understandingly: "بتفهم",
      misunderstandingly: "بسوء فهم",
      sympathetically: "بتعاطف",
      unsympathetically: "بعدم تعاطف",
      compassionately: "برحمة",
      mercilessly: "بلا رحمة",
      lovingly: "بحب",
      hatefully: "بكراهية",
      affectionately: "بعاطفة",
      coldly: "ببرود",
      warmly: "بدفء",
      coolly: "ببرود",
      hotly: "بحرارة",
      freshly: "بطزاجة",
      stalely: "بطريقة بائتة",
      newly: "حديثاً",
      oldly: "قديماً",
      recently: "مؤخراً",
      anciently: "قديماً",
      modernly: "بطريقة حديثة",
      traditionally: "بطريقة تقليدية",
      conventionally: "بطريقة تقليدية",
      unconventionally: "بطريقة غ��ر تقليدية",
      originally: "أصلاً",
      uniquely: "بطريقة فريدة",
      commonly: "بطريقة شائعة",
      rarely: "نادراً",
      frequently: "بتكرار",
      infrequently: "نادراً",
      regularly: "بانتظام",
      irregularly: "بشكل غير منتظم",
      consistently: "باستمرار",
      inconsistently: "بشكل غير منتظم",
      systematically: "بشكل منهجي",
      unsystematically: "بشكل غير منهجي",
      methodically: "بطريقة منهج��ة",
      randomly: "عشوائياً",
      orderly: "بترتيب",
      disorderly: "بفوضى",
      organized: "بتنظيم",
      disorganizedly: "بعدم تنظيم",
      neatly: "بترتيب",
      messily: "بفوضى",
      tidily: "بترتيب",
      untidily: "بعدم ترتيب",
      cleanly: "بنظافة",
      dirtily: "بقذارة",
      purely: "بنقاء",
      impurely: "بعدم نقاء",
      healthily: "بصحة",
      unhealthily: "بطريقة غير صحية",
      safely: "بأمان",
      dangerously: "بخطر",
      securely: "بأمان",
      insecurely: "بعدم أمان",
      stably: "بثبات",
      unstably: "بعدم ثبات",
      steadily: "بثبات",
      unsteadily: "بعدم ثبات",
      firmly: "بثبات",
      loosely: "بارتخاء",
      tightly: "بإحكام",
      loosely: "بارتخاء",
      strongly: "بقوة",
      weakly: "بضعف",
      powerfully: "بقوة",
      weakly: "بضعف",
      forcefully: "بقوة",
      gently: "بلطف",
      roughly: "بخشونة",
      smoothly: "بنعومة",
      sharply: "بحدة",
      dully: "بكلالة",
      brightly: "بسطوع",
      darkly: "بظلام",
      clearly: "بوضوح",
      unclearly: "بعدم وضوح",
      visibly: "بوضوح",
      invisibly: "بعدم رؤية",
      obviously: "بوضوح",
      obscurely: "بغموض",
      apparently: "بوضوح",
      secretly: "سراً",
      openly: "علناً",
      publicly: "علناً",
      privately: "خصوصياً",
      personally: "شخصياً",
      individually: "فردياً",
      collectively: "جماعياً",
      socially: "اجتماعياً",
      politically: "سياسياً",
      economically: "اقتصادياً",
      culturally: "ثقافياً",
      religiously: "دينياً",
      spiritually: "روحياً",
      physically: "جسدياً",
      mentally: "عقلياً",
      emotionally: "عاطفياً",
      psychologically: "نفسياً",
      medically: "طبياً",
      legally: "قانونياً",
      educationally: "تعليمياً",
      academically: "أكاديمياً",
      scientifically: "علمياً",
      technically: "تقنياً",
      technologically: "تكنولوجياً",
      digitally: "رقمياً",
      electronically: "إلكترونياً",
      mechanically: "ميكانيكياً",
      automatically: "تلقائياً",
      manually: "يدوياً",
      naturally: "طبيعياً",
      artificially: "اصطناعياً",
      synthetically: "تركيبياً",
      organically: "عضوياً",
      biologically: "بيولوجياً",
      chemically: "كيميائياً",
      physically: "فيزيائياً",
      mathematically: "رياضياً",
      statistically: "إحصائياً",
      numerically: "عددياً",
      alphabetically: "أبجدياً",
      chronologically: "زمنياً",
      logically: "منطقياً",
      rationally: "عقلانياً",
      reasonably: "بطريقة مع��ولة",
      sensibly: "بحكمة",
      practically: "عملياً",
      theoretically: "نظرياً",
      abstractly: "مجرداً",
      concretely: "بطريقة ملموسة",
      specifically: "تحديداً",
      generally: "عموماً",
      detailedly: "بتفصيل",
      briefly: "بإيجاز",
      comprehensively: "بشمولية",
      completely: "بالكامل",
      incompletely: "بشكل غير كامل",
      partially: "جزئياً",
      totally: "كلياً",
      entirely: "بالكامل",
      fully: "بالكامل",
      half: "نصف",
      quarter: "ربع",
      mostly: "معظمها",
      mainly: "بشكل رئيسي",
      primarily: "بشكل أساسي",
      secondarily: "بشكل ثانوي",
      initially: "في البداية",
      finally: "أخيراً",
      ultimately: "في النهاية",
      eventually: "في النهاية",
      permanently: "بشكل دائم",
      temporarily: "مؤقتاً",
      briefly: "لفترة وجيزة",
      shortly: "قريباً",
      soon: "قريباً",
      later: "لاحقاً",
      earlier: "في وقت سابق",
      before: "قبل",
      after: "بعد",
      during: "أثناء",
      while: "بينما",
      meanwhile: "في هذه الأثناء",
      simultaneously: "في نفس الوقت",
      concurrently: "بنفس الوقت",
      consecutively: "بشكل متتالي",
      sequentially: "بشكل متسلسل",
      alternately: "بالتناوب",
      alternativley: "بدلاً من ذلك",
      instead: "بدلاً من ذلك",
      otherwise: "وإلا",
      however: "ومع ذلك",
      nevertheless: "مع ذلك",
      nonetheless: "مع ذلك",
      still: "لا يزال",
      yet: "بعد",
      already: "بالفعل",
      still: "لا يزال",
      anymore: "لم يعد",
      again: "مرة أخرى",
      once: "مرة واحدة",
      twice: "مرتين",
      thrice: "ثلاث مرات",
      repeatedly: "مراراً وتكراراً",
      continually: "باستمرار",
      continuously: "باستمر��ر",
      constantly: "باستمرار",
      persistently: "باستمرار",
      consistently: "بثبات",
      steadily: "بثبات",
      gradually: "تدريجياً",
      progressively: "تدريجياً",
      increasingly: "بشكل متزايد",
      decreasingly: "بشكل متناقص",
      more: "أكثر",
      less: "أقل",
      most: "��لأكثر",
      least: "الأقل",
      better: "أفضل",
      worse: "أسوأ",
      best: "الأفضل",
      worst: "الأسوأ",
      higher: "أعلى",
      lower: "أقل",
      highest: "الأعلى",
      lowest: "الأقل",
      greater: "أكبر",
      smaller: "أصغر",
      greatest: "الأكبر",
      smallest: "الأصغر",
      larger: "أكبر",
      smaller: "أصغر",
      largest: "الأكبر",
      smallest: "الأصغر",
      bigger: "أكبر",
      smaller: "أصغر",
      biggest: "الأكبر",
      smallest: "الأصغر",
      longer: "أطول",
      shorter: "أقصر",
      longest: "الأطول",
      shortest: "الأقصر",
      wider: "أوسع",
      narrower: "أضيق",
      widest: "الأوسع",
      narrowest: "الأضيق",
      thicker: "أسمك",
      thinner: "أرفع",
      thickest: "الأسمك",
      thinnest: "الأرفع",
      heavier: "أثقل",
      lighter: "أخف",
      heaviest: "الأثقل",
      lightest: "الأخف",
      stronger: "أقوى",
      weaker: "أضعف",
      strongest: "الأقوى",
      weakest: "الأضعف",
      faster: "أسرع",
      slower: "أبطأ",
      fastest: "الأسرع",
      slowest: "الأبطأ",
      earlier: "أسبق",
      later: "أحدث",
      earliest: "الأسبق",
      latest: "الأحدث",
      sooner: "أسرع",
      later: "أحدث",
      newer: "أحدث",
      older: "أقدم",
      newest: "الأحدث",
      oldest: "الأقدم",
      younger: "أصغر",
      older: "أكبر",
      youngest: "الأصغر",
      oldest: "الأكبر",
      fresher: "أطزج",
      staler: "أكثر بوتاً",
      freshest: "الأطزج",
      stalest: "الأكثر بوتاً",
      cleaner: "أنظف",
      dirtier: "أقذر",
      cleanest: "الأنظف",
      dirtiest: "الأقذر",
      purer: "أنقى",
      impurer: "أقل نقاءً",
      purest: "الأنقى",
      impurest: "الأقل نقاءً",
      healthier: "أصح",
      sicker: "أكثر مرضاً",
      healthiest: "الأصح",
      sickest: "الأكثر مرضاً",
      richer: "أغنى",
      poorer: "أفقر",
      richest: "الأغنى",
      poorest: "الأفقر",
      cheaper: "أرخص",
      expensive: "أغلى",
      cheapest: "الأرخص",
      expensive: "ال��غلى",
      easier: "أسهل",
      harder: "أصعب",
      easiest: "الأسهل",
      hardest: "الأصعب",
      simpler: "أبسط",
      complex: "أعقد",
      simplest: "الأبسط",
      complex: "الأعقد",
      clearer: "أوضح",
      unclear: "أقل وضوحاً",
      clearest: "الأوضح",
      unclear: "الأقل وضوحاً",
      brighter: "أسطع",
      darker: "أظلم",
      brightest: "الأسطع",
      darkest: "الأظلم",
      louder: "أعلى صوتاً",
      quieter: "أهدأ",
      loudest: "الأعلى صوتاً",
      quietest: "الأهدأ",
      warmer: "أدفأ",
      colder: "أبرد",
      warmest: "الأدفأ",
      coldest: "الأبرد",
      hotter: "أسخن",
      cooler: "أبرد",
      hottest: "الأسخن",
      coolest: "الأبرد",
      sweeter: "أحلى",
      bitter: "أمر",
      sweetest: "الأحلى",
      bitter: "الأمر",
      saltier: "أملح",
      bland: "أقل ملو��ة",
      saltiest: "الأملح",
      blandest: "الأقل ملوحة",
      spicier: "أحر",
      milder: "أخف",
      spiciest: "الأحر",
      mildest: "الأخف",
      softer: "أنعم",
      harder: "أقسى",
      softest: "الأنعم",
      hardest: "الأقسى",
      smoother: "أنعم",
      rougher: "أخشن",
      smoothest: "الأنعم",
      roughest: "الأخشن",
      sharper: "أحد",
      duller: "أكل",
      sharpest: "الأحد",
      dullest: "الأكل",
      closer: "أقر��",
      farther: "أبعد",
      closest: "الأقرب",
      farthest: "الأبعد",
      nearer: "أقرب",
      farther: "أبعد",
      nearest: "الأقرب",
      farthest: "الأبعد",
      tighter: "أشد",
      looser: "أرخى",
      tightest: "الأشد",
      loosest: "الأرخى",
      fuller: "أكثر امتلاءً",
      emptier: "أكثر فراغاً",
      fullest: "الأكثر امتلاءً",
      emptiest: "الأكثر فراغاً",
      busier: "أكثر انشغالاً",
      freer: "أكثر حرية",
      busiest: "الأكثر انشغالاً",
      freest: "الأكثر حرية",
      happier: "أسعد",
      sadder: "أحزن",
      happiest: "الأسعد",
      saddest: "الأحزن",
      angrier: "أغضب",
      calmer: "أهدأ",
      angriest: "الأغضب",
      calmest: "الأهدأ",
      more: "أكثر",
      excited: "متحمس",
      less: "أقل",
      excited: "متحمس",
      most: "الأكثر",
      excited: "متحمس",
      least: "الأقل",
      excited: "متحمس",
      more: "أكثر",
      tired: "متعب",
      less: "أقل",
      tired: "متعب",
      most: "الأكثر",
      tired: "متعب",
      least: "الأقل",
      tired: "متعب",
      more: "أكثر",
      interested: "مهتم",
      less: "أقل",
      interested: "مهتم",
      most: "الأكثر",
      interested: "مهتم",
      least: "الأقل",
      interested: "مهتم",
      more: "أكثر",
      boring: "مملل",
      less: "أقل",
      boring: "مملل",
      most: "الأكثر",
      boring: "مملل",
      least: "الأقل",
      boring: "مملل",
      more: "أكثر",
      beautiful: "جميل",
      less: "أقل",
      beautiful: "جميل",
      most: "الأكثر",
      beautiful: "��ميل",
      least: "الأقل",
      beautiful: "جميل",
      more: "أكثر",
      ugly: "قبيح",
      less: "أقل",
      ugly: "قبيح",
      most: "الأكثر",
      ugly: "قبيح",
      least: "الأقل",
      ugly: "قبيح",
      more: "أكثر",
      intelligent: "ذكي",
      less: "أقل",
      intelligent: "ذكي",
      most: "الأكثر",
      intelligent: "ذكي",
      least: "الأقل",
      intelligent: "ذكي",
      more: "أكثر",
      stupid: "غبي",
      less: "أقل",
      stupid: "غبي",
      most: "الأكثر",
      stupid: "غبي",
      least: "الأقل",
      stupid: "غبي",
      more: "أكثر",
      careful: "��ذر",
      less: "أقل",
      careful: "حذر",
      most: "الأكثر",
      careful: "حذر",
      least: "الأقل",
      careful: "حذر",
      more: "أكثر",
      careless: "مهمل",
      less: "أقل",
      careless: "مهمل",
      most: "الأكثر",
      careless: "مهمل",
      least: "الأقل",
      careless: "مهمل",
      more: "أكثر",
      helpful: "مفيد",
      less: "أقل",
      helpful: "مفيد",
      most: "الأكثر",
      helpful: "مفيد",
      least: "الأقل",
      helpful: "مفيد",
      more: "أكثر",
      harmful: "ضار",
      less: "أقل",
      harmful: "ضار",
      most: "الأكثر",
      harmful: "ضار",
      least: "الأقل",
      harmful: "ضار",
      more: "أكثر",
      useful: "مفيد",
      less: "أقل",
      useful: "مفيد",
      most: "الأكثر",
      useful: "مفيد",
      least: "الأقل",
      useful: "مفيد",
      more: "أكثر",
      useless: "عديم الفائدة",
      less: "أقل",
      useless: "عديم الفائدة",
      most: "الأكثر",
      useless: "عديم الفائدة",
      least: "الأقل",
      useless: "عديم الفائدة",
      more: "أكثر",
      important: "مهم",
      less: "أقل",
      important: "مهم",
      most: "الأكثر",
      important: "مهم",
      least: "الأقل",
      important: "مهم",
      more: "أكثر",
      dangerous: "خطير",
      less: "أقل",
      dangerous: "خطير",
      most: "الأكثر",
      dangerous: "خطير",
      least: "الأقل",
      dangerous: "خطير",
      more: "��كثر",
      safe: "آمن",
      less: "أقل",
      safe: "آمن",
      most: "الأكثر",
      safe: "آم��",
      least: "الأقل",
      safe: "آمن",
      more: "أكثر",
      expensive: "غالي",
      less: "أقل",
      expensive: "غالي",
      most: "الأكثر",
      expensive: "غالي",
      least: "الأقل",
      expensive: "غالي",
      more: "أكثر",
      popular: "شعبي",
      less: "أقل",
      popular: "شعبي",
      most: "الأكثر",
      popular: "شعبي",
      least: "الأقل",
      popular: "شعبي",
      more: "أكثر",
      famous: "مشهور",
      less: "أقل",
      famous: "مشهور",
      most: "الأكثر",
      famous: "مشهور",
      least: "الأقل",
      famous: "مشهور",
      more: "أكثر",
      successful: "ناجح",
      less: "أقل",
      successful: "ناجح",
      most: "الأكثر",
      successful: "ناجح",
      least: "الأقل",
      successful: "ناجح",
      more: "أكثر",
      effective: "فعال",
      less: "أقل",
      effective: "فعال",
      most: "الأكثر",
      effective: "فعال",
      least: "الأقل",
      effective: "فعال",
      more: "أكثر",
      efficient: "كفء",
      less: "أقل",
      efficient: "كفء",
      most: "الأكثر",
      efficient: "كفء",
      least: "الأقل",
      efficient: "كفء",
      more: "أكثر",
      productive: "منتج",
      less: "أقل",
      productive: "منتج",
      most: "الأكثر",
      productive: "منتج",
      least: "الأقل",
      productive: "منتج",
      more: "أكثر",
      creative: "مبدع",
      less: "أقل",
      creative: "مبدع",
      most: "الأكثر",
      creative: "مبدع",
      least: "الأقل",
      creative: "مبدع",
      more: "أكثر",
      innovative: "مبتكر",
      less: "أقل",
      innovative: "مبتكر",
      most: "الأكثر",
      innovative: "مبتكر",
      least: "الأقل",
      innovative: "مبتكر",
      more: "أكثر",
      advanced: "متقدم",
      less: "أقل",
      advanced: "متقدم",
      most: "الأكثر",
      advanced: "متقدم",
      least: "الأقل",
      advanced: "متقدم",
      more: "أكثر",
      modern: "حديث",
      less: "أقل",
      modern: "حديث",
      most: "الأكثر",
      modern: "حديث",
      least: "الأقل",
      modern: "حد��ث",
      more: "أكثر",
      traditional: "تقليدي",
      less: "أقل",
      traditional: "تقليدي",
      most: "الأكثر",
      traditional: "تقليدي",
      least: "الأقل",
      traditional: "تقليد��",
    },
  },
  en: {
    common: {
      tagline: "Your Premier Destination for Sports Talents",
      home: "Home",
      login: "Login",
      logout: "Logout",
      myAccount: "My Account",
      players: "Players",
      coaches: "Coaches",
      technicalDirector: "Technical Director",
      supportStaff: "Support Staff",
      goalkeepers: "Goalkeepers",
      fitnessCoaches: "Fitness Coaches",
      goalkeepingCoaches: "Goalkeeping Coaches",
      clubs: "Clubs",
      agents: "Agents",
      doctors: "Doctors",
      news: "News",
      about: "About",
      contact: "Contact",
      services: "Services",
      categories: "Categories",
      searchPlayers: "Search Players",
      searchCoaches: "Search Coaches",
      openMenu: "Open Menu",
      assistant: "Assistant",
      analyst: "Analyst",
      physiotherapist: "Physiotherapist",
      nutritionist: "Nutritionist",
      teamManager: "Team Manager",
      kitManager: "Kit Manager",
      scoutingTeam: "Scouting Team",
      language: "Language",
      changeLanguage: "Change Language",

      // Player positions
      striker: "Striker",
      attackingMid: "Attacking Midfielder",
      defensiveMid: "Defensive Midfielder",
      leftWing: "Left Wing",
      rightWing: "Right Wing",
      leftBack: "Left Back",
      rightBack: "Right Back",
      centerBack: "Center Back",
      goalkeeper: "Goalkeeper",
      allPlayers: "All Players",

      // Coach types
      headCoach: "Head Coach",
      assistantCoach: "Assistant Coach",
      allCoaches: "All Coaches",

      // Dashboard types
      adminDashboard: "Admin Dashboard",
      userDashboard: "User Dashboard",
      playerDashboard: "Player Dashboard",
      coachDashboard: "Coach Dashboard",
      clubDashboard: "Club Dashboard",
      agentDashboard: "Agent Dashboard",
      doctorDashboard: "Doctor Dashboard",

      // Accessibility
      skipToContent: "Skip to main content",
      accessibilityAndLanguage: "Accessibility & Language Options",
      accessibilitySettings: "Accessibility Settings",
      displayMode: "Display Mode",
      lightMode: "Light",
      darkMode: "Dark",
      systemMode: "System",
      highContrast: "High Contrast",
      fontSize: "Font Size",
      voiceNavigation: "Voice Navigation",
      reduceMotion: "Reduce Motion",
      resetSettings: "Reset Settings",
      overview: "Overview",
      files: "Files",
      meetings: "Meetings",
      totalUsers: "Total Users",
      newUsers: "New Users",
      totalChats: "Total Chats",
      activeAppointments: "Active Appointments",
      lastMonth: "from last month",
      userGrowth: "User Growth",
      userGrowthStats: "User growth statistics over the last six months",
      userTypeDistribution: "User Type Distribution",
      userTypeRatio: "Distribution ratio of users by type",
      latestPlayers: "Latest Players",
      latestCoaches: "Latest Coaches",
      latestChats: "Latest Chats",
      loading: "Loading...",
      active: "Active",
      minutesAgo: "{minutes} minutes ago",
      hoursAgo: "{hours} hours ago",
      footballPlayer: "Football Player",
      footballCoach: "Football Coach",
      uploadNewFile: "Upload New File",
      uploadFileDescription:
        "Upload an image, video, or document file for a player, coach, club, or agent",
      fileTitle: "File Title",
      fileDescription: "File Description",
      fileDescriptionOptional: "File Description (optional)",
      fileType: "File Type",
      selectFileType: "Select File Type",
      relatedTo: "Related To",
      selectRelatedType: "Select Related Type",
      chooseFile: "Choose File",
      uploadFile: "Upload File",
      fileUploadedSuccess: "File Uploaded",
      fileUploadedSuccessDesc: "File has been uploaded successfully",
      preview: "Preview",
      published: "Published",
      inReview: "In Review",
      image: "Image",
      video: "Video",
      document: "Document",
      fileSize: "File Size",
      view: "View",
      viewFile: "View File",
      viewing: "Viewing",
      editFile: "Edit File",
      editingInfo: "Editing information for",
      deleteFile: "Delete File",
      fileDeletedSuccess: "Successfully deleted",
      searchMeeting: "Search for a meeting...",
      meetingStatus: "Meeting Status",
      allMeetings: "All Meetings",
      scheduled: "Scheduled",
      completed: "Completed",
      canceled: "Canceled",
      scheduleNewMeeting: "Schedule New Meeting",
      scheduleNewVideoMeeting: "Schedule New Video Meeting",
      createLiveVideoMeeting:
        "Create a live video meeting for an interview or discussion",
      meetingTitle: "Meeting Title",
      meetingTitlePlaceholder: "Meeting Title",
      meetingDescription: "Meeting Description",
      meetingDescriptionPlaceholder: "Meeting Description (optional)",
      meetingDate: "Meeting Date",
      selectDate: "Select Date",
      meetingTime: "Meeting Time",
      meetingDuration: "Meeting Duration (in minutes)",
      meetingAttendees: "Meeting Attendees",
      addAttendees: "Add Attendees",
      noAttendeesAdded: "No attendees added yet",
      player: "Player",
      coach: "Coach",
      club: "Club",
      agent: "Agent",
      doctor: "Doctor",
      recordMeeting: "Record Meeting",
      scheduleMeeting: "Schedule Meeting",
      videoMeetings: "Video Meetings",
      videoMeetingsDescription: "List of all scheduled and past video meetings",
      forwards: "Forwards",
      midfielders: "Midfielders",
      defenders: "Defenders",
      wingbacks: "Wingbacks",
      allPlayers: "All Players",

      // View options
      gridView: "Grid View",
      listView: "List View",

      // Home Page Specific (Additional translations)
      soccerHunter: "Soccer Hunter",
      worldClassPlatform: "World-Class Platform",
      strikers: "Strikers",
      defensiveMidfielders: "Defensive Midfielders",
      
      // Position Descriptions
      goalkeeperDescription: "First line of defense and goal protector",
      strikerDescription: "Professional goalscorers and attackers",
      leftWingDescription: "Fast left wing players",
      rightWingDescription: "Creative right wing players", 
      attackingMidDescription: "Goal creators and attacking midfielders",
      defensiveMidfielderDescription: "Midfield warriors and defenders",
      
      // Service Descriptions
      coachesDescription: "Professional and qualified coaches",
      doctorsDescription: "Sports medicine specialists",
      clubsDescription: "Professional clubs and academies",
      agentsDescription: "Certified player agents",
      
      // Specialties
      sportsMedicine: "Sports Medicine",
      physiotherapy: "Physiotherapy",
      sportsNutrition: "Sports Nutrition",
      sportsPsychology: "Sports Psychology",
      professionalClubs: "Professional Clubs",
      academies: "Academies",
      youthDevelopment: "Youth Development",
      scouting: "Scouting",
      talentManagement: "Talent Management",
      contractNegotiation: "Contract Negotiation",
      careerDevelopment: "Career Development",
      transfers: "Transfers",
      
      // Home Page Content
      searchPlaceholder: "Search for players, coaches, clubs...",
      featuredPlayerCategories: "Featured Player Categories",
      explorePlayerPositions: "Explore different player positions and find the right talents",
      professionalServices: "Professional Services",
      comprehensiveSportsEcosystem: "A comprehensive sports ecosystem that meets all your needs",
      exploreService: "Explore Service",
      exploreCategory: "Explore Category",
      quickActions: "Quick Actions",
      getStartedToday: "Start your sports journey today",
      createProfile: "Create Profile",
      createProfileDescription: "Create your profile and showcase your talents to the world",
      findTalent: "Find Talent",
      findTalentDescription: "Search for the best sports talents in your area",
      startSearching: "Start Searching",
      getSupport: "Get Support",
      getSupportDescription: "Contact our support team for assistance",
      joinSoccerHunter: "Join Soccer Hunter",
      joinDescription: "Join thousands of sports talents and discover unlimited opportunities",
      joinNow: "Join Now",
      learnMore: "Learn More",
      getStarted: "Get Started",
      contactUs: "Contact Us",
      
      // Statistics
      activeUsers: "Active Users",
      successfulMatches: "Successful Matches",
      countries: "Countries",
      userRating: "User Rating",
      featured: "Featured",
      specializations: "Specializations",
    },
  },
  fr: {
    common: {
      home: "Accueil",
      login: "Connexion",
      logout: "Déconnexion",
      myAccount: "Mon Compte",
      players: "Joueurs",
      coaches: "Entraîneurs",
      technicalDirector: "Directeur Technique",
      supportStaff: "Personnel de Soutien",
      goalkeepers: "Gardiens de but",
      fitnessCoaches: "Préparateurs Physiques",
      goalkeepingCoaches: "Entraîneurs de Gardiens",
      clubs: "Clubs",
      agents: "Agents",
      doctors: "Médecins",
      news: "Actualités",
      about: "À Propos",
      contact: "Contact",
      services: "Services",
      categories: "Catégories",
      searchPlayers: "Rechercher des joueurs",
      searchCoaches: "Rechercher des entraîneurs",
      openMenu: "Ouvrir le menu",
      assistant: "Assistant",
      analyst: "Analyste",
      physiotherapist: "Kinésithérapeute",
      nutritionist: "Nutritionniste",
      teamManager: "Manager d'équipe",
      kitManager: "Intendant",
      scoutingTeam: "Équipe de Recrutement",
      language: "Langue",
      changeLanguage: "Changer de langue",
      overview: "Vue d'ensemble",
      files: "Fichiers",
      meetings: "Réunions",
      totalUsers: "Utilisateurs totaux",
      newUsers: "Nouveaux utilisateurs",
      totalChats: "Discussions totales",
      activeAppointments: "Rendez-vous actifs",
      lastMonth: "par rapport au mois dernier",
      userGrowth: "Croissance des utilisateurs",
      userGrowthStats:
        "Statistiques de croissance des utilisateurs au cours des six derniers mois",
      userTypeDistribution: "Distribution des types d'utilisateurs",
      userTypeRatio: "Ratio de distribution des utilisateurs par type",
      latestPlayers: "Derniers joueurs",
      latestCoaches: "Derniers entraîneurs",
      latestChats: "Dernières discussions",
      loading: "Chargement...",
      active: "Actif",
      minutesAgo: "il y a {minutes} minutes",
      hoursAgo: "il y a {hours} heures",
      footballPlayer: "Joueur de football",
      footballCoach: "Entraîneur de football",
      uploadNewFile: "Télécharger un nouveau fichier",

      // Home Page Specific
      tagline: "Votre destination principale pour les talents sportifs",
      soccerHunter: "Soccer Hunter",
      worldClassPlatform: "Plateforme de classe mondiale",
      strikers: "Attaquants",
      defensiveMidfielders: "Milieux défensifs",
      
      // Position Descriptions
      goalkeeperDescription: "Première ligne de défense et protecteur de but",
      strikerDescription: "Buteurs et attaquants professionnels",
      leftWingDescription: "Ailiers gauches rapides",
      rightWingDescription: "Ailiers droits créatifs",
      attackingMidDescription: "Créateurs de but et milieux offensifs",
      defensiveMidfielderDescription: "Guerriers du milieu et défenseurs",
      
      // Service Descriptions
      coachesDescription: "Entraîneurs professionnels et qualifiés",
      doctorsDescription: "Spécialistes en médecine du sport",
      clubsDescription: "Clubs professionnels et académies",
      agentsDescription: "Agents de joueurs certifiés",
      
      // Specialties
      sportsMedicine: "Médecine du sport",
      physiotherapy: "Kinésithérapie",
      sportsNutrition: "Nutrition sportive",
      sportsPsychology: "Psychologie du sport",
      professionalClubs: "Clubs professionnels",
      academies: "Académies",
      youthDevelopment: "Développement des jeunes",
      scouting: "Recrutement",
      talentManagement: "Gestion des talents",
      contractNegotiation: "Négociation de contrats",
      careerDevelopment: "Développement de carrière",
      transfers: "Transferts",
      
      // Home Page Content
      searchPlaceholder: "Rechercher des joueurs, entraîneurs, clubs...",
      featuredPlayerCategories: "Catégories de joueurs en vedette",
      explorePlayerPositions: "Explorez différentes positions de joueurs et trouvez les bons talents",
      professionalServices: "Services professionnels",
      comprehensiveSportsEcosystem: "Un écosystème sportif complet qui répond à tous vos besoins",
      exploreService: "Explorer le service",
      exploreCategory: "Explorer la catégorie",
      quickActions: "Actions rapides",
      getStartedToday: "Commencez votre parcours sportif aujourd'hui",
      createProfile: "Créer un profil",
      createProfileDescription: "Créez votre profil et présentez vos talents au monde",
      findTalent: "Trouver des talents",
      findTalentDescription: "Recherchez les meilleurs talents sportifs de votre région",
      startSearching: "Commencer la recherche",
      getSupport: "Obtenir de l'aide",
      getSupportDescription: "Contactez notre équipe de support pour obtenir de l'aide",
      joinSoccerHunter: "Rejoindre Soccer Hunter",
      joinDescription: "Rejoignez des milliers de talents sportifs et découvrez des opportunités illimitées",
      joinNow: "Rejoindre maintenant",
      learnMore: "En savoir plus",
      getStarted: "Commencer",
      contactUs: "Nous contacter",
      
      // Statistics
      activeUsers: "Utilisateurs actifs",
      successfulMatches: "Correspondances réussies",
      countries: "Pays",
      userRating: "Note des utilisateurs",
      featured: "En vedette",
      specializations: "Spécialisations",
    },
  },
  es: {
    common: {
      home: "Inicio",
      login: "Iniciar Sesión",
      logout: "Cerrar Sesión",
      myAccount: "Mi Cuenta",
      players: "Jugadores",
      coaches: "Entrenadores",
      technicalDirector: "Director Técnico",
      supportStaff: "Personal de Apoyo",
      goalkeepers: "Porteros",
      fitnessCoaches: "Preparadores Físicos",
      goalkeepingCoaches: "Entrenadores de Porteros",
      clubs: "Clubes",
      agents: "Agentes",
      doctors: "Médicos",
      news: "Noticias",
      about: "Acerca de",
      contact: "Contacto",
      services: "Servicios",
      categories: "Categorías",
      searchPlayers: "Buscar Jugadores",
      searchCoaches: "Buscar Entrenadores",
      openMenu: "Abrir Menú",
      assistant: "Asistente",
      analyst: "Analista",
      physiotherapist: "Fisioterapeuta",
      nutritionist: "Nutricionista",
      teamManager: "Gerente del Equipo",
      kitManager: "Encargado de Equipamiento",
      scoutingTeam: "Equipo de Cazatalentos",
      language: "Idioma",
      changeLanguage: "Cambiar Idioma",
      overview: "Visión general",
      files: "Archivos",
      meetings: "Reuniones",
      totalUsers: "Usuarios totales",
      newUsers: "Nuevos usuarios",
      totalChats: "Chats totales",
      activeAppointments: "Citas activas",
      lastMonth: "desde el mes pasado",
      userGrowth: "Crecimiento de usuarios",
      userGrowthStats:
        "Estadísticas de crecimiento de usuarios en los últimos seis meses",
      userTypeDistribution: "Distribución de tipos de usuarios",
      userTypeRatio: "Proporción de distribución de usuarios por tipo",
      latestPlayers: "Últimos jugadores",
      latestCoaches: "Últimos entrenadores",
      latestChats: "Últimas conversaciones",
      loading: "Cargando...",
      active: "Activo",
      minutesAgo: "hace {minutes} minutos",
      hoursAgo: "hace {hours} horas",
      footballPlayer: "Jugador de fútbol",
      footballCoach: "Entrenador de fútbol",
      uploadNewFile: "Subir nuevo archivo",
    },
  },
  de: {
    common: {
      home: "Startseite",
      login: "Anmelden",
      logout: "Abmelden",
      myAccount: "Mein Konto",
      players: "Spieler",
      coaches: "Trainer",
      technicalDirector: "Technischer Direktor",
      supportStaff: "Unterstützungspersonal",
      goalkeepers: "Torhüter",
      fitnessCoaches: "Fitnesstrainer",
      goalkeepingCoaches: "Torwarttrainer",
      clubs: "Vereine",
      agents: "Agenten",
      doctors: "Ärzte",
      news: "Nachrichten",
      about: "Über uns",
      contact: "Kontakt",
      services: "Dienstleistungen",
      categories: "Kategorien",
      searchPlayers: "Spieler suchen",
      searchCoaches: "Trainer suchen",
      openMenu: "Menü öffnen",
      assistant: "Assistent",
      analyst: "Analyst",
      physiotherapist: "Physiotherapeut",
      nutritionist: "Ernährungsberater",
      teamManager: "Teammanager",
      kitManager: "Zeugwart",
      scoutingTeam: "Scouting-Team",
      language: "Sprache",
      changeLanguage: "Sprache ändern",
      overview: "Übersicht",
      files: "Dateien",
      meetings: "Besprechungen",
      totalUsers: "Gesamtbenutzer",
      newUsers: "Neue Benutzer",
      totalChats: "Gesamtchats",
      activeAppointments: "Aktive Termine",
      lastMonth: "im Vergleich zum Vormonat",
      userGrowth: "Benutzerwachstum",
      userGrowthStats: "Benutzerwachstumsstatistiken der letzten sechs Monate",
      userTypeDistribution: "Benutzertyp-Verteilung",
      userTypeRatio: "Verteilungsverhältnis der Benutzer nach Typ",
      latestPlayers: "Neueste Spieler",
      latestCoaches: "Neueste Trainer",
      latestChats: "Neueste Chats",
      loading: "Wird geladen...",
      active: "Aktiv",
      minutesAgo: "vor {minutes} Minuten",
      hoursAgo: "vor {hours} Stunden",
      footballPlayer: "Fußballspieler",
      footballCoach: "Fußballtrainer",
      uploadNewFile: "Neue Datei hochladen",
    },
  },
  pt: {
    common: {
      home: "Início",
      login: "Entrar",
      logout: "Sair",
      myAccount: "Minha Conta",
      players: "Jogadores",
      coaches: "Treinadores",
      technicalDirector: "Diretor Técnico",
      supportStaff: "Equipe de Apoio",
      goalkeepers: "Goleiros",
      fitnessCoaches: "Preparadores Físicos",
      goalkeepingCoaches: "Treinadores de Goleiros",
      clubs: "Clubes",
      agents: "Agentes",
      doctors: "Médicos",
      news: "Notícias",
      about: "Sobre",
      contact: "Contato",
      services: "Serviços",
      categories: "Categorias",
      searchPlayers: "Buscar Jogadores",
      searchCoaches: "Buscar Treinadores",
      openMenu: "Abrir Menu",
      assistant: "Assistente",
      analyst: "Analista",
      physiotherapist: "Fisioterapeuta",
      nutritionist: "Nutricionista",
      teamManager: "Gerente de Equipe",
      kitManager: "Roupeiro",
      scoutingTeam: "Equipe de Observação",
      language: "Idioma",
      changeLanguage: "Mudar Idioma",
      overview: "Visão Geral",
      files: "Arquivos",
      meetings: "Reuniões",
      totalUsers: "Total de Usuários",
      newUsers: "Novos Usuários",
      totalChats: "Total de Conversas",
      activeAppointments: "Compromissos Ativos",
      lastMonth: "em relação ao mês anterior",
      userGrowth: "Crescimento de Usuários",
      userGrowthStats:
        "Estatísticas de crescimento de usuários nos últimos seis meses",
      userTypeDistribution: "Distribuição de Tipos de Usuários",
      userTypeRatio: "Proporção de distribuição de usuários por tipo",
      latestPlayers: "Jogadores Recentes",
      latestCoaches: "Treinadores Recentes",
      latestChats: "Conversas Recentes",
      loading: "Carregando...",
      active: "Ativo",
      minutesAgo: "há {minutes} minutos",
      hoursAgo: "há {hours} horas",
      footballPlayer: "Jogador de Futebol",
      footballCoach: "Treinador de Futebol",
      uploadNewFile: "Enviar Novo Arquivo",
    },
  },
  it: {
    common: {
      home: "Home",
      login: "Accedi",
      logout: "Esci",
      myAccount: "Il Mio Account",
      players: "Giocatori",
      coaches: "Allenatori",
      technicalDirector: "Direttore Tecnico",
      supportStaff: "Staff di Supporto",
      goalkeepers: "Portieri",
      fitnessCoaches: "Preparatori Atletici",
      goalkeepingCoaches: "Allenatori dei Portieri",
      clubs: "Club",
      agents: "Agenti",
      doctors: "Medici",
      news: "Notizie",
      about: "Chi Siamo",
      contact: "Contatti",
      services: "Servizi",
      categories: "Categorie",
      searchPlayers: "Cerca Giocatori",
      searchCoaches: "Cerca Allenatori",
      openMenu: "Apri Menu",
      assistant: "Assistente",
      analyst: "Analista",
      physiotherapist: "Fisioterapista",
      nutritionist: "Nutrizionista",
      teamManager: "Team Manager",
      kitManager: "Magazziniere",
      scoutingTeam: "Team di Osservatori",
      language: "Lingua",
      changeLanguage: "Cambia Lingua",
      overview: "Panoramica",
      files: "File",
      meetings: "Riunioni",
      totalUsers: "Utenti Totali",
      newUsers: "Nuovi Utenti",
      totalChats: "Chat Totali",
      activeAppointments: "Appuntamenti Attivi",
      lastMonth: "rispetto al mese scorso",
      userGrowth: "Crescita Utenti",
      userGrowthStats:
        "Statistiche di crescita degli utenti negli ultimi sei mesi",
      userTypeDistribution: "Distribuzione Tipologie Utenti",
      userTypeRatio: "Rapporto di distribuzione degli utenti per tipologia",
      latestPlayers: "Ultimi Giocatori",
      latestCoaches: "Ultimi Allenatori",
      latestChats: "Ultime Chat",
      loading: "Caricamento...",
      active: "Attivo",
      minutesAgo: "{minutes} minuti fa",
      hoursAgo: "{hours} ore fa",
      footballPlayer: "Calciatore",
      footballCoach: "Allenatore di Calcio",
      uploadNewFile: "Carica Nuovo File",
    },
  },
  la: {
    common: {
      home: "Domus",
      login: "Intrare",
      logout: "Exire",
      myAccount: "Ratio Mea",
      players: "Lusores",
      coaches: "Magistri",
      technicalDirector: "Director Technicus",
      supportStaff: "Adiutores",
      goalkeepers: "Custodes",
      fitnessCoaches: "Magistri Exercitationis",
      goalkeepingCoaches: "Magistri Custodum",
      clubs: "Collegia",
      agents: "Procuratores",
      doctors: "Medici",
      news: "Nuntii",
      about: "De Nobis",
      contact: "Contactus",
      services: "Ministeria",
      categories: "Categoriae",
      searchPlayers: "Quaerere Lusores",
      searchCoaches: "Quaerere Magistros",
      openMenu: "Aperire Menu",
      assistant: "Adiutor",
      analyst: "Analysta",
      physiotherapist: "Physiotherapeuta",
      nutritionist: "Nutritionis Peritus",
      teamManager: "Curator Gregis",
      kitManager: "Curator Vestimentorum",
      scoutingTeam: "Exploratores",
      language: "Lingua",
      changeLanguage: "Mutare Linguam",
      overview: "Conspectus",
      files: "Tabularia",
      meetings: "Conventus",
      totalUsers: "Universi Utentes",
      newUsers: "Novi Utentes",
      totalChats: "Universae Confabulationes",
      activeAppointments: "Constituta Activa",
      lastMonth: "a mense priore",
      userGrowth: "Incrementum Utentium",
      userGrowthStats: "Statistica incrementi utentium per ultimos sex menses",
      userTypeDistribution: "Distributio Generum Utentium",
      userTypeRatio: "Ratio distributionis utentium per genus",
      latestPlayers: "Recentissimi Lusores",
      latestCoaches: "Recentissimi Magistri",
      latestChats: "Recentissimae Confabulationes",
      loading: "Onerando...",
      active: "Activus",
      minutesAgo: "ante {minutes} momenta",
      hoursAgo: "ante {hours} horas",
      footballPlayer: "Lusor Follis Pedalis",
      footballCoach: "Magister Follis Pedalis",
      uploadNewFile: "Novum Documentum Mittere",
    },
  },
};

// Global state for current locale - this is the core reference point
let _currentLocale: Locale = defaultLocale;

/**
 * Simple translation function - gets translations from the messages object
 */
export function getTranslation(key: string, locale: Locale = _currentLocale) {
  try {
    // Split the key into namespace and message key parts
    const parts = key.split(".");
    const namespace = parts.length > 1 ? parts[0] : "common";
    const messageKey = parts.length > 1 ? parts.slice(1).join(".") : key;

    // Check if translation exists in requested locale
    if (messages[locale]?.[namespace]?.[messageKey]) {
      return messages[locale][namespace][messageKey];
    }

    // Fallback to default locale if translation is missing
    if (
      locale !== defaultLocale &&
      messages[defaultLocale]?.[namespace]?.[messageKey]
    ) {
      return messages[defaultLocale][namespace][messageKey];
    }

    // Last resort: return the key itself if no translation found
    return messageKey;
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return key;
  }
}

/**
 * Get the current locale from memory or localStorage
 */
export function getCurrentLocale(): Locale {
  if (typeof window !== "undefined") {
    // Try to get from localStorage first
    try {
      const savedLocale = localStorage.getItem("app-locale") as Locale | null;
      if (savedLocale && locales.includes(savedLocale)) {
        // Update our in-memory locale if localStorage has a valid value
        _currentLocale = savedLocale;
      }
    } catch (error) {
      console.error("Failed to read locale from localStorage:", error);
    }
  }
  return _currentLocale;
}

/**
 * Set the current locale - only updates the internal state
 * Use the setLocale from useTranslation hook for complete UI updates
 */
export function setCurrentLocale(locale: Locale): void {
  if (!locales.includes(locale)) {
    console.error(
      `Invalid locale: ${locale}. Must be one of: ${locales.join(", ")}`,
    );
    return;
  }

  // Update in-memory state
  _currentLocale = locale;

  // Update localStorage for persistence in both systems
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("app-locale", locale);
      localStorage.setItem("siteLanguage", locale);
      console.log(`✅ تم تحديث اللغة في كلا النظامين إلى: ${locale}`);
    } catch (error) {
      console.error("Failed to save locale to localStorage:", error);
    }
  }
}

/**
 * Force reset locale to English (useful for debugging or migration)
 */
export function forceEnglishLocale(): void {
  if (typeof window === "undefined") return;

  _currentLocale = "en";
  localStorage.setItem("app-locale", "en");
  localStorage.removeItem("siteLanguage"); // Remove old key
  document.documentElement.dir = "ltr";
  document.documentElement.lang = "en";
  console.log("🔧 Forced locale reset to English");
}

/**
 * Initialize the locale system - called at app startup
 */
export function initLocale(): void {
  if (typeof window === "undefined") return;

  try {
    // For this release, force English for all users
    forceEnglishLocale();
    return;

    // Check both storage systems for a locale
    const appLocale = localStorage.getItem("app-locale") as Locale | null;
    const siteLanguage = localStorage.getItem("siteLanguage") as Locale | null;

    // First priority: use app-locale if valid
    if (appLocale && locales.includes(appLocale)) {
      _currentLocale = appLocale;
      // Ensure siteLanguage is in sync
      if (siteLanguage !== appLocale) {
        localStorage.setItem("siteLanguage", appLocale);
      }
      console.log("✅ Locale initialized from app-locale:", _currentLocale);
    }
    // Second priority: use siteLanguage if valid
    else if (siteLanguage && locales.includes(siteLanguage)) {
      _currentLocale = siteLanguage;
      // Ensure app-locale is in sync
      localStorage.setItem("app-locale", siteLanguage);
      console.log("✅ Locale initialized from siteLanguage:", _currentLocale);
    }
    // Default case: no valid locale found
    else {
      _currentLocale = defaultLocale;
      // Set both storage systems to default
      localStorage.setItem("app-locale", defaultLocale);
      localStorage.setItem("siteLanguage", defaultLocale);
      console.log("✅ Locale initialized to default:", defaultLocale);
    }

    // Set document properties based on the locale
    document.documentElement.dir = _currentLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = _currentLocale;
    console.log(
      `✅ Document direction set to: ${document.documentElement.dir}`,
    );
    console.log(
      `✅ Document language set to: ${document.documentElement.lang}`,
    );
  } catch (error) {
    console.error("Failed to initialize locale:", error);
    // Ensure we have a valid locale even if initialization fails
    _currentLocale = defaultLocale;
  }
}
