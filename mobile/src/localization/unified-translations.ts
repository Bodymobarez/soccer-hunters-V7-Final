// Unified translations for Soccer Hunter Mobile App
// Consistent with web application translation structure

export type Language = "ar" | "en" | "fr" | "es" | "de" | "pt" | "it" | "la";

export const LANGUAGE_NAMES = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  la: "Latina",
};

export const DEFAULT_LANGUAGE: Language = "ar";

export const translations = {
  // Arabic translations
  ar: {
    // Application basics
    appName: "صقر هانتر",
    tagline: "وجهتك الأولى للمواهب الرياضية",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "نجح",

    // Navigation
    home: "الرئيسية",
    search: "بحث",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    more: "المزيد",
    dashboard: "لوحة التحكم",

    // Language and accessibility
    language: "اللغة",
    changeLanguage: "تغيير اللغة",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",

    // User categories
    players: "اللاعبين",
    coaches: "المدربين",
    clubs: "الأندية",
    agents: "الوكلاء",
    doctors: "الأطباء",

    // Player types
    goalkeepers: "حراس المرمى",
    defenders: "المدافعين",
    midfielders: "لاعبي الوسط",
    forwards: "المهاجمين",

    // Authentication
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    register: "تسجيل جديد",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    email: "البريد الإلكتروني",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب جديد",
    haveAccount: "لديك حساب بالفعل؟",

    // Search and filtering
    searchPlaceholder: "ابحث عن اللاعبين والمدربين...",
    searchResults: "نتائج البحث",
    filters: "المرشحات",
    sortBy: "ترتيب حسب",
    clearFilters: "مسح المرشحات",

    // Profile and user info
    personalInfo: "المعلومات الشخصية",
    editProfile: "تعديل الملف الشخصي",
    viewProfile: "عرض الملف الشخصي",
    position: "المركز",
    specialization: "التخصص",
    club: "النادي",
    nationality: "الجنسية",
    age: "العمر",
    experience: "الخبرة",

    // Actions and buttons
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    view: "عرض",
    contact: "تواصل",
    share: "مشاركة",
    favorite: "المفضلة",

    // Messages and communication
    messages: "الرسائل",
    notifications: "الإشعارات",
    sendMessage: "إرسال رسالة",
    messageToPlayer: "رسالة للاعب",
    messageToCoach: "رسالة للمدرب",

    // Statistics and performance
    statistics: "الإحصائيات",
    goals: "الأهداف",
    assists: "التمريرات الحاسمة",
    matches: "المباريات",
    rating: "التقييم",

    // Settings
    accountSettings: "إعدادات الحساب",
    appSettings: "إعدادات التطبيق",
    privacySettings: "إعدادات الخصوصية",
    notificationSettings: "إعدادات الإشعارات",

    // Error and success messages
    loginError: "فشل تسجيل الدخول",
    networkError: "خطأ في الشبكة",
    operationSuccessful: "تمت العملية بنجاح",
    dataSaved: "تم حفظ البيانات",

    // Common phrases
    welcomeMessage: "مرحباً بك في منصة صقر هانتر",
    featuredPlayers: "أبرز اللاعبين",
    featuredCoaches: "أبرز المدربين",

    // Footer and legal
    about: "عن التطبيق",
    contactUs: "اتصل بنا",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    rateApp: "تقييم التطبيق",
    shareApp: "مشاركة التطبيق",

    // Status indicators
    available: "متاح",
    unavailable: "غير متاح",
    online: "متصل",
    offline: "غير متصل",
    active: "نشط",
    inactive: "غير نشط",
  },

  // English translations
  en: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Your Premier Destination for Sports Talents",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",

    // Navigation
    home: "Home",
    search: "Search",
    profile: "Profile",
    settings: "Settings",
    more: "More",
    dashboard: "Dashboard",

    // Language and accessibility
    language: "Language",
    changeLanguage: "Change Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",

    // User categories
    players: "Players",
    coaches: "Coaches",
    clubs: "Clubs",
    agents: "Agents",
    doctors: "Doctors",

    // Player types
    goalkeepers: "Goalkeepers",
    defenders: "Defenders",
    midfielders: "Midfielders",
    forwards: "Forwards",

    // Authentication
    login: "Login",
    logout: "Logout",
    register: "Register",
    username: "Username",
    password: "Password",
    email: "Email",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    forgotPassword: "Forgot password?",
    createAccount: "Create a new account",
    haveAccount: "Already have an account?",

    // Search and filtering
    searchPlaceholder: "Search for players and coaches...",
    searchResults: "Search Results",
    filters: "Filters",
    sortBy: "Sort By",
    clearFilters: "Clear Filters",

    // Profile and user info
    personalInfo: "Personal Information",
    editProfile: "Edit Profile",
    viewProfile: "View Profile",
    position: "Position",
    specialization: "Specialization",
    club: "Club",
    nationality: "Nationality",
    age: "Age",
    experience: "Experience",

    // Actions and buttons
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    view: "View",
    contact: "Contact",
    share: "Share",
    favorite: "Favorite",

    // Messages and communication
    messages: "Messages",
    notifications: "Notifications",
    sendMessage: "Send Message",
    messageToPlayer: "Message to Player",
    messageToCoach: "Message to Coach",

    // Statistics and performance
    statistics: "Statistics",
    goals: "Goals",
    assists: "Assists",
    matches: "Matches",
    rating: "Rating",

    // Settings
    accountSettings: "Account Settings",
    appSettings: "App Settings",
    privacySettings: "Privacy Settings",
    notificationSettings: "Notification Settings",

    // Error and success messages
    loginError: "Login Failed",
    networkError: "Network Error",
    operationSuccessful: "Operation Successful",
    dataSaved: "Data Saved",

    // Common phrases
    welcomeMessage: "Welcome to Soccer Hunter Platform",
    featuredPlayers: "Featured Players",
    featuredCoaches: "Featured Coaches",

    // Footer and legal
    about: "About App",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    rateApp: "Rate App",
    shareApp: "Share App",

    // Status indicators
    available: "Available",
    unavailable: "Unavailable",
    online: "Online",
    offline: "Offline",
    active: "Active",
    inactive: "Inactive",
  },

  // French translations
  fr: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Votre Destination Première pour les Talents Sportifs",
    loading: "Chargement...",
    error: "Une erreur s'est produite",
    success: "Succès",

    // Navigation
    home: "Accueil",
    search: "Recherche",
    profile: "Profil",
    settings: "Paramètres",
    more: "Plus",
    dashboard: "Tableau de Bord",

    // Language and accessibility
    language: "Langue",
    changeLanguage: "Changer de Langue",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",

    // User categories
    players: "Joueurs",
    coaches: "Entraîneurs",
    clubs: "Clubs",
    agents: "Agents",
    doctors: "Médecins",

    // Player types
    goalkeepers: "Gardiens de but",
    defenders: "Défenseurs",
    midfielders: "Milieux de terrain",
    forwards: "Attaquants",

    // Authentication
    login: "Connexion",
    logout: "Déconnexion",
    register: "Inscription",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    email: "Email",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    forgotPassword: "Mot de passe oublié?",
    createAccount: "Créer un nouveau compte",
    haveAccount: "Vous avez déjà un compte?",

    // Search and filtering
    searchPlaceholder: "Rechercher des joueurs et entraîneurs...",
    searchResults: "Résultats de Recherche",
    filters: "Filtres",
    sortBy: "Trier par",
    clearFilters: "Effacer les Filtres",

    // Profile and user info
    personalInfo: "Informations Personnelles",
    editProfile: "Modifier le Profil",
    viewProfile: "Voir le Profil",
    position: "Position",
    specialization: "Spécialisation",
    club: "Club",
    nationality: "Nationalité",
    age: "Âge",
    experience: "Expérience",

    // Actions and buttons
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    view: "Voir",
    contact: "Contact",
    share: "Partager",
    favorite: "Favori",

    // Messages and communication
    messages: "Messages",
    notifications: "Notifications",
    sendMessage: "Envoyer un Message",
    messageToPlayer: "Message au Joueur",
    messageToCoach: "Message à l'Entraîneur",

    // Statistics and performance
    statistics: "Statistiques",
    goals: "Buts",
    assists: "Passes Décisives",
    matches: "Matchs",
    rating: "Note",

    // Settings
    accountSettings: "Paramètres du Compte",
    appSettings: "Paramètres de l'App",
    privacySettings: "Paramètres de Confidentialité",
    notificationSettings: "Paramètres de Notification",

    // Error and success messages
    loginError: "Échec de la connexion",
    networkError: "Erreur de réseau",
    operationSuccessful: "Opération réussie",
    dataSaved: "Données sauvegardées",

    // Common phrases
    welcomeMessage: "Bienvenue sur la Plateforme Soccer Hunter",
    featuredPlayers: "Joueurs en Vedette",
    featuredCoaches: "Entraîneurs en Vedette",

    // Footer and legal
    about: "À Propos de l'App",
    contactUs: "Contactez-nous",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    rateApp: "Évaluer l'App",
    shareApp: "Partager l'App",

    // Status indicators
    available: "Disponible",
    unavailable: "Indisponible",
    online: "En ligne",
    offline: "Hors ligne",
    active: "Actif",
    inactive: "Inactif",
  },

  // Spanish translations
  es: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Tu Destino Premier para Talentos Deportivos",
    loading: "Cargando...",
    error: "Ocurrió un error",
    success: "Éxito",

    // Navigation
    home: "Inicio",
    search: "Buscar",
    profile: "Perfil",
    settings: "Configuración",
    more: "Más",
    dashboard: "Panel de Control",

    // Language and accessibility
    language: "Idioma",
    changeLanguage: "Cambiar Idioma",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",

    // User categories
    players: "Jugadores",
    coaches: "Entrenadores",
    clubs: "Clubes",
    agents: "Agentes",
    doctors: "Médicos",

    // Player types
    goalkeepers: "Porteros",
    defenders: "Defensores",
    midfielders: "Mediocampistas",
    forwards: "Delanteros",

    // Authentication
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    register: "Registrarse",
    username: "Nombre de usuario",
    password: "Contraseña",
    email: "Correo electrónico",
    fullName: "Nombre Completo",
    phoneNumber: "Número de Teléfono",
    forgotPassword: "¿Olvidaste tu contraseña?",
    createAccount: "Crear una nueva cuenta",
    haveAccount: "¿Ya tienes una cuenta?",

    // Search and filtering
    searchPlaceholder: "Buscar jugadores y entrenadores...",
    searchResults: "Resultados de Búsqueda",
    filters: "Filtros",
    sortBy: "Ordenar por",
    clearFilters: "Limpiar Filtros",

    // Profile and user info
    personalInfo: "Información Personal",
    editProfile: "Editar Perfil",
    viewProfile: "Ver Perfil",
    position: "Posición",
    specialization: "Especialización",
    club: "Club",
    nationality: "Nacionalidad",
    age: "Edad",
    experience: "Experiencia",

    // Actions and buttons
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Añadir",
    view: "Ver",
    contact: "Contacto",
    share: "Compartir",
    favorite: "Favorito",

    // Messages and communication
    messages: "Mensajes",
    notifications: "Notificaciones",
    sendMessage: "Enviar Mensaje",
    messageToPlayer: "Mensaje al Jugador",
    messageToCoach: "Mensaje al Entrenador",

    // Statistics and performance
    statistics: "Estadísticas",
    goals: "Goles",
    assists: "Asistencias",
    matches: "Partidos",
    rating: "Calificación",

    // Settings
    accountSettings: "Configuración de Cuenta",
    appSettings: "Configuración de App",
    privacySettings: "Configuración de Privacidad",
    notificationSettings: "Configuración de Notificaciones",

    // Error and success messages
    loginError: "Error de inicio de sesión",
    networkError: "Error de red",
    operationSuccessful: "Operación exitosa",
    dataSaved: "Datos guardados",

    // Common phrases
    welcomeMessage: "Bienvenido a la Plataforma Soccer Hunter",
    featuredPlayers: "Jugadores Destacados",
    featuredCoaches: "Entrenadores Destacados",

    // Footer and legal
    about: "Acerca de la App",
    contactUs: "Contáctanos",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    rateApp: "Calificar App",
    shareApp: "Compartir App",

    // Status indicators
    available: "Disponible",
    unavailable: "No disponible",
    online: "En línea",
    offline: "Fuera de línea",
    active: "Activo",
    inactive: "Inactivo",
  },

  // German translations
  de: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Ihr erstklassiges Ziel für Sporttalente",
    loading: "Lädt...",
    error: "Ein Fehler ist aufgetreten",
    success: "Erfolgreich",

    // Navigation
    home: "Startseite",
    search: "Suchen",
    profile: "Profil",
    settings: "Einstellungen",
    more: "Mehr",
    dashboard: "Dashboard",

    // Language and accessibility
    language: "Sprache",
    changeLanguage: "Sprache ändern",
    darkMode: "Dunkler Modus",
    lightMode: "Heller Modus",

    // User categories
    players: "Spieler",
    coaches: "Trainer",
    clubs: "Vereine",
    agents: "Agenten",
    doctors: "Ärzte",

    // Player types
    goalkeepers: "Torhüter",
    defenders: "Verteidiger",
    midfielders: "Mittelfeldspieler",
    forwards: "Stürmer",

    // Authentication
    login: "Anmelden",
    logout: "Abmelden",
    register: "Registrieren",
    username: "Benutzername",
    password: "Passwort",
    email: "E-Mail",
    fullName: "Vollständiger Name",
    phoneNumber: "Telefonnummer",
    forgotPassword: "Passwort vergessen?",
    createAccount: "Neues Konto erstellen",
    haveAccount: "Haben Sie bereits ein Konto?",

    // Search and filtering
    searchPlaceholder: "Spieler und Trainer suchen...",
    searchResults: "Suchergebnisse",
    filters: "Filter",
    sortBy: "Sortieren nach",
    clearFilters: "Filter löschen",

    // Profile and user info
    personalInfo: "Persönliche Informationen",
    editProfile: "Profil bearbeiten",
    viewProfile: "Profil anzeigen",
    position: "Position",
    specialization: "Spezialisierung",
    club: "Verein",
    nationality: "Nationalität",
    age: "Alter",
    experience: "Erfahrung",

    // Actions and buttons
    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    delete: "Löschen",
    add: "Hinzufügen",
    view: "Anzeigen",
    contact: "Kontakt",
    share: "Teilen",
    favorite: "Favorit",

    // Messages and communication
    messages: "Nachrichten",
    notifications: "Benachrichtigungen",
    sendMessage: "Nachricht senden",
    messageToPlayer: "Nachricht an Spieler",
    messageToCoach: "Nachricht an Trainer",

    // Statistics and performance
    statistics: "Statistiken",
    goals: "Tore",
    assists: "Assists",
    matches: "Spiele",
    rating: "Bewertung",

    // Settings
    accountSettings: "Kontoeinstellungen",
    appSettings: "App-Einstellungen",
    privacySettings: "Datenschutzeinstellungen",
    notificationSettings: "Benachrichtigungseinstellungen",

    // Error and success messages
    loginError: "Anmeldung fehlgeschlagen",
    networkError: "Netzwerkfehler",
    operationSuccessful: "Operation erfolgreich",
    dataSaved: "Daten gespeichert",

    // Common phrases
    welcomeMessage: "Willkommen bei der Soccer Hunter Plattform",
    featuredPlayers: "Vorgestellte Spieler",
    featuredCoaches: "Vorgestellte Trainer",

    // Footer and legal
    about: "Über die App",
    contactUs: "Kontaktieren Sie uns",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    rateApp: "App bewerten",
    shareApp: "App teilen",

    // Status indicators
    available: "Verfügbar",
    unavailable: "Nicht verfügbar",
    online: "Online",
    offline: "Offline",
    active: "Aktiv",
    inactive: "Inaktiv",
  },

  // Portuguese translations
  pt: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Seu Destino Premier para Talentos Esportivos",
    loading: "Carregando...",
    error: "Ocorreu um erro",
    success: "Sucesso",

    // Navigation
    home: "Início",
    search: "Buscar",
    profile: "Perfil",
    settings: "Configurações",
    more: "Mais",
    dashboard: "Painel",

    // Language and accessibility
    language: "Idioma",
    changeLanguage: "Mudar Idioma",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",

    // User categories
    players: "Jogadores",
    coaches: "Treinadores",
    clubs: "Clubes",
    agents: "Agentes",
    doctors: "Médicos",

    // Player types
    goalkeepers: "Goleiros",
    defenders: "Defensores",
    midfielders: "Meio-campistas",
    forwards: "Atacantes",

    // Authentication
    login: "Entrar",
    logout: "Sair",
    register: "Registrar",
    username: "Nome de usuário",
    password: "Senha",
    email: "E-mail",
    fullName: "Nome Completo",
    phoneNumber: "Número de Telefone",
    forgotPassword: "Esqueceu a senha?",
    createAccount: "Criar uma nova conta",
    haveAccount: "Já tem uma conta?",

    // Search and filtering
    searchPlaceholder: "Buscar jogadores e treinadores...",
    searchResults: "Resultados da Busca",
    filters: "Filtros",
    sortBy: "Ordenar por",
    clearFilters: "Limpar Filtros",

    // Profile and user info
    personalInfo: "Informações Pessoais",
    editProfile: "Editar Perfil",
    viewProfile: "Ver Perfil",
    position: "Posição",
    specialization: "Especialização",
    club: "Clube",
    nationality: "Nacionalidade",
    age: "Idade",
    experience: "Experiência",

    // Actions and buttons
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    add: "Adicionar",
    view: "Ver",
    contact: "Contato",
    share: "Compartilhar",
    favorite: "Favorito",

    // Messages and communication
    messages: "Mensagens",
    notifications: "Notificações",
    sendMessage: "Enviar Mensagem",
    messageToPlayer: "Mensagem para Jogador",
    messageToCoach: "Mensagem para Treinador",

    // Statistics and performance
    statistics: "Estatísticas",
    goals: "Gols",
    assists: "Assistências",
    matches: "Partidas",
    rating: "Avaliação",

    // Settings
    accountSettings: "Configurações da Conta",
    appSettings: "Configurações do App",
    privacySettings: "Configurações de Privacidade",
    notificationSettings: "Configurações de Notificação",

    // Error and success messages
    loginError: "Falha no login",
    networkError: "Erro de rede",
    operationSuccessful: "Operação bem-sucedida",
    dataSaved: "Dados salvos",

    // Common phrases
    welcomeMessage: "Bem-vindo à Plataforma Soccer Hunter",
    featuredPlayers: "Jogadores em Destaque",
    featuredCoaches: "Treinadores em Destaque",

    // Footer and legal
    about: "Sobre o App",
    contactUs: "Entre em Contato",
    privacyPolicy: "Política de Privacidade",
    termsOfService: "Termos de Serviço",
    rateApp: "Avaliar App",
    shareApp: "Compartilhar App",

    // Status indicators
    available: "Disponível",
    unavailable: "Indisponível",
    online: "Online",
    offline: "Offline",
    active: "Ativo",
    inactive: "Inativo",
  },

  // Italian translations
  it: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "La Tua Destinazione Premier per Talenti Sportivi",
    loading: "Caricamento...",
    error: "Si è verificato un errore",
    success: "Successo",

    // Navigation
    home: "Home",
    search: "Cerca",
    profile: "Profilo",
    settings: "Impostazioni",
    more: "Altro",
    dashboard: "Dashboard",

    // Language and accessibility
    language: "Lingua",
    changeLanguage: "Cambia Lingua",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",

    // User categories
    players: "Giocatori",
    coaches: "Allenatori",
    clubs: "Club",
    agents: "Agenti",
    doctors: "Medici",

    // Player types
    goalkeepers: "Portieri",
    defenders: "Difensori",
    midfielders: "Centrocampisti",
    forwards: "Attaccanti",

    // Authentication
    login: "Accedi",
    logout: "Esci",
    register: "Registrati",
    username: "Nome utente",
    password: "Password",
    email: "Email",
    fullName: "Nome Completo",
    phoneNumber: "Numero di Telefono",
    forgotPassword: "Password dimenticata?",
    createAccount: "Crea un nuovo account",
    haveAccount: "Hai già un account?",

    // Search and filtering
    searchPlaceholder: "Cerca giocatori e allenatori...",
    searchResults: "Risultati della Ricerca",
    filters: "Filtri",
    sortBy: "Ordina per",
    clearFilters: "Cancella Filtri",

    // Profile and user info
    personalInfo: "Informazioni Personali",
    editProfile: "Modifica Profilo",
    viewProfile: "Visualizza Profilo",
    position: "Posizione",
    specialization: "Specializzazione",
    club: "Club",
    nationality: "Nazionalità",
    age: "Età",
    experience: "Esperienza",

    // Actions and buttons
    save: "Salva",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    add: "Aggiungi",
    view: "Visualizza",
    contact: "Contatto",
    share: "Condividi",
    favorite: "Preferito",

    // Messages and communication
    messages: "Messaggi",
    notifications: "Notifiche",
    sendMessage: "Invia Messaggio",
    messageToPlayer: "Messaggio al Giocatore",
    messageToCoach: "Messaggio all'Allenatore",

    // Statistics and performance
    statistics: "Statistiche",
    goals: "Gol",
    assists: "Assist",
    matches: "Partite",
    rating: "Valutazione",

    // Settings
    accountSettings: "Impostazioni Account",
    appSettings: "Impostazioni App",
    privacySettings: "Impostazioni Privacy",
    notificationSettings: "Impostazioni Notifiche",

    // Error and success messages
    loginError: "Accesso fallito",
    networkError: "Errore di rete",
    operationSuccessful: "Operazione riuscita",
    dataSaved: "Dati salvati",

    // Common phrases
    welcomeMessage: "Benvenuto nella Piattaforma Soccer Hunter",
    featuredPlayers: "Giocatori in Evidenza",
    featuredCoaches: "Allenatori in Evidenza",

    // Footer and legal
    about: "Informazioni sull'App",
    contactUs: "Contattaci",
    privacyPolicy: "Informativa sulla Privacy",
    termsOfService: "Termini di Servizio",
    rateApp: "Valuta App",
    shareApp: "Condividi App",

    // Status indicators
    available: "Disponibile",
    unavailable: "Non disponibile",
    online: "Online",
    offline: "Offline",
    active: "Attivo",
    inactive: "Inattivo",
  },

  // Latin translations
  la: {
    // Application basics
    appName: "Soccer Hunter",
    tagline: "Praemium Destinationem Tuam pro Talentis Ludorum",
    loading: "Oneratur...",
    error: "Error factus est",
    success: "Successus",

    // Navigation
    home: "Domus",
    search: "Quaestio",
    profile: "Descriptio",
    settings: "Constitutiones",
    more: "Plus",
    dashboard: "Tabula",

    // Language and accessibility
    language: "Lingua",
    changeLanguage: "Mutare Linguam",
    darkMode: "Modus Obscurus",
    lightMode: "Modus Clarus",

    // User categories
    players: "Lusores",
    coaches: "Magistri",
    clubs: "Collegia",
    agents: "Agentes",
    doctors: "Medici",

    // Player types
    goalkeepers: "Custodes",
    defenders: "Defensores",
    midfielders: "Medii Campi",
    forwards: "Oppugnatores",

    // Authentication
    login: "Intrare",
    logout: "Exire",
    register: "Registrare",
    username: "Nomen Utentis",
    password: "Tessera",
    email: "Cursus Electronicus",
    fullName: "Nomen Plenum",
    phoneNumber: "Numerus Telephonicus",
    forgotPassword: "Tesserae Oblivio?",
    createAccount: "Creare Novum Rationem",
    haveAccount: "Iam Habes Rationem?",

    // Search and filtering
    searchPlaceholder: "Quaerere lusores et magistros...",
    searchResults: "Resultata Quaestionis",
    filters: "Filtri",
    sortBy: "Ordinare per",
    clearFilters: "Purgare Filtros",

    // Profile and user info
    personalInfo: "Informationes Personales",
    editProfile: "Corrigere Descriptionem",
    viewProfile: "Videre Descriptionem",
    position: "Positio",
    specialization: "Specializatio",
    club: "Collegium",
    nationality: "Nationalitas",
    age: "Aetas",
    experience: "Experientia",

    // Actions and buttons
    save: "Servare",
    cancel: "Abrogare",
    edit: "Corrigere",
    delete: "Delere",
    add: "Addere",
    view: "Videre",
    contact: "Contactus",
    share: "Communicare",
    favorite: "Dilectum",

    // Messages and communication
    messages: "Nuntii",
    notifications: "Notificationes",
    sendMessage: "Mittere Nuntium",
    messageToPlayer: "Nuntius ad Lusorem",
    messageToCoach: "Nuntius ad Magistrum",

    // Statistics and performance
    statistics: "Statisticae",
    goals: "Scopus",
    assists: "Adiutoria",
    matches: "Certamina",
    rating: "Aestimatio",

    // Settings
    accountSettings: "Constitutiones Rationis",
    appSettings: "Constitutiones Applicationis",
    privacySettings: "Constitutiones Privatatis",
    notificationSettings: "Constitutiones Notificationum",

    // Error and success messages
    loginError: "Ingressus Defecit",
    networkError: "Error Retis",
    operationSuccessful: "Operatio cum successu",
    dataSaved: "Data servata",

    // Common phrases
    welcomeMessage: "Bene Ventum ad Suggestum Soccer Hunter",
    featuredPlayers: "Lusores Insignes",
    featuredCoaches: "Magistri Insignes",

    // Footer and legal
    about: "De Applicatione",
    contactUs: "Contacta Nos",
    privacyPolicy: "Regula Privatatis",
    termsOfService: "Condiciones Ministerii",
    rateApp: "Aestimare Applicationem",
    shareApp: "Communicare Applicationem",

    // Status indicators
    available: "Disponibilis",
    unavailable: "Non disponibilis",
    online: "In linea",
    offline: "Extra lineam",
    active: "Activus",
    inactive: "Inactivus",
  },
};

export default translations;
