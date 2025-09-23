export type NFCE = {
  normalizado_chave_acesso: string;
  emitente: {
    nome_fantasia: string;
    municipio: string;
    uf: string;
    bairro: string;
  };
  nfe: {
    data_emissao: string
  };
  cobranca: {
    formas_pagamento: {
      valor: string;
      meio_pagamento: string;
    }[]
  };
  produtos: {
    descricao: string,
    ncm: string,
    normalizado_valor: number,
    qtd: number,
    unidade: string,
  }[]
}