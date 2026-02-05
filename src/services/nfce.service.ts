import { NfceRepository } from '../repositories/nfce.repository';
import { ProductRepository } from '../repositories/product.repository';
import { InfoSimplesApiService } from './infosimples-api.service';
import { parseDate } from '../lib/utils';
import { NfceAlreadyExistsError } from '../errors/nfce-already-exists';

export class NfceService {
  constructor(
    private nfceRepository: NfceRepository,
    private productRepository: ProductRepository,
    private infoSimplesApiService: InfoSimplesApiService
  ) {}

  async createFromKey(nfceKey: string, userId: string) {
    const existingNfce = await this.nfceRepository.findByKey(nfceKey);
    if (existingNfce) {
      throw new NfceAlreadyExistsError();
    }

    const invoice = await this.infoSimplesApiService.getInvoice(nfceKey);

    const newNfce = await this.nfceRepository.create({
      key: invoice.normalizado_chave_acesso,
      store: invoice.emitente?.nome_fantasia,
      city: invoice.emitente?.municipio.split('-')[1].trim(),
      state: invoice.emitente?.uf,
      neighborhood: invoice.emitente?.bairro,
      date: parseDate(invoice.nfe.data_emissao)!,
      totalPrice: invoice.cobranca.formas_pagamento[0].valor.replace(',', '.'),
      paymentMethod: invoice.cobranca.formas_pagamento[0].meio_pagamento
        .split('-')[1]
        .trim(),
      userId,
    });

    const products = await this.productRepository.createMany(
      invoice.produtos.map(produto => ({
        description: produto.descricao,
        ncm: produto.ncm,
        price: produto.normalizado_valor.toString(),
        qtd: produto.qtd.toString(),
        unity: produto.unidade,
        nfceId: newNfce.id,
        categoryId: 'default-category-id',
      }))
    );

    return { nfce: newNfce, products };
  }

  async getSummary() {
    return await this.nfceRepository.getSummary();
  }
}