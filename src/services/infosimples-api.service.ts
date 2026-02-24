import axios from 'axios';
import { NFCE } from '../models/external';
import { ErrorGetNfceDataError } from '../errors/error-get-nfce-data';
import { INVOICE } from "./constants";

export class InfoSimplesApiService {
  private readonly INFOSIMPLES_URL = 
    'https://api.infosimples.com/api/v2/consultas/sefaz/go/nfce-completa';

  async getInvoice(nfceKey: string): Promise<NFCE> {
    try {
      const response = { data: INVOICE };

      if (!response.data.data.length) {
        throw new ErrorGetNfceDataError();
      }

      return response.data.data[0];
    } catch (err) {
      throw new ErrorGetNfceDataError();
    }
  }
}