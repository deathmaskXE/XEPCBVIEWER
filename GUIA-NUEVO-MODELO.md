# XEPCB VIEWER — catálogo público, membresías y XE TECH STORE

## Qué cambió
- Se elimina la prueba gratuita del flujo de la aplicación y de las reglas nuevas.
- Se conserva el alta de clientes para solicitar una membresía, el historial de pagos y la aprobación administrativa.
- La biblioteca pública lee exclusivamente `public/catalogo-publico.json`, que contiene **metadatos y miniaturas**, no rutas a archivos privados.
- El visor se muestra solo si el perfil tiene una licencia activa y vigente (o es administrador).
- XE TECH STORE lee productos de `xeAffiliateProducts` y permite al administrador publicarlos con enlaces de afiliado.

## IMPORTANTE: despliegue seguro
1. Publicar las reglas `FIRESTORE-REGLAS-XEPCB-SIN-PRUEBAS.rules` en Firebase Firestore, revisando antes las reglas actuales del proyecto y preservando colecciones ajenas.
2. Las reglas de Firestore **NO protegen archivos estáticos en GitHub Pages**. No subir los boardviews, PDF, BIN ni Gerber privados al directorio `public/` o al repositorio público. Moverlos a un backend de almacenamiento autenticado con reglas de licencia verificadas en el servidor. Hasta implementar ese backend, el visor solo se bloquea visualmente y **no se debe considerar un paywall seguro**.
3. `public/catalogo-publico.json` debe contener entradas como: `[ {"id":"ps5-01","title":"PS5 EDM-010","category":"Consolas","brand":"Sony","model":"PS5","kind":"BoardViews","thumbnail":"miniaturas/ps5-edm010.webp"} ]`. Las miniaturas pueden colocarse en `public/miniaturas/`. No incluir enlaces a los archivos completos.
4. Los archivos originales del visor se indexan en `public/biblioteca/index.json` por el script de generación, pero **no deben publicarse ahí** si se desea protección real. La migración a un backend privado es obligatoria antes de publicar contenido de pago.
5. Enlaces de AliExpress: el administrador pega el enlace y agrega nombre; puede añadir URL de imagen opcional. **No se ha integrado extracción automática de fotografías**, ya que los enlaces cortos no permiten obtenerlas de forma fiable sin una API o backend autorizado.
6. El nuevo registro crea perfiles con `status: pending`, sin prueba. Los perfiles antiguos no se eliminan; solo una licencia activa y vigente concede acceso.

## Estado de verificación
Código preparado como **versión de integración**, no certificado en producción. Validar en Firebase real con usuario anónimo, registrado pendiente, miembro activo, vencido y administrador. La publicación de reglas no ocurre automáticamente desde este ZIP.
