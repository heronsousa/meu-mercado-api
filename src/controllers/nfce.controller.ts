import { Request, Response } from 'express';
import { NfceService } from '../services/nfce.service';
import { NfceKeyNotProvidedError } from '../errors/nfce-key-not-provided';
import { StatusCodes } from '../errors/constants/status-code';

export class NfceController {
  constructor(private nfceService: NfceService) {}

  async create(req: Request, res: Response) {
    const { nfce_key } = req.body;

    if (!nfce_key) {
      throw new NfceKeyNotProvidedError();
    }

    const result = await this.nfceService.createFromKey(nfce_key, 'temp-user-id');
    res.status(StatusCodes.CREATED).json(result);
  }

  async getSummary(req: Request, res: Response) {
    const result = await this.nfceService.getSummary();
    res.status(StatusCodes.OK).json(result);
  }
}