/**
 * Marie Martin - Vinyl Style Audio Player
 * Jazz Landing Page with Curriculum Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════════
    // LESSON DATA - Rich content for curriculum modals
    // ═══════════════════════════════════════════════════════════════
    const lessonData = {
        1: {
            title: "Roots & Spirituals",
            subtitle: "The Soul of American Music",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            overview: "Journey back to the origins of jazz and discover how African musical traditions, spirituals, and work songs laid the foundation for America's most distinctive art form.",
            topics: [
                "African musical traditions and their journey to America",
                "The power of spirituals and their dual meaning",
                "Work songs and field hollers as expression",
                "Call-and-response: The conversation of music",
                "Rhythm patterns that shaped jazz"
            ],
            keyFigures: "Mahalia Jackson, Bessie Smith, Lead Belly",
            activity: "Students will create their own call-and-response composition using classroom instruments and voice.",
            listen: "Deep River, Go Down Moses, Wade in the Water"
        },
        2: {
            title: "Birth of Jazz",
            subtitle: "New Orleans: The Cradle of Jazz",
            image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
            overview: "Explore how the unique cultural melting pot of New Orleans gave birth to jazz in the early 1900s, blending ragtime, blues, and brass band traditions.",
            topics: [
                "New Orleans as a cultural crossroads",
                "Storyville and the birth of jazz clubs",
                "Ragtime's influence on early jazz",
                "The brass band tradition",
                "Early recording technology and its impact"
            ],
            keyFigures: "Louis Armstrong, Jelly Roll Morton, King Oliver, Sidney Bechet",
            activity: "Analyze the structure of a classic New Orleans jazz piece and identify improvisation sections.",
            listen: "West End Blues, Black Bottom Stomp, Tiger Rag"
        },
        3: {
            title: "Swing Era",
            subtitle: "When America Danced",
            image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
            overview: "The 1930s and 40s brought the Swing Era—big bands filled ballrooms across America, and jazz became the popular music of an entire generation.",
            topics: [
                "Rise of the big band sound",
                "The role of arrangers in swing",
                "Dance halls and the swing craze",
                "Radio's impact on jazz popularity",
                "The Cotton Club and Harlem Renaissance"
            ],
            keyFigures: "Duke Ellington, Count Basie, Benny Goodman, Ella Fitzgerald",
            activity: "Learn basic swing dance steps while listening to big band recordings.",
            listen: "Take the 'A' Train, Sing Sing Sing, In the Mood"
        },
        4: {
            title: "Bebop Revolution",
            subtitle: "Jazz Gets Complex",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
            overview: "In the 1940s, young musicians rebelled against swing's commercial sound, creating bebop—fast, complex, and designed for listening, not dancing.",
            topics: [
                "Why musicians wanted change",
                "Complex harmonies and rapid tempos",
                "The art of improvisation elevated",
                "Small combos vs. big bands",
                "Jazz as an art form, not entertainment"
            ],
            keyFigures: "Charlie Parker, Dizzy Gillespie, Thelonious Monk, Bud Powell",
            activity: "Transcribe a short bebop melody and discuss its technical challenges.",
            listen: "Ko-Ko, A Night in Tunisia, Round Midnight"
        },
        5: {
            title: "Cool Jazz",
            subtitle: "West Coast Breeze",
            image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&q=80",
            overview: "As a response to bebop's intensity, Cool Jazz emerged with a more relaxed, lyrical approach—especially popular on the West Coast.",
            topics: [
                "Reaction to bebop's complexity",
                "Softer tones and slower tempos",
                "West Coast vs. East Coast styles",
                "Modal jazz innovations",
                "The concept album emerges"
            ],
            keyFigures: "Miles Davis, Chet Baker, Dave Brubeck, Stan Getz",
            activity: "Compare and contrast a bebop and cool jazz recording of the same standard.",
            listen: "Birth of the Cool, My Funny Valentine, Take Five"
        },
        6: {
            title: "Free Jazz & Fusion",
            subtitle: "Breaking All the Rules",
            image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80",
            overview: "The 1960s and 70s saw jazz explode in new directions—Free Jazz abandoned traditional structures while Fusion married jazz with rock and funk.",
            topics: [
                "Free Jazz: Music without boundaries",
                "The avant-garde movement",
                "Jazz meets rock and roll",
                "Electric instruments enter jazz",
                "World music influences"
            ],
            keyFigures: "John Coltrane, Ornette Coleman, Herbie Hancock, Weather Report",
            activity: "Free improvisation exercise: Create music together without predetermined rules.",
            listen: "A Love Supreme, Free Jazz, Chameleon"
        },
        7: {
            title: "Contemporary Jazz",
            subtitle: "Jazz Today & Tomorrow",
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
            overview: "Modern jazz artists honor tradition while pushing boundaries, incorporating hip-hop, electronic music, and global influences into the art form.",
            topics: [
                "Neo-traditionalism and jazz preservation",
                "Jazz education in America",
                "Hip-hop and jazz connections",
                "Global jazz scenes",
                "Women in contemporary jazz"
            ],
            keyFigures: "Wynton Marsalis, Diana Krall, Kamasi Washington, Esperanza Spalding, Marie Martin",
            activity: "Research and present on a contemporary jazz artist of your choice.",
            listen: "Black Codes, The Epic, Emily's D+Evolution"
        },
        8: {
            title: "Capstone Project",
            subtitle: "Your Jazz Journey",
            image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
            overview: "Bring together everything you've learned in a creative final project that demonstrates your understanding of jazz history and its cultural significance.",
            topics: [
                "Project options and requirements",
                "Research and presentation skills",
                "Creative expression through jazz",
                "Peer feedback and collaboration",
                "Celebration of learning"
            ],
            keyFigures: "You! And the artists who inspire you.",
            activity: "Complete your capstone: performance, research paper, multimedia presentation, or original composition.",
            listen: "Student choice—build your personal jazz playlist"
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // MODAL FUNCTIONALITY
    // ═══════════════════════════════════════════════════════════════
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const lessonCards = document.querySelectorAll('.lesson-card[data-lesson]');

    // Populate modal with lesson data
    const populateModal = (lessonNum) => {
        const lesson = lessonData[lessonNum];
        if (!lesson) return;

        // Update modal content
        document.querySelector('.modal-image').src = lesson.image;
        document.querySelector('.modal-image').alt = lesson.title;
        document.querySelector('.modal-week').textContent = `Week ${lessonNum}`;
        document.querySelector('.modal-title').textContent = lesson.title;
        document.querySelector('.modal-subtitle').textContent = lesson.subtitle;
        document.querySelector('.modal-overview').textContent = lesson.overview;

        // Populate topics list
        const topicsList = document.querySelector('.modal-topics');
        topicsList.innerHTML = lesson.topics.map(topic => `<li>${topic}</li>`).join('');

        // Populate details
        document.querySelector('.detail-figures').textContent = lesson.keyFigures;
        document.querySelector('.detail-activity').textContent = lesson.activity;
        document.querySelector('.detail-listen').textContent = lesson.listen;
    };

    // Open modal
    const openModal = (lessonNum) => {
        populateModal(lessonNum);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap for accessibility
        setTimeout(() => modalClose.focus(), 100);
    };

    // Close modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners for lesson cards
    lessonCards.forEach(card => {
        card.addEventListener('click', () => {
            const lessonNum = card.getAttribute('data-lesson');
            openModal(lessonNum);
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const lessonNum = card.getAttribute('data-lesson');
                openModal(lessonNum);
            }
        });
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // ═══════════════════════════════════════════════════════════════
    // AUDIO PLAYER
    // ═══════════════════════════════════════════════════════════════
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
