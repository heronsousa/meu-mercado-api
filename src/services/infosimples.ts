import axios from "axios";

const INFOSIMPLES_URL =
  "https://api.infosimples.com/api/v2/consultas/sefaz/go/nfce-completa";
const API_KEY = process.env.INFOSIMPLES_API_KEY;

export async function getInvoice(nfce_key: string) {
  try {
    const response = await axios.get(INFOSIMPLES_URL, {
      params: {
        token: API_KEY,
        nfce: nfce_key,
      },
    });

    return response.data.data[0]
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw err;
  }
}
