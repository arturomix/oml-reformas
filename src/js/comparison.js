/**
 * OML REFORMAS - Comparador Interactivo Antes / Después
 * Soporte fluido para mouse, touch y teclado con indicador iluminado
 */

export function initComparison() {
  const container = document.getElementById('comparison-slider-box');
  if (!container) return;

  const beforeWrap = container.querySelector('.image-before-wrap');
  const beforeImg = beforeWrap ? beforeWrap.querySelector('img') : null;
  const handle = container.querySelector('.slider-handle');

  if (!beforeWrap || !beforeImg || !handle) return;

  let isDragging = false;

  function syncImageWidth() {
    const width = container.offsetWidth;
    beforeImg.style.width = `${width}px`;
  }

  function setPosition(xPos) {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;

    // Constrain within bounds (5% to 95%)
    const minX = rect.width * 0.05;
    const maxX = rect.width * 0.95;
    offsetX = Math.max(minX, Math.min(maxX, offsetX));

    const percentage = (offsetX / rect.width) * 100;
    beforeWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Pointer Events
  function onPointerDown(e) {
    isDragging = true;
    container.classList.add('is-dragging');
    setPosition(e.clientX);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    setPosition(e.clientX);
  }

  function onPointerUp() {
    isDragging = false;
    container.classList.remove('is-dragging');
  }

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Keyboard navigation
  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'slider');
  container.setAttribute('aria-label', 'Comparador interactivo antes y después');
  container.addEventListener('keydown', (e) => {
    const currentPercent = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft') {
      const newPercent = Math.max(5, currentPercent - 5);
      beforeWrap.style.width = `${newPercent}%`;
      handle.style.left = `${newPercent}%`;
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      const newPercent = Math.min(95, currentPercent + 5);
      beforeWrap.style.width = `${newPercent}%`;
      handle.style.left = `${newPercent}%`;
      e.preventDefault();
    }
  });

  // Resize listener
  window.addEventListener('resize', syncImageWidth);
  syncImageWidth();
}
