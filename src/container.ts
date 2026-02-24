import { NfceRepository } from './repositories/nfce.repository';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { InfoSimplesApiService } from './services/infosimples-api.service';
import { CategoryService } from './services/category.service';
import { NfceService } from './services/nfce.service';
import { NfceController } from './controllers/nfce.controller';

// Repositories
const nfceRepository = new NfceRepository();
const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

// Services
const infoSimplesApiService = new InfoSimplesApiService();
const categoryService = new CategoryService(categoryRepository);
const nfceService = new NfceService(
  nfceRepository,
  productRepository,
  categoryService,
  infoSimplesApiService
);

// Controllers
export const nfceController = new NfceController(nfceService);