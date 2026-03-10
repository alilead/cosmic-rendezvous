export type Lang = "fr" | "en";

export const translations = {
  fr: {
    // Intro
    introEnter: "ENTRER",
    introHint: "ou appuyez n'importe où",

    // Nav
    navHome: "Accueil",
    navAbout: "À propos",
    navRental: "Louez l'espace",
    navMenu: "La Carte",
    navGallery: "Galerie",
    navContact: "Contact",

    // Hero
    heroTagline: "Le bar électro-alien de Genève",
    heroDesc: "Nuits vibrantes. Espace privatisable.",
    heroCta: "Espace privatisable disponible.",
    heroBook: "Réserver l'espace",
    heroDiscover: "Découvrir l'univers",

    // About
    aboutTitle: "BIENVENUE DANS UNE AUTRE DIMENSION",
    aboutP1: "Le Cosmic Rendez-vous n'est pas un bar ordinaire. C'est un portail vers un univers parallèle où l'énergie électro rencontre l'esthétique alien.",
    aboutP2: "Immergez-vous dans une atmosphère vibrante où les couleurs néon dansent avec la musique, où chaque cocktail raconte une histoire interstellaire.",
    aboutP3: "Situé au cœur de Genève, notre espace underground offre une expérience unique pour vos soirées privées, anniversaires, showcases artistiques et DJ sets.",
    aboutTags: ["Électro", "Néon", "Underground", "Cosmique"] as readonly string[],

    // Rental
    rentalTitle: "LOUEZ L'ESPACE",
    rentalDesc: "Transformez votre événement en expérience cosmique. Notre espace s'adapte à vos ambitions les plus intergalactiques.",
    rentalFeature1: "Fêtes privées & Corporates",
    rentalFeature2: "Système son professionnel",
    rentalFeature3: "Éclairage néon immersif",
    rentalFeature4: "Centre de Genève",
    rentalIdealFor: "IDÉAL POUR",
    rentalIdeals: ["Fêtes privées", "Événements corporate", "Showcases artistiques", "DJ nights", "Anniversaires", "Lancements"] as readonly string[],
    rentalCta: "Vérifier la disponibilité",

    // Menu
    menuTitle: "LA CARTE",
    menuSubtitle: "Des élixirs d'un autre monde",
    menuCatHot: "Boissons Chaudes",
    menuCatSofts: "Softs",
    menuCatBeers: "Bières",
    menuCatWines: "Vins",
    menuCatShots: "Shots",
    menuCatLong: "Long Drinks",
    menuCatApero: "Apéro / Digestifs",
    menuCatCocktails: "Cocktails",
    menuOnRequest: "Sur demande",

    // Gallery
    galleryTitle: "GALERIE",
    gallerySubtitle: "Fragments d'un univers parallèle",
    galleryAlt1: "Ambiance néon rouge",
    galleryAlt2: "Danse cosmique",
    galleryAlt3: "Cocktails lumineux",
    galleryAlt4: "Alien neon art",
    galleryAlt5: "Atmosphère du bar",
    galleryAlt6: "Espace événementiel",

    // Contact
    contactTitle: "CONTACT",
    contactSubtitle: "Rejoignez notre orbite",
    contactLocation: "Genève, Suisse",
    contactPhone: "+41 79 524 77 54",
    contactInstagram: "@cosmiccafe.geneva",
    contactEmail: "info@cosmicrendezvous.ch",
    contactCta: "Entrer dans la nuit cosmique",
    footer: "© 2025 COSMIC RENDEZ-VOUS — GENÈVE",

    // Alt texts
    altLogo: "Cosmic Rendez-vous",
    altHero: "Cosmic Rendez-vous ambiance",
    altAboutImg: "Intérieur Cosmic Rendez-vous",
    altRentalImg: "Espace événementiel",

    // 404
    notFoundTitle: "Oups ! Page introuvable",
    notFoundLink: "Retour à l'accueil",
  },
  en: {
    introEnter: "ENTER",
    introHint: "or tap anywhere",

    navHome: "Home",
    navAbout: "About",
    navRental: "Rent the space",
    navMenu: "Menu",
    navGallery: "Gallery",
    navContact: "Contact",

    heroTagline: "Geneva's electro-alien bar",
    heroDesc: "Vibrant nights. Space for hire.",
    heroCta: "Private space available.",
    heroBook: "Book the space",
    heroDiscover: "Discover the universe",

    aboutTitle: "WELCOME TO ANOTHER DIMENSION",
    aboutP1: "Cosmic Rendez-vous is not your average bar. It's a portal to a parallel universe where electro energy meets alien aesthetics.",
    aboutP2: "Immerse yourself in a vibrant atmosphere where neon colours dance with the music, and every cocktail tells an interstellar story.",
    aboutP3: "Located in the heart of Geneva, our underground space offers a unique experience for private parties, birthdays, artist showcases and DJ sets.",
    aboutTags: ["Electro", "Neon", "Underground", "Cosmic"] as readonly string[],

    rentalTitle: "RENT THE SPACE",
    rentalDesc: "Turn your event into a cosmic experience. Our space adapts to your most intergalactic ambitions.",
    rentalFeature1: "Private & corporate parties",
    rentalFeature2: "Professional sound system",
    rentalFeature3: "Immersive neon lighting",
    rentalFeature4: "Central Geneva",
    rentalIdealFor: "IDEAL FOR",
    rentalIdeals: ["Private parties", "Corporate events", "Artist showcases", "DJ nights", "Birthdays", "Launch events"] as readonly string[],
    rentalCta: "Check availability",

    menuTitle: "THE MENU",
    menuSubtitle: "Elixirs from another world",
    menuCatHot: "Hot Drinks",
    menuCatSofts: "Soft Drinks",
    menuCatBeers: "Beers",
    menuCatWines: "Wines",
    menuCatShots: "Shots",
    menuCatLong: "Long Drinks",
    menuCatApero: "Aperitif / Digestifs",
    menuCatCocktails: "Cocktails",
    menuOnRequest: "On request",

    galleryTitle: "GALLERY",
    gallerySubtitle: "Fragments of a parallel universe",
    galleryAlt1: "Red neon ambiance",
    galleryAlt2: "Cosmic dance",
    galleryAlt3: "Glowing cocktails",
    galleryAlt4: "Alien neon art",
    galleryAlt5: "Bar atmosphere",
    galleryAlt6: "Event space",

    contactTitle: "CONTACT",
    contactSubtitle: "Join our orbit",
    contactLocation: "Geneva, Switzerland",
    contactPhone: "+41 79 524 77 54",
    contactInstagram: "@cosmiccafe.geneva",
    contactEmail: "info@cosmicrendezvous.ch",
    contactCta: "Step into the cosmic night",
    footer: "© 2025 COSMIC RENDEZ-VOUS — GENEVA",

    altLogo: "Cosmic Rendez-vous",
    altHero: "Cosmic Rendez-vous ambiance",
    altAboutImg: "Cosmic Rendez-vous interior",
    altRentalImg: "Event space",

    notFoundTitle: "Oops! Page not found",
    notFoundLink: "Return to Home",
  },
} as const;

export type TranslationKey = Exclude<keyof (typeof translations)["fr"], "aboutTags" | "rentalIdeals">;
