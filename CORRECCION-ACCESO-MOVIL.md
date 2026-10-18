# Corrección de acceso y prueba gratuita

- Botón cyan visible para activar prueba en iOS, Android y PC.
- Reintentar conexión Firestore sin cerrar sesión.
- La lectura de `techUsers/{uid}` no depende de leer `users/{uid}` primero.
- No se concede una prueba cuando la lectura procede únicamente de caché sin un perfil verificable.
- Se conservan las pruebas existentes y licencias activas.
- Se corrigió el ejemplo `firestore.trial-payments.rules` para aceptar `currency` y Revolut nacional.

## IMPORTANTE
Las reglas en `firestore.trial-payments.rules` son un EJEMPLO para fusionar con las reglas existentes; subir este archivo a GitHub NO publica las reglas de Firebase. Revise en Firebase Console > Firestore > Reglas que los usuarios autenticados pueden hacer GET y CREATE de su propio documento `techUsers/{uid}`. No sustituya reglas de otras colecciones sin fusionarlas.

## Prueba
1. Publicar el código y comprobar GitHub Actions.
2. En iPhone/Android, iniciar sesión con una cuenta que tenga `techUsers/{uid}` ausente.
3. Debe aparecer el botón cyan 'ACTIVAR MIS 3 MINUTOS GRATIS'.
4. Pulsar el botón y verificar que se cree el perfil y se abra la biblioteca.
5. Si aparece error offline, pulsar REINTENTAR CONEXIÓN con red disponible.
6. Verificar que un usuario con prueba agotada no obtiene una segunda prueba y que un usuario pagado sigue accediendo.

No se ha verificado el despliegue en Firebase ni la compilación en este entorno.
