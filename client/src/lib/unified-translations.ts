// Unified translation file for Soccer Hunter platform
// This file consolidates all translations across the application

export type TranslationKey = keyof typeof translations.ar;

export const translations = {
  // Arabic translations
  ar: {
    // Application basics
    appName: "صقر هانتر",
    tagline: "وجهتك الأولى للمواهب الرياضية",
    soccerHunter: "صقر هانتر",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "نجح",

    // Navigation
    home: "الرئيسية",
    about: "عن المنصة",
    contact: "اتصل بنا",
    services: "الخدمات",
    categories: "التصنيفات",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    register: "تسجيل جديد",
    profile: "الم��ف الشخصي",
    dashboard: "لوحة التحكم",
    settings: "الإعدادات",
    myAccount: "حسابي",

    // Language and accessibility
    language: "اللغة",
    changeLanguage: "تغيير اللغة",
    accessibilityAndLanguage: "خيارات الوصول واللغة",
    accessibilitySettings: "إعدادات سهولة الوصول",
    skipToContent: "تخطي إلى المحتوى الرئيسي",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    systemMode: "نظام",
    highContrast: "تباين عالي",

    // User categories and roles
    players: "اللاعبين",
    coaches: "المدربين",
    clubs: "الأندية",
    agents: "الوكلاء",
    doctors: "الأطباء",
    supportStaff: "الجهاز المعاون",

    // Player positions
    goalkeepers: "حراس المرمى",
    defenders: "المدافعين",
    midfielders: "لاعبي الوسط",
    forwards: "المهاجمين",
    striker: "مهاجم",
    attackingMid: "وسط مهاجم",
    defensiveMid: "وسط مدافع",
    leftWing: "جناح أيسر",
    rightWing: "جناح أيمن",
    leftBack: "ظهير أيسر",
    rightBack: "ظهير أيمن",
    centerBack: "مدافع وسط",
    goalkeeper: "حارس مرمى",
    allPlayers: "جميع اللاعبين",

    // Coach types
    headCoach: "مدرب رئيسي",
    assistantCoach: "مدرب مساعد",
    technicalDirector: "المدير الفني",
    goalkeepingCoaches: "مدربي الحراس",
    fitnessCoaches: "مدربي اللياقة",
    allCoaches: "جميع المدربين",

    // Medical specializations
    sportsMedicine: "طب رياضي",
    orthopedicSurgery: "جراحة العظام",
    physiotherapy: "العلاج الطبيعي",
    cardiology: "أمراض القلب",
    neurology: "الأمراض العصبية",
    sportsNutrition: "التغذية الرياضية",
    sportsPsychology: "علم النفس الرياضي",
    emergencyMedicine: "طب الطوارئ",
    rehabilitationMedicine: "طب التأهيل",
    generalMedicine: "طب عام",

    // Search and filtering
    search: "بحث",
    searchPlayers: "البحث عن لاعبين",
    searchCoaches: "البحث عن مدربين",
    searchPlaceholder: "ابحث عن لاعبين أو مدربين...",
    allCategories: "جميع الفئات",
    allClubs: "جميع الأندية",
    allNationalities: "جميع الجنسيات",
    allSpecializations: "جميع التخصصات",
    filters: "المرشحات",
    clearFilters: "مسح المرشحات",
    sortBy: "ترتيب حسب",
    sortByName: "ترتيب حسب الاسم",
    sortByAge: "ترتيب حسب العمر",
    sortByRating: "ترتيب حسب التقييم",
    sortByValue: "ترتيب حسب القيمة السوقية",

    // Results and data display
    found: "تم العثور على",
    noPlayersFound: "لم يتم العثور على لاعبين",
    noCoachesFound: "لم يتم العثور على مدربين",
    noDoctorsFound: "لم يتم العثور على أطباء",
    noAgentsFound: "لم يتم العثور على وكلاء",
    noClubsFound: "لم يتم العثور على أندية",
    noDataAvailable: "لا توجد بيانات متاحة",
    noResults: "لا توجد نتائج",
    tryDifferentFilters: "جرب مرشحات مختلفة",
    checkBackLater: "يرجى العودة لاحقاً أو تصفح فئة أخرى",

    // View options
    gridView: "عرض شبكي",
    listView: "عرض قائمة",
    viewAll: "عرض الكل",
    viewProfile: "عرض الملف",

    // Player/Service information
    position: "المركز",
    specialization: "التخصص",
    club: "النادي",
    nationality: "الجنسية",
    age: "العمر",
    height: "الطول",
    weight: "الوزن",
    marketValue: "القيمة السوقية",
    contract: "انتهاء العقد",
    experience: "الخبرة",
    yearsExperience: "سنة خبرة",

    // Statistics
    goals: "الأهداف",
    assists: "التمريرات الحاسمة",
    matches: "المباريات",
    minutes: "الدقائق",
    cleanSheets: "الشباك النظيفة",
    saves: "الإنقاذات",
    passAccuracy: "دقة التمرير",
    shotAccuracy: "دقة التسديد",

    // Authentication
    username: "اسم المستخدم",
    password: "كلمة المرور",
    email: "البريد الإلكتروني",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب جديد",
    haveAccount: "لديك حساب بالفعل؟",

    // Actions and buttons
    submit: "إرسال",
    save: "حفظ",
    edit: "تعدي��",
    delete: "حذف",
    cancel: "إلغاء",
    confirm: "تأكيد",
    add: "إضافة",
    view: "عرض",
    close: "إغلاق",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    continue: "متابعة",

    // Contact and communication
    contact: "تواصل",
    contactUs: "اتصل بنا",
    sendMessage: "إرسال رسالة",
    message: "الرسالة",
    subject: "الموضوع",
    enterMessage: "أدخل رسالتك هنا...",
    enterSubject: "أدخل موضوع الرسالة",
    sending: "جاري الإرسال...",
    messageSent: "تم إرسال الرسالة!",
    messageSentSuccessfully: "تم إرسال الرسالة بنجاح",

    // Dashboard and management
    overview: "نظرة عامة",
    totalUsers: "إجمالي المستخدمين",
    newUsers: "مستخدمين جدد",
    activeUsers: "مستخدمين نشطين",
    statistics: "الإحصائيات",
    analytics: "التحليلات",
    reports: "التقارير",

    // File management
    upload: "رفع",
    uploadFile: "رفع ملف",
    files: "الملفات",
    media: "الوسائط",
    image: "صورة",
    video: "في��يو",
    document: "مستند",

    // Time and dates
    today: "اليوم",
    yesterday: "أمس",
    tomorrow: "غداً",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    thisYear: "هذا العام",

    // Status indicators
    available: "متاح",
    unavailable: "غير متاح",
    online: "متصل",
    offline: "غير متصل",
    active: "نشط",
    inactive: "غير نشط",
    pending: "قيد الانتظار",
    approved: "موافق عليه",
    rejected: "مرفوض",

    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    company: "الشركة",
    support: "الدعم",

    // Common phrases
    welcomeMessage: "مرحباً بك في منصة صقر هانتر",
    featuredPlayers: "أبرز اللاعبين",
    featuredCoaches: "أبرز المدربين",
    professionalServices: "الخدمات المهنية",
    exploreCategory: "استكشف الفئة",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف أكثر",

    // Error messages
    errorLoading: "خطأ في التحميل",
    tryAgainLater: "حاول مرة أخرى لاحقاً",
    connectionError: "خطأ في الاتصال",
    serverError: "خطأ في الخادم",

    // Success messages
    operationSuccessful: "تمت العملية بنجاح",
    dataSaved: "تم حفظ البيانات",
    profileUpdated: "تم تحديث الملف الشخصي",
  },

  // English translations
  en: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Your Premier Destination for Sports Talents",
    soccerHunter: "Soccer Hunter",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",

    // Navigation
    home: "Home",
    about: "About",
    contact: "Contact",
    services: "Services",
    categories: "Categories",
    login: "Login",
    logout: "Logout",
    register: "Register",
    profile: "Profile",
    dashboard: "Dashboard",
    settings: "Settings",
    myAccount: "My Account",

    // Language and accessibility
    language: "Language",
    changeLanguage: "Change Language",
    accessibilityAndLanguage: "Accessibility & Language",
    accessibilitySettings: "Accessibility Settings",
    skipToContent: "Skip to main content",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    systemMode: "System",
    highContrast: "High Contrast",

    // User categories and roles
    players: "Players",
    coaches: "Coaches",
    clubs: "Clubs",
    agents: "Agents",
    doctors: "Doctors",
    supportStaff: "Support Staff",

    // Player positions
    goalkeepers: "Goalkeepers",
    defenders: "Defenders",
    midfielders: "Midfielders",
    forwards: "Forwards",
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
    technicalDirector: "Technical Director",
    goalkeepingCoaches: "Goalkeeping Coaches",
    fitnessCoaches: "Fitness Coaches",
    allCoaches: "All Coaches",

    // Medical specializations
    sportsMedicine: "Sports Medicine",
    orthopedicSurgery: "Orthopedic Surgery",
    physiotherapy: "Physiotherapy",
    cardiology: "Cardiology",
    neurology: "Neurology",
    sportsNutrition: "Sports Nutrition",
    sportsPsychology: "Sports Psychology",
    emergencyMedicine: "Emergency Medicine",
    rehabilitationMedicine: "Rehabilitation Medicine",
    generalMedicine: "General Medicine",

    // Search and filtering
    search: "Search",
    searchPlayers: "Search Players",
    searchCoaches: "Search Coaches",
    searchPlaceholder: "Search for players or coaches...",
    allCategories: "All Categories",
    allClubs: "All Clubs",
    allNationalities: "All Nationalities",
    allSpecializations: "All Specializations",
    filters: "Filters",
    clearFilters: "Clear Filters",
    sortBy: "Sort By",
    sortByName: "Sort by Name",
    sortByAge: "Sort by Age",
    sortByRating: "Sort by Rating",
    sortByValue: "Sort by Market Value",

    // Results and data display
    found: "Found",
    noPlayersFound: "No players found",
    noCoachesFound: "No coaches found",
    noDoctorsFound: "No doctors found",
    noAgentsFound: "No agents found",
    noClubsFound: "No clubs found",
    noDataAvailable: "No data available",
    noResults: "No results",
    tryDifferentFilters: "Try different filters",
    checkBackLater: "Please check back later or browse another category",

    // View options
    gridView: "Grid View",
    listView: "List View",
    viewAll: "View All",
    viewProfile: "View Profile",

    // Player/Service information
    position: "Position",
    specialization: "Specialization",
    club: "Club",
    nationality: "Nationality",
    age: "Age",
    height: "Height",
    weight: "Weight",
    marketValue: "Market Value",
    contract: "Contract Until",
    experience: "Experience",
    yearsExperience: "years experience",

    // Statistics
    goals: "Goals",
    assists: "Assists",
    matches: "Matches",
    minutes: "Minutes",
    cleanSheets: "Clean Sheets",
    saves: "Saves",
    passAccuracy: "Pass Accuracy",
    shotAccuracy: "Shot Accuracy",

    // Authentication
    username: "Username",
    password: "Password",
    email: "Email",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    createAccount: "Create a new account",
    haveAccount: "Already have an account?",

    // Actions and buttons
    submit: "Submit",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    add: "Add",
    view: "View",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    continue: "Continue",

    // Contact and communication
    contact: "Contact",
    contactUs: "Contact Us",
    sendMessage: "Send Message",
    message: "Message",
    subject: "Subject",
    enterMessage: "Enter your message here...",
    enterSubject: "Enter message subject",
    sending: "Sending...",
    messageSent: "Message Sent!",
    messageSentSuccessfully: "Message sent successfully",

    // Dashboard and management
    overview: "Overview",
    totalUsers: "Total Users",
    newUsers: "New Users",
    activeUsers: "Active Users",
    statistics: "Statistics",
    analytics: "Analytics",
    reports: "Reports",

    // File management
    upload: "Upload",
    uploadFile: "Upload File",
    files: "Files",
    media: "Media",
    image: "Image",
    video: "Video",
    document: "Document",

    // Time and dates
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",

    // Status indicators
    available: "Available",
    unavailable: "Unavailable",
    online: "Online",
    offline: "Offline",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",

    // Footer
    allRightsReserved: "All rights reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    company: "Company",
    support: "Support",

    // Common phrases
    welcomeMessage: "Welcome to Soccer Hunter Platform",
    featuredPlayers: "Featured Players",
    featuredCoaches: "Featured Coaches",
    professionalServices: "Professional Services",
    exploreCategory: "Explore Category",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Error messages
    errorLoading: "Error loading",
    tryAgainLater: "Try again later",
    connectionError: "Connection error",
    serverError: "Server error",

    // Success messages
    operationSuccessful: "Operation successful",
    dataSaved: "Data saved",
    profileUpdated: "Profile updated",
  },

  // French translations
  fr: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Votre Destination Première pour les Talents Sportifs",
    soccerHunter: "Soccer Hunter",
    loading: "Chargement...",
    error: "Une erreur s'est produite",
    success: "Succès",

    // Navigation
    home: "Accueil",
    about: "À Propos",
    contact: "Contact",
    services: "Services",
    categories: "Catégories",
    login: "Connexion",
    logout: "Déconnexion",
    register: "Inscription",
    profile: "Profil",
    dashboard: "Tableau de Bord",
    settings: "Paramètres",
    myAccount: "Mon Compte",

    // Language and accessibility
    language: "Langue",
    changeLanguage: "Changer de Langue",
    accessibilityAndLanguage: "Accessibilité et Langue",
    accessibilitySettings: "Paramètres d'Accessibilité",
    skipToContent: "Passer au contenu principal",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    systemMode: "Système",
    highContrast: "Contraste Élevé",

    // User categories and roles
    players: "Joueurs",
    coaches: "Entraîneurs",
    clubs: "Clubs",
    agents: "Agents",
    doctors: "Médecins",
    supportStaff: "Personnel de Soutien",

    // Player positions
    goalkeepers: "Gardiens de but",
    defenders: "Défenseurs",
    midfielders: "Milieux de terrain",
    forwards: "Attaquants",
    striker: "Attaquant",
    attackingMid: "Milieu Offensif",
    defensiveMid: "Milieu Défensif",
    leftWing: "Ailier Gauche",
    rightWing: "Ailier Droit",
    leftBack: "Arrière Gauche",
    rightBack: "Arrière Droit",
    centerBack: "Défenseur Central",
    goalkeeper: "Gardien de but",
    allPlayers: "Tous les Joueurs",

    // Coach types
    headCoach: "Entraîneur Principal",
    assistantCoach: "Entraîneur Adjoint",
    technicalDirector: "Directeur Technique",
    goalkeepingCoaches: "Entraîneurs des Gardiens",
    fitnessCoaches: "Préparateurs Physiques",
    allCoaches: "Tous les Entraîneurs",

    // Medical specializations
    sportsMedicine: "Médecine du Sport",
    orthopedicSurgery: "Chirurgie Orthopédique",
    physiotherapy: "Physiothérapie",
    cardiology: "Cardiologie",
    neurology: "Neurologie",
    sportsNutrition: "Nutrition Sportive",
    sportsPsychology: "Psychologie du Sport",
    emergencyMedicine: "Médecine d'Urgence",
    rehabilitationMedicine: "Médecine de Réadaptation",
    generalMedicine: "Médecine Générale",

    // Search and filtering
    search: "Recherche",
    searchPlayers: "Rechercher des Joueurs",
    searchCoaches: "Rechercher des Entraîneurs",
    searchPlaceholder: "Rechercher des joueurs ou entraîneurs...",
    allCategories: "Toutes les Catégories",
    allClubs: "Tous les Clubs",
    allNationalities: "Toutes les Nationalités",
    allSpecializations: "Toutes les Spécialisations",
    filters: "Filtres",
    clearFilters: "Effacer les Filtres",
    sortBy: "Trier par",
    sortByName: "Trier par Nom",
    sortByAge: "Trier par Âge",
    sortByRating: "Trier par Note",
    sortByValue: "Trier par Valeur Marchande",

    // Results and data display
    found: "Trouvé",
    noPlayersFound: "Aucun joueur trouvé",
    noCoachesFound: "Aucun entraîneur trouvé",
    noDoctorsFound: "Aucun médecin trouvé",
    noAgentsFound: "Aucun agent trouvé",
    noClubsFound: "Aucun club trouvé",
    noDataAvailable: "Aucune donnée disponible",
    noResults: "Aucun résultat",
    tryDifferentFilters: "Essayer différents filtres",
    checkBackLater:
      "Veuillez revenir plus tard ou parcourir une autre catégorie",

    // View options
    gridView: "Vue Grille",
    listView: "Vue Liste",
    viewAll: "Voir Tout",
    viewProfile: "Voir le Profil",

    // Player/Service information
    position: "Position",
    specialization: "Spécialisation",
    club: "Club",
    nationality: "Nationalité",
    age: "Âge",
    height: "Taille",
    weight: "Poids",
    marketValue: "Valeur Marchande",
    contract: "Contrat jusqu'à",
    experience: "Expérience",
    yearsExperience: "années d'expérience",

    // Statistics
    goals: "Buts",
    assists: "Passes Décisives",
    matches: "Matchs",
    minutes: "Minutes",
    cleanSheets: "Clean Sheets",
    saves: "Arrêts",
    passAccuracy: "Précision des Passes",
    shotAccuracy: "Précision des Tirs",

    // Authentication
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    email: "Email",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié?",
    createAccount: "Créer un nouveau compte",
    haveAccount: "Vous avez déjà un compte?",

    // Actions and buttons
    submit: "Soumettre",
    save: "Enregistrer",
    edit: "Modifier",
    delete: "Supprimer",
    cancel: "Annuler",
    confirm: "Confirmer",
    add: "Ajouter",
    view: "Voir",
    close: "Fermer",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    continue: "Continuer",

    // Contact and communication
    contact: "Contact",
    contactUs: "Contactez-nous",
    sendMessage: "Envoyer un Message",
    message: "Message",
    subject: "Sujet",
    enterMessage: "Entrez votre message ici...",
    enterSubject: "Entrez le sujet du message",
    sending: "Envoi en cours...",
    messageSent: "Message Envoyé!",
    messageSentSuccessfully: "Message envoyé avec succès",

    // Dashboard and management
    overview: "Aperçu",
    totalUsers: "Total des Utilisateurs",
    newUsers: "Nouveaux Utilisateurs",
    activeUsers: "Utilisateurs Actifs",
    statistics: "Statistiques",
    analytics: "Analytiques",
    reports: "Rapports",

    // File management
    upload: "Télécharger",
    uploadFile: "Télécharger un Fichier",
    files: "Fichiers",
    media: "Médias",
    image: "Image",
    video: "Vidéo",
    document: "Document",

    // Time and dates
    today: "Aujourd'hui",
    yesterday: "Hier",
    tomorrow: "Demain",
    thisWeek: "Cette Semaine",
    thisMonth: "Ce Mois",
    thisYear: "Cette Année",

    // Status indicators
    available: "Disponible",
    unavailable: "Indisponible",
    online: "En ligne",
    offline: "Hors ligne",
    active: "Actif",
    inactive: "Inactif",
    pending: "En attente",
    approved: "Approuvé",
    rejected: "Rejeté",

    // Footer
    allRightsReserved: "Tous droits réservés",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    company: "Entreprise",
    support: "Support",

    // Common phrases
    welcomeMessage: "Bienvenue sur la Plateforme Soccer Hunter",
    featuredPlayers: "Joueurs en Vedette",
    featuredCoaches: "Entraîneurs en Vedette",
    professionalServices: "Services Professionnels",
    exploreCategory: "Explorer la Catégorie",
    getStarted: "Commencer",
    learnMore: "En Savoir Plus",

    // Error messages
    errorLoading: "Erreur de chargement",
    tryAgainLater: "Réessayer plus tard",
    connectionError: "Erreur de connexion",
    serverError: "Erreur du serveur",

    // Success messages
    operationSuccessful: "Opération réussie",
    dataSaved: "Données sauvegardées",
    profileUpdated: "Profil mis à jour",
  },

  // Spanish translations
  es: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Tu Destino Premier para Talentos Deportivos",
    soccerHunter: "Soccer Hunter",
    loading: "Cargando...",
    error: "Ocurrió un error",
    success: "Éxito",

    // Navigation
    home: "Inicio",
    about: "Acerca de",
    contact: "Contacto",
    services: "Servicios",
    categories: "Categorías",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    register: "Registrarse",
    profile: "Perfil",
    dashboard: "Panel de Control",
    settings: "Configuración",
    myAccount: "Mi Cuenta",

    // Language and accessibility
    language: "Idioma",
    changeLanguage: "Cambiar Idioma",
    accessibilityAndLanguage: "Accesibilidad e Idioma",
    accessibilitySettings: "Configuración de Accesibilidad",
    skipToContent: "Saltar al contenido principal",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    systemMode: "Sistema",
    highContrast: "Alto Contraste",

    // User categories and roles
    players: "Jugadores",
    coaches: "Entrenadores",
    clubs: "Clubes",
    agents: "Agentes",
    doctors: "Médicos",
    supportStaff: "Personal de Apoyo",

    // Player positions
    goalkeepers: "Porteros",
    defenders: "Defensores",
    midfielders: "Mediocampistas",
    forwards: "Delanteros",
    striker: "Delantero",
    attackingMid: "Mediocampista Ofensivo",
    defensiveMid: "Mediocampista Defensivo",
    leftWing: "Extremo Izquierdo",
    rightWing: "Extremo Derecho",
    leftBack: "Lateral Izquierdo",
    rightBack: "Lateral Derecho",
    centerBack: "Defensa Central",
    goalkeeper: "Portero",
    allPlayers: "Todos los Jugadores",

    // Coach types
    headCoach: "Entrenador Principal",
    assistantCoach: "Entrenador Asistente",
    technicalDirector: "Director Técnico",
    goalkeepingCoaches: "Entrenadores de Porteros",
    fitnessCoaches: "Preparadores Físicos",
    allCoaches: "Todos los Entrenadores",

    // Medical specializations
    sportsMedicine: "Medicina Deportiva",
    orthopedicSurgery: "Cirugía Ortopédica",
    physiotherapy: "Fisioterapia",
    cardiology: "Cardiología",
    neurology: "Neurología",
    sportsNutrition: "Nutrición Deportiva",
    sportsPsychology: "Psicología Deportiva",
    emergencyMedicine: "Medicina de Emergencia",
    rehabilitationMedicine: "Medicina de Rehabilitación",
    generalMedicine: "Medicina General",

    // Search and filtering
    search: "Buscar",
    searchPlayers: "Buscar Jugadores",
    searchCoaches: "Buscar Entrenadores",
    searchPlaceholder: "Buscar jugadores o entrenadores...",
    allCategories: "Todas las Categorías",
    allClubs: "Todos los Clubes",
    allNationalities: "Todas las Nacionalidades",
    allSpecializations: "Todas las Especializaciones",
    filters: "Filtros",
    clearFilters: "Limpiar Filtros",
    sortBy: "Ordenar por",
    sortByName: "Ordenar por Nombre",
    sortByAge: "Ordenar por Edad",
    sortByRating: "Ordenar por Calificación",
    sortByValue: "Ordenar por Valor de Mercado",

    // Results and data display
    found: "Encontrado",
    noPlayersFound: "No se encontraron jugadores",
    noCoachesFound: "No se encontraron entrenadores",
    noDoctorsFound: "No se encontraron médicos",
    noAgentsFound: "No se encontraron agentes",
    noClubsFound: "No se encontraron clubes",
    noDataAvailable: "No hay datos disponibles",
    noResults: "Sin resultados",
    tryDifferentFilters: "Probar filtros diferentes",
    checkBackLater: "Por favor, vuelve más tarde o navega por otra categoría",

    // View options
    gridView: "Vista de Cuadrícula",
    listView: "Vista de Lista",
    viewAll: "Ver Todo",
    viewProfile: "Ver Perfil",

    // Player/Service information
    position: "Posición",
    specialization: "Especialización",
    club: "Club",
    nationality: "Nacionalidad",
    age: "Edad",
    height: "Altura",
    weight: "Peso",
    marketValue: "Valor de Mercado",
    contract: "Contrato hasta",
    experience: "Experiencia",
    yearsExperience: "años de experiencia",

    // Statistics
    goals: "Goles",
    assists: "Asistencias",
    matches: "Partidos",
    minutes: "Minutos",
    cleanSheets: "Portería a Cero",
    saves: "Paradas",
    passAccuracy: "Precisión de Pases",
    shotAccuracy: "Precisión de Tiros",

    // Authentication
    username: "Nombre de usuario",
    password: "Contraseña",
    email: "Correo electrónico",
    fullName: "Nombre Completo",
    phoneNumber: "Número de Teléfono",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    createAccount: "Crear una nueva cuenta",
    haveAccount: "¿Ya tienes una cuenta?",

    // Actions and buttons
    submit: "Enviar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    add: "Añadir",
    view: "Ver",
    close: "Cerrar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    continue: "Continuar",

    // Contact and communication
    contact: "Contacto",
    contactUs: "Contáctanos",
    sendMessage: "Enviar Mensaje",
    message: "Mensaje",
    subject: "Asunto",
    enterMessage: "Ingresa tu mensaje aquí...",
    enterSubject: "Ingresa el asunto del mensaje",
    sending: "Enviando...",
    messageSent: "¡Mensaje Enviado!",
    messageSentSuccessfully: "Mensaje enviado exitosamente",

    // Dashboard and management
    overview: "Resumen",
    totalUsers: "Total de Usuarios",
    newUsers: "Nuevos Usuarios",
    activeUsers: "Usuarios Activos",
    statistics: "Estadísticas",
    analytics: "Analíticas",
    reports: "Informes",

    // File management
    upload: "Subir",
    uploadFile: "Subir Archivo",
    files: "Archivos",
    media: "Medios",
    image: "Imagen",
    video: "Video",
    document: "Documento",

    // Time and dates
    today: "Hoy",
    yesterday: "Ayer",
    tomorrow: "Mañana",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mes",
    thisYear: "Este Año",

    // Status indicators
    available: "Disponible",
    unavailable: "No disponible",
    online: "En línea",
    offline: "Fuera de línea",
    active: "Activo",
    inactive: "Inactivo",
    pending: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado",

    // Footer
    allRightsReserved: "Todos los derechos reservados",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    company: "Empresa",
    support: "Soporte",

    // Common phrases
    welcomeMessage: "Bienvenido a la Plataforma Soccer Hunter",
    featuredPlayers: "Jugadores Destacados",
    featuredCoaches: "Entrenadores Destacados",
    professionalServices: "Servicios Profesionales",
    exploreCategory: "Explorar Categoría",
    getStarted: "Comenzar",
    learnMore: "Aprende Más",

    // Error messages
    errorLoading: "Error al cargar",
    tryAgainLater: "Inténtalo de nuevo más tarde",
    connectionError: "Error de conexión",
    serverError: "Error del servidor",

    // Success messages
    operationSuccessful: "Operación exitosa",
    dataSaved: "Datos guardados",
    profileUpdated: "Perfil actualizado",
  },

  // German translations
  de: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Ihr erstklassiges Ziel für Sporttalente",
    soccerHunter: "Soccer Hunter",
    loading: "Lädt...",
    error: "Ein Fehler ist aufgetreten",
    success: "Erfolgreich",

    // Navigation
    home: "Startseite",
    about: "Über uns",
    contact: "Kontakt",
    services: "Dienste",
    categories: "Kategorien",
    login: "Anmelden",
    logout: "Abmelden",
    register: "Registrieren",
    profile: "Profil",
    dashboard: "Dashboard",
    settings: "Einstellungen",
    myAccount: "Mein Konto",

    // Language and accessibility
    language: "Sprache",
    changeLanguage: "Sprache ändern",
    accessibilityAndLanguage: "Barrierefreiheit und Sprache",
    accessibilitySettings: "Barrierefreiheits-Einstellungen",
    skipToContent: "Zum Hauptinhalt springen",
    darkMode: "Dunkler Modus",
    lightMode: "Heller Modus",
    systemMode: "System",
    highContrast: "Hoher Kontrast",

    // User categories and roles
    players: "Spieler",
    coaches: "Trainer",
    clubs: "Vereine",
    agents: "Agenten",
    doctors: "Ärzte",
    supportStaff: "Support-Personal",

    // Player positions
    goalkeepers: "Torhüter",
    defenders: "Verteidiger",
    midfielders: "Mittelfeldspieler",
    forwards: "Stürmer",
    striker: "Stürmer",
    attackingMid: "Offensiver Mittelfeldspieler",
    defensiveMid: "Defensiver Mittelfeldspieler",
    leftWing: "Linker Flügel",
    rightWing: "Rechter Flügel",
    leftBack: "Linker Verteidiger",
    rightBack: "Rechter Verteidiger",
    centerBack: "Innenverteidiger",
    goalkeeper: "Torhüter",
    allPlayers: "Alle Spieler",

    // Coach types
    headCoach: "Cheftrainer",
    assistantCoach: "Assistenztrainer",
    technicalDirector: "Technischer Direktor",
    goalkeepingCoaches: "Torwarttrainer",
    fitnessCoaches: "Fitnesstrainer",
    allCoaches: "Alle Trainer",

    // Medical specializations
    sportsMedicine: "Sportmedizin",
    orthopedicSurgery: "Orthopädische Chirurgie",
    physiotherapy: "Physiotherapie",
    cardiology: "Kardiologie",
    neurology: "Neurologie",
    sportsNutrition: "Sporternährung",
    sportsPsychology: "Sportpsychologie",
    emergencyMedicine: "Notfallmedizin",
    rehabilitationMedicine: "Rehabilitationsmedizin",
    generalMedicine: "Allgemeinmedizin",

    // Search and filtering
    search: "Suchen",
    searchPlayers: "Spieler suchen",
    searchCoaches: "Trainer suchen",
    searchPlaceholder: "Spieler oder Trainer suchen...",
    allCategories: "Alle Kategorien",
    allClubs: "Alle Vereine",
    allNationalities: "Alle Nationalitäten",
    allSpecializations: "Alle Spezialisierungen",
    filters: "Filter",
    clearFilters: "Filter löschen",
    sortBy: "Sortieren nach",
    sortByName: "Nach Name sortieren",
    sortByAge: "Nach Alter sortieren",
    sortByRating: "Nach Bewertung sortieren",
    sortByValue: "Nach Marktwert sortieren",

    // Results and data display
    found: "Gefunden",
    noPlayersFound: "Keine Spieler gefunden",
    noCoachesFound: "Keine Trainer gefunden",
    noDoctorsFound: "Keine Ärzte gefunden",
    noAgentsFound: "Keine Agenten gefunden",
    noClubsFound: "Keine Vereine gefunden",
    noDataAvailable: "Keine Daten verfügbar",
    noResults: "Keine Ergebnisse",
    tryDifferentFilters: "Verschiedene Filter versuchen",
    checkBackLater:
      "Bitte später wiederkommen oder andere Kategorie durchsuchen",

    // View options
    gridView: "Rasteransicht",
    listView: "Listenansicht",
    viewAll: "Alle anzeigen",
    viewProfile: "Profil anzeigen",

    // Player/Service information
    position: "Position",
    specialization: "Spezialisierung",
    club: "Verein",
    nationality: "Nationalität",
    age: "Alter",
    height: "Größe",
    weight: "Gewicht",
    marketValue: "Marktwert",
    contract: "Vertrag bis",
    experience: "Erfahrung",
    yearsExperience: "Jahre Erfahrung",

    // Statistics
    goals: "Tore",
    assists: "Assists",
    matches: "Spiele",
    minutes: "Minuten",
    cleanSheets: "Zu Null Spiele",
    saves: "Paraden",
    passAccuracy: "Passgenauigkeit",
    shotAccuracy: "Schussgenauigkeit",

    // Authentication
    username: "Benutzername",
    password: "Passwort",
    email: "E-Mail",
    fullName: "Vollständiger Name",
    phoneNumber: "Telefonnummer",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    createAccount: "Neues Konto erstellen",
    haveAccount: "Haben Sie bereits ein Konto?",

    // Actions and buttons
    submit: "Senden",
    save: "Speichern",
    edit: "Bearbeiten",
    delete: "Löschen",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    add: "Hinzufügen",
    view: "Anzeigen",
    close: "Schließen",
    back: "Zurück",
    next: "Weiter",
    previous: "Vorherige",
    continue: "Fortfahren",

    // Contact and communication
    contact: "Kontakt",
    contactUs: "Kontaktieren Sie uns",
    sendMessage: "Nachricht senden",
    message: "Nachricht",
    subject: "Betreff",
    enterMessage: "Geben Sie hier Ihre Nachricht ein...",
    enterSubject: "Nachrichtenbetreff eingeben",
    sending: "Sendet...",
    messageSent: "Nachricht gesendet!",
    messageSentSuccessfully: "Nachricht erfolgreich gesendet",

    // Dashboard and management
    overview: "Übersicht",
    totalUsers: "Gesamtbenutzer",
    newUsers: "Neue Benutzer",
    activeUsers: "Aktive Benutzer",
    statistics: "Statistiken",
    analytics: "Analysen",
    reports: "Berichte",

    // File management
    upload: "Hochladen",
    uploadFile: "Datei hochladen",
    files: "Dateien",
    media: "Medien",
    image: "Bild",
    video: "Video",
    document: "Dokument",

    // Time and dates
    today: "Heute",
    yesterday: "Gestern",
    tomorrow: "Morgen",
    thisWeek: "Diese Woche",
    thisMonth: "Dieser Monat",
    thisYear: "Dieses Jahr",

    // Status indicators
    available: "Verfügbar",
    unavailable: "Nicht verfügbar",
    online: "Online",
    offline: "Offline",
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Ausstehend",
    approved: "Genehmigt",
    rejected: "Abgelehnt",

    // Footer
    allRightsReserved: "Alle Rechte vorbehalten",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    company: "Unternehmen",
    support: "Support",

    // Common phrases
    welcomeMessage: "Willkommen bei der Soccer Hunter Plattform",
    featuredPlayers: "Vorgestellte Spieler",
    featuredCoaches: "Vorgestellte Trainer",
    professionalServices: "Professionelle Dienste",
    exploreCategory: "Kategorie erkunden",
    getStarted: "Loslegen",
    learnMore: "Mehr erfahren",

    // Error messages
    errorLoading: "Fehler beim Laden",
    tryAgainLater: "Später erneut versuchen",
    connectionError: "Verbindungsfehler",
    serverError: "Serverfehler",

    // Success messages
    operationSuccessful: "Operation erfolgreich",
    dataSaved: "Daten gespeichert",
    profileUpdated: "Profil aktualisiert",
  },

  // Portuguese translations
  pt: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Seu Destino Premier para Talentos Esportivos",
    soccerHunter: "Soccer Hunter",
    loading: "Carregando...",
    error: "Ocorreu um erro",
    success: "Sucesso",

    // Navigation
    home: "Início",
    about: "Sobre",
    contact: "Contato",
    services: "Serviços",
    categories: "Categorias",
    login: "Entrar",
    logout: "Sair",
    register: "Registrar",
    profile: "Perfil",
    dashboard: "Painel",
    settings: "Configurações",
    myAccount: "Minha Conta",

    // Language and accessibility
    language: "Idioma",
    changeLanguage: "Mudar Idioma",
    accessibilityAndLanguage: "Acessibilidade e Idioma",
    accessibilitySettings: "Configurações de Acessibilidade",
    skipToContent: "Pular para o conteúdo principal",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    systemMode: "Sistema",
    highContrast: "Alto Contraste",

    // User categories and roles
    players: "Jogadores",
    coaches: "Treinadores",
    clubs: "Clubes",
    agents: "Agentes",
    doctors: "Médicos",
    supportStaff: "Equipe de Apoio",

    // Player positions
    goalkeepers: "Goleiros",
    defenders: "Defensores",
    midfielders: "Meio-campistas",
    forwards: "Atacantes",
    striker: "Atacante",
    attackingMid: "Meio-campista Ofensivo",
    defensiveMid: "Meio-campista Defensivo",
    leftWing: "Ponta Esquerda",
    rightWing: "Ponta Direita",
    leftBack: "Lateral Esquerdo",
    rightBack: "Lateral Direito",
    centerBack: "Zagueiro Central",
    goalkeeper: "Goleiro",
    allPlayers: "Todos os Jogadores",

    // Coach types
    headCoach: "Treinador Principal",
    assistantCoach: "Treinador Assistente",
    technicalDirector: "Diretor Técnico",
    goalkeepingCoaches: "Treinadores de Goleiros",
    fitnessCoaches: "Preparadores Físicos",
    allCoaches: "Todos os Treinadores",

    // Medical specializations
    sportsMedicine: "Medicina Esportiva",
    orthopedicSurgery: "Cirurgia Ortopédica",
    physiotherapy: "Fisioterapia",
    cardiology: "Cardiologia",
    neurology: "Neurologia",
    sportsNutrition: "Nutrição Esportiva",
    sportsPsychology: "Psicologia Esportiva",
    emergencyMedicine: "Medicina de Emergência",
    rehabilitationMedicine: "Medicina de Reabilitação",
    generalMedicine: "Medicina Geral",

    // Search and filtering
    search: "Buscar",
    searchPlayers: "Buscar Jogadores",
    searchCoaches: "Buscar Treinadores",
    searchPlaceholder: "Buscar jogadores ou treinadores...",
    allCategories: "Todas as Categorias",
    allClubs: "Todos os Clubes",
    allNationalities: "Todas as Nacionalidades",
    allSpecializations: "Todas as Especializações",
    filters: "Filtros",
    clearFilters: "Limpar Filtros",
    sortBy: "Ordenar por",
    sortByName: "Ordenar por Nome",
    sortByAge: "Ordenar por Idade",
    sortByRating: "Ordenar por Avaliação",
    sortByValue: "Ordenar por Valor de Mercado",

    // Results and data display
    found: "Encontrado",
    noPlayersFound: "Nenhum jogador encontrado",
    noCoachesFound: "Nenhum treinador encontrado",
    noDoctorsFound: "Nenhum médico encontrado",
    noAgentsFound: "Nenhum agente encontrado",
    noClubsFound: "Nenhum clube encontrado",
    noDataAvailable: "Nenhum dado disponível",
    noResults: "Nenhum resultado",
    tryDifferentFilters: "Tente filtros diferentes",
    checkBackLater:
      "Por favor, volte mais tarde ou navegue por outra categoria",

    // View options
    gridView: "Visualização em Grade",
    listView: "Visualização em Lista",
    viewAll: "Ver Todos",
    viewProfile: "Ver Perfil",

    // Player/Service information
    position: "Posição",
    specialization: "Especialização",
    club: "Clube",
    nationality: "Nacionalidade",
    age: "Idade",
    height: "Altura",
    weight: "Peso",
    marketValue: "Valor de Mercado",
    contract: "Contrato até",
    experience: "Experiência",
    yearsExperience: "anos de experiência",

    // Statistics
    goals: "Gols",
    assists: "Assistências",
    matches: "Partidas",
    minutes: "Minutos",
    cleanSheets: "Jogos sem sofrer gols",
    saves: "Defesas",
    passAccuracy: "Precisão de Passes",
    shotAccuracy: "Precisão de Chutes",

    // Authentication
    username: "Nome de usuário",
    password: "Senha",
    email: "E-mail",
    fullName: "Nome Completo",
    phoneNumber: "Número de Telefone",
    rememberMe: "Lembrar de mim",
    forgotPassword: "Esqueceu a senha?",
    createAccount: "Criar uma nova conta",
    haveAccount: "Já tem uma conta?",

    // Actions and buttons
    submit: "Enviar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    cancel: "Cancelar",
    confirm: "Confirmar",
    add: "Adicionar",
    view: "Ver",
    close: "Fechar",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    continue: "Continuar",

    // Contact and communication
    contact: "Contato",
    contactUs: "Entre em Contato",
    sendMessage: "Enviar Mensagem",
    message: "Mensagem",
    subject: "Assunto",
    enterMessage: "Digite sua mensagem aqui...",
    enterSubject: "Digite o assunto da mensagem",
    sending: "Enviando...",
    messageSent: "Mensagem Enviada!",
    messageSentSuccessfully: "Mensagem enviada com sucesso",

    // Dashboard and management
    overview: "Visão Geral",
    totalUsers: "Total de Usuários",
    newUsers: "Novos Usuários",
    activeUsers: "Usuários Ativos",
    statistics: "Estatísticas",
    analytics: "Análises",
    reports: "Relatórios",

    // File management
    upload: "Upload",
    uploadFile: "Fazer Upload de Arquivo",
    files: "Arquivos",
    media: "Mídia",
    image: "Imagem",
    video: "Vídeo",
    document: "Documento",

    // Time and dates
    today: "Hoje",
    yesterday: "Ontem",
    tomorrow: "Amanhã",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mês",
    thisYear: "Este Ano",

    // Status indicators
    available: "Disponível",
    unavailable: "Indisponível",
    online: "Online",
    offline: "Offline",
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    approved: "Aprovado",
    rejected: "Rejeitado",

    // Footer
    allRightsReserved: "Todos os direitos reservados",
    privacyPolicy: "Política de Privacidade",
    termsOfService: "Termos de Serviço",
    company: "Empresa",
    support: "Suporte",

    // Common phrases
    welcomeMessage: "Bem-vindo à Plataforma Soccer Hunter",
    featuredPlayers: "Jogadores em Destaque",
    featuredCoaches: "Treinadores em Destaque",
    professionalServices: "Serviços Profissionais",
    exploreCategory: "Explorar Categoria",
    getStarted: "Começar",
    learnMore: "Saiba Mais",

    // Error messages
    errorLoading: "Erro ao carregar",
    tryAgainLater: "Tente novamente mais tarde",
    connectionError: "Erro de conexão",
    serverError: "Erro do servidor",

    // Success messages
    operationSuccessful: "Operação bem-sucedida",
    dataSaved: "Dados salvos",
    profileUpdated: "Perfil atualizado",
  },

  // Italian translations
  it: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "La Tua Destinazione Premier per Talenti Sportivi",
    soccerHunter: "Soccer Hunter",
    loading: "Caricamento...",
    error: "Si è verificato un errore",
    success: "Successo",

    // Navigation
    home: "Home",
    about: "Chi Siamo",
    contact: "Contatto",
    services: "Servizi",
    categories: "Categorie",
    login: "Accedi",
    logout: "Esci",
    register: "Registrati",
    profile: "Profilo",
    dashboard: "Dashboard",
    settings: "Impostazioni",
    myAccount: "Il Mio Account",

    // Language and accessibility
    language: "Lingua",
    changeLanguage: "Cambia Lingua",
    accessibilityAndLanguage: "Accessibilità e Lingua",
    accessibilitySettings: "Impostazioni di Accessibilità",
    skipToContent: "Salta al contenuto principale",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
    systemMode: "Sistema",
    highContrast: "Alto Contrasto",

    // User categories and roles
    players: "Giocatori",
    coaches: "Allenatori",
    clubs: "Club",
    agents: "Agenti",
    doctors: "Medici",
    supportStaff: "Staff di Supporto",

    // Player positions
    goalkeepers: "Portieri",
    defenders: "Difensori",
    midfielders: "Centrocampisti",
    forwards: "Attaccanti",
    striker: "Attaccante",
    attackingMid: "Centrocampista Offensivo",
    defensiveMid: "Centrocampista Difensivo",
    leftWing: "Ala Sinistra",
    rightWing: "Ala Destra",
    leftBack: "Terzino Sinistro",
    rightBack: "Terzino Destro",
    centerBack: "Difensore Centrale",
    goalkeeper: "Portiere",
    allPlayers: "Tutti i Giocatori",

    // Coach types
    headCoach: "Allenatore Principale",
    assistantCoach: "Allenatore Assistente",
    technicalDirector: "Direttore Tecnico",
    goalkeepingCoaches: "Allenatori dei Portieri",
    fitnessCoaches: "Preparatori Atletici",
    allCoaches: "Tutti gli Allenatori",

    // Medical specializations
    sportsMedicine: "Medicina Sportiva",
    orthopedicSurgery: "Chirurgia Ortopedica",
    physiotherapy: "Fisioterapia",
    cardiology: "Cardiologia",
    neurology: "Neurologia",
    sportsNutrition: "Nutrizione Sportiva",
    sportsPsychology: "Psicologia Sportiva",
    emergencyMedicine: "Medicina d'Emergenza",
    rehabilitationMedicine: "Medicina Riabilitativa",
    generalMedicine: "Medicina Generale",

    // Search and filtering
    search: "Cerca",
    searchPlayers: "Cerca Giocatori",
    searchCoaches: "Cerca Allenatori",
    searchPlaceholder: "Cerca giocatori o allenatori...",
    allCategories: "Tutte le Categorie",
    allClubs: "Tutti i Club",
    allNationalities: "Tutte le Nazionalità",
    allSpecializations: "Tutte le Specializzazioni",
    filters: "Filtri",
    clearFilters: "Cancella Filtri",
    sortBy: "Ordina per",
    sortByName: "Ordina per Nome",
    sortByAge: "Ordina per Età",
    sortByRating: "Ordina per Valutazione",
    sortByValue: "Ordina per Valore di Mercato",

    // Results and data display
    found: "Trovato",
    noPlayersFound: "Nessun giocatore trovato",
    noCoachesFound: "Nessun allenatore trovato",
    noDoctorsFound: "Nessun medico trovato",
    noAgentsFound: "Nessun agente trovato",
    noClubsFound: "Nessun club trovato",
    noDataAvailable: "Nessun dato disponibile",
    noResults: "Nessun risultato",
    tryDifferentFilters: "Prova filtri diversi",
    checkBackLater:
      "Si prega di riprovare più tardi o navigare un'altra categoria",

    // View options
    gridView: "Vista Griglia",
    listView: "Vista Elenco",
    viewAll: "Vedi Tutto",
    viewProfile: "Vedi Profilo",

    // Player/Service information
    position: "Posizione",
    specialization: "Specializzazione",
    club: "Club",
    nationality: "Nazionalità",
    age: "Età",
    height: "Altezza",
    weight: "Peso",
    marketValue: "Valore di Mercato",
    contract: "Contratto fino a",
    experience: "Esperienza",
    yearsExperience: "anni di esperienza",

    // Statistics
    goals: "Gol",
    assists: "Assist",
    matches: "Partite",
    minutes: "Minuti",
    cleanSheets: "Clean Sheet",
    saves: "Parate",
    passAccuracy: "Precisione dei Passaggi",
    shotAccuracy: "Precisione dei Tiri",

    // Authentication
    username: "Nome utente",
    password: "Password",
    email: "Email",
    fullName: "Nome Completo",
    phoneNumber: "Numero di Telefono",
    rememberMe: "Ricordami",
    forgotPassword: "Password dimenticata?",
    createAccount: "Crea un nuovo account",
    haveAccount: "Hai già un account?",

    // Actions and buttons
    submit: "Invia",
    save: "Salva",
    edit: "Modifica",
    delete: "Elimina",
    cancel: "Annulla",
    confirm: "Conferma",
    add: "Aggiungi",
    view: "Visualizza",
    close: "Chiudi",
    back: "Indietro",
    next: "Successivo",
    previous: "Precedente",
    continue: "Continua",

    // Contact and communication
    contact: "Contatto",
    contactUs: "Contattaci",
    sendMessage: "Invia Messaggio",
    message: "Messaggio",
    subject: "Oggetto",
    enterMessage: "Inserisci il tuo messaggio qui...",
    enterSubject: "Inserisci l'oggetto del messaggio",
    sending: "Invio in corso...",
    messageSent: "Messaggio Inviato!",
    messageSentSuccessfully: "Messaggio inviato con successo",

    // Dashboard and management
    overview: "Panoramica",
    totalUsers: "Totale Utenti",
    newUsers: "Nuovi Utenti",
    activeUsers: "Utenti Attivi",
    statistics: "Statistiche",
    analytics: "Analisi",
    reports: "Report",

    // File management
    upload: "Carica",
    uploadFile: "Carica File",
    files: "File",
    media: "Media",
    image: "Immagine",
    video: "Video",
    document: "Documento",

    // Time and dates
    today: "Oggi",
    yesterday: "Ieri",
    tomorrow: "Domani",
    thisWeek: "Questa Settimana",
    thisMonth: "Questo Mese",
    thisYear: "Quest'Anno",

    // Status indicators
    available: "Disponibile",
    unavailable: "Non disponibile",
    online: "Online",
    offline: "Offline",
    active: "Attivo",
    inactive: "Inattivo",
    pending: "In attesa",
    approved: "Approvato",
    rejected: "Rifiutato",

    // Footer
    allRightsReserved: "Tutti i diritti riservati",
    privacyPolicy: "Informativa sulla Privacy",
    termsOfService: "Termini di Servizio",
    company: "Azienda",
    support: "Supporto",

    // Common phrases
    welcomeMessage: "Benvenuto nella Piattaforma Soccer Hunter",
    featuredPlayers: "Giocatori in Evidenza",
    featuredCoaches: "Allenatori in Evidenza",
    professionalServices: "Servizi Professionali",
    exploreCategory: "Esplora Categoria",
    getStarted: "Inizia",
    learnMore: "Scopri di Più",

    // Error messages
    errorLoading: "Errore di caricamento",
    tryAgainLater: "Riprova più tardi",
    connectionError: "Errore di connessione",
    serverError: "Errore del server",

    // Success messages
    operationSuccessful: "Operazione riuscita",
    dataSaved: "Dati salvati",
    profileUpdated: "Profilo aggiornato",
  },

  // Latin translations
  la: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Praemium Destinationem Tuam pro Talentis Ludorum",
    soccerHunter: "Soccer Hunter",
    loading: "Oneratur...",
    error: "Error factus est",
    success: "Successus",

    // Navigation
    home: "Domus",
    about: "De Nobis",
    contact: "Contactus",
    services: "Servitia",
    categories: "Categoriae",
    login: "Intrare",
    logout: "Exire",
    register: "Registrare",
    profile: "Descriptio",
    dashboard: "Tabula",
    settings: "Constitutiones",
    myAccount: "Meum Rationem",

    // Language and accessibility
    language: "Lingua",
    changeLanguage: "Mutare Linguam",
    accessibilityAndLanguage: "Accessibilitas et Lingua",
    accessibilitySettings: "Constitutiones Accessibilitatis",
    skipToContent: "Salire ad contentum principalem",
    darkMode: "Modus Obscurus",
    lightMode: "Modus Clarus",
    systemMode: "Systema",
    highContrast: "Altus Contrastus",

    // User categories and roles
    players: "Lusores",
    coaches: "Magistri",
    clubs: "Collegia",
    agents: "Agentes",
    doctors: "Medici",
    supportStaff: "Auxilium Personale",

    // Player positions
    goalkeepers: "Custodes",
    defenders: "Defensores",
    midfielders: "Medii Campi",
    forwards: "Oppugnatores",
    striker: "Oppugnator",
    attackingMid: "Medius Campus Oppugnans",
    defensiveMid: "Medius Campus Defensivus",
    leftWing: "Ala Sinistra",
    rightWing: "Ala Dextra",
    leftBack: "Defensor Sinister",
    rightBack: "Defensor Dexter",
    centerBack: "Defensor Centralis",
    goalkeeper: "Custos",
    allPlayers: "Omnes Lusores",

    // Coach types
    headCoach: "Magister Principalis",
    assistantCoach: "Magister Adiutor",
    technicalDirector: "Director Technicus",
    goalkeepingCoaches: "Magistri Custodum",
    fitnessCoaches: "Magistri Valetudinis",
    allCoaches: "Omnes Magistri",

    // Medical specializations
    sportsMedicine: "Medicina Ludorum",
    orthopedicSurgery: "Chirurgia Orthopedica",
    physiotherapy: "Physiotherapia",
    cardiology: "Cardiologia",
    neurology: "Neurologia",
    sportsNutrition: "Nutritio Ludorum",
    sportsPsychology: "Psychologia Ludorum",
    emergencyMedicine: "Medicina Urgentiae",
    rehabilitationMedicine: "Medicina Rehabilitationis",
    generalMedicine: "Medicina Generalis",

    // Search and filtering
    search: "Quaerere",
    searchPlayers: "Quaerere Lusores",
    searchCoaches: "Quaerere Magistros",
    searchPlaceholder: "Quaerere lusores aut magistros...",
    allCategories: "Omnes Categoriae",
    allClubs: "Omnia Collegia",
    allNationalities: "Omnes Nationalitates",
    allSpecializations: "Omnes Specializationes",
    filters: "Filtri",
    clearFilters: "Purgare Filtros",
    sortBy: "Ordinare per",
    sortByName: "Ordinare per Nomen",
    sortByAge: "Ordinare per Aetatem",
    sortByRating: "Ordinare per Aestimationem",
    sortByValue: "Ordinare per Valorem Mercatus",

    // Results and data display
    found: "Inventum",
    noPlayersFound: "Nulli lusores inventi",
    noCoachesFound: "Nulli magistri inventi",
    noDoctorsFound: "Nulli medici inventi",
    noAgentsFound: "Nulli agentes inventi",
    noClubsFound: "Nulla collegia inventa",
    noDataAvailable: "Nulla data disponibilia",
    noResults: "Nullum resultatum",
    tryDifferentFilters: "Tentare filtros diversos",
    checkBackLater: "Quaeso redi postea aut naviga aliam categoriam",

    // View options
    gridView: "Visio Cancelli",
    listView: "Visio Catalogi",
    viewAll: "Videre Omnia",
    viewProfile: "Videre Descriptionem",

    // Player/Service information
    position: "Positio",
    specialization: "Specializatio",
    club: "Collegium",
    nationality: "Nationalitas",
    age: "Aetas",
    height: "Altitudo",
    weight: "Pondus",
    marketValue: "Valor Mercatus",
    contract: "Contractus usque",
    experience: "Experientia",
    yearsExperience: "anni experientiae",

    // Statistics
    goals: "Scopus",
    assists: "Adiutoria",
    matches: "Certamina",
    minutes: "Minuta",
    cleanSheets: "Munda Lintea",
    saves: "Salvamentum",
    passAccuracy: "Accuratia Passuum",
    shotAccuracy: "Accuratia Iactuum",

    // Authentication
    username: "Nomen Utentis",
    password: "Tessera",
    email: "Cursus Electronicus",
    fullName: "Nomen Plenum",
    phoneNumber: "Numerus Telephonicus",
    rememberMe: "Memento Mei",
    forgotPassword: "Tesserae Oblivio?",
    createAccount: "Creare Novum Rationem",
    haveAccount: "Iam Habes Rationem?",

    // Actions and buttons
    submit: "Mittere",
    save: "Servare",
    edit: "Corrigere",
    delete: "Delere",
    cancel: "Abrogare",
    confirm: "Confirmare",
    add: "Addere",
    view: "Videre",
    close: "Claudere",
    back: "Retro",
    next: "Sequens",
    previous: "Praeceddens",
    continue: "Continuare",

    // Contact and communication
    contact: "Contactus",
    contactUs: "Contacta Nos",
    sendMessage: "Mittere Nuntium",
    message: "Nuntius",
    subject: "Subjectum",
    enterMessage: "Insere nuntium tuum hic...",
    enterSubject: "Insere subjectum nuntii",
    sending: "Mittens...",
    messageSent: "Nuntius Missus!",
    messageSentSuccessfully: "Nuntius cum successu missus",

    // Dashboard and management
    overview: "Conspectus",
    totalUsers: "Totales Utentes",
    newUsers: "Novi Utentes",
    activeUsers: "Utentes Activi",
    statistics: "Statisticae",
    analytics: "Analytica",
    reports: "Relationes",

    // File management
    upload: "Mittere",
    uploadFile: "Mittere Fasciculum",
    files: "Fasciculi",
    media: "Media",
    image: "Imago",
    video: "Video",
    document: "Documentum",

    // Time and dates
    today: "Hodie",
    yesterday: "Heri",
    tomorrow: "Cras",
    thisWeek: "Haec Hebdomada",
    thisMonth: "Hic Mensis",
    thisYear: "Hic Annus",

    // Status indicators
    available: "Disponibilis",
    unavailable: "Non disponibilis",
    online: "In linea",
    offline: "Extra lineam",
    active: "Activus",
    inactive: "Inactivus",
    pending: "Pendens",
    approved: "Approbatus",
    rejected: "Reiectus",

    // Footer
    allRightsReserved: "Omnia iura reservata",
    privacyPolicy: "Regula Privatatis",
    termsOfService: "Condiciones Ministerii",
    company: "Societas",
    support: "Auxilium",

    // Common phrases
    welcomeMessage: "Bene Ventum ad Suggestum Soccer Hunter",
    featuredPlayers: "Lusores Insignes",
    featuredCoaches: "Magistri Insignes",
    professionalServices: "Servitia Professionalia",
    exploreCategory: "Explorare Categoriam",
    getStarted: "Incipere",
    learnMore: "Discere Plus",

    // Error messages
    errorLoading: "Error onerandus",
    tryAgainLater: "Tempta iterum postea",
    connectionError: "Error connexionis",
    serverError: "Error servatoris",

    // Success messages
    operationSuccessful: "Operatio cum successu",
    dataSaved: "Data servata",
    profileUpdated: "Descriptio renovata",
  },
};

export default translations;
