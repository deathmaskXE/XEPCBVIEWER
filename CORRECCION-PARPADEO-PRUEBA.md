# Corrección: pantalla de prueba que se cierra y reaparece

- La interfaz conserva localmente la hora de inicio cuando Firestore confirma la escritura de `trialStartedAt`, mientras se sincroniza el timestamp del servidor.
- El botón «Abrir visor integrado» ahora llama a `openViewer()`, igual que «Abrir en visor».
- El tiempo no se reinicia al refrescar: el dato definitivo permanece en Firestore.
- No se modifica Firebase Authentication, licencias ni los métodos de pago.

## Comprobaciones antes de publicar
1. Verificar reglas activas de Firestore, especialmente permiso de actualización de `trialStartedAt`.
2. Probar registro nuevo, apertura del visor, contador y recarga de página.
3. Probar en iPhone/Safari y en escritorio.
4. Verificar que un usuario que agotó la prueba no obtiene una nueva.

**Nota:** esta corrección no sustituye las reglas de Firestore ni valida la configuración del servidor.
