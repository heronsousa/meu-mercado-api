import { NfceRepository } from './repositories/nfce.repository';
import { ProductRepository } from './repositories/product.repository';
import { InfoSimplesApiService } from './services/infosimples-api.service';
import { NfceService } from './services/nfce.service';
import { NfceController } from './controllers/nfce.controller';

// Repositories
const nfceRepository = new NfceRepository();
const productRepository = new ProductRepository();

// Services
const infoSimplesApiService = new InfoSimplesApiService();
const nfceService = new NfceService(nfceRepository, productRepository, infoSimplesApiService);

// Controllers
export const nfceController = new NfceController(nfceService);