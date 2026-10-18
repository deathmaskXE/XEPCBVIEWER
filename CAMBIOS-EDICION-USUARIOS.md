# Edición de perfiles de clientes

En Panel administrativo > Licencias, pulse «Editar datos» en la cuenta deseada. Puede completar nombre, teléfono y correo del perfil de Firestore; se conservan plan, fecha de activación y vencimiento.

IMPORTANTE: El correo del perfil no es el correo de inicio de sesión. Compruebe el UID en Firebase Authentication antes de completar un correo faltante. Para modificar realmente el correo de autenticación hace falta un backend seguro con Firebase Admin SDK; esta versión no lo implementa.

El panel no puede listar automáticamente usuarios de Authentication desde el navegador. Las cuentas sin techUsers no aparecerán hasta que se recupere su perfil. No conceda pruebas adicionales sin verificar historial.

El código no ha sido compilado ni probado funcionalmente porque el ZIP no incluye node_modules. Haga copia de seguridad y pruebe con una cuenta de prueba antes de publicar.
