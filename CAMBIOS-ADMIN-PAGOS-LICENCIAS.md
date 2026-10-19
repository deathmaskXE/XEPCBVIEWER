# Ajustes del panel administrativo
- Al seleccionar contenido, ya no aparece el listado de archivos del modelo. Solo se muestra el aviso breve si falta BoardView u Overlay, y el botón de apertura/membresía.
- En Licencias solo se listan cuentas activas con fecha de vencimiento futura; no se listan pruebas anteriores.
- En Solicitudes de pago se muestran solo pendientes sin una solicitud aprobada con igual UID y referencia. Las aprobadas y rechazadas permanecen como historial en Firestore.
- Aprobación mediante transacción de Firestore; la referencia aprobada se registra en el perfil para prevenir una segunda activación por la misma referencia. Se cierran las otras solicitudes pendientes del mismo UID y referencia como duplicadas.
- Verifica que las reglas Firestore permitan al administrador actualizar el estado de pagos a `duplicate`. Las solicitudes antiguas duplicadas ya aprobadas no se borran.
- No se ejecutó build local: faltan dependencias npm en este entorno.
