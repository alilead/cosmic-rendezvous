export type Lang = "fr" | "en";

export const translations = {
  fr: {
    // Intro
    introEnter: "ENTRER",
    introHint: "ou appuyez n'importe où",

    // Nav
    navHome: "Accueil",
    navAbout: "À propos",
    navRental: "Rencontre",
    navMenu: "La Carte",
    navGallery: "Galerie",
    navGame: "Jeu",
    navContact: "Contact",

    // Hero
    heroTagline: "Le bar alien de Genève",
    heroDesc: "Nuits vibrantes. Espace privatisable.",
    heroCta: "Espace privatisable disponible.",
    heroBook: "Réservez l'espace",
    heroDiscover: "Découvrir l'univers",

    // About
    aboutTitle: "BIENVENUE DANS UNE AUTRE DIMENSION",
    aboutP1: "Le Cosmic Café n'est pas un bar ordinaire. C'est un portail vers un univers parallèle où l'énergie rencontre l'esthétique alien.",
    aboutP2: "Immergez-vous dans une atmosphère vibrante où les couleurs néon dansent avec la musique, où chaque cocktail raconte une histoire interstellaire.",
    aboutP3: "Situé au cœur de Genève, notre espace underground offre une expérience unique pour vos soirées privées, anniversaires, showcases artistiques et DJ sets.",
    aboutTags: ["Néon", "Underground", "Cosmique"] as readonly string[],

    // Rental
    rentalTitle: "LOUEZ L'ESPACE",
    rentalDesc:
      "Rencontrez l'équipe pour parler location de l'espace : téléphone, au bar ou en visio. Nous convenons ensemble de votre projet.",
    rentalFeature1: "Fêtes privées & Corporates",
    rentalFeature2: "Système son professionnel",
    rentalFeature3: "Éclairage néon immersif",
    rentalFeature4: "Centre de Genève",
    rentalIdealFor: "IDÉAL POUR",
    rentalIdeals: ["Fêtes privées", "Événements corporate", "Showcases artistiques", "DJ nights", "Anniversaires", "Lancements"] as readonly string[],
    rentalCta: "Planifier un rendez-vous",

    freeDrinkBannerTitle: "Défi Alien Jump — boisson offerte",
    freeDrinkBannerBodyActive:
      "Top 3 des scores du jour : boisson offerte — lun–sam après 12h30 (Genève). Suivez-nous sur Instagram, newsletter, puis email au classement.",
    freeDrinkBannerBodyInactive:
      "Récompense top 3 du jour (lun–sam après 12h30, Genève). Revenez pendant les heures prévues !",
    freeDrinkBannerCta: "Jouer au jeu",

    gamePromoActive:
      "Top 3 du jour = boisson offerte (lun–sam après 12h30, Genève). À la fin : Instagram + newsletter + email pour valider le score.",
    gamePromoInactive:
      "Boisson pour le top 3 du jour : lun–sam après 12h30 (Genève). Hors créneau, le classement reste ouvert sans récompense.",

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
    footer: "© 2025 COSMIC CAFE — GENÈVE",

    // Alt texts
    altLogo: "Cosmic Café",
    altHero: "Cosmic Café ambiance",
    altAboutImg: "Intérieur Cosmic Café",
    altRentalImg: "Espace événementiel",

    // Booking (meet team — venue rental discussion)
    bookingTitle: "Rencontrer l'équipe",
    bookingSubtitle:
      "Prenez rendez-vous pour discuter de la location de l'espace (équipe, entreprise, projet). Téléphone, au bar ou en visio. Nous vous recontacterons pour convenir d'un créneau.",
    bookingYourInfo: "Vos informations",
    bookingEventDetails: "Votre rendez-vous",
    bookingName: "Nom",
    bookingEmail: "Email",
    bookingPhone: "Téléphone",
    bookingEventType: "Type d'échange souhaité",
    bookingDate: "Date souhaitée",
    bookingTime: "Heure souhaitée",
    bookingGuests: "Nombre de personnes (équipe)",
    bookingMessage: "Message — disponibilités, questions (optionnel)",
    bookingSubmit: "Envoyer la demande",
    bookingSubmitting: "Envoi…",
    bookingSuccessToast: "Demande envoyée",
    bookingRequestReceivedTitle: "Demande reçue",
    bookingRequestReceivedDesc:
      "Nous avons bien reçu votre demande de rendez-vous. Nous vous recontacterons pour organiser un échange (téléphone, sur place ou visio) et parler de la location.",
    bookingEmailNotSentNote: "Nous n'avons pas pu envoyer l'email de confirmation, mais votre demande est bien enregistrée. Contactez-nous si besoin.",
    bookingContactQuestion: "Une question ?",
    bookingMakeAnother: "Faire une autre demande",
    bookingEventTypeMeetingPhone: "Appel téléphonique",
    bookingEventTypeMeetingInPerson: "Rencontre au bar / sur place",
    bookingEventTypeMeetingVideo: "Visioconférence",
    bookingEventTypeOther: "Autre",
    bookingCalendlyTitle: "Visioconférence",
    bookingCalendlyBody: "Réservez directement un créneau visio avec l'équipe (Calendly).",
    bookingCalendlyCta: "Ouvrir Calendly",
    bookingValidationName: "Au moins 2 caractères",
    bookingValidationEmail: "Email invalide",
    bookingValidationPhone: "Au moins 10 caractères",
    bookingValidationDate: "Date requise",
    bookingValidationTime: "Heure requise",
    bookingValidationGuests: "Nombre de personnes requis",
    bookingErrorMessage: "Une erreur est survenue",
    bookingSendByEmail: "Envoyer par email en secours",

    privacyModalTitle: "Protection des données",
    privacyModalIntro:
      "Pour utiliser ce site (formulaires, jeu, réservation), vous devez accepter notre politique de confidentialité.",
    privacyModalCheckboxBefore: "J'ai lu et j'accepte la",
    privacyModalReadPolicy: "politique de confidentialité",
    privacyModalAccept: "Accepter et continuer",

    // 404
    notFoundTitle: "Oups ! Page introuvable",
    notFoundLink: "Retour à l'accueil",
  },
  en: {
    introEnter: "ENTER",
    introHint: "or tap anywhere",

    navHome: "Home",
    navAbout: "About",
    navRental: "Meet us",
    navMenu: "Menu",
    navGallery: "Gallery",
    navGame: "Game",
    navContact: "Contact",

    heroTagline: "Geneva's alien bar",
    heroDesc: "Vibrant nights. Space for hire.",
    heroCta: "Private space available.",
    heroBook: "Book the space",
    heroDiscover: "Discover the universe",

    aboutTitle: "WELCOME TO ANOTHER DIMENSION",
    aboutP1: "Cosmic Cafe is not your average bar. It's a portal to a parallel universe where energy meets alien aesthetics.",
    aboutP2: "Immerse yourself in a vibrant atmosphere where neon colours dance with the music, and every cocktail tells an interstellar story.",
    aboutP3: "Located in the heart of Geneva, our underground space offers a unique experience for private parties, birthdays, artist showcases and DJ sets.",
    aboutTags: ["Neon", "Underground", "Cosmic"] as readonly string[],

    rentalTitle: "RENT THE SPACE",
    rentalDesc:
      "Meet our team to discuss hiring the venue — by phone, in person, or video. We'll align on your project together.",
    rentalFeature1: "Private & corporate parties",
    rentalFeature2: "Professional sound system",
    rentalFeature3: "Immersive neon lighting",
    rentalFeature4: "Central Geneva",
    rentalIdealFor: "IDEAL FOR",
    rentalIdeals: ["Private parties", "Corporate events", "Artist showcases", "DJ nights", "Birthdays", "Launch events"] as readonly string[],
    rentalCta: "Book a meeting",

    freeDrinkBannerTitle: "Alien Jump challenge — free drink",
    freeDrinkBannerBodyActive:
      "Today’s top 3 scores win a free drink — Mon–Sat after 12:30 (Geneva). Follow on Instagram, subscribe to news, then submit your email.",
    freeDrinkBannerBodyInactive:
      "Top-3 daily reward runs Mon–Sat after 12:30 (Geneva). Come back during those hours!",
    freeDrinkBannerCta: "Play the game",

    gamePromoActive:
      "Daily top 3 = free drink (Mon–Sat after 12:30 Geneva). At game over: Instagram + newsletter + email to submit your score.",
    gamePromoInactive:
      "Free drink for the daily top 3: Mon–Sat after 12:30 (Geneva). Outside those hours the leaderboard is open without the reward.",

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
    footer: "© 2025 COSMIC CAFE — GENEVA",

    altLogo: "Cosmic Cafe",
    altHero: "Cosmic Cafe ambiance",
    altAboutImg: "Cosmic Cafe interior",
    altRentalImg: "Event space",

    // Booking (meet team — venue rental discussion)
    bookingTitle: "Meet the team",
    bookingSubtitle:
      "Request a meeting to discuss venue rental (team or project). Phone, at the bar, or video. We'll get back to you to schedule.",
    bookingYourInfo: "Your information",
    bookingEventDetails: "Your meeting",
    bookingName: "Name",
    bookingEmail: "Email",
    bookingPhone: "Phone",
    bookingEventType: "Preferred format",
    bookingDate: "Preferred date",
    bookingTime: "Preferred time",
    bookingGuests: "Group size (team)",
    bookingMessage: "Message — availability, questions (optional)",
    bookingSubmit: "Send request",
    bookingSubmitting: "Sending…",
    bookingSuccessToast: "Request sent",
    bookingRequestReceivedTitle: "Request received",
    bookingRequestReceivedDesc:
      "We've received your meeting request. We'll contact you to arrange a call, visit, or video chat about venue rental.",
    bookingEmailNotSentNote: "We couldn't send a confirmation email, but your request is saved. Contact us to confirm if needed.",
    bookingContactQuestion: "Any questions?",
    bookingMakeAnother: "Make another request",
    bookingEventTypeMeetingPhone: "Phone call",
    bookingEventTypeMeetingInPerson: "In person at the bar",
    bookingEventTypeMeetingVideo: "Video call",
    bookingEventTypeOther: "Other",
    bookingCalendlyTitle: "Video call",
    bookingCalendlyBody: "Book a video slot directly with the team (Calendly).",
    bookingCalendlyCta: "Open Calendly",
    bookingValidationName: "At least 2 characters",
    bookingValidationEmail: "Invalid email",
    bookingValidationPhone: "At least 10 characters",
    bookingValidationDate: "Date required",
    bookingValidationTime: "Time required",
    bookingValidationGuests: "Number of guests required",
    bookingErrorMessage: "Something went wrong",
    bookingSendByEmail: "Send by email as fallback",

    privacyModalTitle: "Privacy",
    privacyModalIntro:
      "To use this site (forms, game, bookings), please accept our privacy policy.",
    privacyModalCheckboxBefore: "I have read and accept the",
    privacyModalReadPolicy: "Privacy Policy",
    privacyModalAccept: "Accept and continue",

    notFoundTitle: "Oops! Page not found",
    notFoundLink: "Return to Home",
  },
} as const;

export type TranslationKey = Exclude<keyof (typeof translations)["fr"], "aboutTags" | "rentalIdeals">;
