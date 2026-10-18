# XEPCB Viewer — publicación desde cero

Esta entrega corrige el error `npm ci` del workflow original: el lockfile estaba desincronizado con `package.json`. Se eliminó el lockfile obsoleto y el workflow instala dependencias sin lockfile como solución de arranque. Esto **no garantiza versiones reproducibles**; una vez tengas acceso a npm en tu PC, ejecuta `npm install`, confirma el nuevo `package-lock.json` y cambia el paso de GitHub Actions a `npm ci`.

## Publicar

1. Crea un repositorio NUEVO `XEPCB-VIEWER` o reemplaza los archivos del proyecto existente (respaldándolo primero). Sube **todo el contenido de esta carpeta**, incluyendo `.github/workflows/pages.yml`.
2. En Settings > Pages, selecciona **GitHub Actions** como fuente de publicación.
3. Abre Actions > Publicar XEPCB Viewer > Run workflow, o sube un commit a `main`.
4. Revisa el registro: instalación, compilación y despliegue.
5. Para Firebase, configura las variables `VITE_FIREBASE_*` del archivo `.env.example` mediante variables del workflow o entorno de compilación; el ejemplo no incluye credenciales.

**Advertencia:** no se ha podido ejecutar una compilación completa localmente: este entorno no tiene acceso al registro npm. Si el build falla tras la instalación, revisa el primer error de `npm run build`. El visor y sus archivos de ejemplo se han preservado.

**Seguridad:** GitHub Pages publica archivos de forma pública. Firebase no protege las URL de archivos alojados allí.
