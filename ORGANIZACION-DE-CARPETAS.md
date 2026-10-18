# XEPCB Viewer V10 — Biblioteca por carpetas

Carpetas: `public/biblioteca/{consolas|controles|celulares|graficas}/{modelo}/{boardviews|overlays|esquematicos}/`.

Los modelos precreados se encuentran en cada categoría. Puedes renombrar o duplicar las carpetas `personalizar-01`, `personalizar-02`, etc. para agregar nuevas marcas/modelos. Las carpetas vacías llevan `.gitkeep` para conservarlas en GitHub y NO aparecen en la interfaz.

Sube archivos compatibles a su carpeta y publica GitHub Pages. El script `scripts/generate-library.mjs` crea `public/biblioteca/index.json` en cada build. Los botones de modelo y tipo solo aparecen si hay archivos indexados. No es necesario modificar Firebase.

**Advertencia:** todos los archivos en `public/` quedan accesibles públicamente por URL, independientemente de la licencia. Para proteger contenido comercial se necesitaría un servidor o almacenamiento privado.
