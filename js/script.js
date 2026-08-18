// ================================
// Mobile Hamburger Menu
// ================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function toggleMenu() {
    navLinks.classList.toggle("active");
}

menuToggle.addEventListener("click", toggleMenu);

// Keyboard accessibility
menuToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
    }
});

// Close mobile menu after clicking a link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ================================
// Dark / Light Theme
// ================================

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️";
} else {
    themeBtn.innerText = "🌙";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerText = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.innerText = "🌙";
        localStorage.setItem("theme", "light");
    }
});


// ================================
// Auto Image Slider
// ================================

const slides = document.querySelectorAll(".slide");

let current = 0;

if (slides.length > 0) {

    setInterval(() => {

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }, 3000);
}


// ================================
// Counter Animation
// ================================

const counters = document.querySelectorAll(".counter");

const counterSection = document.querySelector(".counter-section");

let counterStarted = false;

function startCounters() {

    if (counterStarted) {
        return;
    }

    counterStarted = true;

    counters.forEach((counter) => {

        const target = Number(
            counter.getAttribute("data-target")
        );

        let currentNumber = 0;

        const increment = Math.max(1, Math.ceil(target / 100));

        const updateCounter = () => {

            currentNumber += increment;

            if (currentNumber < target) {

                counter.innerText =
                    currentNumber.toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText =
                    target.toLocaleString();

            }
        };

        updateCounter();
    });
}


// Start counter when section becomes visible
if (counterSection) {

    const observer = new IntersectionObserver(
        (entries) => {

            if (entries[0].isIntersecting) {
                startCounters();
                observer.disconnect();
            }

        },
        {
            threshold: 0.3
        }
    );

    observer.observe(counterSection);
}


// ================================
// Contact Form → WhatsApp
// ================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !phone || !message) {

            alert("Please fill in all fields.");

            return;
        }


        const whatsappNumber = "919621099003";


        const whatsappMessage =
`Hello Awadh Digital Zone,

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        contactForm.reset();
    });
}
