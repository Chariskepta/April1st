document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // SLIDESHOW FUNCTIONALITY
    // ======================
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideInterval;

    function showSlides(n) {
        // Handle index overflow/underflow
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active-dot'));
        
        // Show current slide and activate corresponding dot
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('active-dot');
    }

    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
        resetInterval();
    }

    function prevSlide() {
        slideIndex--;
        showSlides(slideIndex);
        resetInterval();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides(slideIndex);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize slideshow
    function initSlideshow() {
        showSlides(slideIndex);
        slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        const slideshow = document.querySelector('.slideshow-container');
        slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshow.addEventListener('mouseleave', resetInterval);
    }
    // ======================
        // FULLSCREEN IMAGE VIEW
        // ======================
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const captionText = document.querySelector(".modal-caption");
        const closeModal = document.querySelector(".close-modal");

        // Make slides clickable
        slides.forEach(slide => {
            slide.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.querySelector('img').src;
                captionText.innerHTML = this.querySelector('img').alt;
            });
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
        });

        // Close when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });

    // Button controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

    initSlideshow();

    // ======================
    // CHARACTER & SCROLL LOGIC
    // ======================
    const character = document.getElementById('character');
    const scroll = document.getElementById('scroll');
    const message = document.getElementById('message');
    let isOpen = false;

    character.addEventListener('click', function() {
        if (!isOpen) {
            // Log to console when opening scroll
            console.log("Love Yourz 18 !!");
            console.log("%c🎯", "font-size: 24px; color: red;");
            
            // Animate scroll opening
            scroll.style.transform = 'translateY(50px) scaleY(1.2)';
            character.style.transform = 'translateX(-50%) translateY(20px)';
            
            // Show message after slight delay
            setTimeout(() => {
                message.style.opacity = '1';
            }, 500);
            
            isOpen = true;
        } else {
            // Animate scroll closing
            scroll.style.transform = 'translateY(0) scaleY(1)';
            character.style.transform = 'translateX(-50%) translateY(0)';
            message.style.opacity = '0';
            
            isOpen = false;
        }
    });

// Alternative if you prefer generated emojis
const emojis = ["🌸", "💮", "🏵️", "🌺", "🌼"];
const container = document.querySelector('.slow-life-container');

emojis.forEach((emoji, index) => {
    const carnation = document.createElement('div');
    carnation.className = 'floating-carnation';
    carnation.textContent = emoji;
    carnation.style.left = Math.random() * 90 + '%';
    carnation.style.top = Math.random() * 90 + '%';
    carnation.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    carnation.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(carnation);
});
});