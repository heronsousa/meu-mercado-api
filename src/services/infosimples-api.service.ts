import axios from 'axios';
import { NFCE } from '../models/external';
import { ErrorGetNfceDataError } from '../errors/error-get-nfce-data';

export class InfoSimplesApiService {
  private readonly INFOSIMPLES_URL = 
    'https://api.infosimples.com/api/v2/consultas/sefaz/go/nfce-completa';

  async getInvoice(nfceKey: string): Promise<NFCE> {
    try {
      const response = await axios.get(this.INFOSIMPLES_URL, {
        params: {
          token: process.env.INFOSIMPLES_API_KEY,
          nfce: nfceKey,
        },
      });

      if (!response.data.data.length) {
        throw new ErrorGetNfceDataError();
      }

      return response.data.data[0];
    } catch (err) {
      throw new ErrorGetNfceDataError();
    }
  }
}