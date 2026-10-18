# Corrección de pruebas pendientes

1. Respaldar reglas actuales de Firebase.
2. Publicar el contenido COMPLETO de `FIRESTORE-REGLAS-XEPCB-10MIN.rules` en Firestore Database > Reglas. No mezclar con otros archivos de reglas del ZIP.
3. Subir los archivos de este proyecto al repositorio GitHub y esperar a que finalice el despliegue.
4. Registrar una cuenta nueva: debe aparecer prueba disponible sin contador iniciado.
5. Iniciar sesión con una cuenta antigua con `status: trial`, `trialApproved: false` y SIN `trialStartedAt`: la aplicación autoriza la prueba y el contador empieza solamente al abrir el visor.
6. Una cuenta con `trialStartedAt` existente NO puede reiniciar la prueba con esta corrección.

Si una cuenta tiene `status: pending` en lugar de `trial`, o carece del documento `techUsers/{uid}`, no se modifica automáticamente; revisar con el administrador.

IMPORTANTE: se modificó únicamente el flujo de recuperación de pruebas y las reglas correspondientes. No se ha compilado ni ejecutado la aplicación con dependencias en este entorno.
