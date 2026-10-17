# XEPCB VIEWER — Pantalla premium de pagos

- Al terminar la prueba se muestran dos tarjetas de planes: 6 meses (350 MXN/25 USD) y 12 meses (650 MXN/40 USD).
- Los métodos disponibles aparecen como botones con identificadores visuales de SPEI, PayPal, Revolut y Binance Pay; la selección depende del país.
- Los usuarios en prueba activa tienen un botón «Suscripciones» que abre el formulario sin abandonar la biblioteca.
- El flujo de comprobante sigue usando la solicitud Firestore y el WhatsApp existentes. La aprobación de pagos es manual.
- Se mantienen los cambios de cursor y panel de cuentas de la versión BETA anterior.

## Publicación
1. Respalda la versión actual de GitHub.
2. Sustituye los archivos de la app con los contenidos del ZIP.
3. Conserva la configuración VITE_FIREBASE_* de GitHub Actions.
4. Revisa las reglas publicadas de Firebase para planes de 6/12 meses y prueba de 10 minutos.
5. Prueba un usuario con prueba activa y uno con prueba finalizada antes de abrir a todos.

## Nota
No se ejecutó compilación ni pruebas en navegadores en este entorno: no hay dependencias instaladas. Es una versión BETA.
