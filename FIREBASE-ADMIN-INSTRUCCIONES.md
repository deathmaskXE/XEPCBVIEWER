# XEPCB Viewer — recuperación de administrador

La app ahora consulta `techUsers/<UID>` y, si no existe, consulta `users/<UID>` para reconocer exclusivamente cuentas anteriores con `role: admin` y `status: approved`.

**OBLIGATORIO:** En Firebase Console > Firestore Database > Reglas, sustituye las reglas por el contenido de `firestore.techviewer.rules` y pulsa Publicar. **Revisa antes las reglas actuales**: si otras aplicaciones todavía usan Firestore, fusiona las reglas en lugar de sustituirlas. Este archivo permite leer el propio documento legado, pero no escribirlo; el catálogo solo puede editarlo un administrador.

Después sube los archivos del ZIP a la raíz del repositorio (sin copiar otra carpeta superior), confirma el commit y espera al despliegue de GitHub Actions. Cierra sesión e inicia sesión de nuevo.

Para cuentas nuevas, crea `techUsers/<UID>` desde la consola de Firebase con `role: user`, `status: active`, `expiresAt` tipo Timestamp futuro. No abras permisos de escritura a los clientes.

La lectura de `users` requiere que el UID del documento sea el mismo UID de Firebase Authentication. Si hay un documento `techUsers/<UID>` existente con datos distintos, este prevalece y no se usa el respaldo legado.
