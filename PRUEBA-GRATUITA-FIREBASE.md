# XEPCB Viewer - prueba de 5 minutos + solicitudes por Gmail

1. **No publiques el ZIP sin antes actualizar Firestore Rules**. El archivo `firestore.trial-payments.rules` es una referencia para INTEGRAR en tus reglas vigentes; no sobrescribas las colecciones anteriores de XE Delivery.
2. En GitHub > Settings > Secrets and variables > Actions > **Variables**, crea `VITE_PAYMENT_EMAIL` con el Gmail que recibirá comprobantes. Es una dirección pública (no un secreto). Vuelve a desplegar.
3. En Firebase Authentication > Sign-in method, habilita Email/Password si no está habilitado.
4. Registra una cuenta NUEVA para probar. Al crearse `techUsers/{uid}`, el servidor guarda `trialStartedAt` con `serverTimestamp()`; la regla limita el acceso a `trialStartedAt + 5 minutos`.
5. Abre la biblioteca y el visor; comprueba que al llegar a cero aparezca la pantalla de solicitud de pago. Recarga la página para verificar que la prueba no se reinicie.
6. Envía una solicitud SPEI o internacional. Se guarda en `techPayments` como pendiente y se abre el cliente de correo mediante `mailto:`. El usuario debe adjuntar el comprobante manualmente. La aplicación NO sabe si realmente envió el correo.
7. Como administrador, confirma el ingreso REAL en tu banco/PayPal/Revolut y el correo en Gmail. Solo entonces pulsa Aprobar +365 días.

## Limitaciones de seguridad importantes
- La regla de Firestore impide leer `techCatalog` después de 5 minutos. Los enlaces de archivos públicos ya entregados durante la prueba NO pueden revocarse; el usuario puede conservarlos, y el contenido cacheado tampoco puede recuperarse. Para una biblioteca de pago protegida se requiere alojamiento privado con URLs temporales autorizadas desde backend.
- El contador visual usa el reloj local y puede tener desajustes, pero la regla de acceso usa `request.time` del servidor. Se recomienda sincronizar el reloj o mostrar una cuenta regresiva aproximada.
- La prueba es **por cuenta**, no por persona. Para limitar cuentas múltiples hacen falta verificaciones y protección antiabuso adicionales.
- Los pagos se aprueban manualmente. La selección MX/internacional NO verifica la residencia ni el país del pagador.
- No se necesita Firebase Storage. No hay adjuntos automáticos por mailto.


## Cambio posterior: WhatsApp

Los comprobantes ahora se envían por WhatsApp. Consulta `WHATSAPP-COMPROBANTES.md`; las referencias anteriores a Gmail son históricas.
