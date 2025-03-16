document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // Button Hover Animation
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => btn.style.transform = "scale(1.05)");
        btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
    });

    // Fade-in Effect on Scroll
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });

    fadeElements.forEach(el => observer.observe(el));

    // Loading Animation
    const loader = document.createElement("div");
    loader.className = "loader";
    document.body.appendChild(loader);
    window.addEventListener("load", () => {
        loader.style.display = "none";
    });

    // Contact Form Validation and Handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            let name = document.getElementById("name");
            let email = document.getElementById("email");
            let message = document.getElementById("message");
            let responseMessage = document.getElementById("responseMessage");
            
            [name, email, message].forEach(input => input.classList.remove("error"));
            responseMessage.style.display = "none";
            
            let isValid = true;
            if (!name.value.trim()) {
                name.classList.add("error");
                isValid = false;
            }
            
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
            if (!email.value.match(emailPattern)) {
                email.classList.add("error");
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.classList.add("error");
                isValid = false;
            }
            
            if (!isValid) {
                responseMessage.style.color = "red";
                responseMessage.innerText = "Please fill all fields correctly!";
                responseMessage.style.display = "block";
                return;
            }
            
            // Store data locally
            localStorage.setItem("contactData", JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            }));
            
            responseMessage.style.color = "green";
            responseMessage.innerText = "Message saved locally! We'll get back to you soon.";
            responseMessage.style.display = "block";
            contactForm.reset();
        });
    }
});
