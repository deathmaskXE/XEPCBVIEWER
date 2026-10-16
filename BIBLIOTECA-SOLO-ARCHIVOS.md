# XEPCB VIEWER V9 — Biblioteca por carpetas

Ya no existe el panel de catálogo manual ni consultas a techCatalog desde la aplicación.

Coloca archivos en `public/biblioteca/` dentro de la carpeta de categoría, marca y modelo.
Ejemplo: `public/biblioteca/consolas/playstation/PS5/EDM-033/EDM-033.pdf`.

El script `scripts/generate-library.mjs` genera `public/biblioteca/index.json` al ejecutar `npm run build`.
GitHub Actions debe ejecutar `npm run build` para que se actualice el índice.

El visor integrado usa exclusivamente los archivos indexados. Los pagos, usuarios y licencias siguen usando Firebase.

**Seguridad:** GitHub Pages es público. Los archivos subidos a `public/` pueden descargarse por URL sin iniciar sesión. Las pruebas de 3 minutos y las licencias restringen la interfaz y el catálogo, NO el acceso directo a los archivos.

No es necesario borrar la colección antigua `techCatalog` de Firestore: queda sin uso.
