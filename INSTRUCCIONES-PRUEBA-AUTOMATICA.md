# Prueba gratuita XEPCB Viewer

- Registro nuevo: techUsers/{uid} con status=trial, trialApproved=true, SIN trialStartedAt.
- La biblioteca se puede explorar sin consumir tiempo. Al pulsar Abrir visor o Abrir en visor, se escribe trialStartedAt con serverTimestamp().
- La cuenta no obtiene un segundo periodo al actualizar la página.
- En admin > Usuarios y licencias: botón Autorizar 3 minutos para perfiles trial pendientes (trialApproved ausente o false).
- Un perfil ausente en Firestore NO se considera elegible automáticamente: verificar Authentication y crearlo desde Firebase Admin antes de autorizar.

## IMPORTANTE: reglas
El archivo firestore.trial-payments.rules es REFERENCIA. Debes fusionar las reglas techUsers en Firebase Console > Firestore > Reglas con las reglas que ya uses en otros proyectos. No reemplaces el conjunto entero. Sin publicarlas, la activación fallará.

## Limitación de seguridad
El navegador no puede listar usuarios de Firebase Authentication. El panel lista techUsers, no cuentas que existan solo en Authentication. Para mostrar también esas cuentas hace falta una Cloud Function protegida por rol administrador.

## Verificación
1. Registrar cuenta nueva: explorar biblioteca sin contador.
2. Abrir visor: se inicia 03:00; cerrar y reabrir NO reinicia.
3. Comprobar cuenta pendiente: mensaje y autorización admin.
4. Comprobar reglas y permisos en Firebase real.
