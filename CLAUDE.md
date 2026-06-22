# Bahía Paraíso — Landing Page + Backend

## Qué es este proyecto
Landing page para vender terrenos en Bahía Paraíso, San Vicente, Bahía de Banderas, Nayarit.
El objetivo es capturar leads calificados y enviarlos al vendedor por WhatsApp.
Ya existe un diseño HTML completo en `frontend/index.html` — NO modificar el diseño, solo construir el backend.

## Stack
- Frontend: HTML + CSS + JavaScript vanilla (ya está listo, no tocar)
- Backend: Node.js + Express
- Base de datos: SQLite (simple, sin configuración)
- Deploy: Netlify (frontend) + Railway o Render (backend)

## Estructura de archivos
```
bahia-paraiso/
├── CLAUDE.md
├── frontend/
│   └── index.html          ← landing page completa (ya existe, no modificar diseño)
│   └── TERRENOS.png        ← foto aérea del terreno (si se separa del HTML)
├── backend/
│   ├── server.js           ← API Express
│   ├── database.js         ← conexión SQLite
│   └── leads.db            ← se genera automático
└── admin/
    └── index.html          ← panel para ver leads
```

## Información del desarrollo
- Nombre: Bahía Paraíso
- Ubicación: San Vicente, Bahía de Banderas, Nayarit
- Medidas: 7 × 16 metros = 112 m² por lote
- Precio lote regular: $6,500 MXN por m² = $728,000 total
- Precio lote esquina: $7,000 MXN por m² = $784,000 total
- Apartado: $5,000 MXN
- Mensualidad desde: $6,933 MXN
- Sin enganche
- Descuento contado: 20% (lote regular queda en $582,400 MXN)
- Servicios (luz, agua, drenaje): disponibles en aprox. 2 años
- Construcción permitida: al completar 8 mensualidades consecutivas
- Escrituración: proceso escriturable, aprox. 3 años
- Proceso escritura pagado por el titular, no por el comprador

## Diseño (ya implementado — NO cambiar)
- Colores: azul dominante (#2A7FBF), dorado (#C8941A), naranja CTAs (#D4580A), crema/blanco fondo
- Tipografía: DM Serif Display (titulares) + DM Sans (cuerpo)
- Psicología: orientado a clase trabajadora, genera confianza, precio visible, transparencia total
- Mobile first, responsive

## Secciones de la landing (en orden)
1. Hero — foto de fondo + BAHÍA PARAÍSO grande + precio desde $6,933 + aparta con $5,000
2. Por qué actuar hoy — 4 cards con beneficios
3. Por qué Bahía Paraíso — 4 razones numeradas
4. Foto aérea del terreno — imagen con overlay de ubicación
5. Ficha técnica — specs + precio sticky con apartado y descuento contado
6. Descuento contado — banner 20% de descuento
7. Proceso escriturable — 5 pasos + nota de tiempos
8. 3 pasos para comprar — aparta $5,000 → firma → construye
9. Formulario de calificación — 3 preguntas
10. FAQ — 6 preguntas frecuentes con acordeón
11. CTA final — urgencia + botón WhatsApp grande

## Formulario — 3 preguntas
- ¿Cuánto puedes pagar al mes? (opciones de rango)
- ¿Para qué quieres el terreno? (construir, invertir, rentar, no sé)
- ¿Cuándo quieres comprarlo? (este mes, 3 meses, este año, solo viendo)

## Lo que hace el formulario
1. Guarda el lead en SQLite con timestamp y las 3 respuestas
2. Abre WhatsApp del prospecto con mensaje pre-armado que incluye sus respuestas
3. Notifica al vendedor (webhook WhatsApp o email)

## Variables de entorno (.env)
```
WHATSAPP_NUMBER=523222380588   ← número del vendedor (cambiar)
ADMIN_PASSWORD=bahiaparaiso2025
PORT=3000
```

## Panel Admin (/admin)
- Protegido con contraseña simple
- Tabla de todos los leads con: fecha, mensualidad, uso, plazo, estado
- Botones para marcar lead como: Contactado / Cerrado / Descartado
- Contador de leads del día / semana / mes

## Notificación al vendedor
Cuando llega un lead, enviar mensaje a WhatsApp del vendedor con:
- Fecha y hora
- Mensualidad que puede pagar
- Para qué quiere el terreno
- Cuándo quiere comprar

## Reglas de desarrollo
- NO modificar el diseño HTML existente
- No usar frameworks innecesarios (no React, no Vue)
- No explicar el código a menos que se pida
- Código comentado solo en partes complejas
- Siempre mobile first
- Usar /compact frecuentemente para ahorrar tokens

## Comandos
```bash
npm install
node backend/server.js
# Frontend: abrir frontend/index.html en navegador
# Admin: http://localhost:3000/admin
```

## Próximas fases (no construir aún)
- Visor 3D del terreno con modelo fotogramétrico de dron
- Múltiples terrenos con template dinámico por URL
- Agente AI en WhatsApp entrenado con info del desarrollo
- CRM básico integrado
