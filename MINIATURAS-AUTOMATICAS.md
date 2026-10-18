# XEPCB — Miniaturas automáticas

Cada `npm run build` explora `public/biblioteca/`, crea `public/biblioteca/index.json`, genera `public/catalogo-publico.json` sin URLs de archivos y crea imágenes JPEG en `public/miniaturas/`.

- PNG, JPG, WEBP, BMP: miniatura de la imagen.
- PDF: primera página mediante PyMuPDF.
- PSD: vista compuesta si Pillow puede abrirlo; si no, ficha identificativa.
- BIN, BRD, PCB, KiCad y formatos no renderizables: ficha identificativa con tipo y nombre; **no** se representa falsamente el trazado real de la placa.

La acción de GitHub Pages instala Pillow y PyMuPDF. Para compilar localmente: `python3 -m pip install Pillow PyMuPDF` y luego `npm run build`.

IMPORTANTE: los archivos en un repositorio GitHub público siguen siendo descargables por URL directa. Las miniaturas no los protegen.
