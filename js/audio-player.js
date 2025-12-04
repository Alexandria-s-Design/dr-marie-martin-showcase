/**
 * Marie Martin - Vinyl Style Audio Player
 * New Orleans Jazz Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
    const trackCards = document.querySelectorAll('.track-card');
    let currentlyPlaying = null;

    trackCards.forEach(card => {
        const audio = card.querySelector('audio');
        const playBtn = card.querySelector('.play-btn');
        const playIcon = card.querySelector('.play-icon');
        const pauseIcon = card.querySelector('.pause-icon');
        const progressBar = card.querySelector('.progress-bar');
        const progressFill = card.querySelector('.progress-fill');
        const currentTimeEl = card.querySelector('.current-time');
        const durationEl = card.querySelector('.duration');

        // Format time as mm:ss
        const formatTime = (seconds) => {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Update duration when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });

        // Play/Pause toggle
        playBtn.addEventListener('click', () => {
            // If another track is playing, pause it
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                const otherCard = currentlyPlaying.closest('.track-card');
                otherCard.classList.remove('playing');
                otherCard.querySelector('.play-icon').style.display = 'block';
                otherCard.querySelector('.pause-icon').style.display = 'none';
            }

            if (audio.paused) {
                audio.play();
                card.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                currentlyPlaying = audio;
            } else {
                audio.pause();
                card.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
            }
        });

        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        // Click on progress bar to seek
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            audio.currentTime = clickPosition * audio.duration;
        });

        // Reset when audio ends
        audio.addEventListener('ended', () => {
            card.classList.remove('playing');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            currentlyPlaying = null;
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to lesson cards
    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        animateOnScroll.observe(card);
    });

    // Add animation to track cards
    document.querySelectorAll('.track-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        animateOnScroll.observe(card);
    });
});
