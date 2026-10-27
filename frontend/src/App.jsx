import { useState, useEffect } from "react";

const normalizePhone = (value) => {
  const phone = String(value || "").trim().replace(/[\s()-]/g, "");
  if (/^0\d{9}$/.test(phone)) return `+250${phone.slice(1)}`;
  if (/^250\d{9}$/.test(phone)) return `+${phone}`;
  return phone;
};
const samePhone = (a, b) => normalizePhone(a) === normalizePhone(b);
const translations = {
  rw: {
    settings: "⚙️ Igenamiterere",
    manageSettings: "Genzura igenamiterere rya konti yawe ya Agri Market.",
    language: "🌍 Ururimi",
    dataInsights: "📊 Amakuru n'Isesengura",
    processing: "🏭 Gutunganya",
    profileSettings: "👤 Igenamiterere rya Profile",
    backHome: "← Subira kuri Home",
    home: "Home",
    welcome: "Murakaza neza",
    yourRole: "Uruhare rwawe",
    user: "Umukoresha",
    search: "Shakisha",
    viewProducts: "Reba Umusaruro",
    exploreCrops: "Shakisha Ibihingwa",
    myProfile: "Profile Yanjye",
    myProducts: "Umusaruro Wanjye",
    chat: "Kuganira",
    notifications: "Amatangazo",
    helpSupport: "Ubufasha",
    logout: "Sohoka",
    products: "Umusaruro",
    addProduct: "+ Ongeraho Umusaruro",
    searchProduct: "Shakisha umusaruro...",
    allCategories: "Ibyiciro byose",
    allLocations: "Ahantu hose",
    minimumPrice: "Igiciro gito (RWF)",
    defaultPriceOrder: "Uko ibiciro bisanzwe bikurikirana",
    lowHigh: "Kuva ku gito → ku kinini",
    highLow: "Kuva ku kinini → ku gito",
    farmerProfile: "Profile y'Umuhinzi",
    chooseProfilePhoto: "Hitamo ifoto ya Profile",
    profile: "Profile",
    farmerName: "Izina ry'Umuhinzi",
    farmer: "Umuhinzi",
    editFarmerName: "Hindura izina ry'umuhinzi",
    phone: "Telefone",
    noPhone: "Nta nimero ya telefone",
    editPhone: "Hindura nimero ya telefone",
    location: "Aho uherereye",
    noLocation: "Nta hantu hashyizweho",
    editLocation: "Hindura aho uherereye",
    email: "Email",
    noEmail: "Nta email yashyizweho",
    editEmail: "Hindura email",
    productName: "Izina ry'umusaruro",
    category: "Icyiciro",
    priceExample: "Igiciro, urugero: 1000 RWF / kg",
    imageError: "Ifoto ntishoboye gutunganywa.",
    fillProductInfo: "Nyamuneka uzuze amakuru yose y'umusaruro.",
    conversations: "Ubutumwa",
    noConversations: "Nta butumwa burabaho.",
    noMessage: "Nta butumwa",
    noNotifications: "Nta matangazo mashya.",
    newMessageFrom: "Ubutumwa bushya bwa",
    needHelp: "Ukeneye ubufasha mu gukoresha Agri Market?",
    contactSupport: "Ku bibazo bya konti, umusaruro, ibihingwa cyangwa ibindi bibazo bya app, hamagara support.",
    whatShouldGrow: "Ni iki nakwiriye guhinga?",
    selectDistrict: "Hitamo Akarere",
    selectSeason: "Hitamo Igihembwe",
    selectDistrictSeason: "📍 Hitamo akarere n'igihembwe kugira ngo ubone ibyifuzo by'ibihingwa bishingiye ku makuru ya NISR.",
    district: "Akarere",
    season: "Igihembwe",
    recordedYield: "Umusaruro wanditswe",
    nisrInsights: "Isesengura rishingiye ku makuru y'ibihingwa ya NISR 2025.",
    totalRecords: "Umubare w'amakuru yose",
    districtsCovered: "Uturere twagaragajwe",
    cropsRecorded: "Ibihingwa byanditswe",
    processingDescription: "Reba ibyo umusaruro wawe ushobora gutungurwamo n’inganda cyangwa ubucuruzi bwo gutunganya umusaruro.",
    noProductsYet: "Nta musaruro urashyirwaho",
    addProductForProcessing: "Ongeraho umusaruro muri Agri Market kugira ngo turebe uburyo ushobora gutunganywa.",
    processingOptions: "Uburyo bwo gutunganya",
    noProcessorInfo: "Nta makuru y’umutunganya umusaruro ahuye nawo arahari.",
    source: "Inkomoko",
    welcomeTitle: "Murakaza neza kuri Agri Market",
    welcomeSubtitle: "Huza abahinzi, abaguzi n'abacuruzi.",
    getStarted: "Tangira",
    login: "Injira",
    createAccount: "Fungura Konti",
    fullName: "Amazina yose",
    phoneNumber: "Numero ya telefone",
    enterEmail: "Email",
    password: "Ijambo ry'ibanga",
    phoneVerification: "Kwemeza Email",
    enterOtp: "Shyiramo OTP",
    loginIdentifier: "Numero ya telefone cyangwa Email",
    forgotPassword: "Wibagiwe Ijambo ry'ibanga",
    resetPasswordText: "Shyiramo numero ya telefone cyangwa email kugira ngo usubiremo ijambo ry'ibanga.",
    newPassword: "Ijambo ry'ibanga rishya",
    chooseRole: "Hitamo Uruhare Rwawe",
    buyer: "Umuguzi",
    business: "Ubucuruzi",
    conversations: "Ubutumwa",
    chatWith: "Ganira na",
    typeMessage: "Andika ubutumwa...",
    noMessagesYet: "Nta butumwa burabaho.",
    noMessage: "Nta butumwa",
    editProduct: "Hindura Umusaruro",
    saveChanges: "Bika Impinduka",
    cancel: "Hagarika",
    productDetails: "Amakuru y'Umusaruro",
    unknownSeller: "Umugurisha utazwi",
    noPhoneProvided: "Nta telefone yatanzwe",
    freshProductDescription: "Umusaruro mushya w'ubuhinzi uboneka kuri Agri Market.",
    crops: "Ibihingwa",
    searchCrop: "Shakisha igihingwa cyangwa akarere...",
    viewDetails: "Reba Amakuru",
    province: "Intara",
    yield: "Umusaruro",
    cropDetails: "Amakuru y'Igihingwa",
    plotArea: "Ubuso bw'ikibanza",
    cropArea: "Ubuso bw'igihingwa",
    yieldChart: "Igishushanyo cy'Umusaruro",
    backToCrops: "Subira ku Bihingwa",
    myProductsTitle: "Umusaruro Wanjye",
    productsAddedBy: "Umusaruro washyizweho na",
    noProductsAdded: "Nta musaruro urashyirwaho.",
    backToHome: "Subira kuri Home",
    completeProfile: "Soza Profile",
    noAccount: "Konti ntibashoboye kuboneka. Banza ufungure konti.",
    noAccountShort: "Konti ntibashoboye kuboneka.",
    incorrectLogin: "Numero ya telefone/email cyangwa ijambo ry’ibanga si byo.",
    enterNewPassword: "Andika ijambo ry’ibanga rishya.",
    passwordResetSuccess: "Ijambo ry’ibanga ryahinduwe neza.",
    resetPassword: "Hindura ijambo ry’ibanga",
    back: "Subira inyuma",
    farmerRole: "Umuhinzi",
    buyerRole: "Umuguzi",
    businessRole: "Ubucuruzi",
    dataInsightsButton: "Amakuru n'Isesengura",
    processingButton: "Gutunganya",
    noMessageShort: "Nta butumwa",
    chatWithUser: "Ganira na",
    userName: "Umukoresha",
    send: "Ohereza",
    you: "Wowe",
    backToConversations: "← Subira ku biganiro",
    addProductButton: "Ongeraho Umusaruro",
    deleteProduct: "Siba Umusaruro",
    accountSavedSuccessfully: "Account saved successfully!",
    changesSavedSuccessfully: "Impinduka zabitswe neza!",
    confirmDeleteProduct: "Urashaka koko gusiba uyu musaruro?",
    chatWithSeller: "Ganira n’Umugurisha",
    backToProducts: "Subira ku Musaruro",
    unableProcessImage: "Ifoto ntishoboye gutunganywa.",
    fillAllProductInfo: "Nyamuneka uzuza amakuru yose y’umusaruro.",
    productCategory: "Icyiciro",
    productLocation: "Aho uherereye",
    productPrice: "Igiciro",
    editProductButton: "Hindura Umusaruro"
  },
  en: {
    settings: "⚙️ Settings",
    manageSettings: "Manage your Agri Market account settings.",
    language: "🌍 Language",
    dataInsights: "📊 Data & Insights",
    processing: "🏭 Processing",
    profileSettings: "👤 Profile Settings",
    backHome: "← Back to Home",
    home: "Home",
    welcome: "Welcome",
    yourRole: "Your role",
    user: "User",
    search: "Search",
    viewProducts: "View Products",
    exploreCrops: "Explore Crops",
    myProfile: "My Profile",
    myProducts: "My Products",
    chat: "Chat",
    notifications: "Notifications",
    helpSupport: "Help & Support",
    logout: "Logout",
    products: "Products",
    addProduct: "+ Add Product",
    searchProduct: "Search products...",
    allCategories: "All Categories",
    allLocations: "All Locations",
    minimumPrice: "Minimum Price (RWF)",
    defaultPriceOrder: "Default Price Order",
    lowHigh: "Low → High",
    highLow: "High → Low",
    farmerProfile: "Farmer Profile",
    chooseProfilePhoto: "Choose Profile Photo",
    profile: "Profile",
    farmerName: "Farmer Name",
    farmer: "Farmer",
    editFarmerName: "Edit farmer name",
    phone: "Phone",
    noPhone: "No phone number",
    editPhone: "Edit phone number",
    location: "Location",
    noLocation: "No location set",
    editLocation: "Edit location",
    email: "Email",
    noEmail: "No email set",
    editEmail: "Edit email",
    productName: "Product name",
    category: "Category",
    priceExample: "Price, example: 1000 RWF / kg",
    imageError: "Unable to process this image.",
    fillProductInfo: "Please fill in all product information.",
    conversations: "Conversations",
    noConversations: "No conversations yet.",
    noMessage: "No message",
    noNotifications: "No new notifications.",
    newMessageFrom: "New message from",
    needHelp: "Need help using Agri Market?",
    contactSupport: "For account, products, crops, or other app issues, contact support.",
    whatShouldGrow: "What Should I Grow?",
    selectDistrict: "Select District",
    selectSeason: "Select Season",
    selectDistrictSeason: "📍 Select your district and season to get crop recommendations based on NISR data.",
    district: "District",
    season: "Season",
    recordedYield: "Recorded Yield",
    nisrInsights: "Insights based on NISR 2025 crop data.",
    totalRecords: "Total Records",
    districtsCovered: "Districts Covered",
    cropsRecorded: "Crops Recorded",
    processingDescription: "See what your product can be processed into by industries or processing businesses.",
    noProductsYet: "No products added yet",
    addProductForProcessing: "Add a product to Agri Market so we can identify possible processing options.",
    processingOptions: "Processing options",
    noProcessorInfo: "No matching processor information available yet.",
    source: "Source",
    welcomeTitle: "Welcome to Agri Market",
    welcomeSubtitle: "Connect farmers, buyers and businesses.",
    getStarted: "Get Started",
    login: "Login",
    createAccount: "Create Account",
    fullName: "Full name",
    phoneNumber: "Phone number",
    enterEmail: "Email",
    password: "Password",
    phoneVerification: "Email Verification",
    enterOtp: "Enter OTP",
    loginIdentifier: "Phone number or Email",
    forgotPassword: "Forgot Password",
    resetPasswordText: "Enter your phone number or email to reset your password.",
    newPassword: "New Password",
    chooseRole: "Choose Your Role",
    buyer: "Buyer",
    business: "Business",
    conversations: "Conversations",
    chatWith: "Chat with",
    typeMessage: "Type a message...",
    noMessagesYet: "No messages yet.",
    editProduct: "Edit Product",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    productDetails: "Product Details",
    unknownSeller: "Unknown seller",
    noPhoneProvided: "No phone provided",
    freshProductDescription: "Fresh agricultural product available on Agri Market.",
    crops: "Crops",
    searchCrop: "Search crop or district...",
    viewDetails: "View Details",
    province: "Province",
    yield: "Yield",
    cropDetails: "Crop Details",
    plotArea: "Plot Area",
    cropArea: "Crop Area",
    yieldChart: "Yield Chart",
    backToCrops: "Back to Crops",
    myProductsTitle: "My Products",
    productsAddedBy: "Products added by",
    noProductsAdded: "You have not added any products yet.",
    backToHome: "Back to Home",
    completeProfile: "Complete Profile",
    noAccount: "No account found. Please create an account first.",
    noAccountShort: "No account found.",
    incorrectLogin: "Incorrect phone/email or password.",
    enterNewPassword: "Please enter a new password.",
    passwordResetSuccess: "Password reset successfully.",
    resetPassword: "Reset Password",
    back: "Back",
    farmerRole: "Farmer",
    buyerRole: "Buyer",
    businessRole: "Business",
    dataInsightsButton: "Data & Insights",
    processingButton: "Processing",
    noMessageShort: "No message",
    chatWithUser: "Chat with",
    userName: "User",
    send: "Send",
    you: "You",
    backToConversations: "← Back to Conversations",
    addProductButton: "Add Product",
    deleteProduct: "Delete Product",
    accountSavedSuccessfully: "Compte enregistré avec succès !",
    changesSavedSuccessfully: "Changes saved successfully!",
    confirmDeleteProduct: "Are you sure you want to delete this product?",
    chatWithSeller: "Chat with Seller",
    backToProducts: "Back to Products",
    unableProcessImage: "Unable to process this image.",
    fillAllProductInfo: "Please fill in all product information.",
    productCategory: "Category",
    productLocation: "Location",
    productPrice: "Price",
    editProductButton: "Edit Product"
  },
  fr: {
    settings: "⚙️ Paramètres",
    manageSettings: "Gérez les paramètres de votre compte Agri Market.",
    language: "🌍 Langue",
    dataInsights: "📊 Données et analyse",
    processing: "🏭 Transformation",
    profileSettings: "👤 Paramètres du profil",
    backHome: "← Retour à l'accueil",
    home: "Accueil",
    welcome: "Bienvenue",
    yourRole: "Votre rôle",
    user: "Utilisateur",
    search: "Rechercher",
    viewProducts: "Voir les produits",
    exploreCrops: "Explorer les cultures",
    myProfile: "Mon profil",
    myProducts: "Mes produits",
    chat: "Discussion",
    notifications: "Notifications",
    helpSupport: "Aide et assistance",
    logout: "Déconnexion",
    products: "Produits",
    addProduct: "+ Ajouter un produit",
    searchProduct: "Rechercher un produit...",
    allCategories: "Toutes les catégories",
    allLocations: "Tous les lieux",
    minimumPrice: "Prix minimum (RWF)",
    defaultPriceOrder: "Ordre de prix par défaut",
    lowHigh: "Du plus bas → au plus élevé",
    highLow: "Du plus élevé → au plus bas",
    farmerProfile: "Profil de l'agriculteur",
    chooseProfilePhoto: "Choisir une photo de profil",
    profile: "Profil",
    farmerName: "Nom de l'agriculteur",
    farmer: "Agriculteur",
    editFarmerName: "Modifier le nom de l'agriculteur",
    phone: "Téléphone",
    noPhone: "Aucun numéro de téléphone",
    editPhone: "Modifier le numéro de téléphone",
    location: "Lieu",
    noLocation: "Aucun lieu défini",
    editLocation: "Modifier le lieu",
    email: "Email",
    noEmail: "Aucun email défini",
    editEmail: "Modifier l'email",
    productName: "Nom du produit",
    category: "Catégorie",
    priceExample: "Prix, exemple : 1000 RWF / kg",
    imageError: "Impossible de traiter cette image.",
    fillProductInfo: "Veuillez remplir toutes les informations du produit.",
    conversations: "Conversations",
    noConversations: "Aucune conversation pour le moment.",
    noMessage: "Aucun message",
    noNotifications: "Aucune nouvelle notification.",
    newMessageFrom: "Nouveau message de",
    needHelp: "Besoin d'aide pour utiliser Agri Market ?",
    contactSupport: "Pour les problèmes de compte, de produits, de cultures ou d'autres problèmes de l'application, contactez le support.",
    whatShouldGrow: "Que devrais-je cultiver ?",
    selectDistrict: "Sélectionner le district",
    selectSeason: "Sélectionner la saison",
    selectDistrictSeason: "📍 Sélectionnez votre district et votre saison pour obtenir des recommandations de cultures basées sur les données de la NISR.",
    district: "District",
    season: "Saison",
    recordedYield: "Rendement enregistré",
    nisrInsights: "Analyse basée sur les données des cultures de la NISR 2025.",
    totalRecords: "Nombre total d'enregistrements",
    districtsCovered: "Districts couverts",
    cropsRecorded: "Cultures enregistrées",
    processingDescription: "Découvrez ce que votre produit peut devenir grâce aux industries ou entreprises de transformation.",
    noProductsYet: "Aucun produit ajouté",
    addProductForProcessing: "Ajoutez un produit à Agri Market afin d’identifier les possibilités de transformation.",
    processingOptions: "Options de transformation",
    noProcessorInfo: "Aucune information correspondante sur un transformateur n’est encore disponible.",
    source: "Source",
    welcomeTitle: "Bienvenue sur Agri Market",
    welcomeSubtitle: "Connectez les agriculteurs, les acheteurs et les entreprises.",
    getStarted: "Commencer",
    login: "Connexion",
    createAccount: "Créer un compte",
    fullName: "Nom complet",
    phoneNumber: "Numéro de téléphone",
    enterEmail: "Email",
    password: "Mot de passe",
    phoneVerification: "Vérification de l’email",
    enterOtp: "Entrez le code OTP",
    loginIdentifier: "Numéro de téléphone ou Email",
    forgotPassword: "Mot de passe oublié",
    resetPasswordText: "Entrez votre numéro de téléphone ou votre email pour réinitialiser votre mot de passe.",
    newPassword: "Nouveau mot de passe",
    chooseRole: "Choisissez votre rôle",
    buyer: "Acheteur",
    business: "Entreprise",
    conversations: "Conversations",
    chatWith: "Discussion avec",
    typeMessage: "Écrire un message...",
    noMessagesYet: "Aucun message pour le moment.",
    editProduct: "Modifier le produit",
    saveChanges: "Enregistrer les modifications",
    cancel: "Annuler",
    productDetails: "Détails du produit",
    unknownSeller: "Vendeur inconnu",
    noPhoneProvided: "Aucun téléphone fourni",
    freshProductDescription: "Produit agricole frais disponible sur Agri Market.",
    crops: "Cultures",
    searchCrop: "Rechercher une culture ou un district...",
    viewDetails: "Voir les détails",
    province: "Province",
    yield: "Rendement",
    cropDetails: "Détails de la culture",
    plotArea: "Superficie de la parcelle",
    cropArea: "Superficie cultivée",
    yieldChart: "Graphique du rendement",
    backToCrops: "Retour aux cultures",
    myProductsTitle: "Mes produits",
    productsAddedBy: "Produits ajoutés par",
    noProductsAdded: "Vous n'avez encore ajouté aucun produit.",
    backToHome: "Retour à l'accueil",
    completeProfile: "Terminer le profil",
    noAccount: "Compte introuvable. Veuillez d’abord créer un compte.",
    noAccountShort: "Compte introuvable.",
    incorrectLogin: "Numéro de téléphone/e-mail ou mot de passe incorrect.",
    enterNewPassword: "Veuillez entrer un nouveau mot de passe.",
    passwordResetSuccess: "Mot de passe réinitialisé avec succès.",
    resetPassword: "Réinitialiser le mot de passe",
    back: "Retour",
    farmerRole: "Agriculteur",
    buyerRole: "Acheteur",
    businessRole: "Entreprise",
    dataInsightsButton: "Données et analyses",
    processingButton: "Transformation",
    noMessageShort: "Aucun message",
    chatWithUser: "Discuter avec",
    userName: "Utilisateur",
    send: "Envoyer",
    you: "Vous",
    backToConversations: "← Retour aux conversations",
    addProductButton: "Ajouter un produit",
    deleteProduct: "Supprimer le produit",
    accountSavedSuccessfully: "Konti yabitswe neza!",
    changesSavedSuccessfully: "Modifications enregistrées avec succès !",
    confirmDeleteProduct: "Voulez-vous vraiment supprimer ce produit ?",
    chatWithSeller: "Discuter avec le vendeur",
    backToProducts: "Retour aux produits",
    unableProcessImage: "Impossible de traiter cette image.",
    fillAllProductInfo: "Veuillez remplir toutes les informations du produit.",
    productCategory: "Catégorie",
    productLocation: "Lieu",
    productPrice: "Prix",
    editProductButton: "Modifier le produit"
  }
};

