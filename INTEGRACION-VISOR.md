# XEPCB Viewer — visor integrado

- Biblioteca: seleccionar archivo abre el visor interno sin redirigir a XE Game Viewer.
- Una o dos ventanas independientes; seleccionar ventana 1 o 2 y después el nombre del archivo en el menú lateral.
- Dos BoardViews distintos pueden mostrarse simultáneamente mediante instancias independientes de Viewport. También BoardView con PDF, PSD, imagen o esquema KiCad.
- TOP/BOTTOM y capas se controlan por ventana; panel lateral permite filtrar por tipo de documento.
- Diseño adaptable a móvil: vistas apiladas.
- No se muestran botones de importar archivo ni importar carpeta: los documentos se obtienen del catálogo Firestore.
- Las URL deben ser enlaces directos a archivos con acceso CORS desde GitHub Pages; las páginas de vista previa de GitHub no sirven.
- Los archivos se descargan en memoria del navegador; las URL públicas no son protección contra descarga.
- PSD usa el lector heredado PsdViewer; formatos binarios KiCad que no soporte el parser mostrarán error.
- Se conserva el resto del portal, pagos, licencias y administración.

## Pruebas pendientes

No se completó instalación de dependencias / compilación en este entorno por límite de tiempo. Antes de publicar en producción ejecutar `npm install --no-package-lock`, `npm run typecheck`, `npm run build` y verificar en navegador con dos BoardViews y con BoardView + PDF/PSD. Probar URLs CORS, navegación móvil y capas de KiCad. Mantener una copia de la versión anterior para revertir.
