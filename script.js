// ===== OtakuVerse — Script principal ===== //
(function () {
  const header       = document.getElementById('ovHeader');
  const nav           = document.getElementById('ovNav');
  const burger        = document.getElementById('ovBurger');
  const themeToggle    = document.getElementById('ovThemeToggle');
  const langToggle     = document.getElementById('ovLangToggle');
  const cartCountEl   = document.getElementById('ovCartCount');

  const hero          = document.querySelector('.ov-hero');
  const heroContent    = document.getElementById('ovHeroContent');
  const heroDecos      = document.querySelectorAll('.ov-hero__deco');
  const scrollCue      = document.getElementById('ovScrollCue');

  const reduceMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu mobile ---------- */
  function openMenu() {
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
  }
  function closeMenu() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }
  burger.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  nav.querySelectorAll('.ov-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.querySelectorAll('.ov-nav__link').forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      closeMenu();
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
  });

  /* ---------- Mode clair / sombre ---------- */
  const savedTheme = localStorage.getItem('ov-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  function applyThemeState() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
  applyThemeState();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('ov-theme', next);
    applyThemeState();
  });

  /* ---------- Switch FR / EN ---------- */
  const i18n = {
    fr: {
      nav_home: 'Accueil', nav_new: 'Nouveautés', nav_categories: 'Catégories',
      nav_accessories: 'Accessoires', nav_bestsellers: 'Meilleures ventes',
      nav_about: 'À propos', nav_contact: 'Contact',

      hero_eyebrow: 'Mangas · Accessoires · Collectibles',
      hero_title_1: 'Votre bibliothèque',
      hero_title_2: 'ne dort jamais.',
      hero_sub: 'Éditions soignées, figurines et goodies sélectionnés pour ceux qui vivent chaque série à fond.',
      hero_cta_primary: 'Explorer les catégories',
      hero_cta_secondary: 'Créer un compte',

      new_eyebrow: 'Fraîchement arrivés',
      new_title: 'Nouveautés',
      new_seeall: 'Voir tout',
      badge_new: 'Nouveau',
      cat_shonen: 'Shônen',
      cat_shojo: 'Shôjo',
      cat_seinen: 'Seinen',

      cats_eyebrow: 'Explorer par univers',
      cats_title: 'Catégories',
      cats_seeall: 'Tout voir',
      cat_josei: 'Josei',
      cat_isekai: 'Isekai & Fantasy',
      cats_count_shonen: '120 titres',
      cats_count_shojo: '86 titres',
      cats_count_seinen: '74 titres',
      cats_count_josei: '41 titres',
      cats_count_isekai: '58 titres',

      acc_eyebrow: 'Au-delà des pages',
      acc_title: 'Accessoires',
      acc_seeall: 'Voir tout',
      acc_cat_figurine: 'Figurine',
      acc_cat_goodies: 'Goodies',
      acc_cat_keychain: 'Porte-clés',
      acc_cat_mug: 'Mug',

      best_eyebrow: 'Le classement',
      best_title: 'Meilleures ventes',
      best_seeall: 'Voir tout',
      best_sold_1: '1 240 ventes ce mois-ci',
      best_sold_2: '980 ventes ce mois-ci',
      best_sold_3: '875 ventes ce mois-ci',
      best_sold_4: '712 ventes ce mois-ci',
      best_sold_5: '640 ventes ce mois-ci',

      about_eyebrow: 'Notre histoire',
      about_title: "À propos d'OtakuVerse",
      about_p1: "Né de la passion pour les mangas et la culture japonaise, OtakuVerse est pensé comme un espace où chaque lecteur trouve sa prochaine obsession — des classiques intemporels aux pépites les plus récentes.",
      about_p2: "Nous sélectionnons avec soin chaque édition, chaque figurine et chaque accessoire, pour que la qualité soit toujours au rendez-vous, du premier tome à la dernière étagère.",
      about_cta: 'Nous contacter',
      about_stat_titles: 'Titres au catalogue',
      about_stat_years: "Années d'expérience",
      about_stat_clients: 'Clients satisfaits',
      about_stat_countries: 'Pays livrés',

      contact_eyebrow: 'Une question ?',
      contact_title: 'Contact',
      contact_lead: 'Une question sur une commande, une suggestion de titre, ou juste envie de parler manga ? Écris-nous.',
      contact_address: 'Paris, France',
      contact_label_name: 'Nom',
      contact_label_email: 'Email',
      contact_label_message: 'Message',
      contact_error_name: "Merci d'indiquer votre nom.",
      contact_error_email: 'Merci d\'indiquer un email valide.',
      contact_error_message: "Merci d'écrire un message.",
      contact_submit: 'Envoyer le message',
      contact_success: 'Message envoyé — merci, on te répond très vite !',

      footer_tagline: 'Mangas, figurines et goodies pour ceux qui vivent chaque série à fond.',
      footer_newsletter_title: 'Reste dans la boucle',
      footer_newsletter_sub: 'Sorties, ventes exclusives et actus, une fois par semaine max.',
      footer_newsletter_label: 'Adresse email',
      footer_newsletter_submit: "S'inscrire",
      footer_contact_cta: 'Une question ? Contacte-nous',
      footer_col_shop: 'Boutique',
      footer_col_help: 'Aide',
      footer_col_company: 'Entreprise',
      footer_col_follow: 'Suis-nous',
      footer_link_faq: 'FAQ',
      footer_link_shipping: 'Livraison',
      footer_link_returns: 'Retours',
      footer_link_tracking: 'Suivi de commande',
      footer_link_careers: 'Carrières',
      footer_link_blog: 'Blog',
      footer_rights: 'Tous droits réservés.',
      footer_legal_notice: 'Mentions légales',
      footer_legal_terms: 'CGV',
      footer_legal_privacy: 'Confidentialité',
      footer_payment: 'Paiement sécurisé',
      footer_legal_style_guide: 'Charte graphique',
      footer_legal_style_guide: 'Charte graphique'
    },
    en: {
      nav_home: 'Home', nav_new: 'New releases', nav_categories: 'Categories',
      nav_accessories: 'Accessories', nav_bestsellers: 'Bestsellers',
      nav_about: 'About', nav_contact: 'Contact',

      hero_eyebrow: 'Manga · Accessories · Collectibles',
      hero_title_1: 'Your shelf',
      hero_title_2: 'never sleeps.',
      hero_sub: 'Curated editions, figures and goodies for those who live every series to the fullest.',
      hero_cta_primary: 'Explore categories',
      hero_cta_secondary: 'Create an account',

      new_eyebrow: 'Fresh arrivals',
      new_title: 'New releases',
      new_seeall: 'See all',
      badge_new: 'New',
      cat_shonen: 'Shonen',
      cat_shojo: 'Shojo',
      cat_seinen: 'Seinen',

      cats_eyebrow: 'Browse by universe',
      cats_title: 'Categories',
      cats_seeall: 'See all',
      cat_josei: 'Josei',
      cat_isekai: 'Isekai & Fantasy',
      cats_count_shonen: '120 titles',
      cats_count_shojo: '86 titles',
      cats_count_seinen: '74 titles',
      cats_count_josei: '41 titles',
      cats_count_isekai: '58 titles',

      acc_eyebrow: 'Beyond the pages',
      acc_title: 'Accessories',
      acc_seeall: 'See all',
      acc_cat_figurine: 'Figure',
      acc_cat_goodies: 'Goodies',
      acc_cat_keychain: 'Keychain',
      acc_cat_mug: 'Mug',

      best_eyebrow: 'The chart',
      best_title: 'Bestsellers',
      best_seeall: 'See all',
      best_sold_1: '1,240 sold this month',
      best_sold_2: '980 sold this month',
      best_sold_3: '875 sold this month',
      best_sold_4: '712 sold this month',
      best_sold_5: '640 sold this month',

      about_eyebrow: 'Our story',
      about_title: 'About OtakuVerse',
      about_p1: "Born from a passion for manga and Japanese culture, OtakuVerse is built as a space where every reader finds their next obsession — from timeless classics to the freshest new releases.",
      about_p2: "We carefully select every edition, figure and accessory, so quality is always there, from the first volume to the last shelf.",
      about_cta: 'Contact us',
      about_stat_titles: 'Titles in catalog',
      about_stat_years: 'Years of experience',
      about_stat_clients: 'Happy customers',
      about_stat_countries: 'Countries shipped',

      contact_eyebrow: 'Got a question?',
      contact_title: 'Contact',
      contact_lead: "A question about an order, a title suggestion, or just want to talk manga? Write to us.",
      contact_address: 'Paris, France',
      contact_label_name: 'Name',
      contact_label_email: 'Email',
      contact_label_message: 'Message',
      contact_error_name: 'Please enter your name.',
      contact_error_email: 'Please enter a valid email.',
      contact_error_message: 'Please write a message.',
      contact_submit: 'Send message',
      contact_success: "Message sent — thanks, we'll get back to you soon!",

      footer_tagline: 'Manga, figures and goodies for those who live every series to the fullest.',
      footer_newsletter_title: 'Stay in the loop',
      footer_newsletter_sub: 'Releases, exclusive sales and news, once a week at most.',
      footer_newsletter_label: 'Email address',
      footer_newsletter_submit: 'Subscribe',
      footer_contact_cta: 'Got a question? Contact us',
      footer_col_shop: 'Shop',
      footer_col_help: 'Help',
      footer_col_company: 'Company',
      footer_col_follow: 'Follow us',
      footer_link_faq: 'FAQ',
      footer_link_shipping: 'Shipping',
      footer_link_returns: 'Returns',
      footer_link_tracking: 'Order tracking',
      footer_link_careers: 'Careers',
      footer_link_blog: 'Blog',
      footer_rights: 'All rights reserved.',
      footer_legal_notice: 'Legal notice',
      footer_legal_terms: 'Terms of sale',
      footer_legal_privacy: 'Privacy',
      footer_payment: 'Secure payment',
      footer_legal_style_guide: 'Style guide'
    }
  };

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    langToggle.querySelector('.ov-lang__code').textContent = lang.toUpperCase();
    langToggle.setAttribute('aria-label', lang === 'fr' ? 'Changer de langue (anglais)' : 'Switch language (French)');
    localStorage.setItem('ov-lang', lang);
  }

  const savedLang = localStorage.getItem('ov-lang') || 'fr';
  applyLang(savedLang);

  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || 'fr';
    applyLang(current === 'fr' ? 'en' : 'fr');
  });

  /* ---------- Panier (API exposée) ---------- */
  window.OtakuVerseCart = {
    setCount(n) { cartCountEl.textContent = n; }
  };

  /* ---------- Hero : apparition au chargement ---------- */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => heroContent.classList.add('is-visible'));
  });

  /* ---------- Hero : parallax au survol ---------- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let ticking = false;
    let lastX = 0, lastY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      lastX = (e.clientX - rect.left) / rect.width - 0.5;
      lastY = (e.clientY - rect.top) / rect.height - 0.5;

      if (!ticking) {
        requestAnimationFrame(() => {
          heroDecos.forEach(el => {
            const depth  = parseFloat(el.dataset.depth) || 20;
            const rotate = parseFloat(el.dataset.rotate) || 0;
            el.style.transform = `translate3d(${lastX * depth}px, ${lastY * depth}px, 0) rotate(${lastX * rotate}deg)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });

    hero.addEventListener('mouseleave', () => {
      heroDecos.forEach(el => { el.style.transform = 'translate3d(0,0,0) rotate(0deg)'; });
    });
  }

  scrollCue.addEventListener('click', () => {
    const next = hero.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Apparition au scroll (cartes, catégories, best-sellers, à propos) ---------- */
  const reveals = document.querySelectorAll('.ov-card, .ov-cat-card, .ov-acc-card, .ov-best-item, .ov-about__logo, .ov-about__text, .ov-stat, .ov-contact__info, .ov-contact__form');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- À propos : compteurs animés ---------- */
  const statNumbers = document.querySelectorAll('.ov-stat__number');
  if (statNumbers.length) {
    function animateCount(el) {
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      statNumbers.forEach(el => { el.textContent = el.dataset.target; });
    } else {
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      statNumbers.forEach(el => statObserver.observe(el));
    }
  }
})();

