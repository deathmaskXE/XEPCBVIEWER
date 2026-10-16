# Corrección de registro y prueba gratuita

Se actualizó `src/TechPortal.tsx` para distinguir entre un perfil inexistente, un error al leer Firestore y una prueba realmente vencida. Si el usuario acaba de registrarse y no existe `techUsers/{uid}`, verá **Activar mis 3 minutos gratuitos**, que intenta crear el perfil con `serverTimestamp()`.

## Importante: reglas Firestore

Comprueba las reglas publicadas en Firebase Console. El proyecto incluye `firestore.trial-payments.rules` como referencia, pero no deben sobrescribirse las reglas actuales sin fusionarlas. Para crear `techUsers/{uid}`, las reglas deben permitir al usuario autenticado crear su propio perfil `role: client`, `status: trial`, con timestamps de servidor.

No se deben otorgar nuevos periodos a perfiles existentes cuya prueba ya venció. Si un usuario ya había sido registrado sin perfil y ahora usa el botón, recibirá su primera prueba de 3 minutos.

## Pruebas recomendadas

1. Crear una cuenta nueva y confirmar que aparece la biblioteca y el contador 03:00.
2. Registrar un usuario con cuenta Authentication pero sin `techUsers/{uid}`; confirmar que aparece el botón de recuperación.
3. Simular reglas Firestore que rechazan la creación y verificar el mensaje de error (no una falsa expiración).
4. Actualizar la página y comprobar que el contador no se reinicia.
5. Confirmar que una cuenta con licencia pagada conserva acceso.

No se modificaron las reglas publicadas en Firebase desde este ZIP.
