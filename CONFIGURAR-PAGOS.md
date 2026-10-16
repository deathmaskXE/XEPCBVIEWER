# XEPCB Viewer — Solicitudes de pago (fase funcional)

## Incluido
- Registro de clientes por email/contraseña en Firebase Authentication.
- Perfil de cliente pendiente en `techUsers`.
- Pantalla de solicitud para clientes pendientes/vencidos.
- SPEI México / PayPal internacional, selección de país declarada por el usuario.
- Subida privada JPG, PNG, PDF hasta 5 MB a Firebase Storage.
- Solicitudes `techPayments` en Firestore, revisión manual por el administrador.
- Aprobar = sumar 365 días a una licencia vigente o desde la fecha actual.
- Rechazar con nota, sin activar licencia.
- Lista de solicitudes y visualización de comprobantes.

## CONFIGURACIÓN OBLIGATORIA (NO se instala automáticamente)
1. En Firebase Authentication > Sign-in method habilita **Correo electrónico/contraseña**.
2. En Firebase Storage crea el bucket predeterminado si aún no existe; verifica plan/precios de Firebase antes de activarlo.
3. En Firestore > Rules, conserva las reglas que actualmente permiten funcionar XE Delivery y XEPCB Viewer. **NO reemplaces el archivo completo**. Inserta `match /techPayments/{paymentId}` de `firestore.pagos.fragment.rules` dentro de `match /databases/{database}/documents`. Dentro del `match /techUsers/{uid}` ya existente agrega el `allow create` de autorregistro del mismo archivo. Si el match actual ya tiene create, revisa sus condiciones antes de combinar.
4. En Storage > Rules publica las reglas de `storage.pagos.rules`, **fusionándolas con las reglas que ya uses**. No borres reglas de otros productos.
5. Despliega GitHub Pages y prueba con un correo NUEVO que se registre, suba un comprobante y quede pendiente; entra como administrador, abre el comprobante y prueba aprobar/rechazar.

## Importante para cobros reales
- No se ha configurado ningún número de cuenta SPEI ni enlace PayPal: el cliente debe solicitar los datos al administrador. No se capturan pagos dentro de la app.
- La elección México / internacional es declarativa. **No existe todavía validación de país de cuenta PayPal, ni integración con PayPal API/webhooks**. No debe presentarse como bloqueo antifraude. Verifica el país y la transacción manualmente en PayPal antes de aprobar.
- No apruebes por la captura: confirma el dinero en tu banco/PayPal.
- La aprobación de licencia y el cambio de estado de solicitud son dos escrituras de Firestore desde el cliente administrador. No son atómicas. Para evitar estados parciales, migrar a Cloud Functions con transacciones antes de operar a escala.
- Si el usuario vuelve a subir un archivo y falla la creación del documento, puede quedar un comprobante huérfano; revisar Storage periódicamente.
- Para producción reforzar reglas de país, límite de solicitudes, validación de montos, privacidad y transacciones.
