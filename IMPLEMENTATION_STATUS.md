# Estado de implementación

Última auditoría: 18 de julio de 2026. Dependencias reinstaladas, imports validados mediante compilación Vite y build de producción exitoso. Las páginas usan carga diferida para reducir el paquete inicial. No hay configuración ESLint en esta versión; por ello no se afirma una validación ESLint.

## Reales y conectadas a Firebase

- Proyecto React/Vite modular, HashRouter y base configurable para GitHub Pages.
- Identidad visual aqua, blanco y plata; logo e icono SVG propios; diseño móvil/escritorio.
- Configuración Firebase por variables de entorno y modo demo aislado.
- Autenticación por correo/contraseña, escucha de sesión y carga de `users/{uid}`.
- Registro real: crea Firebase Auth, `users/{uid}` pendiente y `couriers/{uid}` para verificación manual.
- Guards separados: `ProtectedRoute`, `AdminRoute`, `CourierRoute` y `LicenseGuard`.
- Panel admin con consulta de couriers, aprobación, prueba de 24 horas o licencia de seis meses y auditoría.
- Licencias observadas desde Firestore, contador por timestamp y bloqueo al vencer.
- Rotación revocable de rutas con token criptográfico, lote atómico y auditoría.
- CRUD inicial de clientes y pedidos con `courierId`; consultas privadas filtradas por UID.
- Creación de historial inmutable al crear y cambiar estados de pedido.
- Seguimiento público real lee únicamente `publicTracking/{trackingToken}`.
- Cálculo real de reputación desde ratings y estadísticas diarias desde pedidos cargados.
- Contador regresivo basado en `expiresAt`, actualizado cada segundo.
- Máquina central de transiciones de pedido y etiquetas en español.
- Enlaces WhatsApp con mensaje y seguimiento; PDF diario local con datos seleccionados.
- Reglas Firestore con denegación por defecto, propiedad `courierId`, historial inmutable y colecciones sensibles cerradas.
- Índices, configuración Firebase/GitHub Pages, `.env.example` y documentación.

## Reales, pero parciales

- Panel administrativo: aprobación/licencias sí están conectadas; suspensión, desbloqueo, resolución de quejas y reapertura aún no tienen formularios completos.
- Geolocalización y mapa Leaflet: dependencias preparadas; falta el ciclo `watchPosition` y escritura con limitación de frecuencia.
- Gráficas: dependencias instaladas; el rendimiento actual usa barras CSS y datos demo.
- Registro crea los tres recursos necesarios, pero si Firestore falla después de Auth requiere una Cloud Function o flujo compensatorio para evitar usuarios incompletos.
- PDF: genera resumen y tabla multipágina; falta captura de gráfica, encabezado repetido y paginado de calidad final.
- Clientes y pedidos tienen lectura/creación real. Quejas, calificación mutua, logros y récords no tienen CRUD público seguro completo.

## Solo demostración actualmente

- Los datos visibles al iniciar sin variables Firebase (`demoOrders`, courier y métricas iniciales).
- La aprobación administrativa en modo demo no escribe datos y lo indica en pantalla.
- El tracking `demo-128` y la ruta `demo-access` son ejemplos locales explícitos.
- Detalle de pedido y rendimiento usan todavía el conjunto demo; deben conectarse a sus consultas específicas.

## Requiere Cloud Functions / backend seguro

- Proyección y sincronización de `publicTracking`.
- Confirmación pública, quejas y calificaciones sin abrir escrituras inseguras de Firestore.
- Confirmación automática exacta a una hora.
- Rotación atómica de rutas revocables y consecutivos de pedido.
- Acciones administrativas auditadas, reapertura, archivado final y agregados de reputación.
- Tareas programadas y endpoints protegidos con App Check/limitación de abuso.

## Configuración manual

- Crear proyecto/app Firebase, activar Email/Password y Firestore.
- Cargar variables `.env`, publicar reglas e índices y crear el usuario admin según README.
- Implementar/desplegar Functions antes de habilitar funciones públicas reales.
- Definir `VITE_BASE_PATH` y publicar la rama `gh-pages`.

## Riesgos pendientes

- No habilitar escrituras públicas directas: deben pasar por Functions validadas.
- El rol en documento funciona para reglas, pero las operaciones privilegiadas deberían reforzarse con custom claims.
- Las reglas deben probarse con Firebase Emulator y dos UIDs antes de producción.
- Las estadísticas del cliente no deben poder escribirse directamente por un courier; deben derivarse en backend.
- La interfaz demo no prueba seguridad real ni persistencia.

Esta entrega no afirma que las funciones parciales sean operativas. El modo demo sirve para evaluar navegación y diseño sin escribir en Firebase.
