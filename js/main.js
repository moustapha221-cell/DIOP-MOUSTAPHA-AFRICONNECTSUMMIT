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
const form = document.querySelector("form");
if(form){ 
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valide = true;
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const participation = document.getElementById("participations");
    const pays = document.getElementById("pays");
    const message = document.getElementById("message");

    document.querySelectorAll(".erreur-message").forEach(function (erreur) {
        erreur.textContent = "";
    });

    if (fullname.value.trim() === "") {
        fullname.nextElementSibling.textContent = "Le nom est obligatoire.";
        valide = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.textContent = "Adresse e-mail invalide.";
        valide = false;
    }

    const chiffres = phone.value.replace(/\D/g, "");

    if (chiffres.length < 8) {
        phone.nextElementSibling.textContent =
            "Le téléphone doit contenir au moins 8 chiffres.";
        valide = false;
    }
    if (participation.value === "") {
        participation.nextElementSibling.textContent =
            "Choisissez un type de participation.";
        valide = false;
    }
    if (pays.value === "") {
        pays.nextElementSibling.textContent =
            "Sélectionnez un pays.";
        valide = false;
    }
    if (message.value.trim().length < 20) {
        message.nextElementSibling.textContent =
            "La motivation doit contenir au moins 20 caractères.";
        valide = false;
    }
    if (valide) {
        alert("Votre demande a été envoyée avec succès.");
        form.reset();
    }
});
}

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