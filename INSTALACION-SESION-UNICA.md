# XEPCB — Una sesión activa por cuenta

1. Publica el código actualizado.
2. En Firebase Console > Firestore > Reglas, integra el bloque `match /techDeviceSessions/{uid}` del archivo `FIRESTORE-REGLAS-XEPCB-SIN-PRUEBAS.rules` en las reglas ACTUALES, sin sustituir otras colecciones existentes. Publica las reglas.
3. Prueba con dos navegadores/dispositivos distintos: inicia sesión en A, luego en B. A debe perder acceso al visor al recibir la actualización de Firestore. A puede pulsar «Usar cuenta en este dispositivo» para desplazar a B.
4. La tienda y el catálogo público siguen accesibles sin licencia.

Nota: esta medida bloquea la interfaz, no los enlaces directos a archivos públicos alojados en GitHub. Un usuario con control del navegador podría manipular el cliente; para una protección fuerte se requiere validar acceso en backend y servir archivos desde almacenamiento privado.
