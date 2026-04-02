/* --- 1. CONFIGURATIE & DATA --- */
const fietsenData = {
    "gazelle-citygo": {
        titel: "Gazelle CityGo C7",
        foto: "afbeeldingen/Gazelle_CityGo_C7.jpg",
        rawSpecs: "4:Gazelle CityGo C7:Niet elektrisch:Zakelijk en privé:Heren:Stads:Gazelle:Nieuw:Meerdere:679,00:Wielmaat 28 inches"
    },
    "popal-vidar": {
        titel: "Popal Vidar Elektrische Fiets",
        foto: "afbeeldingen/vidarebike.png",
        rawSpecs: "5:Popal Vidar:Elektrisch:Zakelijk en privé:Unisex:Stads:Popal:Nieuw:Grijs:1599,00:470Wh Accu - 80km actieradius"
    },
    "altec-transport": {
        titel: "Altec Transportfiets",
        foto: "afbeeldingen/Altec.jpg",
        rawSpecs: "6:Altec Transport:Niet elektrisch:Privé:Heren:Transport:Altec:Nieuw:Zwart:429,00:Wielmaat 28 inch met voordrager"
    },
    "pelikaan-carry": {
        titel: "Pelikaan Carry On Lady",
        foto: "afbeeldingen/Pelikaan_Carry_On_Lady.jpg",
        rawSpecs: "1:Pelikaan Carry On Lady:Elektrisch:Geschikt voor zakelijk en privé:Dames:Transport:Pelikaan:Nieuw:Zwart:769,00:28 Inch 53 cm 3V V-Brakes"
    },
    "stella-allegra": {
        titel: "Stella Allegra voorwielmotor",
        foto: "afbeeldingen/Stella_Allegra_voorwielmotor.jpg",
        rawSpecs: "2:Allegra voorwielmotor:Elektrisch:Geschikt voor zakelijk en privé:Dames:Stads:Stella:Nieuw:Zwart:999,00:Framemaat S (Lichaamslengte 1,62m - 1,73m)"
    },
    "gazelle-orange": {
        titel: "Gazelle Orange C7+ HMB",
        foto: "afbeeldingen/Gazelle_Orange_C7.jpg",
        rawSpecs: "3:Gazelle Orange C7+ HMB 2020:Elektrisch:Geschikt voor zakelijk en privé:Heren:Stads:Gazelle:Nieuw:Blauw:2199,00:framemaat 53cm(1.66cm-1.77cm)"
    }
};

/* --- 2. MODAL LOGICA --- */