function App() {
  const USE_API = Boolean(import.meta.env.VITE_API_BASE_URL);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [pendingOtp, setPendingOtp] = useState(null);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [resetOtp, setResetOtp] = useState(null);
  const [resetOtpInput, setResetOtpInput] = useState("");
function normalizeCropName(value) {
  return String(value || "").trim().toLowerCase().replace(/s$/, "");
}

function resizeImage(file, maxWidth = 1000, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");

        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

  const [screen, setScreen] = useState(() => localStorage.getItem("agriMarketActiveAccount") ? "home" : "welcome");
  const [language, setLanguage] = useState(() => localStorage.getItem("agriMarketLanguage") || "rw");
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cropSearch, setCropSearch] = useState("");const [nisrData, setNisrData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("agriMarketOrders") || "[]");
    } catch {
      return [];
    }
  });
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [fulfilmentMethod, setFulfilmentMethod] = useState("Pickup");
  const [insightDistrict, setInsightDistrict] = useState("");
  const [insightSeason, setInsightSeason] = useState("");
  const createOrder = async (product) => {
    const quantity = Math.max(1, Number(orderQuantity) || 1);

    if (USE_API) {
      try {
        if (!product.id || !window.agriMarketApi?.createOrder) {
          throw new Error("ORDER_API_NOT_AVAILABLE");
        }

        const saved = await window.agriMarketApi.createOrder({
          productId: product.id,
          quantity,
          fulfilmentMethod
        });

        const order = {
          id: saved.id,
          productName: saved.product_name || product.name,
          productCategory: product.category || "",
          productPhoto: product.photo || "",
          quantity: Number(saved.quantity),
          unitPrice: Number(saved.total_amount) / Number(saved.quantity),
          total: Number(saved.total_amount),
          buyer: account.name || "",
          buyerPhone: account.phone || "",
          seller: product.seller || "",
          sellerPhone: product.sellerPhone || "",
          location: product.location || "",
          fulfilmentMethod: saved.fulfilment_method || fulfilmentMethod,
          status: saved.status || "Pending",
          createdAt: saved.created_at || new Date().toISOString()
        };

        setOrders([order]);
        setOrderQuantity(1);
        alert(`Order ${order.id} created successfully.`);
        setScreen("orders");
        return;
      } catch (error) {
        console.error("Order creation failed:", error);
        alert(`Order ntakozwe: ${error.message}`);
        return;
      }
    }

    const unitPrice = Number(String(product.price || "").replace(/[^0-9.]/g, "")) || 0;
    const order = {
      id: `AM-${Date.now()}`,
      productName: product.name,
      productCategory: product.category,
      productPhoto: product.photo || "",
      quantity,
      unitPrice,
      total: unitPrice * quantity,
      buyer: account.name || "",
      buyerPhone: account.phone || "",
      seller: product.seller || "",
      sellerPhone: product.sellerPhone || "",
      location: product.location || "",
      fulfilmentMethod,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    localStorage.setItem("agriMarketOrders", JSON.stringify(updatedOrders));

    const notification = {
      id: Date.now() + 1,
      recipientPhone: product.sellerPhone || "",
      senderPhone: account.phone || "",
      senderName: account.name || "User",
      type: "order",
      text: `New order for ${product.name}`,
      orderId: order.id,
      time: new Date().toISOString(),
      read: false
    };

    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem("agriMarketNotifications", JSON.stringify(updatedNotifications));

    setOrderQuantity(1);
    alert(`Order ${order.id} created successfully.`);
    setScreen("orders");
  };

  const getProcessingMatches = (product) => {
    const productName = normalizeCropName(product.name);
    const productCategory = normalizeCropName(product.category);
    const values = productName ? [productName] : [productCategory];

    const cropGroups = {
      Tomato: ["tomato", "tomatoes", "tomati"],
      Cassava: ["cassava", "manioc", "manyoc"],
      Rice: ["rice", "rices", "umuceri"],
      Maize: ["maize", "corn", "ibigori"],
      Fruit: ["fruit", "fruits", "banana", "bananas", "mango", "mangoes", "pineapple", "pineapples", "passion", "passion fruit", "papaya", "papayas", "avocado", "avocados"],
      Grain: ["grain", "grains", "cereal", "cereals", "wheat", "sorghum", "ibinyampeke"]
    };

    const matchedGroups = Object.entries(cropGroups)
      .filter(([group, aliases]) =>
        values.some((value) =>
          aliases.some((alias) => value.includes(alias) || alias.includes(value))
        )
      )
      .map(([group]) => group);

    if (matchedGroups.includes("Rice")) {
      return processingData.filter((item) => item.crop === "Rice");
    }

    if (matchedGroups.includes("Maize")) {
      return processingData.filter((item) => item.crop === "Maize");
    }

    return processingData.filter((item) => matchedGroups.includes(item.crop));
  };
  const recommendedCrops = insightDistrict && insightSeason
    ? (() => {
        const districtSeasonRows = nisrData.filter(
          (item) => item.district === insightDistrict && item.season === insightSeason
        );
        const validYield = (item) =>
          item.yield !== null &&
          item.yield !== undefined &&
          String(item.yield).trim() !== "" &&
          Number.isFinite(Number(item.yield));

        const groups = new Map();
        districtSeasonRows.filter(validYield).forEach((item) => {
          const cropName = String(item.crop || "").trim();
          if (!cropName) return;

          const cropKey = cropName.toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
          if (!groups.has(cropKey)) {
            groups.set(cropKey, {
              ...item,
              crop: cropName,
              weightedYieldSum: 0,
              weightSum: 0,
              recordCount: 0,
            });
          }

          const group = groups.get(cropKey);
          const weight = Number(item.plot_weight);
          const validWeight = Number.isFinite(weight) && weight > 0 ? weight : 1;
          group.weightedYieldSum += Number(item.yield) * validWeight;
          group.weightSum += validWeight;
          group.recordCount += 1;
        });

        const generalSeasonFallbacks = {
          A: {
            plantingPeriod: "September–October (general season estimate)",
            harvestPeriod: "January–February (general season estimate)",
          },
          B: {
            plantingPeriod: "February–March (general season estimate)",
            harvestPeriod: "May–June (general season estimate)",
          },
          C: {
            plantingPeriod: "July–August (general season estimate)",
            harvestPeriod: "October–November (general season estimate)",
          },
        };

        const commonSpecificPeriod = (rows, field) => {
          const counts = new Map();
          rows.forEach((row) => {
            const value = String(row[field] || "").trim().replace(/\s+/g, " ");
            if (!value || value.toLowerCase().includes("other season")) return;
            counts.set(value, (counts.get(value) || 0) + 1);
          });
          const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
          return ranked.length
            ? { value: ranked[0][0], count: ranked[0][1], distinctPeriods: ranked.length, totalSpecificRecords: ranked.reduce((sum, entry) => sum + entry[1], 0) }
            : null;
        };

        return [...groups.values()]
          .map((item) => {
            const cropKey = String(item.crop).trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
            const localCropRows = districtSeasonRows.filter(
              (row) => String(row.crop || "").trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "") === cropKey
            );
            const widerCropRows = nisrData.filter(
              (row) =>
                row.season === insightSeason &&
                String(row.crop || "").trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "") === cropKey
            );

            const getPeriod = (field, fallbackField) => {
              const localPeriod = commonSpecificPeriod(localCropRows, field);
              if (localPeriod) {
                return { ...localPeriod, source: "NISR records for this district" };
              }

              const widerPeriod = commonSpecificPeriod(widerCropRows, field);
              if (widerPeriod) {
                return { ...widerPeriod, source: "NISR records for this crop and season across districts" };
              }

              const fallback = generalSeasonFallbacks[insightSeason];
              return {
                value: fallback?.[fallbackField] || "No reliable period available",
                source: fallback ? "General season estimate; not crop-specific" : "No reliable period available",
              };
            };

            const planting = getPeriod("planting_period", "plantingPeriod");
            const harvest = getPeriod("harvest_period", "harvestPeriod");
            const yieldValue = item.weightedYieldSum / item.weightSum;

            return {
              ...item,
              yieldValue,
              yield: Number(yieldValue.toFixed(2)),
              plantingPeriod: planting.value,
              plantingPeriodSource: planting.source,
              plantingPeriodCount: planting.count || 0,
              plantingPeriodVariants: planting.distinctPeriods || 0,
              plantingPeriodRecords: planting.totalSpecificRecords || 0,
              harvestPeriod: harvest.value,
              harvestPeriodSource: harvest.source,
              harvestPeriodCount: harvest.count || 0,
              harvestPeriodVariants: harvest.distinctPeriods || 0,
              harvestPeriodRecords: harvest.totalSpecificRecords || 0,
            };
          })
          .sort((a, b) => b.yieldValue - a.yieldValue || b.recordCount - a.recordCount)
          .slice(0, 5);
      })()
    : [];
