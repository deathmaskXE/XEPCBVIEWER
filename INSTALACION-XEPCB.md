# XEPCB Viewer — Instalación

1. Copia el contenido de esta carpeta a la raíz de tu repositorio GitHub (sin copiar ninguna carpeta .git ajena).
2. Conserva los seis GitHub Actions secrets VITE_FIREBASE_*; el workflow pages.yml debe inyectarlos durante `npm run build`.
3. Haz commit y espera a que GitHub Actions termine. En Firebase Authentication agrega `deathmaskxe.github.io` a dominios autorizados.
4. IMPORTANTE: el archivo `firestore.techviewer.rules` es una referencia para un proyecto nuevo y **NO debe reemplazar sin más tus reglas existentes de XE Delivery**. Para tu Firebase actual, conserva las reglas originales y añade los bloques `techUsers` y `techCatalog` que ya configuraste. Revisa que `techUsers` permita listar al admin y escribir licencias al admin.
5. El administrador se reconoce desde `users/{uid}` con `role: admin` y `status: approved`, incluso si hay un perfil en `techUsers`.
6. Para crear usuarios: Firebase Console > Authentication > Users > Add user. Copia su UID. En XEPCB Viewer > Licencias, introduce UID y duración. Los usuarios nuevos inician sesión con sus credenciales de Firebase.
7. Para publicar boardviews: sube archivos al directorio `public/boardviews/` en GitHub, haz commit y espera al deploy. En el panel Catálogo agrega una URL directa como `https://deathmaskxe.github.io/XEPCBVIEWER/boardviews/archivo.pcb` (codifica espacios como `%20`). La biblioteca ofrece un enlace directo; el visor universal conserva su apertura de archivos locales. No hay integración automática entre clic del catálogo y carga interna del parser.
8. Archivos alojados en GitHub Pages público se pueden descargar por URL, independientemente de los permisos de Firestore. La autenticación controla el catálogo y la interfaz, no el acceso directo a los archivos públicos.
9. Se recomienda probar en Firebase Emulator antes de publicar reglas; evita sustituir las reglas antiguas sin revisar sus dependencias.
