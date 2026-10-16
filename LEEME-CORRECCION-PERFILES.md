# Corrección de cuentas pendientes (16 octubre 2026)

- Se añadió recuperación automática de `techUsers/{uid}` cuando Authentication tiene usuario y Firestore confirma que falta su perfil.
- Se añadió botón visible para reintentar **ACTIVAR MIS 3 MINUTOS GRATUITOS**.
- No se sobrescriben perfiles existentes: `setDoc` solo se intenta cuando falta el perfil, y las reglas de Firestore deben restringir `create` y prohibir que el cliente reinicie pruebas.
- El contador se inicia al abrir el visor, no al crear el perfil.

## PASO OBLIGATORIO EN FIREBASE
En Firebase Console > Firestore Database > Reglas, compara las reglas PUBLICADAS con `firestore.trial-payments.rules`.
Integra cuidadosamente las reglas `techUsers` de ese archivo con las reglas reales del proyecto y publícalas.
**No sustituyas todas las reglas por `firestore.techviewer.rules`**: es un archivo antiguo que bloquea la creación del perfil por el propio usuario.
No reemplaces reglas de otras aplicaciones ni abras escritura global.

## Comprobación
1. Usuario nuevo: crea cuenta, aparece en `techUsers`, puede navegar sin iniciar contador.
2. Cuenta antigua en Authentication sin documento `techUsers`: se crea su perfil; si falla, se muestra el error exacto de Firestore.
3. Abrir visor: inicia 3 minutos; recargar no reinicia el tiempo.
4. Cuenta con prueba agotada: NO obtiene otra prueba.
5. Administrador: comprueba que sigue pudiendo administrar cuentas.

Nota: las cuentas que solo existen en Authentication no aparecerán en el listado `techUsers` del administrador hasta que se cree su perfil. Para listarlas desde el panel se requiere una Cloud Function segura con Admin SDK. Este ZIP no cambia las reglas publicadas ni despliega Cloud Functions.
