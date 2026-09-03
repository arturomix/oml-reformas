---
description: Directrices de diseño y responsividad para proyectos de reformas y arquitectura (tema claro, cero emojis, anti-colisión cabecera y colapso de grillas)
always_on: true
---

# Directrices de Diseño y Responsividad para Proyectos de Reformas y Arquitectura

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