/* ---------- Formulaire de contact ---------- */
(function () {
  const form    = document.getElementById('ovContactForm');
  const success = document.getElementById('ovContactSuccess');
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('.ov-field').forEach(field => {
      const input = field.querySelector('input, textarea');
      const value = input.value.trim();
      let fieldValid = value.length > 0;

      if (input.type === 'email' && fieldValid) {
        fieldValid = emailPattern.test(value);
      }

      field.classList.toggle('is-invalid', !fieldValid);
      if (!fieldValid) isValid = false;
    });

    if (!isValid) {
      success.hidden = true;
      success.classList.remove('is-shown');
      return;
    }

    // Ici : appel réel à ton backend / service d'envoi d'e-mails
    success.hidden = false;
    requestAnimationFrame(() => success.classList.add('is-shown'));
    form.reset();
  });

  // Retire l'erreur dès que l'utilisateur corrige le champ
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.ov-field').classList.remove('is-invalid');
    });
  });
})();

/* ---------- Fond animé : pétales générés dynamiquement ---------- */
(function () {
  const container = document.getElementById('ovPetals');
  if (!container) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const PETAL_COUNT = 60;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('span');
    petal.className = 'ov-petal';

    const left     = Math.random() * 100;
    const drift    = (Math.random() * 200 - 100) + 'px';
    const duration = 7 + Math.random() * 12;   // 7–19s
    const delay    = Math.random() * duration;
    const size     = 5 + Math.random() * 9;    // 5–14px

    petal.style.left = left + '%';
    petal.style.setProperty('--drift', drift);
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = '-' + delay + 's';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    container.appendChild(petal);
  }
})();

/* ---------- Écran de chargement ---------- */
(function () {
  const loader = document.getElementById('ovLoader');
  if (!loader) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    loader.remove();
    return;
  }

  document.body.classList.add('ov-no-scroll');

  window.setTimeout(() => {
    document.body.classList.remove('ov-no-scroll');
    window.setTimeout(() => loader.remove(), 50);
  }, 2800);
})();