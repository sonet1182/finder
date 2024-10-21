// pages/api/payment.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant',
      {
        app_key: req.body.app_key,
        app_secret: req.body.app_secret,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'username': req.body.username,
          'password': req.body.password,
        }
      }
    );
    res.status(200).json(tokenResponse.data);
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
