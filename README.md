# Tejidos Nicogurumi — Guía para activar el pago con Mercado Pago

Esta carpeta contiene tu tienda (`index.html`) más una pequeña función de
servidor (`api/create-preference.js`) que se conecta con Mercado Pago.
Sigue estos pasos en orden.

## 1. Crea tu cuenta en Mercado Pago
1. Entra a https://www.mercadopago.com.pe y crea una cuenta (o usa la que ya tengas).
2. Ve a **Tu negocio → Configuración → Credenciales**.
3. Copia el **Access Token de prueba** (empieza con `TEST-...`). Con este puedes
   probar todo sin mover dinero real.

## 2. Sube el proyecto a GitHub
1. Crea una cuenta gratis en https://github.com si no tienes.
2. Crea un repositorio nuevo (ej. `nicogurumi-tienda`) y sube todos los
   archivos de esta carpeta (puedes arrastrarlos desde la web de GitHub,
   sin necesidad de usar la terminal).

## 3. Despliega en Vercel (gratis)
1. Entra a https://vercel.com y crea una cuenta con tu usuario de GitHub.
2. Clic en **Add New → Project** y elige el repositorio que subiste.
3. Antes de darle a "Deploy", abre **Environment Variables** y agrega:
   - `MP_ACCESS_TOKEN` → tu access token de Mercado Pago (paso 1)
   - `SITE_URL` → lo dejas vacío por ahora, lo completas en el paso 4
4. Dale a **Deploy**. En 1-2 minutos Vercel te da una URL pública, algo como
   `https://nicogurumi-tienda.vercel.app`.

## 4. Completa la URL del sitio
1. Copia la URL que te dio Vercel.
2. Vuelve a **Settings → Environment Variables**, edita `SITE_URL` y pega esa
   URL (sin "/" al final).
3. Ve a la pestaña **Deployments** y dale a **Redeploy** para que tome el cambio.

## 5. Prueba el pago
1. Abre tu tienda publicada, agrega productos al carrito y dale a
   **Finalizar compra**.
2. Te va a llevar a la pantalla de pago de Mercado Pago. Como usaste el
   access token de PRUEBA, puedes pagar con estas tarjetas ficticias:
   - Visa: `4509 9535 6623 3704` — cualquier fecha futura y CVV `123`
   - Nombre del titular: `APRO` (para que el pago se apruebe automáticamente)
3. Si todo sale bien, te redirige a tu página de "¡Pago exitoso!".

## 6. Pasa a producción (cuando quieras cobrar de verdad)
1. En Mercado Pago, activa tu cuenta como vendedor real (piden datos del
   negocio y una cuenta bancaria para recibir el dinero).
2. Copia tu **Access Token de PRODUCCIÓN** (empieza con `APP_USR-...`).
3. En Vercel, reemplaza el valor de `MP_ACCESS_TOKEN` por ese token de
   producción y vuelve a hacer **Redeploy**.
4. Listo — desde ese momento los pagos son reales.

## ¿Qué hace cada archivo?
- `index.html` → tu tienda (catálogo, carrito, clases, comunidad).
- `api/create-preference.js` → función que le pide a Mercado Pago un link de
  pago seguro por el monto exacto del carrito. El access token vive solo
  aquí, nunca en el HTML.
- `exito.html`, `error.html`, `pendiente.html` → pantallas a las que
  Mercado Pago redirige según el resultado del pago.
- `package.json` → indica que el proyecto necesita el paquete `mercadopago`.

## Notas importantes
- Yape y Plin aparecen automáticamente como método de pago dentro del
  checkout de Mercado Pago para cuentas peruanas — no necesitas configurar
  nada extra.
- Mercado Pago cobra una comisión por cada venta (revisa el porcentaje
  vigente en tu panel, ya que puede cambiar).
- Si en algún momento el botón de pago da error, revisa primero que
  `MP_ACCESS_TOKEN` y `SITE_URL` estén bien configurados en Vercel.
