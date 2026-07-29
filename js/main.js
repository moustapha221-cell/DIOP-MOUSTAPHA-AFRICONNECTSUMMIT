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
//   ANIMATION DES CHIFFRES CLÉS
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
// Vérifier le thème sauvegardé
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