useEffect(() => {
  fetch(`${import.meta.env.BASE_URL}data/nisr_2025_crops.json`)
    .then((res) => res.json())
    .then((data) => setNisrData(data));

  if (USE_API) {
    window.agriMarketApi.processors()
      .then((data) => setProcessingData(Array.isArray(data) ? data : []))
      .catch(() => setProcessingData([]));
    return;
  }

  const savedProcessingData = localStorage.getItem("agriMarketProcessingData");
  if (savedProcessingData) {
    try { setProcessingData(JSON.parse(savedProcessingData)); }
    catch { fetch(`${import.meta.env.BASE_URL}data/processingData.json`).then((res) => res.json()).then((data) => setProcessingData(data)); }
  } else {
    fetch(`${import.meta.env.BASE_URL}data/processingData.json`)
      .then((res) => res.json())
      .then((data) => setProcessingData(data));
  }
}, []);
  const [role, setRole] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatSeller, setChatSeller] = useState(null);
  const [chatMode, setChatMode] = useState("list");
  const [chatParticipantPhone, setChatParticipantPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("");
  const [productLocationFilter, setProductLocationFilter] = useState("");
  const [productPriceFilter, setProductPriceFilter] = useState("");
  const [productPriceSort, setProductPriceSort] = useState("");
  const [productPhoto, setProductPhoto] = useState("");
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("agriMarketMessages") || "[]"));
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem("agriMarketNotifications") || "[]"));
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("agriMarketProducts");

    if (savedProducts) {
      return JSON.parse(savedProducts).filter((product) => product.name !== "🍅 Fresh Tomatoes" && product.name !== "🍌 Fresh Bananas");
    }

    return [];
  });
  useEffect(() => {
    if (!USE_API) return;

    let cancelled = false;
    window.agriMarketApi.products()
      .then((rows) => {
        if (cancelled || !Array.isArray(rows)) return;
        const mappedProducts = rows.map((row) => ({
          id: row.id,
          name: row.product_name || "",
          category: row.category || "Produce",
          location: [row.district, row.province].filter(Boolean).join(", "),
          price: `${row.price ?? 0} RWF / ${row.unit || "unit"}`,
          photo: row.photo || "",
          seller: row.seller || "",
          sellerPhone: row.seller_phone || "",
          quantity: row.quantity,
          unit: row.unit,
          province: row.province,
          district: row.district,
          sector: row.sector,
          cell: row.cell,
          village: row.village,
          availability: row.availability,
          quality: row.quality,
          harvestDate: row.harvest_date,
          description: row.description || "",
          status: row.status,
        }));
        setProducts(mappedProducts);
      })
      .catch((error) => {
        console.error("Could not load products from API:", error);
      });

    return () => { cancelled = true; };
  }, []);

  const [account, setAccount] = useState(() => {
    let savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
    const legacyAccount = JSON.parse(localStorage.getItem("agriMarketAccount") || "null");
    if (legacyAccount && !savedAccounts.some((a) => a.phone === legacyAccount.phone || a.email === legacyAccount.email)) {
      savedAccounts = [...savedAccounts, legacyAccount];
      localStorage.setItem("agriMarketAccounts", JSON.stringify(savedAccounts));
    }
    const savedAccount = JSON.parse(localStorage.getItem("agriMarketActiveAccount") || "null");
    return savedAccount
      ? savedAccount
      : {
          name: "",
          phone: "",
          email: "",
          password: "",
          photo: "",
        };
  });

  const chooseRole = (selectedRole) => {
    const updatedAccount = { ...account, role: selectedRole };
    setRole(selectedRole);
    const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
    const updatedAccounts = savedAccounts.map((a) =>
      ((account.phone && a.phone === account.phone) ||
       (account.email && a.email === account.email))
        ? { ...a, role: selectedRole }
        : a
    );
    localStorage.setItem("agriMarketAccounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("agriMarketActiveAccount", JSON.stringify(updatedAccount));
    localStorage.setItem("agriMarketRole", selectedRole);
    setAccount(updatedAccount);
    setScreen("profile");
  };

  return (
    <div style={styles.app}>
      <header style={{ ...styles.header, background: "linear-gradient(135deg, #075b2b, #16823b)", padding: "18px 20px", textAlign: "left", boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <span role="img" aria-label="Ibendera ry'u Rwanda" style={{ fontSize: "32px" }}>🇷🇼</span>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: "23px", letterSpacing: ".2px" }}>Agri Market</h1>
            <div style={{ fontSize: "12px", opacity: .9, marginTop: "3px" }}>Isoko ry’ubuhinzi bw’u Rwanda</div>
          </div>
          <button aria-label="Notifications" onClick={() => setScreen("notifications")} style={{ background: "rgba(255,255,255,.15)", color: "white", border: "1px solid rgba(255,255,255,.25)", borderRadius: "14px", padding: "10px", fontSize: "19px", cursor: "pointer" }}>♧</button>
        </div>
      </header>

      {screen === "welcome" && (
        <div style={styles.container}>
          <h2>{t("welcomeTitle")}</h2>
          <p>{t("welcomeSubtitle")}</p>

          <button style={styles.button} onClick={() => setScreen("role")}>
            Get Started
          </button>

          <button style={styles.secondaryButton} onClick={() => setScreen("login")}>
            Login
          </button>

          <button style={styles.linkButton} onClick={() => { setAccount({ name: "", phone: "", email: "", password: "", photo: "" }); setRole(""); setScreen("signup"); }}>
            Create Account
          </button>

          <a href="./admin.html" style={{ display: "inline-block", marginTop: "22px", color: "#16823b", fontSize: "13px", textDecoration: "none" }}>{USE_API ? "⚙️ Admin workspace (server)" : "⚙️ Admin workspace (prototype)"}</a>
        </div>
      )}

      {screen === "signup" && (
        <div style={styles.container}>
          <h2>{t("createAccount")}</h2>

          <input
            autoComplete="off"
            style={styles.input}
            placeholder={t("fullName")}
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
          />

          <input
            autoComplete="off"
            style={styles.input}
            placeholder={t("phoneNumber")}
            value={account.phone}
            onChange={(e) => setAccount({ ...account, phone: e.target.value })}
          />

          <input
            autoComplete="off"
            style={styles.input}
            placeholder={t("enterEmail")}
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />

          <label style={{ display: "block", textAlign: "left", marginBottom: "10px", fontSize: "14px" }}>Ubwoko bwa konti
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...styles.input, background: "white" }}>
              <option value="">Hitamo ubwoko bwa konti</option>
              <option value="Farmer">Umuhinzi (Farmer)</option>
              <option value="Buyer">Umuguzi (Buyer)</option>
              <option value="Business">Uruganda / Business</option>
            </select>
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              autoComplete="new-password"
              style={{ ...styles.input, paddingRight: "50px", boxSizing: "border-box" }}
              placeholder={t("password")}
              type={showSignupPassword ? "text" : "password"}
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowSignupPassword(!showSignupPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "20px",
                zIndex: 2
              }}
            >
              {showSignupPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button style={styles.button} onClick={async () => {
            if (!account.name.trim() || !account.phone.trim() || !account.email.trim() || account.password.length < 8 || !role) {
              alert("Uzuza amakuru yose, hitamo ubwoko bwa konti, kandi password igire nibura inyuguti 8."); return;
            }
            const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
            if (!USE_API && savedAccounts.some((a) => a.phone === account.phone.trim() || a.email?.toLowerCase() === account.email.trim().toLowerCase())) {
              alert("Iyi phone cyangwa email isanzwe ifite konti. Injira aho gukora indi."); return;
            }
            if (USE_API) {
              try {
                const apiRole = role === "Farmer" ? "producer" : role === "Buyer" ? "buyer" : "processor";
                await window.agriMarketAuth.signup({ fullName: account.name.trim(), phone: account.phone.trim(), email: account.email.trim().toLowerCase(), password: account.password, role: apiRole });
                setPendingOtp({ mode: "api", email: account.email.trim().toLowerCase(), expiresAt: Date.now() + 5 * 60 * 1000, account: { ...account, phone: account.phone.trim(), email: account.email.trim().toLowerCase(), role, verified: false } });
                setOtpInput(""); setOtpAttempts(0); setScreen("verification");
                try {
                  const sent = await window.agriMarketAuth.requestOtp(account.email.trim().toLowerCase(), "signup");
                  setPendingOtp((current) => current ? { ...current, expiresAt: Date.now() + 5 * 60 * 1000, developmentCode: sent.developmentCode } : current);
                  if (sent.developmentCode) alert(`DEVELOPMENT OTP: ${sent.developmentCode}\nNtuyikoreshe muri production.`);
                  else alert("OTP yoherejwe kuri email yawe.");
                } catch (error) { alert(`Konti yakozwe ariko OTP ntiyoherejwe: ${error.message}. Kanda 'Ongera wohereze OTP'.`); }
              } catch (error) { alert(`Registration yanze: ${error.message}`); }
              return;
            }
            const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 900000 + 100000);
            setPendingOtp({ mode: "demo", code, expiresAt: Date.now() + 5 * 60 * 1000, account: { ...account, phone: account.phone.trim(), email: account.email.trim().toLowerCase(), role, verified: false } });
            setOtpInput(""); setOtpAttempts(0); setScreen("verification");
            alert(`DEMO OTP: ${code}\nIyi code igenewe prototype yo kugerageza gusa. Production isaba API na email provider.`);
          }}>
            Kora konti / Saba OTP
          </button>

          <button style={styles.linkButton} onClick={() => { setRole(""); setScreen("welcome"); }}>
            {t("back")}
          </button>
        </div>
      )}

      {screen === "verification" && (
        <div style={styles.container}>
          <h2>Kwemeza email</h2>
          <p>{t("enterOtp")}</p>

          <p style={{ color: "#a15c00", fontSize: "13px" }}>{pendingOtp?.mode === "api" ? "OTP yoherejwe kuri email yawe; irangira mu minota 5." : "Prototype mode: OTP igaragara kuri demo gusa. Iyi si SMS nyayo."}</p>
          <input style={styles.input} placeholder="Andika code y’imibare 6" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otpInput} onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))} />

          <button style={styles.button} onClick={async () => {
            if (!pendingOtp) { alert("Nta OTP yasabwe. Subira kuri Create Account."); return; }
            if (Date.now() > pendingOtp.expiresAt) { setPendingOtp(null); setOtpInput(""); alert("OTP yarangiye. Ongera usabe code nshya."); setScreen("signup"); return; }
            if (otpAttempts >= 5) { setPendingOtp(null); setOtpInput(""); alert("Wagerageje inshuro nyinshi. Ongera utangire registration."); setScreen("signup"); return; }
            if (pendingOtp.mode === "api") {
              try { await window.agriMarketAuth.verifyOtp(pendingOtp.email, otpInput, "signup"); }
              catch (error) { setOtpAttempts((n) => n + 1); alert(`OTP ntiyemewe: ${error.message}`); return; }
            } else if (otpInput !== pendingOtp.code) { setOtpAttempts((n) => n + 1); alert(`OTP si yo. Usigaranye ${Math.max(0, 4 - otpAttempts)} attempts.`); return; }
            const verifiedAccount = { ...pendingOtp.account, verified: true };
            setPendingOtp(null); setOtpInput("");
            if (pendingOtp.mode === "api") {
              setAccount({ name: "", phone: "", email: "", password: "", photo: "" });
              setRole("");
              alert("Email yawe yemejwe. Injira ukoresheje email na password.");
              setScreen("login");
              return;
            }
            const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
            localStorage.setItem("agriMarketAccounts", JSON.stringify([...savedAccounts, verifiedAccount]));
            setAccount(verifiedAccount);
            alert("Konti yemejwe muri demo.");
            setScreen("role");
          }}>
            Emeza OTP
          </button>
          {pendingOtp?.mode === "api" && <button style={styles.linkButton} onClick={async () => {
            try {
              const sent = await window.agriMarketAuth.requestOtp(pendingOtp.email, "signup");
              setPendingOtp((current) => current ? { ...current, expiresAt: Date.now() + 5 * 60 * 1000, developmentCode: sent.developmentCode } : current);
              setOtpAttempts(0); setOtpInput("");
              if (sent.developmentCode) alert(`DEVELOPMENT OTP: ${sent.developmentCode}`); else alert("OTP nshya yoherejwe kuri email.");
            } catch (error) { alert(`Ntibyashobotse kohereza OTP: ${error.message}`); }
          }}>Ongera wohereze OTP</button>}
          <button style={styles.linkButton} onClick={() => { setPendingOtp(null); setOtpInput(""); setScreen("signup"); }}>Subira inyuma</button>

          <button style={styles.linkButton} onClick={() => { setAccount({ name: "", phone: "", email: "", password: "", photo: "" }); setRole(""); setScreen("signup"); }}>
            {t("back")}
          </button>
        </div>
      )}

      {screen === "login" && (
        <div style={styles.container}>
          <h2>{t("login")}</h2>

          <input id="loginIdentifier" style={styles.input} placeholder={t("loginIdentifier")} />

          <div style={{ position: "relative", width: "100%" }}>
            <input
              id="loginPassword"
              style={{ ...styles.input, paddingRight: "50px", boxSizing: "border-box" }}
              placeholder={t("password")}
              type={showLoginPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "20px"
              }}
            >
              {showLoginPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button style={styles.button} onClick={async () => {
            const identifier = document.getElementById("loginIdentifier").value.trim();
            const password = document.getElementById("loginPassword").value;
            if (USE_API) {
              try {
                const result = await window.agriMarketAuth.login(identifier, password);
                const apiUser = result.user;
                const apiRole = apiUser.role === "producer" ? "Farmer" : apiUser.role === "buyer" ? "Buyer" : apiUser.role === "processor" ? "Business" : "";
                const apiAccount = { name: apiUser.fullName, phone: apiUser.phone, email: apiUser.email || "", role: apiRole, verified: true };
                localStorage.setItem("agriMarketActiveAccount", JSON.stringify(apiAccount));
                setAccount(apiAccount); setRole(apiRole); setScreen(apiRole ? "home" : "role"); return;
              } catch (error) { alert(`Login yanze: ${error.message}`); return; }
            }
            const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
            const savedAccount = savedAccounts.find((a) => a.phone === identifier || a.email === identifier) || null;

            if (!savedAccount) {
              alert(t("noAccount"));
              return;
            }

            const savedPassword = String(savedAccount.password || "").trim();

            if (password.trim() === savedPassword) {
              if (savedAccount.verified === false) { alert("Konti ntiragenzuwe. Ongera ukore verification."); return; }
              localStorage.setItem("agriMarketActiveAccount", JSON.stringify(savedAccount));
              setAccount(savedAccount);
              setRole(savedAccount.role || "");
              setScreen(savedAccount.role ? "home" : "role");
            } else {
              alert(t("incorrectLogin"));
            }
          }}>
            Login
          </button>

          <button style={styles.linkButton} onClick={() => setScreen("forgot")}>
            Forgot Password?
          </button>

          <button style={styles.linkButton} onClick={() => { setRole(""); setScreen("welcome"); }}>
            {t("back")}
          </button>
        </div>
      )}

      {screen === "forgot" && (
        <div style={styles.container}>
          <h2>{t("forgotPassword")}</h2>
          <p>{t("resetPasswordText")}</p>
          <p style={{ color: "#a15c00", fontSize: "13px" }}>{USE_API ? "OTP yoherezwa kuri email ya konti yawe." : "Prototype mode: code igaragara kuri demo gusa."}</p>
          <input id="forgotIdentifier" style={styles.input} placeholder={t("loginIdentifier")} />
          <input id="newPassword" style={styles.input} placeholder={t("newPassword")} type="password" autoComplete="new-password" />
          {!resetOtp ? (
            <button style={styles.button} onClick={async () => {
              const identifier = document.getElementById("forgotIdentifier").value.trim();
              if (USE_API) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) { alert("Andika email ya konti yawe."); return; }
                try {
                  const email = identifier.toLowerCase();
                  const sent = await window.agriMarketAuth.requestOtp(email, "reset");
                  setResetOtp({ mode: "api", email, expiresAt: Date.now() + 5 * 60 * 1000, identifier, developmentCode: sent.developmentCode }); setResetOtpInput("");
                  if (sent.developmentCode) alert(`DEVELOPMENT RESET OTP: ${sent.developmentCode}`); else alert("OTP yo guhindura password yoherejwe kuri email.");
                } catch (error) { alert(`OTP ntiyoherejwe: ${error.message}`); }
                return;
              }
              const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
              const savedAccount = savedAccounts.find((a) => a.phone === identifier || a.email === identifier);
              if (!savedAccount) { alert(t("noAccountShort")); return; }
              if (!savedAccount.phone) { alert("Konti nta nimero ya telefone ifite yo kwemeza."); return; }
              const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 900000 + 100000);
              setResetOtp({ mode: "demo", code, expiresAt: Date.now() + 5 * 60 * 1000, identifier }); setResetOtpInput("");
              alert(`DEMO RESET OTP: ${code}\nIyi ni demo gusa; production isaba email provider.`);
            }}>
              Saba OTP yo guhindura password
            </button>
          ) : (
            <>
              <input style={styles.input} placeholder="OTP y’imibare 6" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={resetOtpInput} onChange={(e) => setResetOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))} />
              <button style={styles.button} onClick={async () => {
                const newPassword = document.getElementById("newPassword").value;
                if (Date.now() > resetOtp.expiresAt) { setResetOtp(null); setResetOtpInput(""); alert("OTP yarangiye. Saba indi."); return; }
                if (resetOtp.mode !== "api" && resetOtpInput !== resetOtp.code) { alert("OTP si yo."); return; }
                if (newPassword.length < 8) { alert("Password igomba kugira nibura inyuguti 8."); return; }
                if (resetOtp.mode === "api") {
                  try { await window.agriMarketAuth.resetPassword(resetOtp.email, resetOtpInput, newPassword); setResetOtp(null); setResetOtpInput(""); alert("Password yahinduwe neza."); setScreen("login"); }
                  catch (error) { alert(`Password ntiyahinduwe: ${error.message}`); }
                  return;
                }
                const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]");
                const index = savedAccounts.findIndex((a) => a.phone === resetOtp.identifier || a.email === resetOtp.identifier);
                if (index < 0) { setResetOtp(null); alert(t("noAccountShort")); return; }
                savedAccounts[index] = { ...savedAccounts[index], password: newPassword };
                localStorage.setItem("agriMarketAccounts", JSON.stringify(savedAccounts));
                const active = JSON.parse(localStorage.getItem("agriMarketActiveAccount") || "null");
                if (active && (active.phone === resetOtp.identifier || active.email === resetOtp.identifier)) localStorage.setItem("agriMarketActiveAccount", JSON.stringify(savedAccounts[index]));
                setResetOtp(null); setResetOtpInput(""); alert(t("passwordResetSuccess")); setScreen("login");
              }}>
                Emeza OTP kandi uhindure password
              </button>
              <button style={styles.linkButton} onClick={() => { setResetOtp(null); setResetOtpInput(""); }}>Saba indi OTP</button>
            </>
          )}
          <button style={styles.linkButton} onClick={() => { setResetOtp(null); setResetOtpInput(""); setScreen("login"); }}>{t("back")}</button>
        </div>
      )}

      {screen === "role" && (
        <div style={styles.container}>
          <h2>{t("chooseRole")}</h2>

          <button style={styles.roleButton} onClick={() => chooseRole("Farmer")}>
            👨‍🌾 {t("farmerRole")}
          </button>

          <button style={styles.roleButton} onClick={() => chooseRole("Buyer")}>
            🛒 {t("buyerRole")}
          </button>

          <button style={styles.roleButton} onClick={() => chooseRole("Business")}>
            🏢 {t("businessRole")}
          </button>
        </div>
      )}

      {screen === "profile" && (
        <div style={styles.container}>
          <h2>{t("farmerProfile")}</h2>

          <img
            id="profilePhoto"
            src={account.photo || ""}
            alt={t("profile")}
            width="100"
            height="100"
          />

          <p>{t("chooseProfilePhoto")}</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                resizeImage(file).then((img) => { setAccount((a) => ({ ...a, photo: img })); document.getElementById("profilePhoto").src = img; });
              }
            }}
          />

          <p id="farmerName">{t("farmerName")}: {account.name || t("farmer")}</p>
          <input
            id="farmerNameInput"
            type="text"
            placeholder={t("editFarmerName")}
          />

          <p id="phoneText">{t("phone")}: {account.phone || t("noPhone")}</p>
          <input
            id="phoneInput"
            type="tel"
            placeholder={t("editPhone")}
          />

          <p id="locationText">{t("location")}: {account.location || t("noLocation")}</p>
          <input
            id="locationInput"
            type="text"
            placeholder={t("editLocation")}
          />

          <p id="emailText">{t("email")}: {account.email || t("noEmail")}</p>
          <input
            id="emailInput"
            type="email"
            placeholder={t("editEmail")}
          />

          <button
            style={styles.button}
            onClick={() => {
              const name = document.getElementById("farmerNameInput").value.trim();
              const phone = document.getElementById("phoneInput").value.trim();
              const location = document.getElementById("locationInput").value.trim();
              const email = document.getElementById("emailInput").value.trim();

              if (name) {
                document.getElementById("farmerName").textContent =
                  t("farmerName") + ": " + name;
              }

              if (phone) {
                document.getElementById("phoneText").textContent =
                  t("phone") + ": " + phone;
              }

              if (location) {
                document.getElementById("locationText").textContent =
                  t("location") + ": " + location;
              }

              if (email) {
                document.getElementById("emailText").textContent =
                  t("email") + ": " + email;
              }

              const updatedAccount = {
                ...account,
                name: name || account.name,
                phone: phone || account.phone,
                email: email || account.email,
                location: location || account.location || "",
                photo: document.getElementById("profilePhoto").src || account.photo || "",
              };

              setAccount(updatedAccount);
              const savedAccounts = JSON.parse(localStorage.getItem("agriMarketAccounts") || "[]"); localStorage.setItem("agriMarketAccounts", JSON.stringify(savedAccounts.map((a) => (a.phone === account.phone || a.email === account.email) ? updatedAccount : a)));

              alert("Changes saved successfully!");
            }}
          >
            {t("saveChanges")}
          </button>

          <button
            style={styles.button}
            onClick={() => setScreen("home")}
          >
            {t("completeProfile")}
          </button>
        </div>
      )}

      {screen === "home" && (
        <div style={{ ...styles.container, margin: "0 auto", padding: "20px 16px", textAlign: "left" }}>
          <div style={{ margin: "4px 0 20px" }}>
            <p style={{ color: "#16823b", fontSize: "13px", fontWeight: 700, margin: "0 0 7px" }}>🇷🇼 ISOKO RY’UBUHINZI</p>
            <h2 style={{ fontSize: "25px", lineHeight: 1.25, margin: "0 0 8px", color: "#153b25" }}>
              {t("welcome")} {account.name || "kuri Agri Market"}!
            </h2>
            <p style={{ color: "#607166", margin: 0, fontSize: "14px" }}>
              Shaka umusaruro, menya amakuru y’ubuhinzi kandi wongere agaciro k’ibyo uhinga.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "22px" }}>
            <input
              aria-label={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") setScreen("products"); }}
              placeholder="🔎 Shaka imyaka cyangwa ibicuruzwa..."
              style={{ ...styles.input, flex: 1, minWidth: 0, margin: 0, borderRadius: "14px", padding: "14px 12px", border: "1px solid #dce7de", background: "#fff" }}
            />
            <button onClick={() => setScreen("products")} style={{ background: "#16823b", color: "#fff", border: 0, borderRadius: "14px", padding: "0 16px", fontWeight: 700, cursor: "pointer" }}>
              Shaka
            </button>
          </div>

          <button onClick={() => setScreen("products")} style={{ width: "100%", textAlign: "left", border: 0, borderRadius: "20px", padding: "20px", color: "#fff", background: "linear-gradient(120deg,#126b35,#22994d)", marginBottom: "22px", cursor: "pointer", boxShadow: "0 8px 20px rgba(22,130,59,.16)" }}>
            <div style={{ fontSize: "12px", opacity: .9, marginBottom: "8px" }}>AGRI MARKET • RWANDA</div>
            <div style={{ fontSize: "22px", fontWeight: 800, lineHeight: 1.3 }}>Umusaruro wawe, amahirwe mashya 🌾</div>
            <div style={{ fontSize: "13px", marginTop: "8px" }}>Reba ibicuruzwa biri ku isoko →</div>
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ margin: 0, color: "#183d28", fontSize: "18px" }}>Serivisi z’ingenzi</h3>
            <span style={{ fontSize: "12px", color: "#6a7d70" }}>Agri Market</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "12px", marginBottom: "24px" }}>
            <button onClick={() => setScreen("crops")} style={{ textAlign: "left", border: "1px solid #e2ece4", borderRadius: "17px", background: "#fff", padding: "16px 13px", minHeight: "135px", cursor: "pointer", color: "#1a3b28" }}>
              <div style={{ fontSize: "29px", marginBottom: "10px" }}>🌱</div>
              <strong style={{ display: "block", fontSize: "15px" }}>Smart Crop Recommendations</strong>
              <span style={{ display: "block", fontSize: "12px", color: "#68786d", marginTop: "6px", lineHeight: 1.5 }}>Reba imyaka n’ibihe by’ihinga</span>
            </button>
            <button onClick={() => setScreen("insights")} style={{ textAlign: "left", border: "1px solid #e2ece4", borderRadius: "17px", background: "#fff", padding: "16px 13px", minHeight: "135px", cursor: "pointer", color: "#1a3b28" }}>
              <div style={{ fontSize: "29px", marginBottom: "10px" }}>📊</div>
              <strong style={{ display: "block", fontSize: "15px" }}>Data & Insights</strong>
              <span style={{ display: "block", fontSize: "12px", color: "#68786d", marginTop: "6px", lineHeight: 1.5 }}>Amakuru y’ubuhinzi ashingiye kuri NISR</span>
            </button>
            <button onClick={() => setScreen("processing")} style={{ textAlign: "left", border: "1px solid #e2ece4", borderRadius: "17px", background: "#fff", padding: "16px 13px", minHeight: "135px", cursor: "pointer", color: "#1a3b28" }}>
              <div style={{ fontSize: "29px", marginBottom: "10px" }}>🏭</div>
              <strong style={{ display: "block", fontSize: "15px" }}>Processing & Value Addition</strong>
              <span style={{ display: "block", fontSize: "12px", color: "#68786d", marginTop: "6px", lineHeight: 1.5 }}>Uburyo bwo gutunganya umusaruro</span>
            </button>
            <button onClick={() => setScreen("products")} style={{ textAlign: "left", border: "1px solid #e2ece4", borderRadius: "17px", background: "#fff", padding: "16px 13px", minHeight: "135px", cursor: "pointer", color: "#1a3b28" }}>
              <div style={{ fontSize: "29px", marginBottom: "10px" }}>🧺</div>
              <strong style={{ display: "block", fontSize: "15px" }}>Isoko ry’ibicuruzwa</strong>
              <span style={{ display: "block", fontSize: "12px", color: "#68786d", marginTop: "6px", lineHeight: 1.5 }}>Shaka cyangwa ushyireho umusaruro</span>
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ margin: 0, color: "#183d28", fontSize: "18px" }}>Ibikorwa byawe</h3>
            <span style={{ fontSize: "12px", color: "#68786d" }}>{t("yourRole")}: {role || t("user")}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px", marginBottom: "18px" }}>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => setScreen("sellerDashboard")}>📦 {t("myProducts")}</button>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => setScreen("orders")}>📋 My Orders</button>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => setScreen("profile")}>👤 {t("myProfile")}</button>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => setScreen("settings")}>⚙️ {t("settings")}</button>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => { setChatMode("list"); setScreen("chat"); }}>💬 {t("chat")}</button>
            <button style={{ ...styles.secondaryButton, margin: 0, background: "#fff", border: "1px solid #dfe9e1" }} onClick={() => setScreen("help")}>❓ {t("helpSupport")}</button>
          </div>

          <button style={{ ...styles.secondaryButton, width: "100%" }} onClick={() => {
            localStorage.removeItem("agriMarketActiveAccount");
            setAccount({ name: "", phone: "", email: "", password: "", photo: "" });
            setRole("");
            setScreen("welcome");
          }}>
            {t("logout")}
          </button>
        </div>
      )}
      {screen === "settings" && (
        <div style={styles.container}>
          <h2>{t("settings")}</h2>
          <p>{t("manageSettings")}</p>

          <div style={styles.card}>
            <h3>{t("language")}</h3>
            <select
              value={language}
              onChange={(e) => {
                const value = e.target.value;
                setLanguage(value);
                localStorage.setItem("agriMarketLanguage", value);
              }}
              style={styles.input}
            >
              <option value="rw">🇷🇼 Kinyarwanda</option>
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
            </select>
          </div>

          <button style={styles.button} onClick={() => setScreen("insights")}>📊 {t("dataInsightsButton")}</button>
          <button style={styles.button} onClick={() => setScreen("processing")}>🏭 {t("processingButton")}</button>
          <button style={styles.button} onClick={() => setScreen("profile")}>{t("profileSettings")}</button>
          <button style={styles.secondaryButton} onClick={() => setScreen("home")}>{t("backHome")}</button>
        </div>
      )}

      {screen === "chat" && (
        <div style={styles.container}>
          {chatMode === "list" ? (
            <>
              <h2>💬 {t("conversations")}</h2>

              {messages.filter(
                (message) =>
                  samePhone(message.senderPhone, account.phone) ||
                  samePhone(message.recipientPhone, account.phone)
              ).length === 0 ? (
                <p>{t("noConversations")}</p>
              ) : (
                [...new Set(
                  messages
                    .filter(
                      (message) =>
                        samePhone(message.senderPhone, account.phone) ||
                        samePhone(message.recipientPhone, account.phone)
                    )
                    .map((message) =>
                      samePhone(message.senderPhone, account.phone)
                        ? message.recipientPhone
                        : message.senderPhone
                    )
                    .filter(Boolean)
                )].map((phone) => {
                  const conversationMessages = messages.filter(
                    (message) =>
                      (samePhone(message.senderPhone, account.phone) &&
                        samePhone(message.recipientPhone, phone)) ||
                      (samePhone(message.senderPhone, phone) &&
                        samePhone(message.recipientPhone, account.phone))
                  );

                  const lastMessage = [...conversationMessages].sort(
                    (a, b) => new Date(b.time) - new Date(a.time)
                  )[0];

                  const sellerProduct = products.find(
                    (product) => samePhone(product.sellerPhone, phone)
                  );

                  const participantName =
                    sellerProduct?.seller ||
                    lastMessage?.recipientName ||
                    (lastMessage?.senderPhone === phone
                      ? lastMessage.sender
                      : phone);

                  return (
                    <div
                      key={phone}
                      style={styles.card}
                      onClick={() => {
                        setChatParticipantPhone(phone);
                        setChatSeller(
                          sellerProduct || {
                            seller: participantName,
                            sellerPhone: account.phone
                          }
                        );
                        setChatMode("conversation");
                      }}
                    >
                      <h3>👤 {participantName}</h3>
                      <p>{lastMessage?.text || t("noMessageShort")}</p>
                    </div>
                  );
                })
              )}

              <button
                style={styles.secondaryButton}
                onClick={() => setScreen("home")}
              >
                {t("backHome")}
              </button>
            </>
          ) : (
            <>
              <h2>💬 {t("chatWithUser")} {chatSeller?.seller || t("userName")}</h2>

              <input
                id="chatMessageInput"
                style={styles.input}
                placeholder={t("typeMessage")}
              />

              <button
                style={styles.button}
                onClick={() => {
                  const input = document.getElementById("chatMessageInput");
                  const text = input.value.trim();

                  if (!text || !chatParticipantPhone) return;

                  const newMessages = [
                    ...messages,
                    {
                      sender: account.name || "User",
                      senderPhone: account.phone || "",
                      sellerPhone: chatSeller?.sellerPhone || account.phone || "",
                      recipientPhone: chatParticipantPhone,
                      recipientName: chatSeller?.seller || "User",
                      text,
                      time: new Date().toISOString()
                    }
                  ];

                  setMessages(newMessages);
                  localStorage.setItem(
                    "agriMarketMessages",
                    JSON.stringify(newMessages)
                  );

                  const newNotification = {
                    id: Date.now(),
                    recipientPhone: chatParticipantPhone,
                    senderPhone: account.phone || "",
                    senderName: account.name || "User",
                    text,
                    time: new Date().toISOString(),
                    read: false
                  };

                  const updatedNotifications = [
                    ...notifications,
                    newNotification
                  ];

                  setNotifications(updatedNotifications);
                  localStorage.setItem(
                    "agriMarketNotifications",
                    JSON.stringify(updatedNotifications)
                  );

                  input.value = "";
                }}
              >
                {t("send")}
              </button>

              {messages.filter(
                (message) =>
                  (samePhone(message.senderPhone, account.phone) &&
                    samePhone(message.recipientPhone, chatParticipantPhone)) ||
                  (samePhone(message.senderPhone, chatParticipantPhone) &&
                    samePhone(message.recipientPhone, account.phone))
              ).length === 0 ? (
                <p>{t("noMessagesYet")}</p>
              ) : (
                messages
                  .filter(
                    (message) =>
                      (samePhone(message.senderPhone, account.phone) &&
                        samePhone(message.recipientPhone, chatParticipantPhone)) ||
                      (samePhone(message.senderPhone, chatParticipantPhone) &&
                        samePhone(message.recipientPhone, account.phone))
                  )
                  .map((message, index) => {
                    const isMine = samePhone(message.senderPhone, account.phone);

                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: isMine ? "flex-end" : "flex-start",
                          marginTop: "10px"
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "75%",
                            padding: "10px 14px",
                            borderRadius: "14px",
                            background: isMine ? "#16823b" : "#eeeeee",
                            color: isMine ? "white" : "#222",
                            textAlign: "left"
                          }}
                        >
                          <strong>{isMine ? t("you") : message.sender}</strong>
                          <p style={{ margin: "5px 0 0" }}>{message.text}</p>
                        </div>
                      </div>
                    );
                  })
              )}

              <button
                style={styles.secondaryButton}
                onClick={() => setChatMode("list")}
              >
                {t("backToConversations")}
              </button>
            </>
          )}
        </div>
      )}
      {screen === "orders" && (
        <div style={styles.container}>
          <h2>📦 My Orders</h2>

          {orders.filter(
            (order) =>
              order.buyerPhone === account.phone ||
              order.sellerPhone === account.phone
          ).length === 0 ? (
            <div style={styles.card}>
              <h3>No orders yet</h3>
              <p>Your orders will appear here.</p>
            </div>
          ) : (
            orders
              .filter(
                (order) =>
                  order.buyerPhone === account.phone ||
                  order.sellerPhone === account.phone
              )
              .slice()
              .reverse()
              .map((order) => {
                const isSeller = order.sellerPhone === account.phone;

                return (
                  <div style={styles.card} key={order.id}>
                    {order.productPhoto && (
                      <img
                        src={order.productPhoto}
                        alt={order.productName}
                        style={{
                          width: "100%",
                          maxHeight: "180px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />
                    )}

                    <h3>{order.productName}</h3>
                    <p>Order ID: {order.id}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Unit price: {order.unitPrice}</p>
                    <p><strong>Total: {order.total}</strong></p>
                    <p>{isSeller ? "Buyer" : "Seller"}: {isSeller ? order.buyer : order.seller}</p>
                    <p>Status: <strong>{order.status}</strong></p>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>

                    {isSeller && order.status === "Pending" && (
                      <div>
                        <button
                          style={styles.button}
                          onClick={() => {
                            const updated = orders.map((item) =>
                              item.id === order.id
                                ? { ...item, status: "Accepted" }
                                : item
                            );
                            setOrders(updated);
                            localStorage.setItem(
                              "agriMarketOrders",
                              JSON.stringify(updated)
                            );

                            const notification = {
                              id: Date.now(),
                              recipientPhone: order.buyerPhone,
                              senderPhone: account.phone || "",
                              senderName: account.name || "User",
                              type: "order",
                              text: `Your order ${order.id} was accepted.`,
                              orderId: order.id,
                              time: new Date().toISOString(),
                              read: false
                            };

                            const updatedNotifications = [
                              ...notifications,
                              notification
                            ];
                            setNotifications(updatedNotifications);
                            localStorage.setItem(
                              "agriMarketNotifications",
                              JSON.stringify(updatedNotifications)
                            );
                          }}
                        >
                          ✅ Accept
                        </button>

                        <button
                          style={styles.secondaryButton}
                          onClick={() => {
                            const updated = orders.map((item) =>
                              item.id === order.id
                                ? { ...item, status: "Rejected" }
                                : item
                            );
                            setOrders(updated);
                            localStorage.setItem(
                              "agriMarketOrders",
                              JSON.stringify(updated)
                            );

                            const notification = {
                              id: Date.now(),
                              recipientPhone: order.buyerPhone,
                              senderPhone: account.phone || "",
                              senderName: account.name || "User",
                              type: "order",
                              text: `Your order ${order.id} was rejected.`,
                              orderId: order.id,
                              time: new Date().toISOString(),
                              read: false
                            };

                            const updatedNotifications = [
                              ...notifications,
                              notification
                            ];
                            setNotifications(updatedNotifications);
                            localStorage.setItem(
                              "agriMarketNotifications",
                              JSON.stringify(updatedNotifications)
                            );
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}

                    {!isSeller && order.status === "Accepted" && (
                      <button
                        style={styles.button}
                        onClick={() => {
                          const updated = orders.map((item) =>
                            item.id === order.id
                              ? { ...item, status: "Completed" }
                              : item
                          );
                          setOrders(updated);
                          localStorage.setItem(
                            "agriMarketOrders",
                            JSON.stringify(updated)
                          );
                        }}
                      >
                        ✅ Mark Completed
                      </button>
                    )}
                  </div>
                );
              })
          )}

          <button
            style={styles.secondaryButton}
            onClick={() => setScreen("home")}
          >
            ← Back to Home
          </button>
        </div>
      )}

      {screen === "notifications" && (
        <div style={styles.container}>
          <h2>🔔 {t("notifications")}</h2>

          {notifications.filter(
            (notification) =>
              notification.recipientPhone === account.phone &&
              !notification.read
          ).length === 0 ? (
            <p>{t("noNotifications")}</p>
          ) : (
            notifications
              .filter(
                (notification) =>
                  notification.recipientPhone === account.phone &&
                  !notification.read
              )
              .sort((a, b) => new Date(b.time) - new Date(a.time))
              .map((notification) => (
                <div key={notification.id} style={{...styles.card, cursor:"pointer"}} onClick={() => { setNotifications(notifications.map((n) => n.id === notification.id ? { ...n, read: true } : n)); localStorage.setItem("agriMarketNotifications", JSON.stringify(notifications.map((n) => n.id === notification.id ? { ...n, read: true } : n))); setChatParticipantPhone(notification.senderPhone); setChatSeller({ seller: notification.senderName, sellerPhone: notification.senderPhone }); setChatMode("conversation"); setScreen("chat"); }}>
                  <strong>💬 {t("newMessageFrom")} {notification.senderName}</strong>
                  <p>{notification.text}</p>
                </div>
              ))
          )}

          <button
            style={styles.secondaryButton}
            onClick={() => setScreen("home")}
          >
            {t("backHome")}
          </button>
        </div>
      )}

      {screen === "help" && (
        <div style={styles.container}>
          <h2>❓ {t("helpSupport")}</h2>
          <p>{t("needHelp")}</p>
          <p>{t("contactSupport")}</p>
          <button style={styles.secondaryButton} onClick={() => setScreen("home")}>{t("backHome")}</button>
        </div>
      )}

      {screen === "addProduct" && (
        <div style={styles.container}>
          <h2>{t("addProduct")}</h2>

          <input
            id="newProductName"
            style={styles.input}
            type="text"
            placeholder={t("productName")}
          />

          <input
            id="newProductCategory"
            style={styles.input}
            type="text"
            placeholder={t("category")}
          />

          <input
            id="newProductLocation"
            style={styles.input}
            type="text"
            placeholder={t("location")}
          />

          <input
            id="newProductPrice"
            style={styles.input}
            type="text"
            placeholder={t("priceExample")}
          />

          {USE_API && (
            <>
              <h3>Product details for database</h3>
              <input id="newProductQuantity" style={styles.input} type="number" min="0.01" step="any" placeholder="Quantity" />
              <input id="newProductUnit" style={styles.input} type="text" placeholder="Unit (kg, tonne, litre, piece...)" />
              <input id="newProductProvince" style={styles.input} type="text" placeholder="Province" />
              <input id="newProductDistrict" style={styles.input} type="text" placeholder="District" />
              <input id="newProductSector" style={styles.input} type="text" placeholder="Sector" />
              <input id="newProductCell" style={styles.input} type="text" placeholder="Cell" />
              <input id="newProductVillage" style={styles.input} type="text" placeholder="Village" />
              <input id="newProductAvailability" style={styles.input} type="text" placeholder="Availability (e.g. Available)" />
              <input id="newProductQuality" style={styles.input} type="text" placeholder="Quality (e.g. Fresh)" />
              <label htmlFor="newProductHarvestDate">Harvest date</label>
              <input id="newProductHarvestDate" style={styles.input} type="date" />
              <textarea id="newProductDescription" style={styles.input} placeholder="Description (optional)" rows={3} />
              <p style={{ fontSize: "12px", color: "#666" }}>Category and photo are not yet stored in the database.</p>
            </>
          )}

          <input
            style={styles.input}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              resizeImage(file)
                .then((resizedImage) => setProductPhoto(resizedImage))
                .catch(() => alert(t("imageError")));
            }}
          />

          <button
            style={styles.button}
            onClick={async () => {
              const value = (id) => document.getElementById(id)?.value.trim() || "";
              const name = value("newProductName");
              const category = value("newProductCategory");
              const location = value("newProductLocation");
              const priceText = value("newProductPrice");

              if (!name || !category || !location || !priceText) {
                alert(t("fillProductInfo"));
                return;
              }

              if (USE_API) {
                const quantity = Number(value("newProductQuantity"));
                const unit = value("newProductUnit");
                const province = value("newProductProvince");
                const district = value("newProductDistrict");
                const sector = value("newProductSector");
                const cell = value("newProductCell");
                const village = value("newProductVillage");
                const availability = value("newProductAvailability");
                const quality = value("newProductQuality");
                const harvestDate = value("newProductHarvestDate");
                const price = Number(priceText.replace(/[^0-9.]/g, ""));
                const description = value("newProductDescription");

                if (!Number.isFinite(quantity) || quantity <= 0 || !unit ||
                    !Number.isFinite(price) || price < 0 ||
                    !province || !district || !sector || !cell || !village ||
                    !availability || !quality || !harvestDate) {
                  alert("Uzuza quantity, unit, price, province, district, sector, cell, village, availability, quality n'itariki yo gusarura.");
                  return;
                }

                try {
                  const row = await window.agriMarketApi.createProduct({
                    product_name: name,
                    quantity,
                    unit,
                    price,
                    province,
                    district,
                    sector,
                    cell,
                    village,
                    availability,
                    quality,
                    harvest_date: harvestDate,
                    description
                  });

                  const savedProduct = {
                    id: row.id,
                    name: row.product_name || name,
                    category,
                    location: [row.district, row.province].filter(Boolean).join(", "),
                    price: `${row.price} RWF / ${row.unit}`,
                    photo: productPhoto || "",
                    seller: account.name || "",
                    sellerPhone: account.phone || "",
                    quantity: row.quantity,
                    unit: row.unit,
                    province: row.province,
                    district: row.district,
                    sector: row.sector,
                    cell: row.cell,
                    village: row.village,
                    availability: row.availability,
                    quality: row.quality,
                    harvestDate: row.harvest_date,
                    description: row.description || "",
                    status: row.status
                  };

                  const updatedProducts = [savedProduct, ...products];
                  setProducts(updatedProducts);
                  localStorage.setItem("agriMarketProducts", JSON.stringify(updatedProducts));
                  setProductPhoto("");
                  setScreen("products");
                } catch (error) {
                  alert(`Product ntiyabitswe: ${error.message}`);
                }
                return;
              }

              const updatedProducts = [
                ...products,
                {
                  name,
                  category,
                  location,
                  price: priceText,
                  photo: productPhoto || "",
                  seller: account.name || "",
                  sellerPhone: account.phone || ""
                }
              ];

              setProducts(updatedProducts);
              localStorage.setItem("agriMarketProducts", JSON.stringify(updatedProducts));
              setProductPhoto("");
              setScreen("products");
            }}
          >
            {t("addProductButton")}
          </button>

          {selectedProduct && selectedProduct.sellerPhone === account.phone && (
            <button
              style={styles.secondaryButton}
              onClick={() => {
                const confirmed = window.confirm(
                  t("confirmDeleteProduct")
                );

                if (!confirmed) {
                  return;
                }

                const updatedProducts = products.filter(
                  (product) => product !== selectedProduct
                );

                setProducts(updatedProducts);
                localStorage.setItem(
                  "agriMarketProducts",
                  JSON.stringify(updatedProducts)
                );

                setSelectedProduct(null);
                setScreen("sellerDashboard");
              }}
            >
              🗑️ {t("deleteProduct")}
            </button>
          )}

          <button
            style={styles.button}
            onClick={() => {
              setChatSeller(selectedProduct);
              setChatParticipantPhone(selectedProduct.sellerPhone || "");
              setChatMode("conversation");
              setScreen("chat");
            }}
          >
            💬 {t("chatWithSeller")}
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => setScreen("products")}
          >
            {t("backToProducts")}
          </button>
        </div>
      )}

      {screen === "editProduct" && selectedProduct && (
        <div style={styles.container}>
          <h2>{t("editProduct")}</h2>

          <input id="editProductName" style={styles.input} type="text"
            defaultValue={selectedProduct.name} placeholder={t("productName")} />
          <input id="editProductCategory" style={styles.input} type="text"
            defaultValue={selectedProduct.category || ""} placeholder={t("productCategory")} />
          <input id="editProductLocation" style={styles.input} type="text"
            defaultValue={selectedProduct.location || ""} placeholder={t("productLocation")} />
          <input id="editProductPrice" style={styles.input} type="number" min="0" step="any"
            defaultValue={String(selectedProduct.price || "").replace(/[^0-9.]/g, "")}
            placeholder={t("productPrice")} />

          {USE_API && (
            <>
              <h3>Database product details</h3>
              <input id="editProductQuantity" style={styles.input} type="number" min="0.01" step="any"
                defaultValue={selectedProduct.quantity ?? ""} placeholder="Quantity" />
              <input id="editProductUnit" style={styles.input} type="text"
                defaultValue={selectedProduct.unit || ""} placeholder="Unit (kg, tonne, litre, piece...)" />
              <input id="editProductProvince" style={styles.input} type="text"
                defaultValue={selectedProduct.province || ""} placeholder="Province" />
              <input id="editProductDistrict" style={styles.input} type="text"
                defaultValue={selectedProduct.district || ""} placeholder="District" />
              <input id="editProductSector" style={styles.input} type="text"
                defaultValue={selectedProduct.sector || ""} placeholder="Sector" />
              <input id="editProductCell" style={styles.input} type="text"
                defaultValue={selectedProduct.cell || ""} placeholder="Cell" />
              <input id="editProductVillage" style={styles.input} type="text"
                defaultValue={selectedProduct.village || ""} placeholder="Village" />
              <input id="editProductAvailability" style={styles.input} type="text"
                defaultValue={selectedProduct.availability || "Available"} placeholder="Availability" />
              <input id="editProductQuality" style={styles.input} type="text"
                defaultValue={selectedProduct.quality || ""} placeholder="Quality" />
              <label htmlFor="editProductHarvestDate">Harvest date</label>
              <input id="editProductHarvestDate" style={styles.input} type="date"
                defaultValue={String(selectedProduct.harvestDate || "").slice(0, 10)} />
              <textarea id="editProductDescription" style={styles.input} rows={3}
                defaultValue={selectedProduct.description || ""} placeholder="Description" />
              <p style={{fontSize: "12px", color: "#666"}}>
                Category and photo are kept in the app; they are not stored in the database yet.
              </p>
            </>
          )}

          <input style={styles.input} type="file" accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              resizeImage(file)
                .then((resizedImage) => setProductPhoto(resizedImage))
                .catch(() => alert(t("unableProcessImage")));
            }} />

          <button style={styles.button} onClick={async () => {
            const value = (id) => document.getElementById(id)?.value.trim() || "";
            const name = value("editProductName");
            const category = value("editProductCategory");
            const location = value("editProductLocation");
            const priceText = value("editProductPrice");
            const price = Number(priceText);

            if (!name || !category || !location || !priceText ||
                !Number.isFinite(price) || price < 0) {
              alert(t("fillAllProductInfo"));
              return;
            }

            const photo = productPhoto || selectedProduct.photo || "";

            try {
              let savedProduct;

              if (USE_API && selectedProduct.id) {
                const quantity = Number(value("editProductQuantity"));
                const unit = value("editProductUnit");
                const province = value("editProductProvince");
                const district = value("editProductDistrict");
                const sector = value("editProductSector");
                const cell = value("editProductCell");
                const village = value("editProductVillage");
                const availability = value("editProductAvailability");
                const quality = value("editProductQuality");
                const harvestDate = value("editProductHarvestDate");
                const description = value("editProductDescription");

                if (!Number.isFinite(quantity) || quantity <= 0 || !unit ||
                    province.length < 2 || district.length < 2 || sector.length < 2 ||
                    !cell || !village || !availability || !quality ||
                    !/^\d{4}-\d{2}-\d{2}$/.test(harvestDate)) {
                  alert("Uzuza neza quantity, unit, province, district, sector, cell, village, availability, quality n'itariki yo gusarura.");
                  return;
                }

                const row = await window.agriMarketApi.updateProduct(selectedProduct.id, {
                  product_name: name, quantity, unit, price, province, district,
                  sector, cell, village, availability, quality,
                  harvest_date: harvestDate, description
                });

                savedProduct = {
                  ...selectedProduct,
                  id: row.id,
                  name: row.product_name || name,
                  category,
                  location: [row.district, row.province].filter(Boolean).join(", "),
                  price: `${row.price} RWF / ${row.unit}`,
                  photo,
                  quantity: row.quantity,
                  unit: row.unit,
                  province: row.province,
                  district: row.district,
                  sector: row.sector,
                  cell: row.cell,
                  village: row.village,
                  availability: row.availability,
                  quality: row.quality,
                  harvestDate: String(row.harvest_date || harvestDate).slice(0, 10),
                  description: row.description || "",
                  status: row.status
                };
              } else {
                savedProduct = {
                  ...selectedProduct, name, category, location,
                  price: priceText, photo,
                  seller: selectedProduct.seller || account.name || "",
                  sellerPhone: selectedProduct.sellerPhone || account.phone || ""
                };
              }

              const updatedProducts = products.map((product) =>
                product.id === selectedProduct.id ? savedProduct :
                product === selectedProduct ? savedProduct : product
              );
              setProducts(updatedProducts);
              localStorage.setItem("agriMarketProducts", JSON.stringify(updatedProducts));
              setSelectedProduct(savedProduct);
              setProductPhoto("");
              setScreen("productDetails");
            } catch (error) {
              alert(`Impinduka ntizabitswe: ${error.message}`);
            }
          }}>
            {t("saveChanges")}
          </button>

          <button style={styles.secondaryButton} onClick={() => {
            setProductPhoto("");
            setScreen("productDetails");
          }}>
            {t("cancel")}
          </button>
        </div>
      )}

      {screen === "productDetails" && selectedProduct && (
        <div style={styles.container}>
          <h2>{t("productDetails")}</h2>

          <div style={styles.card}>
            {selectedProduct.photo && <img src={selectedProduct.photo} alt={selectedProduct.name} style={{width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px"}} />}
            <h2>{selectedProduct.name}</h2>
            <p>{t("productCategory")}: {selectedProduct.category}</p>
            <p>{t("productLocation")}: {selectedProduct.location}</p>
            <p>{t("productPrice")}: {selectedProduct.price}</p>
            <p>Quantity: {selectedProduct.quantity ?? "—"} {selectedProduct.unit || ""}</p>
            <p>Availability: {selectedProduct.availability || "—"}</p>
            <p>Quality: {selectedProduct.quality || "—"}</p>
            <p>Harvest date: {selectedProduct.harvestDate ? String(selectedProduct.harvestDate).slice(0, 10) : "—"}</p>
            <p>Province: {selectedProduct.province || "—"}</p>
            <p>District: {selectedProduct.district || "—"}</p>
            <p>Sector: {selectedProduct.sector || "—"}</p>
            <p>Cell: {selectedProduct.cell || "—"}</p>
            <p>Village: {selectedProduct.village || "—"}</p>
            <p>Description: {selectedProduct.description || "No description provided."}</p>
            <p>{t("farmer")}: {selectedProduct.seller || t("unknownSeller")}</p>
            <p>{t("phone")}: {selectedProduct.sellerPhone || t("noPhoneProvided")}</p>
          </div>

          {selectedProduct.sellerPhone === account.phone && (
            <button
              style={styles.button}
              onClick={() => setScreen("editProduct")}
            >
              ✏️ {t("editProductButton")}
            </button>
          )}

          {selectedProduct.sellerPhone === account.phone && (
            <button
              style={styles.secondaryButton}
              onClick={async () => {
                const confirmed = window.confirm(t("confirmDeleteProduct"));
                if (!confirmed) return;

                try {
                  if (USE_API && selectedProduct.id) {
                    await window.agriMarketApi.deleteProduct(selectedProduct.id);
                  }

                  const updatedProducts = products.filter(
                    (product) => product !== selectedProduct
                  );
                  setProducts(updatedProducts);
                  localStorage.setItem(
                    "agriMarketProducts",
                    JSON.stringify(updatedProducts)
                  );
                  setSelectedProduct(null);
                  setScreen("products");
                } catch (error) {
                  alert(`Igicuruzwa nticyasibwe: ${error.message}`);
                }
              }}
            >
              🗑️ {t("deleteProduct")}
            </button>
          )}

          {selectedProduct.sellerPhone !== account.phone && (
            <div style={styles.card}>
              <h3>🛒 Buy this product</h3>
              <p>Unit price: {selectedProduct.price}</p>
              <input
                type="number"
                min="1"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value) || 1))}
                style={styles.input}
              />
              <label htmlFor="fulfilment-method">Fulfilment method</label>
              <select
                id="fulfilment-method"
                value={fulfilmentMethod}
                onChange={(e) => setFulfilmentMethod(e.target.value)}
                style={styles.input}
              >
                <option value="Pickup">Pickup — collect the product</option>
                <option value="Delivery">Delivery — have it delivered</option>
              </select>
              <p>
                <strong>
                  Total: {(Number(String(selectedProduct.price || "").replace(/[^0-9.]/g, "")) || 0) * orderQuantity}
                </strong>
              </p>
              <button
                style={styles.button}
                onClick={() => createOrder(selectedProduct)}
              >
                🛒 Place Order
              </button>
            </div>
          )}

          <button
            style={styles.button}
            onClick={() => {
              setChatSeller(selectedProduct);
              setChatParticipantPhone(selectedProduct.sellerPhone || "");
              setChatMode("conversation");
              setScreen("chat");
            }}
          >
            💬 {t("chatWithSeller")}
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => setScreen("products")}
          >
            {t("backToProducts")}
          </button>
        </div>
      )}

      {screen === "crops" && (
        <div style={styles.container}>
          <input style={styles.input} placeholder={t("searchCrop")} value={cropSearch} onChange={(e) => setCropSearch(e.target.value)} />
          {cropSearch && nisrData.filter((crop) => `${crop.crop} ${crop.district}`.toLowerCase().includes(cropSearch.toLowerCase())).slice(0, 30).map((crop, index) => (
            <div style={styles.card} key={index}>
              <h3>{crop.crop}</h3>
              <button onClick={() => { setSelectedCrop(crop); setScreen("cropDetails"); }}>{t("viewDetails")}</button>
              <p>{t("season")}: {crop.season}</p>
              <p>{t("province")}: {crop.province}</p>
              <p>{t("district")}: {crop.district}</p>
              <p>{t("yield")}: {crop.yield}</p>
            </div>
          ))}
          <button style={styles.button} onClick={() => setScreen("home")}>{t("home")}</button>
        </div>
      )}

      {screen === "insights" && (
        <div style={styles.container}>
          <h2>📊 {t("dataInsights")}</h2>
          <h3>🌱 {t("whatShouldGrow")}</h3>
          <select style={styles.input} value={insightDistrict} onChange={(e) => setInsightDistrict(e.target.value)}>
            <option value="">{t("selectDistrict")}</option>
            {[...new Set(nisrData.map((item) => item.district))].sort().map((district) => <option key={district} value={district}>{district}</option>)}
          </select>
          <select style={styles.input} value={insightSeason} onChange={(e) => setInsightSeason(e.target.value)}>
            <option value="">{t("selectSeason")}</option>
            {[...new Set(nisrData.map((item) => item.season))].sort().map((season) => <option key={season} value={season}>Season {season}</option>)}
          </select>
          {(!insightDistrict || !insightSeason) && (
            <p style={{ marginTop: "15px" }}>{t("selectDistrictSeason")}</p>
          )}
          {recommendedCrops.map((item, index) => (
            <div style={styles.card} key={`${item.crop}-${item.district}-${item.season}-${index}`}>
              <h3>{index + 1}. 🌱 {item.crop}</h3>
              <p>{t("district")}: {item.district}</p>
              <p>{t("season")}: {item.season}</p>
              <p>{t("recordedYield")}: {item.yield} kg/ha</p>
              <p>Records used: {item.recordCount}</p>
              <p>🌱 Most common recorded planting period: {item.plantingPeriod}</p>
              {item.plantingPeriodCount > 0 && (
                <small style={{ display: "block", marginTop: "4px", lineHeight: 1.5 }}>
                  Seen in {item.plantingPeriodCount} of {item.plantingPeriodRecords} records with a specific planting period.
                  {item.plantingPeriodVariants > 1 ? ` ${item.plantingPeriodVariants} different periods were recorded.` : ""}
                </small>
              )}
              <small style={{ display: "block", marginTop: "4px", color: "#64748b" }}>
                Source: {item.plantingPeriodSource}
              </small>
              <p>🌾 Most common recorded harvest period: {item.harvestPeriod}</p>
              {item.harvestPeriodCount > 0 && (
                <small style={{ display: "block", marginTop: "4px", lineHeight: 1.5 }}>
                  Seen in {item.harvestPeriodCount} of {item.harvestPeriodRecords} records with a specific harvest period.
                  {item.harvestPeriodVariants > 1 ? ` ${item.harvestPeriodVariants} different periods were recorded.` : ""}
                </small>
              )}
              <small style={{ display: "block", marginTop: "4px", color: "#64748b" }}>
                Source: {item.harvestPeriodSource}
              </small>
              {item.recordCount < 5 && (
                <p style={{ color: "#b45309" }}>⚠️ Limited data: this crop has fewer than 5 records.</p>
              )}
            </div>
          ))}
          <p>{t("nisrInsights")}</p>

          <div style={styles.card}>
            <h3>🌾 {t("totalRecords")}</h3>
            <h2>{nisrData.length.toLocaleString()}</h2>
          </div>

          <div style={styles.card}>
            <h3>📍 {t("districtsCovered")}</h3>
            <h2>{new Set(nisrData.map((item) => item.district)).size}</h2>
          </div>

          <div style={styles.card}>
            <h3>🌱 {t("cropsRecorded")}</h3>
            <h2>{new Set(nisrData.map((item) => item.crop)).size}</h2>
          </div>

          <button style={styles.secondaryButton} onClick={() => setScreen("home")}>{t("backHome")}</button>
        </div>
      )}

      {screen === "cropDetails" && selectedCrop && (
        <div style={styles.container}>
          <h2>🌱 {selectedCrop.crop}</h2>
          <p>{t("season")}: {selectedCrop.season}</p>
          <p>{t("province")}: {selectedCrop.province}</p>
          <p>{t("district")}: {selectedCrop.district}</p>
          <p>{t("plotArea")}: {selectedCrop.plot_area_ha} ha</p>
          <p>{t("cropArea")}: {selectedCrop.crop_area_ha} ha</p>
          <p>{t("yield")}: {selectedCrop.yield}</p>
<div style={{ marginTop: "20px", textAlign: "left" }}>
  <h3>📊 {t("yieldChart")}</h3>
  <div
    style={{
      height: "24px",
      background: "#e0e0e0",
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min((Number(selectedCrop.yield) / 20000) * 100, 100)}%`,
        height: "100%",
        background: "#16823b",
      }}
    />
  </div>
  <p>{selectedCrop.yield} {t("yield")}</p>
{nisrData
  .filter(
    (crop) =>
      crop.crop === selectedCrop.crop &&
      crop.district === selectedCrop.district
  )
  .slice(0, 5)
  .map((crop, index) => (
    <div key={index} style={{ marginTop: "12px" }}>
      <div style={{ fontSize: "14px", marginBottom: "4px" }}>
        {crop.season} — {crop.yield}
      </div>
      <div
        style={{
          height: "16px",
          background: "#e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(
              (Number(crop.yield) / 20000) * 100,
              100
            )}%`,
            height: "100%",
            background: "#16823b",
          }}
        />
      </div>
    </div>
  ))}
