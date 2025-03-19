document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar"); // Select navbar
    const stickyOffset = navbar.offsetTop; // Get navbar position

    window.addEventListener("scroll", function () {
        if (window.scrollY > stickyOffset) {
            navbar.classList.add("sticky"); // Add sticky class
        } else {
            navbar.classList.remove("sticky"); // Remove sticky class
        }
    });

    // Navbar Smooth Scrolling with Delay Effect
    document.querySelectorAll(".navbar-nav a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navbar.offsetHeight;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 800; // Adjust for slower or faster effect (in ms)
                let startTime = null;

                function smoothScroll(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Ease-in-out function for smooth effect
                    window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

                    if (timeElapsed < duration) {
                        requestAnimationFrame(smoothScroll);
                    }
                }

                function easeInOutQuad(t) {
                    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                }

                requestAnimationFrame(smoothScroll);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carouselExampleIndicators");
    const carouselInstance = new bootstrap.Carousel(carousel); 
    const items = document.querySelectorAll(".carousel-item .img-wrapper");

    function updateCarouselPosition() {
        items.forEach((item) => {
            item.style.transform = "scale(0.8)"; // Slightly smaller scale
            item.style.opacity = "0.4";
        });
    
        const activeItem = document.querySelector(".carousel-item.active .img-wrapper");
        if (activeItem) {
            activeItem.style.transform = "scale(1)"; // Keep at 1x scale instead of enlarging too much
            activeItem.style.opacity = "1";
        }
    }

    carousel.addEventListener("slid.bs.carousel", function () {
        updateCarouselPosition();
    });

    items.forEach((img, index) => {
        img.addEventListener("click", function () {
            carouselInstance.to(index); 
        });
    });

    updateCarouselPosition();
});

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");


    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");


            // Show or hide menu items based on category
            menuItems.forEach((item) => {
                if (category === "all" || item.getAttribute("data-category") === category) {
                    item.style.display = "block"; // Show item
                } else {
                    item.style.display = "none"; // Hide item
                }
            });


            // Update active button style
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