// Functie om de modal te sluiten
window.sluitModal = function () {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// Functie om de winkelwagen te openen
window.openCartModal = function () {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.sluitCartModal = function () {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// Logica voor het openen van de modal bij klik op fiets
/* --- 2. MODAL LOGICA --- */

// Functies moeten op window staan voor onclick in HTML
window.sluitModal = function () {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.openCartModal = function () {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.sluitCartModal = function () {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

// Alles wat elementen zoekt moet in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const fietsItems = document.querySelectorAll('.fiets-item');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    fietsItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.winkelbutton')) return;

            const id = item.getAttribute('data-id');
            const data = fietsenData[id];

            if (data) {
                const s = data.rawSpecs.split(':');
                
                document.getElementById('modal-titel').innerText = data.titel;
                document.getElementById('modal-img').src = data.foto;
                document.getElementById('modal-prijs').innerText = "€ " + s[9].replace('.', ',');

                let html = `
                    <table class="specs-table">
                        <tr><td><strong>Merk:</strong></td><td>${s[6]}</td></tr>
                        <tr><td><strong>Model:</strong></td><td>${s[1]}</td></tr>
                        <tr><td><strong>Type:</strong></td><td>${s[5]}</td></tr>
                        <tr><td><strong>Aandrijving:</strong></td><td>${s[2]}</td></tr>
                        <tr><td><strong>Geschikt voor:</strong></td><td>${s[4]}</td></tr>
                        <tr><td><strong>Gebruik:</strong></td><td>${s[3]}</td></tr>
                        <tr><td><strong>Kleur:</strong></td><td>${s[8]}</td></tr>
                        <tr><td><strong>Staat:</strong></td><td>${s[7]}</td></tr>
                        <tr><td><strong>Kenmerken:</strong></td><td>${s[10]}</td></tr>
                    </table>`;
                
                document.getElementById('modal-specs-list').innerHTML = html;
                document.getElementById('product-modal').classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // DEZE KNOP MOET BINNEN DE DOMContentLoaded STAAN:
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const titel = document.getElementById('modal-titel').innerText;
            const prijsTekst = document.getElementById('modal-prijs').innerText;

            // Zet "€ 679,00" om naar 679.00
            let schonePrijs = prijsTekst.replace('€', '').replace(/\./g, '').replace(',', '.').trim();
            const prijsGetal = parseFloat(schonePrijs);

            addToCart(titel, prijsGetal);
            
            sluitModal();
            openCartModal();
        });
    }
});

/* --- 3. WINKELWAGEN Systeem --- */
let winkelwagen = [];

function addToCart(naam, prijs) {
    const bestaandItem = winkelwagen.find(item => item.naam === naam);
    if (bestaandItem) {
        bestaandItem.aantal += 1;
    } else {
        winkelwagen.push({ naam: naam, prijs: prijs, aantal: 1 });
    }
    updateWinkelwagenDisplay();
}

function updateWinkelwagenDisplay() {
    const cartItemsBody = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    const cartCountBadge = document.getElementById('cart-count');

    cartItemsBody.innerHTML = "";
    let totaal = 0;
    let totaalArtikelen = 0;

    winkelwagen.forEach((item, index) => {
        const subtotaal = item.prijs * item.aantal;
        totaal += subtotaal;
        totaalArtikelen += item.aantal;

        cartItemsBody.innerHTML += `
            <tr>
                <td>${item.naam}</td>
                <td>${item.aantal}x</td>
                <td>€ ${subtotaal.toFixed(2).replace('.', ',')}</td>
                <td><button onclick="verwijderItem(${index})">🗑️</button></td>
            </tr>`;
    });

    totalDisplay.innerText = totaal.toFixed(2).replace('.', ',');
    cartCountBadge.innerText = totaalArtikelen;
}

window.verwijderItem = function(index) {
    if (winkelwagen[index].aantal > 1) {
        winkelwagen[index].aantal -= 1;
    } else {
        winkelwagen.splice(index, 1);
    }
    updateWinkelwagenDisplay();
};

// Algemene klik-om-te-sluiten voor beide modals
/* --- 4. ALGEMENE KLIK-OM-TE-SLUITEN --- */
window.addEventListener('click', (e) => {
    // We zoeken de elementen op het moment van klikken op
    const pModal = document.getElementById('product-modal');
    const cModal = document.getElementById('cart-modal');
    const hModal = document.getElementById('huurModal');

    // Als de gebruiker PRECIES op de grijze overlay klikt (de target), sluit dan de modal
    if (e.target === pModal) {
        sluitModal();
    }
    if (e.target === cModal) {
        sluitCartModal();
    }
    if (e.target === hModal) {
        hModal.classList.add('hidden');
    }
});

/* --- 4. OVERIGE FUNCTIES (Animatie & Tijden) --- */
const fietser = document.getElementById('moving-fietser');
const containerFietser = document.querySelector('.bike-container');
let positie = 0;
let richting = 1;

function fietserAnimatie() {
    if (!fietser || !containerFietser) return;
    const breedteScherm = containerFietser.offsetWidth;
    positie += 1 * richting;
    if (positie + fietser.offsetWidth >= breedteScherm) {
        richting = -1;
        fietser.style.transform = "scaleX(-1)";
    } else if (positie <= 0) {
        richting = 1;
        fietser.style.transform = "scaleX(1)";
    }
    fietser.style.left = positie + "px";
    requestAnimationFrame(fietserAnimatie);
}

function checkOpeningstijden() {
    const nuInNL = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }));

    const dag = nuInNL.getDay(); // 0 = zondag, 1 = maandag, etc.
    const uren = nuInNL.getHours();
    const minuten = nuInNL.getMinutes();
    const tijd = uren + (minuten / 60);

    const box = document.querySelector('.openingstijden-box');
    const statusTekst = document.getElementById('status-tekst');

    if (!statusTekst || !box) return;

    // Ma-Vr 09:00-18:00 | Za 10:00-17:00
    let isOpen = (dag >= 1 && dag <= 5 && tijd >= 9 && tijd < 18) ||
        (dag === 6 && tijd >= 10 && tijd < 17);

    if (isOpen) {
        statusTekst.innerHTML = "🟢 Winkel is nu OPEN";
        box.classList.remove('status-gesloten');
        box.classList.add('status-open');
    } else {
        statusTekst.innerHTML = "🔴 Winkel is nu GESLOTEN";
        box.classList.remove('status-open');
        box.classList.add('status-gesloten');
    }
}

