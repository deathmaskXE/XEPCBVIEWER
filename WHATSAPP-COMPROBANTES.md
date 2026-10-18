# XEPCB Viewer — Comprobantes por WhatsApp

El botón de pago registra la solicitud pendiente en `techPayments` y abre WhatsApp al número **+52 747 173 1852**, con ID de solicitud, correo, método, importe y referencia.

El cliente **debe adjuntar manualmente** la captura o PDF en WhatsApp y enviar el mensaje. Abrir WhatsApp **no demuestra** que lo haya enviado.

Este número es **exclusivamente para recibir comprobantes**: no se brinda atención al cliente ni soporte técnico por WhatsApp.

## Configuración

- No hace falta `VITE_PAYMENT_EMAIL`. Puedes eliminarlo de GitHub Actions si existe.
- No se necesita Firebase Storage para los comprobantes.
- Conserva las reglas de Firestore ya publicadas y verifica que `techPayments` permita crear solicitudes pendientes y que solo el administrador pueda aprobarlas.
- Comprueba con un usuario de prueba: registro, vencimiento de cinco minutos, solicitud, apertura de WhatsApp, recepción del comprobante y aprobación desde el panel.
- **No apruebes pagos basándote solo en una captura**: confirma el dinero recibido en tu banco, PayPal o Revolut.

## Limitaciones de seguridad

Los archivos que estén en URLs públicas siguen siendo públicos, aunque expire la prueba. El bloqueo del visor no protege archivos ya descargados. El país elegido por el usuario no prueba su residencia.
