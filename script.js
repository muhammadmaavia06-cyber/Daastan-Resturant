/*==================================================
        PART 4A - CORE WEBSITE SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
            AUTO FOOTER YEAR
    ==================================================*/

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /*==================================================
            NAVBAR (sticky background on scroll)
    ==================================================*/

    const header = document.getElementById("navbar");

    function stickyNavbar() {
        if (!header) return;

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    stickyNavbar();
    window.addEventListener("scroll", stickyNavbar);

    /*==================================================
            MOBILE MENU (hamburger + drawer)
    ==================================================*/

    const hamburger = document.getElementById("hamburger");
    const drawer = document.getElementById("mobile-drawer");
    const drawerOverlay = document.getElementById("drawer-overlay");
    const drawerClose = document.getElementById("drawer-close");

    function openDrawer() {
        hamburger?.classList.add("active");
        hamburger?.setAttribute("aria-expanded", "true");
        drawer?.classList.add("active");
        drawer?.setAttribute("aria-hidden", "false");
        drawerOverlay?.classList.add("active");
        document.body.classList.add("menu-open");
    }

    function closeDrawer() {
        hamburger?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
        drawer?.classList.remove("active");
        drawer?.setAttribute("aria-hidden", "true");
        drawerOverlay?.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    if (hamburger && drawer) {
        hamburger.addEventListener("click", () => {
            const isOpen = drawer.classList.contains("active");
            isOpen ? closeDrawer() : openDrawer();
        });

        drawerClose?.addEventListener("click", closeDrawer);
        drawerOverlay?.addEventListener("click", closeDrawer);

        document.querySelectorAll(".drawer-link").forEach(link => {
            link.addEventListener("click", closeDrawer);
        });
    }

    /*==================================================
            SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });

    /*==================================================
            ACTIVE NAVIGATION
    ==================================================*/

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link, .drawer-link");

    function activeSection() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 140;
            const id = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                document.querySelectorAll(`a[href="#${id}"]`).forEach(active => {
                    active.classList.add("active");
                });
            }
        });
    }

    window.addEventListener("scroll", activeSection);
    activeSection();

    /*==================================================
            ESC KEY CLOSE MENU
    ==================================================*/

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeDrawer();
        }
    });

});
/*==================================================
        PART 4B - PREMIUM ANIMATIONS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
            SCROLL REVEAL
    ==================================================*/

    const revealElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right, .fade-scale"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: .15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /*==================================================
            HERO PARALLAX EFFECT
    ==================================================*/

    const heroBg = document.querySelector(".hero-bg-layer");

    if (heroBg) {
        window.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - .5) * 25;
            const y = (e.clientY / window.innerHeight - .5) * 25;
            heroBg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    /*==================================================
            FLOATING OBJECTS
    ==================================================*/

    document.querySelectorAll(".floating, .float-badge").forEach((item, index) => {
        item.animate([
            { transform: "translateY(0px)" },
            { transform: "translateY(-12px)" },
            { transform: "translateY(0px)" }
        ], {
            duration: 4000 + (index * 600),
            iterations: Infinity,
            easing: "ease-in-out"
        });
    });

    /*==================================================
            COUNTER
    ==================================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = +counter.dataset.target;
            let current = 0;
            const speed = Math.max(target / 60, 1);

            const update = () => {
                current += speed;

                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };

            update();
            counterObserver.unobserve(counter);
        });
    }, {
        threshold: .6
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /*==================================================
            HERO TYPEWRITER
    ==================================================*/

    const typewriterEl = document.getElementById("hero-typewriter");

    if (typewriterEl) {
        const phrases = [
            "An ultra-luxury Pakistani culinary experience rooted in heritage.",
            "26+ years of crafting unforgettable flavors in Karachi.",
            "Where ancestral recipes meet refined, modern mastery.",
            "Every plate, a story. Every visit, a memory."
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const current = phrases[phraseIndex];

            if (!deleting) {
                charIndex++;
                typewriterEl.textContent = current.slice(0, charIndex);

                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1800);
                    return;
                }
            } else {
                charIndex--;
                typewriterEl.textContent = current.slice(0, charIndex);

                if (charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }

            setTimeout(typeLoop, deleting ? 35 : 55);
        }

        typeLoop();
    }

    /*==================================================
            BUTTON GLOW / RIPPLE COORDINATES
    ==================================================*/

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("mousemove", (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty("--x", `${x}px`);
            button.style.setProperty("--y", `${y}px`);
        });
    });

    /*==================================================
            IMAGE DRAG PREVENTION
    ==================================================*/

    document.querySelectorAll("img").forEach(image => {
        image.addEventListener("dragstart", (e) => {
            e.preventDefault();
        });
    });

});
/*==================================================
        PART 4C - MENU + GALLERY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
            MENU TABS
    ==================================================*/

    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");

    if (tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const target = tab.getAttribute("aria-controls");

                tabs.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });

                panels.forEach(panel => {
                    panel.classList.remove("active");
                    panel.hidden = true;
                });

                tab.classList.add("active");
                tab.setAttribute("aria-selected", "true");

                const targetPanel = document.getElementById(target);
                if (targetPanel) {
                    targetPanel.classList.add("active");
                    targetPanel.hidden = false;
                }
            });
        });
    }

    /*==================================================
            LIGHTBOX
    ==================================================*/

    const galleryImages = document.querySelectorAll(".gallery-item img");

    if (galleryImages.length) {

        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close gallery">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
                <img src="" alt="Gallery Image">
                <button class="lightbox-next" aria-label="Next image">&#10095;</button>
            </div>
        `;

        document.body.appendChild(lightbox);

        const image = lightbox.querySelector("img");
        const closeBtn = lightbox.querySelector(".lightbox-close");
        const nextBtn = lightbox.querySelector(".lightbox-next");
        const prevBtn = lightbox.querySelector(".lightbox-prev");

        let current = 0;

        function open(index) {
            current = index;
            image.src = galleryImages[current].src;
            image.alt = galleryImages[current].alt || "Gallery Image";
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
        }

        function close() {
            lightbox.classList.remove("show");
            document.body.style.overflow = "";
        }

        function next() {
            current = (current + 1) % galleryImages.length;
            image.src = galleryImages[current].src;
            image.alt = galleryImages[current].alt || "Gallery Image";
        }

        function prev() {
            current = (current - 1 + galleryImages.length) % galleryImages.length;
            image.src = galleryImages[current].src;
            image.alt = galleryImages[current].alt || "Gallery Image";
        }

        galleryImages.forEach((img, index) => {
            img.closest(".gallery-item")?.addEventListener("click", () => {
                open(index);
            });
        });

        closeBtn.addEventListener("click", close);
        lightbox.querySelector(".lightbox-overlay").addEventListener("click", close);
        nextBtn.addEventListener("click", next);
        prevBtn.addEventListener("click", prev);

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("show")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        });

        let startX = 0;

        lightbox.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        lightbox.addEventListener("touchend", (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? next() : prev();
            }
        });
    }

    /*==================================================
            GALLERY HOVER GLOW
    ==================================================*/

    document.querySelectorAll(".gallery-item").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");
        });
    });

});
/*==================================================
        PART 4D - TESTIMONIAL SLIDER
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("testimonial-track");
    const prev = document.getElementById("slider-prev");
    const next = document.getElementById("slider-next");
    const dotsContainer = document.getElementById("slider-dots");

    if (!track) return;

    const slides = [...track.querySelectorAll(".testimonial-card")];

    let current = 0;
    let autoSlide;

    /*==================================================
            CREATE DOTS
    ==================================================*/

    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", "Go to review " + (index + 1));

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            goTo(index);
            restartAuto();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = [...dotsContainer.children];

    function update() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[current].classList.add("active");
    }

    function goTo(index) {
        current = index;

        if (current < 0) current = slides.length - 1;
        if (current >= slides.length) current = 0;

        update();
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    next?.addEventListener("click", () => {
        nextSlide();
        restartAuto();
    });

    prev?.addEventListener("click", () => {
        prevSlide();
        restartAuto();
    });

    function startAuto() {
        autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function stopAuto() {
        clearInterval(autoSlide);
    }

    function restartAuto() {
        stopAuto();
        startAuto();
    }

    startAuto();

    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);

    let startX = 0;

    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            restartAuto();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextSlide();
            restartAuto();
        }
        if (e.key === "ArrowLeft") {
            prevSlide();
            restartAuto();
        }
    });

    window.addEventListener("resize", update);
    update();

});
/*==================================================
        PART 4E - RESERVATION FORM
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("reservation-form");

    if (!form) return;

    const nameInput = document.getElementById("res-name");
    const emailInput = document.getElementById("res-email");
    const phoneInput = document.getElementById("res-phone");
    const guestsInput = document.getElementById("res-guests");
    const dateInput = document.getElementById("res-date");
    const timeInput = document.getElementById("res-time");
    const success = document.getElementById("form-success");

    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    function showError(input, message) {
        const error = input.parentElement.querySelector(".form-error");
        if (error) error.textContent = message;
        input.classList.add("error");
    }

    function clearError(input) {
        const error = input.parentElement.querySelector(".form-error");
        if (error) error.textContent = "";
        input.classList.remove("error");
    }

    function validateName() {
        const value = nameInput.value.trim();

        if (value.length < 3) {
            showError(nameInput, "Please enter your full name.");
            return false;
        }

        clearError(nameInput);
        return true;
    }

    function validateEmail() {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.test(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address.");
            return false;
        }

        clearError(emailInput);
        return true;
    }

    function validatePhone() {
        const phone = /^(\+92|0)?3[0-9]{9}$/;

        if (!phone.test(phoneInput.value.trim())) {
            showError(phoneInput, "Enter a valid Pakistani mobile number.");
            return false;
        }

        clearError(phoneInput);
        return true;
    }

    function validateGuests() {
        const guests = parseInt(guestsInput.value);

        if (isNaN(guests) || guests < 1 || guests > 20) {
            showError(guestsInput, "Guests must be between 1 and 20.");
            return false;
        }

        clearError(guestsInput);
        return true;
    }

    function validateDate() {
        if (dateInput.value === "") {
            showError(dateInput, "Please select a date.");
            return false;
        }

        clearError(dateInput);
        return true;
    }

    function validateTime() {
        if (timeInput.value === "") {
            showError(timeInput, "Please select a time.");
            return false;
        }

        clearError(timeInput);
        return true;
    }

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    guestsInput.addEventListener("input", validateGuests);
    dateInput.addEventListener("change", validateDate);
    timeInput.addEventListener("change", validateTime);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const valid =
            validateName() &&
            validateEmail() &&
            validatePhone() &&
            validateGuests() &&
            validateDate() &&
            validateTime();

        if (!valid) {
            success.hidden = true;
            return;
        }

        success.hidden = false;
        success.style.opacity = "0";
        success.style.transform = "translateY(20px)";

        setTimeout(() => {
            success.style.transition = ".5s";
            success.style.opacity = "1";
            success.style.transform = "translateY(0)";
        }, 50);

        form.reset();

        setTimeout(() => {
            success.hidden = true;
        }, 6000);
    });

});
/*==================================================
        PART 4F - FINAL PREMIUM FEATURES
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
            BACK TO TOP BUTTON
    ==================================================*/

    const backTop = document.getElementById("back-to-top");

    if (backTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        });

        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /*==================================================
            SCROLL PROGRESS BAR
    ==================================================*/

    const progress = document.getElementById("scroll-progress");

    if (progress) {
        window.addEventListener("scroll", () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
            progress.style.width = percent + "%";
        });
    }

    /*==================================================
            RIPPLE EFFECT
    ==================================================*/

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const ripple = document.createElement("span");
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";
            ripple.style.left = e.clientX - rect.left - size / 2 + "px";
            ripple.style.top = e.clientY - rect.top - size / 2 + "px";
            ripple.className = "ripple";

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
    });

    /*==================================================
            PERFORMANCE: DEBOUNCED RESIZE
    ==================================================*/

    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            window.dispatchEvent(new Event("optimizedResize"));
        }, 200);
    });

    /*==================================================
            SMOOTH IMAGE FADE-IN
    ==================================================*/

    document.querySelectorAll("img").forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        }
    });

    /*==================================================
            BUTTON KEYBOARD ACCESSIBILITY
    ==================================================*/

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                button.click();
            }
        });
    });

    /*==================================================
            CONSOLE MESSAGE
    ==================================================*/

    console.log(
        "%c\u{1F37D}\u{FE0F} DASTAAN RESTAURANT WEBSITE READY",
        "color:#D4AF37;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cDesigned with HTML \u2022 CSS \u2022 JavaScript",
        "color:#ffffff;font-size:14px;"
    );

});
