# Registro seguro y recuperación de perfiles XEPCB

- Se crea la cuenta en Authentication y después se escribe el perfil en Firestore.
- La interfaz solo confirma el alta después de leer el perfil desde Firestore.
- Si la escritura falla, se muestra el error y aparece REINTENTAR REGISTRO para esa misma sesión/navegador.
- Los usuarios antiguos sin perfil NO reciben automáticamente otra prueba: el administrador debe verificar el historial antes de reconstruir su perfil.
- No se modifica ningún documento de licencia existente, ni `trialStartedAt`, ni `expiresAt`.
- Las reglas requieren que `techUsers` permita `phone` opcional en create y que el campo `createdAt` use `serverTimestamp()`.
- Una cuenta de Authentication que no llegó a escribir el perfil y cambia de dispositivo requiere recuperación administrativa.
- La biblioteca está publicada como archivos estáticos: las reglas de Firestore no protegen por sí solas las URL directas de archivos en GitHub Pages. Para protección real se necesita un backend que autorice las descargas.
