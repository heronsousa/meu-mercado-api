import axios from "axios";
import { ErrorGetNfceDataError } from "../functions/errors/error-get-nfce-data";

const INFOSIMPLES_URL =
  "https://api.infosimples.com/api/v2/consultas/sefaz/go/nfce-completa";

export async function getInvoice(nfce_key: string) {
  try {
    const response = await axios.get(INFOSIMPLES_URL, {
      params: {
        token: process.env.INFOSIMPLES_API_KEY,
        nfce: nfce_key,
      },
    });

    if (!response.data.data.length) {
      throw new ErrorGetNfceDataError();
    }

    return response.data.data[0];
  } catch (err: any) {
    throw new ErrorGetNfceDataError();
  }
}
