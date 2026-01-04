// Forge Documentation - Minimal JavaScript for Enhanced Functionality

(function() {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (!toggle || !sidebar) return;

    function openMenu() {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          closeMenu();
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Set active navigation item based on current page
  function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || currentPath.includes(href))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initMobileMenu();
      setActiveNavItem();
      initSmoothScroll();
    });
  } else {
    initMobileMenu();
    setActiveNavItem();
    initSmoothScroll();
  }
})();

