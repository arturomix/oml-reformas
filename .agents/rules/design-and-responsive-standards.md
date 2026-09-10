---
description: Directrices de diseño, responsividad, conversión (FAQ/RGPD), rendimiento Web Vitals y despliegue para OML Reformas
always_on: true
---

# Directrices de Diseño, Responsividad, Conversión y Despliegue para OML Reformas

## 1. Iconografía y Estética Visual
- **Prohibido el uso de Emojis:** En servicios, calculadoras, sellos de confianza o titulares, usar exclusivamente iconos SVG vectoriales minimalistas y técnicos con trazo arquitectónico.
- **Tema Claro por Defecto:** Utilizar bases luminosas (blancos puros `#ffffff`, porcelana `#f8fafc`, greige cálido `#f0f4f7`) donde el color primario corporativo (ej. Pantone 3035C `#003D4D`) ejerza de contraste principal.
- **Homogeneidad Total:** Todas las secciones (incluidos modales, calculadoras y pie de página) deben respetar la paleta clara sin secciones oscuras no justificadas.

## 2. Cabeceras y Navegación Responsive
- **Anti-Solapamiento en Escritorio:** Usar siempre `white-space: nowrap` y `flex-shrink: 0` en logotipo, teléfono y botones de acción.
- **Comportamiento en Móvil (< 768px):**
  - Ocultar botones de texto extenso en la barra superior fija.
  - La cabecera móvil solo debe contener: Logotipo/Marca + Botón directo de llamada (icono o píldora) + Menú Hamburguesa.
  - El menú hamburguesa debe tener prioridad visual absoluta y nunca ser desplazado fuera de la pantalla.

## 3. Grillas, Formularios y Calculadoras
- **Colapso de Columnas:** Las opciones múltiples (ej. niveles de acabado, servicios secundarios) deben pasar de 3 columnas a 1 columna vertical en dispositivos móviles (< 768px).
- **Controles de Rango / Sliders:** Todo slider interactivo debe estar contenido en bloques con `width: 100%` y `overflow: hidden` para evitar barras de desplazamiento secundarias.
- **Sliders Antes / Después:** Las etiquetas ("Antes" / "Después") deben situarse en esquinas fijas superiores (ej. `top: 1rem`) para evitar choques con el tirador deslizante central.

## 4. Estándares de Conversión y Confianza
- **Preguntas Frecuentes (FAQ):** Mantener una sección de FAQ interactiva previa al contacto para despejar objeciones de compra (presupuesto cerrado por contrato, licencias, pagos por hitos verificables, 2 años de garantía legal y limpieza diaria de zonas comunes).
- **Cumplimiento RGPD:** Todo formulario de solicitud debe requerir una casilla de aceptación de privacidad explícita (`required`) conectada a un modal legal claro y accesible sin salir de la página.

## 5. Rendimiento (Core Web Vitals) y Social Sharing
- **Carga de Fuentes:** Nunca utilizar `@import` de Google Fonts en hojas CSS (genera cadena de bloqueo). Usar siempre `<link rel="preconnect">` y `<link rel="stylesheet">` en el `<head>`.
- **Optimización de Imágenes:** Atributo `fetchpriority="high"` en la imagen principal del Hero. Atributos `loading="lazy"` y `decoding="async"` con dimensiones explícitas en comparadores y galerías para evitar saltos acumulativos (CLS).
- **Tarjetas para WhatsApp (Open Graph):** Utilizar siempre rutas absolutas para `og:image` (formato 1200x630 px) para asegurar que el cliente vea la tarjeta con foto al recibir el enlace por mensajería.

## 6. Flujo de Despliegue y Publicación
- **Flujo CI/CD Automatizado:** La publicación en producción se realiza mediante `git push origin main`. Vercel está vinculado al repositorio y despliega automáticamente los cambios en el dominio público en cuestión de segundos.
