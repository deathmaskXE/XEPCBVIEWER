# Cambios en revisión: cursor y administración

- Guías de cursor en ambas caras al mover el mouse; la cara trasera invierte horizontalmente la posición relativa.
- Zoom y desplazamiento sincronizados usando el centro de la cámara en vez del punto de selección como referencia.
- Filtros de pruebas finalizadas, activas y todas, ordenadas por estado y fecha.
- Búsqueda de cuentas por nombre, correo, celular (si existe en Firestore) y UID.
- Selección de una cuenta encontrada para rellenar la activación de licencia.
- Campo opcional de celular para nuevos registros.

IMPORTANTE: publicar las reglas incluidas en FIRESTORE-REGLAS-XEPCB-10MIN.rules, que permiten el campo phone en el registro. Conservar respaldo de reglas actuales y probar con simulador antes de publicar.

VALIDACIÓN PENDIENTE: no se ha compilado ni probado en navegador por falta de dependencias. La sincronización de cursores es aproximada por coordenadas relativas y necesita comprobarse con placas de distinta geometría y orientación. No publicar directamente para todos los clientes.