window.addEventListener('load', () => {
    fietserAnimatie();
    checkOpeningstijden();
});

/* --- 5. SLIDESHOW LOGICA --- */
const slides = [
    "afbeeldingen/slide1.jpg",
    "afbeeldingen/slide2.jpg",
    "afbeeldingen/slide3.jpg",
    "afbeeldingen/slide4.jpg",
    "afbeeldingen/slide5.png",
    "afbeeldingen/slide6.jpg"
];
let slideIndex = 0;

const sliderImg = document.getElementById('slider-img');
const btnVorige = document.getElementById('btn-vorige');
const btnVolgende = document.getElementById('btn-volgende');


/* --- 5. SLIDESHOW LOGICA --- */

if (sliderImg && btnVorige && btnVolgende) {


    function updateSlider(richting) {
        sliderImg.classList.add('fade-out');
        setTimeout(() => {
            slideIndex += richting;
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;
            sliderImg.src = slides[slideIndex];
            sliderImg.classList.remove('fade-out');
        }, 500);
    }

    let slideTimer = setInterval(() => updateSlider(1), 5000);


    function herstartTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => updateSlider(1), 5000);
    }


    btnVorige.addEventListener('click', () => {
        updateSlider(-1);
        herstartTimer();
    });

    btnVolgende.addEventListener('click', () => {
        updateSlider(1);
        herstartTimer();
    });
}

