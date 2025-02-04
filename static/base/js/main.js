document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    /* --------------------------------------------------------------------------
       Scroll Top Button
    -------------------------------------------------------------------------- */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      // Al hacer clic, se desplaza la página hacia arriba suavemente
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      // Función que muestra/oculta el botón según la posición del scroll
      const toggleScrollTop = () => {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      };
      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }
  
    /* --------------------------------------------------------------------------
       Preloader Removal
    -------------------------------------------------------------------------- */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /* --------------------------------------------------------------------------
       Toggle "scrolled" Class on Body (para cambiar el header al hacer scroll)
    -------------------------------------------------------------------------- */
    const bodyEl = document.querySelector('body');
    const headerEl = document.querySelector('#header');
    function toggleScrolled() {
      // Si el header tiene la clase 'fixed-top' (o sticky), se aplica la lógica
      if (headerEl && headerEl.classList.contains('fixed-top')) {
        window.scrollY > 100 ? bodyEl.classList.add('scrolled') : bodyEl.classList.remove('scrolled');
      }
    }
    window.addEventListener('load', toggleScrolled);
    document.addEventListener('scroll', toggleScrolled);
  
    /* --------------------------------------------------------------------------
       Mobile Navigation Toggle
    -------------------------------------------------------------------------- */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-active');
      });
    }
  
    // Cierra el menú móvil al hacer clic fuera de él
    function isInsideNavMenu(element) {
      const navmenu = document.querySelector('#navmenu');
      return navmenu && (navmenu.contains(element) || element === mobileNavToggleBtn);
    }
    document.addEventListener('click', (event) => {
      if (!isInsideNavMenu(event.target) && document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
      }
    });
  
    // Oculta el menú móvil al hacer clic en cualquier enlace del nav
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
        }
      });
    });

    
    /* --------------------------------------------------------------------------
       Corrección del scroll para URLs con hash al cargar la página
    -------------------------------------------------------------------------- */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
          setTimeout(() => {
            const scrollMarginTop = parseInt(getComputedStyle(targetSection).scrollMarginTop) || 0;
            window.scrollTo({
              top: targetSection.offsetTop - scrollMarginTop,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });
  
    /* --------------------------------------------------------------------------
       Inicialización de AOS (Animation On Scroll)
    -------------------------------------------------------------------------- */
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });
  