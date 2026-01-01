// ===================================
// ACHIEVERS MIND ACADEMY - OPTIMIZED JS
// ===================================

// Enhanced GSAP configuration for maximum smoothness
gsap.registerPlugin(ScrollTrigger);

// Optimize for maximum performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
  autoSleep: 60,
  trialWake: true
});

// Set default easing for smoother animations
gsap.defaults({
  ease: "power2.out",
  duration: 0.6
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function initScrollProgress() {
  // Create scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Update progress on scroll
  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  // Throttled scroll handler for smooth performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateProgress(); // Initial call
}

// ===================================
// ENHANCED INTRO ANIMATION
// ===================================
window.addEventListener("load", () => {
  const intro = document.getElementById('intro');

  // Only run intro animation if intro element exists (only on index page)
  if (intro) {
    const introLogo = intro.querySelector('img');
    const navLogo = document.querySelector('.nav img');

    // Create skip button with delay
    setTimeout(() => {
      const skipButton = document.createElement('button');
      skipButton.className = 'skip-intro';
      skipButton.textContent = 'Skip Intro';
      intro.appendChild(skipButton);

      // Add click event to skip button
      skipButton.addEventListener('click', skipIntro);

      // Add hover effects to skip button
      skipButton.addEventListener('mouseenter', () => {
        gsap.to(skipButton, {
          scale: 1.1,
          background: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      skipButton.addEventListener('mouseleave', () => {
        gsap.to(skipButton, {
          scale: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }, 1000);

    // Skip intro functionality
    const skipIntro = () => {
      const tl = gsap.timeline();
      tl.to("#intro", {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .set("#intro", { display: "none" })
      .call(() => {
        document.body.classList.add('intro-complete');
        initMainAnimations();
      });
    };

    // Add skip functionality to intro click and skip button
    intro.addEventListener('click', skipIntro);

    // Enhanced intro screen animations with logo scaling - visible immediately
    const introTimeline = gsap.timeline({
      delay: 0.1,
      defaults: { ease: "power3.out" }
    });

    introTimeline
      .from(introLogo, {
        scale: 2,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .to(introLogo, {
        scale: 1.5,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .from("#intro h1", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .from("#intro p", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(introLogo, {
        scale: 0.1,
        x: () => {
          const logoRect = navLogo.getBoundingClientRect();
          return logoRect.left + logoRect.width/2 - window.innerWidth/2;
        },
        y: () => {
          const logoRect = navLogo.getBoundingClientRect();
          return logoRect.top + logoRect.height/2 - window.innerHeight/2;
        },
        opacity: 0,
        duration: 1.5,
        ease: "power3.in",
        delay: 1
      }, "+=0.5")
      .to("#intro", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          intro.style.display = "none";
          document.body.classList.add('intro-complete');
          initMainAnimations();
        }
      }, "-=0.2");
  } else {
    // For pages without intro, just initialize main animations
    document.body.classList.add('intro-complete');
    initMainAnimations();
  }
});

// ===================================
// ENHANCED MAIN ANIMATIONS
// ===================================
function initMainAnimations() {
  // Hero content animation with enhanced smoothness
  gsap.from(".hero-content", {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.4
  });

  // Navigation is now always visible - no initial animation needed

  // Enhanced section animations with better performance
  const sections = gsap.utils.toArray(".section");
  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      rotationX: 15,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6 + (index * 0.1),
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true,
        scrub: 1
      }
    });
  });

  // Optimized cards animation with reduced effects
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true
      }
    });
  });

  // Enhanced gallery images with staggered reveal
  const galleryImgs = gsap.utils.toArray(".gallery img");
  galleryImgs.forEach((img, index) => {
    gsap.from(img, {
      opacity: 0,
      scale: 0.8,
      rotation: 5,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.4 + (index * 0.1),
      scrollTrigger: {
        trigger: img,
        start: "top 85%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true
      }
    });
  });

  // Add smooth parallax effect to hero background
  gsap.to(".hero::before", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

// ===================================
// SMOOTH SCROLL PERFORMANCE
// ===================================
function initSmoothScroll() {
  // Simplified smooth scroll - removed momentum for better performance
  // Native browser scrolling is now used for optimal performance
}

// ===================================
// ENHANCED MICRO-INTERACTIONS
// ===================================

// Ultra-smooth button interactions with magnetic effect
document.querySelectorAll('.btn').forEach(button => {
  let hoverTimeout;
  let isPressed = false;
  
  // Enhanced hover effects
  button.addEventListener('mouseenter', function() {
    clearTimeout(hoverTimeout);
    gsap.to(this, {
      scale: 1.05,
      y: -2,
      duration: 0.3,
      ease: "power3.out"
    });
    
    // Add glow effect
    gsap.to(this, {
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  button.addEventListener('mouseleave', function() {
    hoverTimeout = setTimeout(() => {
      gsap.to(this, {
        scale: 1,
        y: 0,
        boxShadow: "var(--shadow-md)",
        duration: 0.4,
        ease: "power3.out"
      });
    }, 100);
  });

  // Enhanced press/release effects
  button.addEventListener('mousedown', function() {
    isPressed = true;
    gsap.to(this, {
      scale: 0.95,
      y: 1,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  button.addEventListener('mouseup', function() {
    if (isPressed) {
      gsap.to(this, {
        scale: 1.05,
        y: -2,
        duration: 0.15,
        ease: "back.out(1.7)"
      });
      isPressed = false;
    }
  });

  // Touch-friendly interactions
  button.addEventListener('touchstart', function() {
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  button.addEventListener('touchend', function() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.2,
      ease: "back.out(1.7)"
    });
  });
});


// Enhanced card interactions with 3D effects
document.querySelectorAll('.card').forEach(card => {
  let hoverTimeout;
  let isHovered = false;
  
  card.addEventListener('mouseenter', function() {
    clearTimeout(hoverTimeout);
    isHovered = true;
    
    // Enhanced 3D hover effect
    gsap.to(this, {
      y: -8,
      scale: 1.02,
      rotationY: 2,
      rotationX: 5,
      duration: 0.4,
      ease: "power3.out"
    });
    
    // Enhanced glow and backdrop effects
    gsap.to(this, {
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.3)",
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Subtle content animation
    const cardContent = this.querySelector('h3, p');
    if (cardContent) {
      gsap.to(cardContent, {
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });

  card.addEventListener('mouseleave', function() {
    hoverTimeout = setTimeout(() => {
      if (!isHovered) {
        gsap.to(this, {
          y: 0,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          boxShadow: "var(--glass-shadow)",
          duration: 0.5,
          ease: "power3.out"
        });
        
        // Reset content
        const cardContent = this.querySelector('h3, p');
        if (cardContent) {
          gsap.to(cardContent, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
    }, 150);
    isHovered = false;
  });

  card.addEventListener('mousedown', function() {
    gsap.to(this, {
      scale: 0.98,
      rotationX: 2,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  card.addEventListener('mouseup', function() {
    gsap.to(this, {
      scale: 1.02,
      rotationX: 5,
      duration: 0.2,
      ease: "back.out(1.7)"
    });
  });
});


// ===================================
// OPTIMIZED NAVBAR SCROLL EFFECTS
// ===================================
function initNavbarScroll() {
  const nav = document.querySelector('.nav');
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  function updateNavbar() {
    const scrolled = window.pageYOffset;

    // Simplified background change
    if (scrolled > 50) {
      nav.style.background = 'rgba(0, 0, 0, 0.2)';
      nav.style.backdropFilter = 'blur(30px)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.05)';
      nav.style.backdropFilter = 'blur(20px)';
    }

    // Simplified hide/show logic
    if (scrolled > lastScrollY && scrolled > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    // Add shadow
    if (scrolled > 10) {
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScrollY = scrolled;
    ticking = false;
  }

  // Single optimized scroll handler
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}


// ===================================
// ENHANCED FORM INTERACTIONS
// ===================================

// Ultra-smooth form field interactions
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
  let focusTimeout;
  
  input.addEventListener('focus', function() {
    clearTimeout(focusTimeout);
    
    // Enhanced focus animation
    gsap.to(this, {
      scale: 1.02,
      y: -2,
      duration: 0.3,
      ease: "power3.out"
    });
    
    // Add glow effect
    gsap.to(this, {
      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
      borderColor: "#3b82f6",
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Animate placeholder
    const placeholder = this.placeholder;
    if (placeholder) {
      gsap.to(this, {
        "--placeholder-opacity": 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });

  input.addEventListener('blur', function() {
    focusTimeout = setTimeout(() => {
      gsap.to(this, {
        scale: 1,
        y: 0,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.4,
        ease: "power3.out"
      });
      
      // Reset placeholder
      gsap.to(this, {
        "--placeholder-opacity": 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }, 100);
  });

  input.addEventListener('input', function() {
    // Subtle input animation
    gsap.to(this, {
      scale: 1.01,
      duration: 0.2,
      ease: "power2.out"
    });
    
    gsap.to(this, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
      delay: 0.1
    });
  });
});


// Enhanced form submission with smooth animations
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const formFields = this.querySelectorAll('input, textarea, select');
    
    // Animate form submission process
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        // Show loading state with smooth transition
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        gsap.to(submitBtn, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    });
    
    // Disable form fields with animation
    formFields.forEach(field => {
      gsap.to(field, {
        opacity: 0.6,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    submitBtn.disabled = true;
    
    // Simulate form submission with enhanced feedback
    setTimeout(() => {
      // Success animation
      gsap.to(submitBtn, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
        onComplete: () => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          gsap.to(submitBtn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      
      // Animate form reset
      setTimeout(() => {
        gsap.to(formFields, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1
        });
        
        gsap.to(submitBtn, {
          scale: 0.9,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            gsap.to(submitBtn, {
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
            this.reset();
          }
        });
      }, 2000);
    }, 1500);
  });
}


// ===================================
// OPTIMIZED GALLERY
// ===================================

// Ultra-smooth gallery lightbox with enhanced interactions
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', function() {
    // Create enhanced lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'enhanced-lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
      opacity: 0;
      backdrop-filter: blur(10px);
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
    lightboxImg.style.cssText = `
      max-width: 85%;
      max-height: 85%;
      object-fit: contain;
      border-radius: 15px;
      transform: scale(0.5) rotate(-5deg);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      filter: brightness(1.1) contrast(1.1);
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
      position: absolute;
      top: 30px;
      right: 30px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      font-size: 24px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      opacity: 0;
      transform: scale(0.8);
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Enhanced entrance animation
    gsap.to(lightbox, { 
      opacity: 1, 
      duration: 0.4, 
      ease: "power3.out"
    });
    
    gsap.to(lightboxImg, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.1
    });
    
    gsap.to(closeBtn, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      delay: 0.3
    });
    
    // Enhanced interactions
    let isClosing = false;
    
    const closeLightbox = () => {
      if (isClosing) return;
      isClosing = true;
      
      gsap.to([lightboxImg, closeBtn], {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      
      gsap.to(lightbox, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        delay: 0.2,
        onComplete: () => {
          document.body.removeChild(lightbox);
        }
      });
    };
    
    // Enhanced close interactions
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
    
    lightbox.addEventListener('click', closeLightbox);
    
    // Keyboard navigation
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // Add hover effects to close button
    closeBtn.addEventListener('mouseenter', () => {
      gsap.to(closeBtn, {
        scale: 1.1,
        background: 'rgba(255, 255, 255, 0.2)',
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      gsap.to(closeBtn, {
        scale: 1,
        background: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});


// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Intersection Observer for efficient animations
const observerOptions = {
  root: null,
  rootMargin: '-10% 0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .section, .gallery img').forEach(el => {
  animationObserver.observe(el);
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Focus management for accessibility
document.querySelectorAll('.btn, .card, input, textarea, select').forEach(element => {
  element.addEventListener('focus', function() {
    this.style.outline = '2px solid #3b82f6';
    this.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', function() {
    this.style.outline = '';
    this.style.outlineOffset = '';
  });
});

// ===================================
// INITIALIZATION
// ===================================

// ===================================
// ENHANCED INITIALIZATION
// ===================================

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class for CSS transitions
  document.body.classList.add('loaded');
  
  // Initialize all features
  initScrollProgress();
  initSmoothScroll();
  initNavbarScroll();
  
  // Refresh ScrollTrigger for optimal performance
  ScrollTrigger.refresh();
  
  // Enhanced entrance animation for body
  gsap.from('body', {
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
  
  // Removed floating and rotating animations as requested
  
  // Initialize smooth page transitions
  initSmoothPageTransitions();
});

// Enhanced smooth page transitions
function initSmoothPageTransitions() {
  // Simplified navigation - remove complex overlay to fix glitching
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if it's a different page
      if (this.href !== window.location.href) {
        // Simple navigation without overlay animation
        window.location.href = this.href;
      }
    });
  });
}

// Enhanced scroll-based animations
function initScrollAnimations() {
  // Parallax effect for sections
  gsap.utils.toArray('.section').forEach((section, index) => {
    const bg = section.querySelector('::before') || section;
    
    gsap.to(bg, {
      yPercent: -30 * (index % 2 === 0 ? 1 : -1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
  
  // Smooth reveal for statistics
  gsap.utils.toArray('.section').forEach(section => {
    const stats = section.querySelectorAll('[style*="font-size: 3rem"]');
    
    stats.forEach((stat, index) => {
      gsap.from(stat, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.2
      });
    });
  });
}


// Handle window resize efficiently
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Performance monitoring
function logPerformance() {
  if (window.performance) {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
}

// Call performance logging after load
window.addEventListener('load', logPerformance);

// ===================================
// ENHANCED FEATURES
// ===================================

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(addRippleEffect);

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ===================================
// FINAL OPTIMIZATIONS
// ===================================

// Enable hardware acceleration
document.documentElement.style.setProperty('transform', 'translateZ(0)');

// Optimize scroll performance
window.addEventListener('scroll', () => {
  // Use passive listeners for better scroll performance
}, { passive: true });

// Preload critical resources
const preloadLinks = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
});


// Optimized main animations with 60fps performance
function initMainAnimations() {
  // Hero content with hardware acceleration
  gsap.from(".hero-content", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
    force3D: true
  });

  // Optimized section animations
  const sections = gsap.utils.toArray(".section");
  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true
      }
    });
  });

  // Smooth card animations
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      delay: index * 0.05,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true
      }
    });
  });

  // Gallery images with staggered animation
  const galleryImgs = gsap.utils.toArray(".gallery img");
  galleryImgs.forEach((img, index) => {
    gsap.from(img, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: index * 0.08,
      scrollTrigger: {
        trigger: img,
        start: "top 85%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true
      }
    });
  });

  // Smooth parallax for hero
  gsap.to(".hero::before", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
}