/* --- 6. VERHUUR MENU LOGICA --- */
document.addEventListener('DOMContentLoaded', () => {
    const huurButton = document.querySelector('.bestel-button-groot');
    const huurModal = document.getElementById('huurModal');
    const closeBtn = document.getElementById('close-modal');
    const bestelLijst = document.getElementById('modal-bestellijst');
    const dagenInput = document.getElementById('huur-dagen');
    const totaalDisplay = document.getElementById('modal-totaalprijs');


    function calculateTotal() {
        let totaalAlgemeen = 0;
        const rijen = document.querySelectorAll('#modal-bestellijst tr');

        rijen.forEach(row => {
            const aantalInput = row.querySelector('.aantal-input:not(.dagen-input)')
            const dagenInput = row.querySelector('.dagen-input'); // Specifiek voor deze rij
            const subtotaalCell = row.querySelector('.subtotaal');

            if (aantalInput && dagenInput && subtotaalCell) {
                const aantalFietsen = parseInt(aantalInput.value) || 0;
                const aantalDagen = parseInt(dagenInput.value) || 0;
                const prijsPerDag = parseFloat(aantalInput.dataset.prijs);

                // REKENSOM PER REGEL: Aantal fietsen * Dagen op deze regel * Prijs
                const subtotaal = aantalFietsen * aantalDagen * prijsPerDag;

                subtotaalCell.innerText = `€${subtotaal.toFixed(2)}`;
                totaalAlgemeen += subtotaal;
            }
        });

        totaalDisplay.innerText = `€${totaalAlgemeen.toFixed(2)}`;
    }

    /* button event listener */
    if (huurButton) {
        huurButton.addEventListener('click', () => {
            const inputNaam = document.getElementById('input-naam');
            const inputEmail = document.getElementById('input-email');
            const inputAdres = document.getElementById('input-adres');
            const inputStad = document.getElementById('input-stad');
            const inputPostcode = document.getElementById('input-postcode');

            const geselecteerdeFietsen = document.querySelectorAll('.fiets-selectie-grid input[type="checkbox"]:checked');

            if (!inputNaam.value || !inputEmail.value || !inputAdres.value || !inputStad.value || !inputPostcode.value) {
                alert("Vul alstublieft alle klantgegevens volledig in.");
                return;
            }

            if (!inputEmail.checkValidity()) {
                alert("Voer een geldig e-mailadres in.");
                return;
            }

            if (!inputStad.checkValidity()) {
                alert("De stad mag alleen letters bevatten.");
                return;
            }

            if (!inputPostcode.checkValidity()) {
                alert("De postcode is niet geldig. Gebruikt het formaat: 1234 AB");
                return;
            }

            if (geselecteerdeFietsen.length === 0) {
                alert("Kies minimaal één fiets om te huren.");
                return;
            }

            document.getElementById('klant-resumé').innerHTML = `<strong>Klant:</strong> ${inputNaam.value} uit ${inputStad.value}.`;

            bestelLijst.innerHTML = '';
            geselecteerdeFietsen.forEach(checkbox => {
                const label = checkbox.nextElementSibling;
                const naamFiets = label ? label.querySelector('.fiets-naam').innerText : checkbox.id;
                const prijs = parseFloat(checkbox.dataset.prijs);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${naamFiets}</td>
                    <td><input type="number" value="1" min="1" class="aantal-input" data-prijs="${prijs}"></td>
                    <td><input type="number" value="1" min="1" class="aantal-input dagen-input"></td>
                    <td>€${prijs.toFixed(2)}</td>
                    <td class="subtotaal">€0.00</td>
                    <td><button class="delete-row-btn">&times;</button></td>
                `;
                bestelLijst.appendChild(row);
            });


            calculateTotal();
            huurModal.classList.remove('hidden');
        });
    }

    if (bestelLijst) {
        bestelLijst.addEventListener('input', (e) => {
            if (e.target.classList.contains('aantal-input')) {
                calculateTotal();
            }
        });

        bestelLijst.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-row-btn')) {
                e.target.closest('tr').remove();

                calculateTotal();

                if (bestelLijst.querySelectorAll('tr').length === 0) {
                    huurModal.classList.add('hidden')
                }
            }
        })
    }


    if (dagenInput) {
        dagenInput.addEventListener('input', calculateTotal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            huurModal.classList.add('hidden');
        });

    }


    window.addEventListener('click', (e) => {
        if (huurModal && e.target === huurModal) {
            huurModal.classList.add('hidden');
        }
    });

    window.afrekenen = function () {
        alert('Bedankt voor uw bestelling! We nemen zo snel mogelijk contact met u op.');

        const huurModal = document.getElementById('huurModal');
        if (huurModal) {
            huurModal.classList.add('hidden');
        }
    }


});

/// Functie voor validatie contactformulier

function valideerContactFormulier() {
    const voornaam = document.getElementById('input-voornaamcontact');
    const achternaam = document.getElementById('input-achternaamcontact');
    const email = document.getElementById('input-emailcontact');
    const vraag = document.getElementById('textarea-contact');

    if (!voornaam.value || !achternaam.value || !email.value || !vraag.value) {
        alert("Vul alstublieft alle verplichte velden (*) in.");
        return;
    }

    const naamRegex = /^[A-Za-zÀ-ÿ\s\-]+$/;
    if (!naamRegex.test(voornaam.value) || !naamRegex.test(achternaam.value)) {
        alert("De naam mag geen cijfers of speciale tekens bevatten.");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.value)) {
        alert("Het emailadres '" + email.value + "' is niet geldig. Zorg voor een @ en een punt (bijv. .nl).");
        return;
    }

    if (vraag.value.trim().length < 10) {
        alert("Uw vraag is te kort. Geef a.u.b. wat meer informatie (minimaal 10 tekens).");
        vraag.focus();
        vraag.value = "";
        return;
    }

    alert("Bedankt voor uw bericht, " + voornaam.value + "! Uw bericht is succesvol verzonden.");

    voornaam.value = "";
    achternaam.value = "";
    email.value = "";
    vraag.value = "";
}

window.voltooiBestelling = function() {
    
    if (winkelwagen.length === 0) {
        alert("Uw winkelwagen is nog leeg!");
        return;
    }

    alert("Bedankt voor uw bestelling. We gaan hiermee aan de slag!");

  
    winkelwagen = [];
    
    updateWinkelwagenDisplay();

    sluitCartModal();
};

document.addEventListener('DOMContentLoaded', () => {

    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

    if (isHomePage && !hasSeenWelcome) {
       
        alert("Welkom bij De Fluitende Fietser! Veel plezier op onze website.");
        
       
        sessionStorage.setItem('hasSeenWelcome', 'true');
    }
});

window.sluitWelcomeModal = function() {
    document.getElementById('welcome-modal').classList.add('hidden');
};



