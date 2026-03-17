import { NfceRepository } from '../repositories/nfce.repository';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryService } from "./category.service";
import { InfoSimplesApiService } from './infosimples-api.service';
import { parseDate } from '../lib/utils';
import { NfceAlreadyExistsError } from '../errors/nfce-already-exists';
import { db } from '../database/connection';

export class NfceService {
  constructor(
    private nfceRepository: NfceRepository,
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
    private infoSimplesApiService: InfoSimplesApiService,
  ) {}

  async createFromKey(nfceKey: string, userId: string) {
    const existingNfce = await this.nfceRepository.findByKey(nfceKey);
    if (existingNfce) {
      throw new NfceAlreadyExistsError();
    }

    const invoice = await this.infoSimplesApiService.getInvoice(nfceKey);

    return await db.transaction(async (tx) => {
      const newNfce = await this.nfceRepository.create({
        key: invoice.normalizado_chave_acesso,
        store: invoice.emitente?.nome_fantasia,
        city: invoice.emitente?.municipio.split("-")[1].trim(),
        state: invoice.emitente?.uf,
        neighborhood: invoice.emitente?.bairro,
        date: parseDate(invoice.nfe.data_emissao)!,
        totalPrice: invoice.cobranca.formas_pagamento[0].valor.replace(",", "."),
        paymentMethod: invoice.cobranca.formas_pagamento[0].meio_pagamento
          .split("-")[1]
          .trim(),
        userId,
      });

      const categoryMap = await this.categoryService.categorizeProducts(
        invoice.produtos.map((p) => ({ ncm: p.ncm })),
      );

      const products = await this.productRepository.createMany(
        invoice.produtos.map((product) => ({
          description: product.descricao,
          ncm: product.ncm,
          price: product.normalizado_valor.toString(),
          qtd: product.qtd.toString(),
          unity: product.unidade,
          nfceId: newNfce.id,
          categoryId: categoryMap.get(product.ncm)!,
        })),
      );

      return { nfce: newNfce, products };
    });
  }

  async getSummary() {
    return await this.nfceRepository.getSummary();
  }
}