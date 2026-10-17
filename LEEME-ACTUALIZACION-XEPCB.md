# XEPCB VIEWER — actualización de interfaz y suscripciones

## Cambios incluidos
- Paleta Obsidiana + Oro Champán, títulos metalizados con relieve y resplandor, botones con iconos por categoría.
- Menús del visor cerrados inicialmente y se ocultan al seleccionar archivo; diseño móvil compacto para Safari iPhone y Android.
- Botón **Ver ambas caras**: muestra frontal y trasera del mismo BoardView con zoom y desplazamiento enlazados mediante el mecanismo existente; selección NET compartida mediante el estado actual del visor.
- Dos archivos diferentes: zoom y desplazamiento independientes; la selección de NET entre archivos diferentes necesita una revisión adicional del estado global del componente Viewport.
- Una sola imagen, PDF u overlay: vista única ocupa el área completa del visor.
- Planes: 6 meses MXN 350 / USD 25; 12 meses MXN 650 / USD 40.
- Binance Pay ID 1287379101, pagos sujetos a confirmación manual.
- Prueba de 10 minutos: requiere actualizar las reglas publicadas de Firestore con el archivo `FIRESTORE-REGLAS-XEPCB-10MIN.rules`.

## Importante antes de publicar
1. Respaldar repositorio y reglas actuales de Firebase.
2. Sustituir las reglas en Firebase y verificar con el simulador antes de publicar. Las reglas incluidas reproducen las colecciones de XE Delivery suministradas en la conversación; si otras apps añadieron reglas después, fusionarlas primero.
3. Subir el código actualizado a GitHub, activar el despliegue habitual y probar con cuenta nueva y cuenta existente.
4. Confirmar los pagos reales desde Binance/banco antes de aprobar solicitudes.
5. **Sin validación completa:** no fue posible instalar las dependencias en este entorno, por lo que faltan `npm run typecheck`, `npm run build` y pruebas reales en Safari y Android. No debe considerarse una versión verificada para producción.
6. **Seguridad:** los archivos estáticos publicados en GitHub Pages no quedan protegidos solo por Firestore; las reglas controlan documentos de Firestore, no las URL públicas de archivos del repositorio.
