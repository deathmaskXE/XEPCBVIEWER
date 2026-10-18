# Biblioteca automática XEPCB Viewer V8

1. Copia los BoardViews a `public/biblioteca/consolas/xbox/`, `consolas/playstation/` o `consolas/nintendo/`.
2. Para otros dispositivos utiliza `celulares/`, `graficas/nvidia-rtx/`, `graficas/amd-radeon/`, `diagramas/` y `overlays/`.
3. Puedes crear subcarpetas por modelo: `consolas/playstation/PS5/EDM-033/archivo.pcb`.
4. Publica con GitHub Actions. Antes de compilar, `prebuild` genera automáticamente `public/biblioteca/index.json`. No edites ese índice a mano.
5. Abre la categoría correspondiente en la Biblioteca y selecciona el archivo. La vista integrada recibe su URL. La capacidad de renderizado depende del formato compatible con el visor.

**Advertencia de seguridad:** todo lo incluido en `public/biblioteca/` se distribuye públicamente en GitHub Pages. El contador de prueba y Firestore no impiden que alguien descargue esos archivos por URL directa. No uses esta carpeta para archivos privados o de pago que deban permanecer protegidos. Para ello hace falta almacenamiento privado con autorización en servidor.

El catálogo manual de Firebase sigue funcionando; los archivos de carpetas y los registros de Firestore se muestran juntos.
