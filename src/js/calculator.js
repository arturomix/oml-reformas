/**
 * OML REFORMAS - Calculadora Interactiva de Presupuestos Estimados
 * Genera estimaciones instantáneas realistas del mercado español de reformas
 * y construye enlaces directos de WhatsApp con el desglose listo.
 */

export function initCalculator() {
  const serviceCards = document.querySelectorAll('.service-option-card');
  const m2Slider = document.getElementById('calc-m2-slider');
  const m2Display = document.getElementById('calc-m2-val');
  const qualityPills = document.querySelectorAll('.quality-pill');
  const extrasCheckboxes = document.querySelectorAll('.extra-checkbox');
  const priceDisplay = document.getElementById('calc-price-result');
  const timeDisplay = document.getElementById('calc-time-result');
  const breakdownService = document.getElementById('breakdown-service');
  const breakdownM2 = document.getElementById('breakdown-m2');
  const breakdownQuality = document.getElementById('breakdown-quality');
  const breakdownExtras = document.getElementById('breakdown-extras');
  const waBtn = document.getElementById('btn-calc-whatsapp');

  if (!m2Slider || !priceDisplay) return;

  // State
  let currentService = 'integral';
  let currentServiceName = 'Reforma Integral';
  let currentM2 = parseInt(m2Slider.value, 10) || 75;
  let currentQuality = 'confort';
  let currentQualityName = 'Confort / Actual';
  let selectedExtras = [];

  // Price models per m2 (EUR)
  const PRICING = {
    integral: {
      standard: { min: 480, max: 590, daysPer10m2: 4 },
      confort: { min: 680, max: 820, daysPer10m2: 5 },
      premium: { min: 980, max: 1250, daysPer10m2: 6 },
      minWeeks: 4,
    },
    cocina: {
      standard: { min: 650, max: 800, flatMin: 5500 },
      confort: { min: 950, max: 1200, flatMin: 8500 },
      premium: { min: 1400, max: 1850, flatMin: 13000 },
      minWeeks: 2,
    },
    bano: {
      standard: { min: 800, max: 1050, flatMin: 3500 },
      confort: { min: 1200, max: 1550, flatMin: 5200 },
      premium: { min: 1800, max: 2400, flatMin: 7800 },
      minWeeks: 1,
    },
    suelos: {
      standard: { min: 38, max: 52 },
      confort: { min: 65, max: 85 },
      premium: { min: 110, max: 155 },
      minWeeks: 1,
    },
    albanileria: {
      standard: { min: 140, max: 190 },
      confort: { min: 230, max: 310 },
      premium: { min: 360, max: 480 },
      minWeeks: 1,
    }
  };

  const EXTRAS_COST = {
    tabiqueria: { name: 'Tabiquería / Open Concept', min: 1600, max: 2400 },
    instalaciones: { name: 'Fontanería + Electricidad completa', min: 2800, max: 4200 },
    climatizacion: { name: 'Climatización / Conductos', min: 3200, max: 4900 },
    ventanas: { name: 'Ventanas PVC Climalit', min: 2100, max: 3400 },
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function calculate() {
    const serviceData = PRICING[currentService] || PRICING.integral;
    const rate = serviceData[currentQuality] || serviceData.confort;

    let baseMin = currentM2 * rate.min;
    let baseMax = currentM2 * rate.max;

    // Apply minimum project caps for kitchens/bathrooms
    if (rate.flatMin) {
      baseMin = Math.max(baseMin, rate.flatMin);
      baseMax = Math.max(baseMax, rate.flatMin * 1.25);
    }

    // Add extras
    let extrasTotalMin = 0;
    let extrasTotalMax = 0;
    selectedExtras.forEach(key => {
      if (EXTRAS_COST[key]) {
        extrasTotalMin += EXTRAS_COST[key].min;
        extrasTotalMax += EXTRAS_COST[key].max;
      }
    });

    const totalMin = Math.round((baseMin + extrasTotalMin) / 50) * 50;
    const totalMax = Math.round((baseMax + extrasTotalMax) / 50) * 50;

    // Estimated duration
    let weeksMin = 2;
    let weeksMax = 4;
    if (currentService === 'integral') {
      weeksMin = Math.max(4, Math.round(currentM2 / 18));
      weeksMax = Math.round(weeksMin * 1.35);
    } else if (currentService === 'cocina') {
      weeksMin = 2;
      weeksMax = 3;
    } else if (currentService === 'bano') {
      weeksMin = 1;
      weeksMax = 2;
    } else {
      weeksMin = 1;
      weeksMax = 2;
    }

    // Update UI
    priceDisplay.textContent = `${formatCurrency(totalMin)} - ${formatCurrency(totalMax)}`;
    if (timeDisplay) {
      timeDisplay.textContent = `${weeksMin} a ${weeksMax} semanas aprox.`;
    }

    if (breakdownService) breakdownService.textContent = currentServiceName;
    if (breakdownM2) breakdownM2.textContent = `${currentM2} m²`;
    if (breakdownQuality) breakdownQuality.textContent = currentQualityName;
    if (breakdownExtras) {
      breakdownExtras.textContent = selectedExtras.length > 0 
        ? `${selectedExtras.length} incluido(s)` 
        : 'Ninguno';
    }

    // Build WhatsApp URL
    const extrasListText = selectedExtras.map(k => `• ${EXTRAS_COST[k].name}`).join('%0A');
    const waMessage = `Hola Oswaldo, he configurado un presupuesto en vuestra web:%0A%0A` +
      `📌 *Servicio:* ${encodeURIComponent(currentServiceName)}%0A` +
      `📐 *Superficie:* ${currentM2} m²%0A` +
      `✨ *Calidad:* ${encodeURIComponent(currentQualityName)}%0A` +
      (selectedExtras.length > 0 ? `🛠️ *Extras seleccionados:*%0A${extrasListText}%0A` : '') +
      `💶 *Rango estimado web:* ${encodeURIComponent(formatCurrency(totalMin))} a ${encodeURIComponent(formatCurrency(totalMax))}%0A%0A` +
      `Me gustaría solicitar una visita gratuita para que puedas ver el espacio y darme un presupuesto cerrado. ¿Cuándo te vendría bien?`;

    // WhatsApp phone: Default professional number or international placeholder ready
    const phoneNumber = "34611223344"; // Editable by client
    waBtn.href = `https://wa.me/${phoneNumber}?text=${waMessage}`;
  }

  // Event Listeners: Services
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentService = card.dataset.service;
      currentServiceName = card.dataset.name || card.querySelector('.service-option-name').textContent;

      // Smart default m2 depending on service
      if (currentService === 'bano') {
        if (currentM2 > 15) currentM2 = 6;
      } else if (currentService === 'cocina') {
        if (currentM2 > 25) currentM2 = 12;
      } else if (currentService === 'integral' && currentM2 < 40) {
        currentM2 = 75;
      }
      m2Slider.value = currentM2;
      m2Display.textContent = `${currentM2} m²`;

      calculate();
    });
  });

  // Event Listener: Slider
  m2Slider.addEventListener('input', (e) => {
    currentM2 = parseInt(e.target.value, 10);
    m2Display.textContent = `${currentM2} m²`;
    calculate();
  });

  // Event Listeners: Qualities
  qualityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qualityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentQuality = pill.dataset.quality;
      currentQualityName = pill.dataset.name || pill.querySelector('h4').textContent;
      calculate();
    });
  });

  // Event Listeners: Extras
  extrasCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      selectedExtras = Array.from(extrasCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      calculate();
    });
  });

  // Initialize first calculation
  calculate();
}
