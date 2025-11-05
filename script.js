/**
 * Dr. Marie Martin Showcase - Interactive Features
 * Handles video loading, error handling, lazy loading, and smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initVideoHandlers();
    initLazyLoading();
    initScrollAnimations();
    initSmoothScroll();
    initVideoAnalytics();
});

/**
 * Initialize video error handling and loading states
 */
function initVideoHandlers() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');

        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'video-loading';
        loadingIndicator.innerHTML = '<div class="spinner"></div>';
        loadingIndicator.setAttribute('aria-hidden', 'true');
        wrapper.appendChild(loadingIndicator);

        // Handle video load success
        video.addEventListener('loadedmetadata', () => {
            loadingIndicator.remove();
            video.classList.add('loaded');
        });

        // Handle video load errors
        video.addEventListener('error', (e) => {
            console.error('Video failed to load:', video.dataset.videoId, e);

            const errorMessage = document.createElement('div');
            errorMessage.className = 'video-error';
            errorMessage.innerHTML = `
                <div class="error-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke-width="2"/>
                        <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
                        <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <p>Unable to load video</p>
                    <button class="retry-button" onclick="retryVideoLoad('${video.dataset.videoId}')">
                        Retry
                    </button>
                </div>
            `;
            errorMessage.setAttribute('role', 'alert');

            loadingIndicator.remove();
            wrapper.appendChild(errorMessage);
        });

        // Handle video play event
        video.addEventListener('play', () => {
            // Pause other videos when one starts playing
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });
}

/**
 * Retry loading a video that failed
 */
window.retryVideoLoad = function(videoId) {
    const video = document.querySelector(`[data-video-id="${videoId}"]`);
    if (video) {
        const wrapper = video.closest('.video-wrapper');
        const errorMessage = wrapper.querySelector('.video-error');

        if (errorMessage) {
            errorMessage.remove();
        }

        // Re-add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'video-loading';
        loadingIndicator.innerHTML = '<div class="spinner"></div>';
        wrapper.appendChild(loadingIndicator);

        // Reload video
        video.load();
    }
};

/**
 * Initialize lazy loading for videos using Intersection Observer
 */
function initLazyLoading() {
    const videos = document.querySelectorAll('video[preload="metadata"]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;

                // Load the video when it comes into viewport
                if (video.readyState === 0) {
                    video.load();
                }

                // Stop observing once loaded
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before video enters viewport
    });

    videos.forEach(video => videoObserver.observe(video));
}

/**
 * Initialize scroll-triggered animations for sections
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.video-card, .bio-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        animationObserver.observe(element);
    });
}

/**
 * Initialize smooth scroll behavior for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash links
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Track video engagement analytics
 */
function initVideoAnalytics() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        let hasPlayed = false;
        let hasCompleted = false;
        let playCount = 0;

        video.addEventListener('play', () => {
            playCount++;

            if (!hasPlayed) {
                hasPlayed = true;
                console.log(`Video started: ${video.dataset.videoId}`);
                // Here you could send analytics to your tracking service
            }
        });

        video.addEventListener('ended', () => {
            if (!hasCompleted) {
                hasCompleted = true;
                console.log(`Video completed: ${video.dataset.videoId}`);
                // Here you could send completion analytics
            }
        });

        // Track video progress at 25%, 50%, 75%
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;

            if (progress >= 25 && !video.dataset.tracked25) {
                video.dataset.tracked25 = 'true';
                console.log(`Video 25% progress: ${video.dataset.videoId}`);
            }
            if (progress >= 50 && !video.dataset.tracked50) {
                video.dataset.tracked50 = 'true';
                console.log(`Video 50% progress: ${video.dataset.videoId}`);
            }
            if (progress >= 75 && !video.dataset.tracked75) {
                video.dataset.tracked75 = 'true';
                console.log(`Video 75% progress: ${video.dataset.videoId}`);
            }
        });
    });
}

/**
 * Add keyboard navigation enhancements
 */
document.addEventListener('keydown', (e) => {
    // Escape key to pause all videos
    if (e.key === 'Escape') {
        document.querySelectorAll('video').forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    }
});

/**
 * Optimize performance - reduce motion for users who prefer it
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';

    // Disable animations for users with motion sensitivity
    document.querySelectorAll('.hero-title, .hero-role, .hero-subtitle, .brand-badges').forEach(el => {
        el.style.animation = 'none';
    });
}
