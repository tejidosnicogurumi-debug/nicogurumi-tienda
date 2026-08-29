// api/create-preference.js
// Función serverless (Vercel) que crea una "preferencia de pago" en Mercado Pago
// y devuelve el link de checkout (init_point) al que redirigimos al comprador.
//
// La clave secreta (MP_ACCESS_TOKEN) NUNCA va en el HTML: vive solo aquí,
// como variable de entorno en el servidor.

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const siteUrl = process.env.SITE_URL; // ej: https://nicogurumi.vercel.app

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          title: String(item.name).slice(0, 250),
          quantity: Number(item.qty) || 1,
          unit_price: Number(item.price),
          currency_id: 'PEN',
        })),
        back_urls: {
          success: `${siteUrl}/exito.html`,
          failure: `${siteUrl}/error.html`,
          pending: `${siteUrl}/pendiente.html`,
        },
        auto_return: 'approved',
        statement_descriptor: 'NICOGURUMI',
      },
    });

    return res.status(200).json({ init_point: result.init_point });
  } catch (err) {
    console.error('Error creando preferencia de Mercado Pago:', err);
    return res.status(500).json({ error: 'No se pudo generar el pago. Intenta de nuevo.' });
  }
}