</div>
          <button style={styles.button} onClick={() => setScreen("crops")}>{t("backToCrops")}</button>
        </div>
      )}

      {screen === "processing" && (
        <div style={styles.container}>
          <h2>🏭 {t("processing")}</h2>
          <p>{t("processingDescription")}</p>

          {processingData.length === 0 ? (
            <div style={styles.card}>
              <p>{t("noProcessorInfo")}</p>
            </div>
          ) : (
            processingData.map((match, index) => (
              <div style={styles.card} key={`general-${index}`}>
                <h3>🌾 {match.crop}</h3>
                <p>🔄 {t("processingOptions")}: {match.processedProducts.join(", ")}</p>
                <p>🏭 {match.processor}</p>
                <p>📍 {match.location}</p>
                <p>📚 {t("source")}: {match.source}</p>
                          {match.phone && (
                            <p>📞 <a href={`tel:${match.phone}`}>{match.phone}</a></p>
                          )}
                          {match.email && (
                            <p>✉️ <a href={`mailto:${match.email}`}>{match.email}</a></p>
                          )}
                          {match.website && (
                            <p>🌐 <a href={match.website} target="_blank" rel="noopener noreferrer">Visit website</a></p>
                          )}
                          {match.contactSource && (
                            <p>🔎 Contact information: {match.contactSource}</p>
                          )}
              </div>
            ))
          )}

          {String(account.role || role || localStorage.getItem("agriMarketRole") || "").toLowerCase() === "farmer" && (
            <div>
              <h3>📦 {t("myProductsTitle")}</h3>
              {products.filter((product) => product.sellerPhone === account.phone).length === 0 ? (
                <div style={styles.card}>
                  <p>{t("addProductForProcessing")}</p>
                </div>
              ) : (
                products.filter((product) => product.sellerPhone === account.phone).map((product, index) => (
                  <div style={styles.card} key={`farmer-${index}`}>
                    <h3>🌱 {product.name}</h3>
                    <p>{t("category")}: {product.category}</p>
                    <p>{t("location")}: {product.location}</p>
                    <p>🔄 {t("processingOptions")}:</p>
                    {getProcessingMatches(product).length === 0 ? (
                      <p>{t("noProcessorInfo")}</p>
                    ) : (
                      getProcessingMatches(product).map((match, matchIndex) => (
                        <div key={matchIndex} style={{ marginTop: "10px" }}>
                          <p>🥫 {match.processedProducts.join(", ")}</p>
                          <p>🏭 {match.processor}</p>
                          <p>📍 {match.location}</p>
                          <p>📚 {t("source")}: {match.source}</p>
                          {match.phone && (
                            <p>📞 <a href={`tel:${match.phone}`}>{match.phone}</a></p>
                          )}
                          {match.email && (
                            <p>✉️ <a href={`mailto:${match.email}`}>{match.email}</a></p>
                          )}
                          {match.website && (
                            <p>🌐 <a href={match.website} target="_blank" rel="noopener noreferrer">Visit website</a></p>
                          )}
                          {match.contactSource && (
                            <p>🔎 Contact information: {match.contactSource}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <button style={styles.secondaryButton} onClick={() => setScreen("home")}>{t("backHome")}</button>
        </div>
      )}

      {screen === "sellerDashboard" && (
        <div style={styles.container}>
          <h2>📦 {t("myProductsTitle")}</h2>
          <button style={styles.button} onClick={() => setScreen("addProduct")}>{t("addProduct")}</button>
          <button style={styles.button} onClick={() => { setChatMode("list"); setScreen("chat"); }}>💬 {t("conversations")}</button>
          <p>{t("productsAddedBy")} {account.name || t("user")}.</p>
          {products.filter((product) => product.sellerPhone === account.phone).length === 0 ? (
            <p>{t("noProductsAdded")}</p>
          ) : (
            products.filter((product) => product.sellerPhone === account.phone).map((product, index) => (
              <div style={styles.card} key={index}>
                <h3>{product.name}</h3>
                {product.photo && <img src={product.photo} alt={product.name} style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "12px" }} />}
                <p>Category: {product.category}</p>
                <p>Location: {product.location}</p>
                <strong>{product.price}</strong>
                <br />
                <button style={styles.button} onClick={() => { setSelectedProduct(product); setScreen("productDetails"); }}>{t("viewDetails")}</button>
              </div>
            ))
          )}
          <button style={styles.secondaryButton} onClick={() => setScreen("home")}>{t("backHome")}</button>
        </div>
      )}

      {screen === "products" && (
        <div style={styles.container}>
          <h2>{t("products")}</h2>

          <button
            style={styles.button}
            onClick={() => setScreen("addProduct")}
          >
            {t("addProduct")}
          </button>

          <input style={styles.input} type="text" placeholder={t("searchProduct")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <select style={styles.input} value={productCategoryFilter} onChange={(e) => setProductCategoryFilter(e.target.value)}>
            <option value="">{t("allCategories")}</option>
            {[...new Set(products.map((product) => product.category))].map((category) => <option key={category} value={category}>{category}</option>)}
          </select>

          <select style={styles.input} value={productLocationFilter} onChange={(e) => setProductLocationFilter(e.target.value)}>
            <option value="">{t("allLocations")}</option>
            {[...new Set(products.map((product) => product.location))].map((location) => <option key={location} value={location}>{location}</option>)}
          </select>

          <input
            style={styles.input}
            type="number"
            placeholder={t("minimumPrice")}
            value={productPriceFilter}
            onChange={(e) => setProductPriceFilter(e.target.value)}
          />

          <select
            style={styles.input}
            value={productPriceSort}
            onChange={(e) => setProductPriceSort(e.target.value)}
          >
            <option value="">{t("defaultPriceOrder")}</option>
            <option value="low">{t("lowHigh")}</option>
            <option value="high">{t("highLow")}</option>
          </select>

          {products.filter((product) =>
            `${product.name} ${product.category} ${product.location}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!productCategoryFilter || product.category === productCategoryFilter) &&
            (!productLocationFilter || product.location === productLocationFilter) &&
            (!productPriceFilter || parseFloat(product.price.replace(/[^0-9.]/g, "")) >= Number(productPriceFilter))
          ).sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
            if (productPriceSort === "high") return priceB - priceA;
            if (productPriceSort === "low") return priceA - priceB;
            return 0;
          }).map((product, index) => (
              <div style={styles.card} key={index}>
                <h3>{product.name}</h3>
{product.photo && (
  <img
    src={product.photo}
    alt={product.name}
    style={{
      width: "100%",
      maxHeight: "220px",
      objectFit: "cover",
      borderRadius: "12px",
      marginBottom: "10px",
    }}
  />
)}
                <p>Category: {product.category}</p>
                <p>Location: {product.location}</p>
                <strong>{product.price}</strong>
                <br />

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setScreen("productDetails");
                  }}
                >
                  View Details
                </button>
              </div>
            ))}

          <button style={styles.button} onClick={() => setScreen("home")}>
            Home
          </button>
        </div>
      )}

      {["home", "products", "chat", "profile"].includes(screen) && (
        <nav style={styles.bottomNav}>
          <button style={styles.navButton} onClick={() => setScreen("home")}>🏠<span>{t("home")}</span></button>
          <button style={styles.navButton} onClick={() => setScreen("products")}>🔎<span>{t("search")}</span></button>
          <button style={styles.navButton} onClick={() => setScreen("addProduct")}>＋<span>{t("addProductButton")}</span></button>
          <button style={styles.navButton} onClick={() => { setChatMode("list"); setScreen("chat"); }}>💬<span>{t("chat")}</span></button>
          <button style={styles.navButton} onClick={() => setScreen("profile")}>👤<span>{t("profile")}</span></button>
        </nav>
      )}

    </div>
  );
}

const styles = {
  app: {
    paddingBottom: "80px",
    minHeight: "100vh",
    background: "#f4f7f4",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    background: "#16823b",
    color: "white",
    padding: "18px",
    textAlign: "center",
  },

  navButton: {
    border: "none",
    background: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    cursor: "pointer",
  },

  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "68px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "white",
    borderTop: "1px solid #ddd",
    zIndex: 1000,
  },

  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "25px",
    textAlign: "center",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    border: "none",
    borderRadius: "8px",
    background: "#16823b",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    border: "1px solid #16823b",
    borderRadius: "8px",
    background: "white",
    color: "#16823b",
    fontSize: "16px",
    cursor: "pointer",
  },

  roleButton: {
    width: "100%",
    padding: "16px",
    marginTop: "12px",
    border: "1px solid #16823b",
    borderRadius: "8px",
    background: "white",
    color: "#222",
    fontSize: "17px",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginTop: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },

  linkButton: {
    marginTop: "15px",
    border: "none",
    background: "none",
    color: "#16823b",
    cursor: "pointer",
    fontSize: "15px",
  },

  card: {
    background: "white",
    padding: "18px",
    marginTop: "15px",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
};

export default App;
