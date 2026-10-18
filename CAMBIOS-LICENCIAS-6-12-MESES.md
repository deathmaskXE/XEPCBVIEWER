# XEPCB VIEWER — Licencias 6 y 12 meses

- La sección Licencias filtra cuentas `status === 'active'` (incluye licencias vencidas por fecha para poder renovarlas), excluyendo cuentas `trial` y administradores.
- La activación manual permite 6 o 12 meses de calendario.
- La aprobación de solicitudes de pago usa el plan de 6 o 12 meses y calcula el vencimiento con meses de calendario.
- Al activar se guardan `planMonths`, `activatedAt` y `expiresAt` en `techUsers`.
- Los perfiles anteriores sin `planMonths` se muestran como "Plan anterior / no registrado" hasta su renovación.
- La renovación suma meses desde el vencimiento futuro si la licencia aún está vigente; si venció, desde hoy.
- No es necesario modificar las reglas de Firestore si el administrador tiene permisos para actualizar `techUsers`.

Nota: código no compilado ni probado en un navegador. Validar en cuenta de prueba antes de desplegar.
