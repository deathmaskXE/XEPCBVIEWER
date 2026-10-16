# XE TECH VIEWER — Integración inicial

Proyecto independiente creado a partir del XE Game Viewer con la interfaz de acceso y biblioteca inspirada en XE Delivery. No modifica XE Delivery ni migra sus datos automáticamente.

## Iniciar

1. Ejecuta `npm install` y `npm run dev`.
2. Copia `.env.example` a `.env` e introduce las credenciales web de tu proyecto Firebase (no introduzcas claves privadas de servidor).
3. Habilita Email/Password en Firebase Authentication.
4. Crea un usuario administrador en Authentication y crea manualmente en Firestore `techUsers/<UID>` con `role: "admin"`.
5. Para un usuario normal crea `techUsers/<UID>` con `role: "user"`, `status: "active"`, `expiresAt: Timestamp` con fecha futura.
6. Agrega `techCatalog` mediante el panel Administrar (solo administradores).
7. Integra las reglas `firestore.techviewer.rules` a tus reglas actuales con cuidado. NO reemplaces directamente las reglas de otro sistema Firebase: este archivo está aislado y niega acceso a otras colecciones.
8. Configura el `base` de Vite para el repositorio donde publiques GitHub Pages.

## Alcance y limitaciones

- El visor original está integrado como componente React completo, no como iframe.
- El catálogo guarda enlaces públicos a archivos en GitHub. Abrir archivo actualmente abre el enlace en otra pestaña; todavía no importa automáticamente ese enlace al visor. Los archivos locales se pueden abrir con las herramientas originales.
- Las cuentas se crean en Firebase Authentication y sus vigencias se asignan manualmente en Firestore. Aún no hay editor de usuarios, pagos automáticos ni integración con pasarelas.
- Las reglas de ejemplo prohíben modificar perfiles desde el cliente, incluido el administrador; edita licencias con Firebase Console o desarrolla una Cloud Function administrativa autenticada.
- Los BoardViews en GitHub Pages son públicos y se pueden extraer incluso si se ocultan botones o se desactiva el clic derecho.
- La lectura de capas conserva las capacidades del ZIP de XE Game Viewer utilizado como base.
- No se ha ejecutado una compilación ni pruebas de navegador en este entorno; valida antes de publicar.
