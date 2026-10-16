# XEPCB Viewer V7: prueba gratuita de 3 minutos

## Cambios
- Contador y bloqueo de interfaz: 180000 ms (3 minutos).
- Reglas de referencia de Firestore: `duration.value(3, 'm')`.
- Las cuentas existentes no obtienen una prueba nueva.

## MUY IMPORTANTE: Firebase publicado
Las reglas de Firestore desplegadas anteriormente siguen configuradas con 5 minutos hasta que se actualicen. En **Firestore Database > Reglas**, busca `duration.value(5, 'm')` dentro de la función de acceso de prueba y cámbialo por `duration.value(3, 'm')`. No reemplaces todas tus reglas actuales por el archivo incluido, porque puedes romper XE Delivery. Publica las reglas actualizadas.

Después sube este proyecto a GitHub y verifica GitHub Actions. Comprueba con una cuenta NUEVA que a los 3 minutos se bloquee el visor.

Advertencia: los enlaces públicos de archivos no quedan protegidos por este temporizador.
