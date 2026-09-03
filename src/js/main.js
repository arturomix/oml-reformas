/**
 * OML REFORMAS - Main JavaScript Controller
 */

import { initCalculator } from './calculator.js';
import { initComparison } from './comparison.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Interactive Modules
  initCalculator();
  initComparison();
  initGallery();

  // Header Scroll Blur & Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // Smooth Scroll offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animated Counter for Stats Strip
  const statsSection = document.querySelector('.stats-strip');
  let animated = false;

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  function animateStats() {
    const statCounters = document.querySelectorAll('.stat-count');
    statCounters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 1600;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !phone) {
        alert('Por favor, indica tu nombre y teléfono para poder responderte.');
        return;
      }

      // Build WhatsApp message link for immediate response
      const waMsg = `Hola Oswaldo, soy ${name}.%0A%0A` +
        `📞 *Teléfono:* ${phone}%0A` +
        `🛠️ *Interesado en:* ${service}%0A` +
        `💬 *Detalles del proyecto:*%0A${encodeURIComponent(message || 'Quisiera solicitar presupuesto sin compromiso.')}`;

      const waUrl = `https://wa.me/34611223344?text=${waMsg}`;
      window.open(waUrl, '_blank');

      // Visual Confirmation feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ ¡Mensaje generado! Abriendo WhatsApp...';
      submitBtn.style.background = 'var(--color-whatsapp)';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }
});
