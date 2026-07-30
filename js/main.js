// COMPTE À REBOURS


const eventDate = new Date("October 10, 2026 08:00:00").getTime();

const countdownInterval = setInterval(function () {

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").textContent = 0;
        document.getElementById("hours").textContent = 0;
        document.getElementById("minutes").textContent = 0;
        document.getElementById("seconds").textContent = 0;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}, 1000);
// COMPTEURS ANNIMER
const statNumbers = document.querySelectorAll(".stat-number");

statNumbers.forEach(function (statNumber) {

    const target = Number(statNumber.getAttribute("data-target"));
    let current = 0;

    const increment = Math.ceil(target / 50);

    const compteur = setInterval(function () {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(compteur);
        }

        statNumber.textContent = current;

    }, 20);

});
// BUTTON MODE JOURS/NUITS
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');
if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '🔆';
}
toggleBtn.addEventListener('click',()=> {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent ='🔆';
    }else{
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent="🌙"
    }
}
);

// ANNEE AUTOMATIQUE DU FOOTER 
const annee = document.getElementById("annee-actuelle");
if (annee) {
    annee.textContent = new Date().getFullYear();
}
// FORMULAIRE D'INSCRIPTION


const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const participations = document.getElementById("participations").value;
        const pays = document.getElementById("pays").value;
        const motivations = document.getElementById("motivations").value.trim();

        let erreurs = [];

        if (fullname.length < 3) {
            erreurs.push("Veuillez saisir votre nom complet.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            erreurs.push("Adresse e-mail invalide.");
        }

        if (phone.length < 9) {
            erreurs.push("Numéro de téléphone invalide.");
        }

        if (participations === "") {
            erreurs.push("Choisissez un type de participation.");
        }

        if (pays === "") {
            erreurs.push("Choisissez votre pays.");
        }

        if (motivations.length < 10) {
            erreurs.push("Veuillez détailler vos motivations.");
        }

        if (erreurs.length > 0) {

            formMessage.innerHTML = erreurs.join("<br>");
            formMessage.style.color = "red";

            return;
        }

        formMessage.innerHTML =
            "✅ Votre inscription à AfriConnect Summit a été enregistrée avec succès !";

        formMessage.style.color = "green";

        contactForm.reset();

    });

}

//ANIMATION AU SCROLL//
const elements = document.querySelectorAll(
  "section, .card, .speaker-card, .sponsor-card, .stat-card, .feature-card, .faq-item, form, h1, h2, h3, p, .btn"
);

// État initial
elements.forEach((el) => {
  if (!el.closest("footer")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";
  }
});

// Animation au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

elements.forEach((el) => {
  if (!el.closest("footer")) {
    observer.observe(el);
  }
});

const tabs = document.querySelectorAll(".btn-tab");
const contents = document.querySelectorAll(".btn-content");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");
        contents[index].classList.add("active");

    });
});

// =========================
// ONGLETS DU PROGRAMME
// =========================
// FILTRAGE ONGLETS PROGRAMME
const bouttons = document.querySelectorAll('.btn-tab');
const contenus = document.querySelectorAll('.tab-container');
bouttons.forEach((boutton) => {
    boutton.addEventListener('click',() => {
        bouttons.forEach((btn) => {
            btn.classList.remove('active');
        } );
        contenus.forEach((contenu) => {
            contenu.classList.remove('active');
        });
        boutton.classList.add('active');
        document.getElementById(boutton.dataset.tab)
        .classList.add('active')
    } );
});


// FILTRAGE INTERVENANTS
const filterButtons = document.querySelectorAll('.filter-btn');
const persoCards = document.querySelectorAll('.sec-card');
filterButtons.forEach((boutton) => {
    boutton.addEventListener('click',() => {
        filterButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        boutton.classList.add('active');
        const filter = boutton.dataset.filter;
        persoCards.forEach((card) => {
        const categori = card.dataset.categori;
if (filter === 'Tous' || categori === filter){
    card.classList.remove('non');
}else  {
    card.classList.add('non');
}
        });

    });
} );
// BUTTON TOP
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
//  NAVBAR INTERACIVE AU SCROLL
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll',() => {
    if (window.scrollY >80){
        navbar.classList.add('scrolled');
  }else{
    navbar.classList.remove('scrolled');
}
} );
// NAVBAR BUTTON 
const btnMobile = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
btnMobile.addEventListener('click', () =>{
    navLinks.classList.toggle('active');
});
// ANIMATIONS FADE-IN , SLIDE-LEFT, ZOOM-IN 
const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in, .zoom-in"
);

if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    animatedElements.forEach((element) => {
        animationObserver.observe(element);
    });
}