// Scroll Reveal Animation Script
document.addEventListener('DOMContentLoaded', function() {
  // Create the animate-fade-in keyframes if not already present
  if (!document.querySelector('style[data-scroll-reveal]')) {
    const style = document.createElement('style');
    style.setAttribute('data-scroll-reveal', '');
    style.textContent = `
      .animate-fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // Scroll reveal functionality
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on element index for staggered animation
        const delay = index * 0.15;
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in');
        }, delay * 1000);

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-reveal class
  const elements = document.querySelectorAll('.scroll-reveal');
  elements.forEach((element, index) => {
    observer.observe(element);
  });
});