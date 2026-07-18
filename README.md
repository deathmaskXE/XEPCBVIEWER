# XE Delivery

Aplicación web para repartidores independientes: mandados, compras, mensajería, seguimiento público, reputación y rendimiento. Es una sola aplicación multi-repartidor; toda información privada se separa mediante `courierId`, igual al UID de Firebase Authentication.

## Tecnologías

React, Vite, React Router con `HashRouter`, Firebase Authentication y Firestore modular, Chart.js, jsPDF, html2canvas, Leaflet/OpenStreetMap y Lucide. No utiliza Storage, Analytics, Realtime Database, cartera, saldo ni retiros.

## Instalación y ejecución

1. Instala Node.js 20 o superior.
2. Ejecuta `npm install`.
3. Copia `.env.example` como `.env` y completa únicamente las variables públicas de configuración web de Firebase.
4. Ejecuta `npm run dev`.
5. Para validar producción: `npm run build` y `npm run preview`.

La auditoría final del 18 de julio de 2026 confirmó una instalación reproducible y una compilación de producción correcta. El proyecto usa carga diferida por página y `HashRouter`, por lo que no necesita reescrituras de rutas en GitHub Pages.

Si no hay configuración Firebase, la interfaz entra en modo demostración con datos ficticios. También puede activarse de forma explícita con `VITE_DEMO_MODE=true`. Nunca debe activarse en producción.

## Preparar Firebase

1. En un proyecto Firebase existente, activa Authentication por correo/contraseña y Cloud Firestore en modo producción. No actives Analytics ni Storage.
2. Registra una aplicación web y copia sus valores a `.env`; estas claves identifican la app y no sustituyen las reglas de seguridad.
3. Publica reglas e índices con Firebase CLI: `firebase deploy --only firestore`.
4. Crea manualmente el primer usuario administrador en Authentication, copia su UID y crea `users/{uid}` con `uid`, `role: "admin"`, `status: "approved"`, `displayName`, `email`, `phone`, `createdAt` y `updatedAt`. No guardes contraseñas en Firestore.
5. Conserva la cuenta administrativa con autenticación multifactor y acceso restringido a la consola.

## Colecciones

`users`, `couriers`, `courierAccessRoutes`, `licenses`, `clients`, `orders`, `orders/{id}/history`, `ratings`, `complaints`, `auditLogs` y `publicTracking`. Las consultas privadas siempre deben incluir `where('courierId','==',auth.currentUser.uid)`; las reglas vuelven a comprobar la propiedad. `publicTracking` contiene solo una proyección mínima y nunca notas, ganancias, correo, credencial o auditoría.

## Licencias y rutas privadas

La prueba normal usa `type: trial`, `status: trial` y `expiresAt` a 24 horas. La licencia de seis meses usa `type: six_months` y `status: active`. El contador lee el timestamp persistido y nunca lo reinicia localmente. Renovar o cambiar fechas es una operación administrativa auditada.

Una ruta se guarda en `courierAccessRoutes/{token}`. Al regenerarla, una Cloud Function/transacción administrativa debe desactivar la anterior y crear un token criptográficamente aleatorio. La ruta no reemplaza el login: después de autenticar, el UID debe coincidir con `courierId`. No coloque datos sensibles en el token o URL.

## Seguimiento público y confirmación de una hora

El navegador público solo lee `publicTracking/{trackingToken}`. La colección privada `orders` no está abierta al público. Una Cloud Function debe copiar únicamente campos permitidos cada vez que cambia un pedido.

Al entregar, el backend establece `waiting_client_confirmation`, `deliveredAt` y `autoConfirmAt = deliveredAt + 1 hora`. Una función programada completa pedidos vencidos. Una reconciliación en el cliente puede mejorar la experiencia, pero no garantiza ejecución cuando ninguna página está abierta y no debe tener permisos para confirmar arbitrariamente.

## Funciones backend recomendadas (plan Blaze)

- `syncPublicTracking`: proyección segura de pedidos a `publicTracking`.
- `submitPublicConfirmation`, `submitRating` y `submitComplaint`: endpoints con App Check, token de pedido, validación y protección de abuso.
- `autoConfirmDeliveredOrders`: tarea programada para la hora límite.
- `rotateCourierAccessRoute`: invalida la ruta anterior, crea la nueva y audita atómicamente.
- `adminUpdateOrder`, `archiveOrder` y operaciones de licencia: verifican custom claims/rol y registran auditoría.
- Agregados confiables de reputación, estadísticas y consecutivos por repartidor.

Cloud Functions y tareas programadas normalmente requieren el plan Blaze. Los límites y precios deben comprobarse en la documentación vigente de Firebase antes de activarlo.

## GitHub Pages

1. Para este repositorio usa `VITE_BASE_PATH=/XEDELIVERY/` en el entorno de compilación.
2. Ejecuta `npm run build`.
3. Publica con `npm run deploy`; el script usa `gh-pages -d dist`.
4. En GitHub, selecciona la rama `gh-pages` como origen de Pages.

`HashRouter` mantiene estables rutas como `#/acceso/{token}`, `#/seguimiento/{token}`, `#/courier/dashboard` y `#/admin/dashboard` al publicar en una subruta.

## Prueba manual sugerida

Usa `#/seguimiento/demo-128` en modo demo. En Firebase real, crea primero el pedido privado y deja que `syncPublicTracking` produzca su vista pública. Prueba con dos cuentas courier y confirma que cada consulta incluye su UID, y que las reglas rechazan lecturas cruzadas desde el emulador.

Consulta `IMPLEMENTATION_STATUS.md` antes de producción: enumera con precisión lo terminado y lo que necesita backend.
