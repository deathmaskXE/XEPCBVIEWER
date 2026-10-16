# Panel de pruebas gratuitas

Entra con una cuenta administradora reconocida por el sistema. En el menú superior verás **Pruebas gratuitas**, separada de **Licencias** y **Pagos**.

La pantalla enumera perfiles existentes en `techUsers`, mostrando pruebas pendientes, disponibles, iniciadas o terminadas. El botón **AUTORIZAR 3 MINUTOS** solo aparece para perfiles `status: trial`, sin `trialStartedAt` y sin aprobación previa. La aprobación no consume el tiempo: el contador empieza cuando el cliente abre el visor.

**Seguridad y limitación:** el navegador no puede enumerar Firebase Authentication. Los usuarios creados en Authentication que carecen de documento `techUsers/{uid}` no aparecerán en la lista. Es necesario verificar el UID en Firebase Authentication y reparar su perfil mediante Firebase Admin SDK o una función administrativa segura; no se deben crear perfiles a partir de un UID no verificado. Las reglas de Firestore deben permitir al administrador leer y actualizar `techUsers` y reconocer su cuenta en `users/{uid}` con `role: admin` y `status: approved` (o adaptar las reglas a su configuración real).

No reemplaces las reglas completas de Firestore de otros proyectos. Antes de publicar prueba con una cuenta administradora y otra de prueba.
