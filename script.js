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
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "0.3s";
        });
        btn.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

    // Save and Display User Name
    const nameInput = document.getElementById("nameInput");
    const saveBtn = document.getElementById("saveNameBtn");
    const welcomeMessage = document.getElementById("welcomeMessage");

    // Load name if exists in local storage
    if (localStorage.getItem("userName")) {
        welcomeMessage.textContent = "Welcome, " + localStorage.getItem("userName") + "!";
    }

    // Save name on button click
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            const userName = nameInput.value.trim();
            if (userName) {
                localStorage.setItem("userName", userName);
                welcomeMessage.textContent = "Welcome, " + userName + "!";
            }
        });
    }

    // Contact Form Validation and Handling (Without Database)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form from reloading

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();
            let responseMessage = document.getElementById("responseMessage");

            // Validation
            if (name === "" || email === "" || message === "") {
                responseMessage.style.color = "red";
                responseMessage.innerText = "All fields are required!";
                responseMessage.style.display = "block";
                return;
            }

            // Email Validation
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
            if (!email.match(emailPattern)) {
                responseMessage.style.color = "red";
                responseMessage.innerText = "Please enter a valid email address!";
                responseMessage.style.display = "block";
                return;
            }

            // Store data locally
            localStorage.setItem("contactData", JSON.stringify({ name, email, message }));

            // Success message
            responseMessage.style.color = "green";
            responseMessage.innerText = "Message saved locally! We'll get back to you soon.";
            responseMessage.style.display = "block";

            // Clear form fields
            contactForm.reset();
        });
    }
});
