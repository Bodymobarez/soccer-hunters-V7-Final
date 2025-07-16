// تضمين جميع النصوص القابلة للترجمة للتطبيق هنا

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it' | 'la';

export const LANGUAGE_NAMES = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
  la: 'Latina',
};

export const translations = {
  // الترجمات العربية
  ar: {
    // العامة
    appName: 'صقر هانتر',
    tagline: 'وجهتك الأولى للمواهب الرياضية',
    loading: 'جاري التحميل...',
    
    // القائمة السفلية
    home: 'الرئيسية',
    search: 'بحث',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    more: 'المزيد',
    
    // الفئات
    players: 'اللاعبين',
    coaches: 'المدربين',
    clubs: 'الأندية',
    agents: 'الوكلاء',
    doctors: 'الأطباء',
    
    // أنواع اللاعبين
    goalkeepers: 'حراس المرمى',
    defenders: 'المدافعين',
    midfielders: 'لاعبي الوسط',
    forwards: 'المهاجمين',
    
    // صفحة البداية
    welcomeMessage: 'مرحباً بك في منصة صقر هانتر',
    searchForTalent: 'ابحث عن المواهب الرياضية',
    featuredPlayers: 'أبرز اللاعبين',
    featuredCoaches: 'أبرز المدربين',
    latestNews: 'أحدث الأخبار',
    viewAll: 'عرض الكل',
    
    // تسجيل الدخول والتسجيل
    login: 'تسجيل الدخول',
    register: 'تسجيل جديد',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    email: 'البريد الإلكتروني',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    forgotPassword: 'نسيت كلمة المرور؟',
    createAccount: 'إنشاء حساب جديد',
    haveAccount: 'لديك حساب بالفعل؟',
    logout: 'تسجيل الخروج',
    
    // رسائل الخطأ
    loginError: 'فشل تسجيل الدخول',
    networkError: 'خطأ في الشبكة',
    
    // لوحة التحكم
    dashboard: 'لوحة التحكم',
    messages: 'الرسائل',
    notifications: 'الإشعارات',
    favorites: 'المفضلة',
    upload: 'رفع',
    
    // الملف الشخصي
    personalInfo: 'المعلومات الشخصية',
    changeLanguage: 'تغيير اللغة',
    darkMode: 'الوضع الداكن',
    contactUs: 'اتصل بنا',
    aboutApp: 'عن التطبيق',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    rateApp: 'تقييم التطبيق',
    shareApp: 'مشاركة التطبيق',
    
    // الأزرار
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    view: 'عرض',
    close: 'إغلاق',
    confirm: 'تأكيد',
  },
  
  // الترجمات الإنجليزية
  en: {
    // General
    appName: 'Soccer Hunter',
    tagline: 'Your Premier Destination for Sports Talents',
    loading: 'Loading...',
    
    // Bottom Navigation
    home: 'Home',
    search: 'Search',
    profile: 'Profile',
    settings: 'Settings',
    more: 'More',
    
    // Categories
    players: 'Players',
    coaches: 'Coaches',
    clubs: 'Clubs',
    agents: 'Agents',
    doctors: 'Doctors',
    
    // Player types
    goalkeepers: 'Goalkeepers',
    defenders: 'Defenders',
    midfielders: 'Midfielders',
    forwards: 'Forwards',
    
    // Home Page
    welcomeMessage: 'Welcome to Soccer Hunter',
    searchForTalent: 'Search for Sports Talents',
    featuredPlayers: 'Featured Players',
    featuredCoaches: 'Featured Coaches',
    latestNews: 'Latest News',
    viewAll: 'View All',
    
    // Authentication
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    forgotPassword: 'Forgot password?',
    createAccount: 'Create a new account',
    haveAccount: 'Already have an account?',
    logout: 'Logout',
    
    // Error Messages
    loginError: 'Login Failed',
    networkError: 'Network Error',
    
    // Dashboard
    dashboard: 'Dashboard',
    messages: 'Messages',
    notifications: 'Notifications',
    favorites: 'Favorites',
    upload: 'Upload',
    
    // Profile
    personalInfo: 'Personal Information',
    changeLanguage: 'Change Language',
    darkMode: 'Dark Mode',
    contactUs: 'Contact Us',
    aboutApp: 'About App',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    rateApp: 'Rate App',
    shareApp: 'Share App',
    
    // Buttons
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    view: 'View',
    close: 'Close',
    confirm: 'Confirm',
  },
  
  // الترجمات الفرنسية
  fr: {
    // Général
    appName: 'Soccer Hunter',
    tagline: 'Votre Destination Première pour les Talents Sportifs',
    loading: 'Chargement...',
    
    // Navigation Bas
    home: 'Accueil',
    search: 'Recherche',
    profile: 'Profil',
    settings: 'Paramètres',
    more: 'Plus',
    
    // Catégories
    players: 'Joueurs',
    coaches: 'Entraîneurs',
    clubs: 'Clubs',
    agents: 'Agents',
    doctors: 'Médecins',
    
    // Types de joueurs
    goalkeepers: 'Gardiens de but',
    defenders: 'Défenseurs',
    midfielders: 'Milieux de terrain',
    forwards: 'Attaquants',
    
    // Page d'Accueil
    welcomeMessage: 'Bienvenue sur Soccer Hunter',
    searchForTalent: 'Rechercher des Talents Sportifs',
    featuredPlayers: 'Joueurs en Vedette',
    featuredCoaches: 'Entraîneurs en Vedette',
    latestNews: 'Dernières Actualités',
    viewAll: 'Voir Tout',
    
    // Authentification
    login: 'Connexion',
    register: 'Inscription',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    email: 'Email',
    fullName: 'Nom Complet',
    phoneNumber: 'Numéro de Téléphone',
    forgotPassword: 'Mot de passe oublié?',
    createAccount: 'Créer un nouveau compte',
    haveAccount: 'Vous avez déjà un compte?',
    logout: 'Déconnexion',
    
    // Messages d'erreur
    loginError: 'Échec de la connexion',
    networkError: 'Erreur de réseau',
    
    // Tableau de Bord
    dashboard: 'Tableau de Bord',
    messages: 'Messages',
    notifications: 'Notifications',
    favorites: 'Favoris',
    upload: 'Télécharger',
    
    // Profil
    personalInfo: 'Informations Personnelles',
    changeLanguage: 'Changer de Langue',
    darkMode: 'Mode Sombre',
    contactUs: 'Contactez-nous',
    aboutApp: 'À Propos de l\'App',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    rateApp: 'Évaluer l\'App',
    shareApp: 'Partager l\'App',
    
    // Boutons
    submit: 'Soumettre',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    add: 'Ajouter',
    view: 'Voir',
    close: 'Fermer',
    confirm: 'Confirmer',
  },
  
  // الترجمات الإسبانية
  es: {
    // General
    appName: 'Soccer Hunter',
    tagline: 'Tu Destino Premier para Talentos Deportivos',
    loading: 'Cargando...',
    
    // Navegación Inferior
    home: 'Inicio',
    search: 'Buscar',
    profile: 'Perfil',
    settings: 'Ajustes',
    more: 'Más',
    
    // Categorías
    players: 'Jugadores',
    coaches: 'Entrenadores',
    clubs: 'Clubes',
    agents: 'Agentes',
    doctors: 'Médicos',
    
    // Tipos de jugadores
    goalkeepers: 'Porteros',
    defenders: 'Defensores',
    midfielders: 'Mediocampistas',
    forwards: 'Delanteros',
    
    // Página de Inicio
    welcomeMessage: 'Bienvenido a Soccer Hunter',
    searchForTalent: 'Buscar Talentos Deportivos',
    featuredPlayers: 'Jugadores Destacados',
    featuredCoaches: 'Entrenadores Destacados',
    latestNews: 'Últimas Noticias',
    viewAll: 'Ver Todo',
    
    // Autenticación
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    email: 'Correo electrónico',
    fullName: 'Nombre Completo',
    phoneNumber: 'Número de Teléfono',
    forgotPassword: '¿Olvidaste tu contraseña?',
    createAccount: 'Crear una nueva cuenta',
    haveAccount: '¿Ya tienes una cuenta?',
    logout: 'Cerrar Sesión',
    
    // Mensajes de Error
    loginError: 'Error de inicio de sesión',
    networkError: 'Error de red',
    
    // Panel de Control
    dashboard: 'Panel de Control',
    messages: 'Mensajes',
    notifications: 'Notificaciones',
    favorites: 'Favoritos',
    upload: 'Subir',
    
    // Perfil
    personalInfo: 'Información Personal',
    changeLanguage: 'Cambiar Idioma',
    darkMode: 'Modo Oscuro',
    contactUs: 'Contáctenos',
    aboutApp: 'Acerca de la App',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    rateApp: 'Calificar App',
    shareApp: 'Compartir App',
    
    // Botones
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    add: 'Añadir',
    view: 'Ver',
    close: 'Cerrar',
    confirm: 'Confirmar',
  },
  
  // الترجمات الألمانية
  de: {
    // Allgemein
    appName: 'Soccer Hunter',
    tagline: 'Ihr erstklassiges Ziel für Sporttalente',
    loading: 'Wird geladen...',
    
    // Untere Navigation
    home: 'Startseite',
    search: 'Suche',
    profile: 'Profil',
    settings: 'Einstellungen',
    more: 'Mehr',
    
    // Kategorien
    players: 'Spieler',
    coaches: 'Trainer',
    clubs: 'Vereine',
    agents: 'Agenten',
    doctors: 'Ärzte',
    
    // Spielertypen
    goalkeepers: 'Torhüter',
    defenders: 'Verteidiger',
    midfielders: 'Mittelfeldspieler',
    forwards: 'Stürmer',
    
    // Startseite
    welcomeMessage: 'Willkommen bei Soccer Hunter',
    searchForTalent: 'Suche nach Sporttalenten',
    featuredPlayers: 'Vorgestellte Spieler',
    featuredCoaches: 'Vorgestellte Trainer',
    latestNews: 'Neueste Nachrichten',
    viewAll: 'Alle anzeigen',
    
    // Authentifizierung
    login: 'Anmelden',
    register: 'Registrieren',
    username: 'Benutzername',
    password: 'Passwort',
    email: 'E-Mail',
    fullName: 'Vollständiger Name',
    phoneNumber: 'Telefonnummer',
    forgotPassword: 'Passwort vergessen?',
    createAccount: 'Neues Konto erstellen',
    haveAccount: 'Haben Sie bereits ein Konto?',
    logout: 'Abmelden',
    
    // Fehlermeldungen
    loginError: 'Anmeldung fehlgeschlagen',
    networkError: 'Netzwerkfehler',
    
    // Dashboard
    dashboard: 'Dashboard',
    messages: 'Nachrichten',
    notifications: 'Benachrichtigungen',
    favorites: 'Favoriten',
    upload: 'Hochladen',
    
    // Profil
    personalInfo: 'Persönliche Informationen',
    changeLanguage: 'Sprache ändern',
    darkMode: 'Dunkler Modus',
    contactUs: 'Kontaktieren Sie uns',
    aboutApp: 'Über die App',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    rateApp: 'App bewerten',
    shareApp: 'App teilen',
    
    // Buttons
    submit: 'Absenden',
    cancel: 'Abbrechen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    add: 'Hinzufügen',
    view: 'Ansehen',
    close: 'Schließen',
    confirm: 'Bestätigen',
  },
  
  // الترجمات البرتغالية
  pt: {
    // Geral
    appName: 'Soccer Hunter',
    tagline: 'Seu Destino Premier para Talentos Esportivos',
    loading: 'Carregando...',
    
    // Navegação Inferior
    home: 'Início',
    search: 'Pesquisa',
    profile: 'Perfil',
    settings: 'Configurações',
    more: 'Mais',
    
    // Categorias
    players: 'Jogadores',
    coaches: 'Treinadores',
    clubs: 'Clubes',
    agents: 'Agentes',
    doctors: 'Médicos',
    
    // Tipos de Jogadores
    goalkeepers: 'Goleiros',
    defenders: 'Defensores',
    midfielders: 'Meio-campistas',
    forwards: 'Atacantes',
    
    // Página Inicial
    welcomeMessage: 'Bem-vindo ao Soccer Hunter',
    searchForTalent: 'Procurar Talentos Esportivos',
    featuredPlayers: 'Jogadores em Destaque',
    featuredCoaches: 'Treinadores em Destaque',
    latestNews: 'Últimas Notícias',
    viewAll: 'Ver Tudo',
    
    // Autenticação
    login: 'Entrar',
    register: 'Registrar',
    username: 'Nome de usuário',
    password: 'Senha',
    email: 'E-mail',
    fullName: 'Nome Completo',
    phoneNumber: 'Número de Telefone',
    forgotPassword: 'Esqueceu a senha?',
    createAccount: 'Criar uma nova conta',
    haveAccount: 'Já tem uma conta?',
    logout: 'Sair',
    
    // Mensagens de Erro
    loginError: 'Falha no login',
    networkError: 'Erro de rede',
    
    // Painel
    dashboard: 'Painel',
    messages: 'Mensagens',
    notifications: 'Notificações',
    favorites: 'Favoritos',
    upload: 'Upload',
    
    // Perfil
    personalInfo: 'Informações Pessoais',
    changeLanguage: 'Mudar Idioma',
    darkMode: 'Modo Escuro',
    contactUs: 'Contate-nos',
    aboutApp: 'Sobre o App',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    rateApp: 'Avaliar App',
    shareApp: 'Compartilhar App',
    
    // Botões
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    add: 'Adicionar',
    view: 'Ver',
    close: 'Fechar',
    confirm: 'Confirmar',
  },
  
  // الترجمات الإيطالية
  it: {
    // Generale
    appName: 'Soccer Hunter',
    tagline: 'La Tua Destinazione Premier per Talenti Sportivi',
    loading: 'Caricamento...',
    
    // Navigazione Inferiore
    home: 'Home',
    search: 'Cerca',
    profile: 'Profilo',
    settings: 'Impostazioni',
    more: 'Altro',
    
    // Categorie
    players: 'Giocatori',
    coaches: 'Allenatori',
    clubs: 'Club',
    agents: 'Agenti',
    doctors: 'Medici',
    
    // Tipi di Giocatori
    goalkeepers: 'Portieri',
    defenders: 'Difensori',
    midfielders: 'Centrocampisti',
    forwards: 'Attaccanti',
    
    // Pagina Iniziale
    welcomeMessage: 'Benvenuto su Soccer Hunter',
    searchForTalent: 'Cerca Talenti Sportivi',
    featuredPlayers: 'Giocatori in Evidenza',
    featuredCoaches: 'Allenatori in Evidenza',
    latestNews: 'Ultime Notizie',
    viewAll: 'Vedi Tutto',
    
    // Autenticazione
    login: 'Accedi',
    register: 'Registrati',
    username: 'Nome utente',
    password: 'Password',
    email: 'Email',
    fullName: 'Nome Completo',
    phoneNumber: 'Numero di Telefono',
    forgotPassword: 'Password dimenticata?',
    createAccount: 'Crea un nuovo account',
    haveAccount: 'Hai già un account?',
    logout: 'Esci',
    
    // Messaggi di Errore
    loginError: 'Accesso fallito',
    networkError: 'Errore di rete',
    
    // Dashboard
    dashboard: 'Dashboard',
    messages: 'Messaggi',
    notifications: 'Notifiche',
    favorites: 'Preferiti',
    upload: 'Carica',
    
    // Profilo
    personalInfo: 'Informazioni Personali',
    changeLanguage: 'Cambia Lingua',
    darkMode: 'Modalità Scura',
    contactUs: 'Contattaci',
    aboutApp: 'Informazioni sull\'App',
    privacyPolicy: 'Informativa sulla Privacy',
    termsOfService: 'Termini di Servizio',
    rateApp: 'Valuta App',
    shareApp: 'Condividi App',
    
    // Pulsanti
    submit: 'Invia',
    cancel: 'Annulla',
    save: 'Salva',
    edit: 'Modifica',
    delete: 'Elimina',
    add: 'Aggiungi',
    view: 'Visualizza',
    close: 'Chiudi',
    confirm: 'Conferma',
  },
  
  // الترجمات اللاتينية
  la: {
    // Generalis
    appName: 'Soccer Hunter',
    tagline: 'Praemium Destinationem Tuam pro Talentis Ludorum',
    loading: 'Oneratur...',
    
    // Infra Navigatio
    home: 'Domus',
    search: 'Quaestio',
    profile: 'Descriptio',
    settings: 'Constitutiones',
    more: 'Plus',
    
    // Categoriae
    players: 'Lusores',
    coaches: 'Magistri',
    clubs: 'Collegia',
    agents: 'Agentes',
    doctors: 'Medici',
    
    // Lusorum Genera
    goalkeepers: 'Custodes',
    defenders: 'Defensores',
    midfielders: 'Medii Campi',
    forwards: 'Oppugnatores',
    
    // Pagina Principalis
    welcomeMessage: 'Bene Ventum ad Soccer Hunter',
    searchForTalent: 'Quaerere Talenta Ludorum',
    featuredPlayers: 'Lusores Insignes',
    featuredCoaches: 'Magistri Insignes',
    latestNews: 'Recentia Nova',
    viewAll: 'Videre Omnia',
    
    // Authentificatio
    login: 'Intrare',
    register: 'Registrare',
    username: 'Nomen Utentis',
    password: 'Tessera',
    email: 'Cursus Electronicus',
    fullName: 'Nomen Plenum',
    phoneNumber: 'Numerus Telephonicus',
    forgotPassword: 'Tesserae Oblivio?',
    createAccount: 'Creare Novum Rationem',
    haveAccount: 'Iam Habes Rationem?',
    logout: 'Exire',
    
    // Errorum Nuntii
    loginError: 'Ingressus Defecit',
    networkError: 'Error Retis',
    
    // Tabula
    dashboard: 'Tabula',
    messages: 'Nuntii',
    notifications: 'Notificationes',
    favorites: 'Dilecta',
    upload: 'Mittere',
    
    // Descriptio
    personalInfo: 'Informationes Personales',
    changeLanguage: 'Mutare Linguam',
    darkMode: 'Modus Obscurus',
    contactUs: 'Contacta Nos',
    aboutApp: 'De Applicatione',
    privacyPolicy: 'Regula Privatatis',
    termsOfService: 'Condiciones Ministerii',
    rateApp: 'Aestimare Applicationem',
    shareApp: 'Communicare Applicationem',
    
    // Buttones
    submit: 'Mittere',
    cancel: 'Abrogare',
    save: 'Servare',
    edit: 'Corrigere',
    delete: 'Delere',
    add: 'Addere',
    view: 'Videre',
    close: 'Claudere',
    confirm: 'Confirmare',
  },
};

export default translations;