import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategoryForProduct(ncm: string): Promise<string> {
    const category = await this.categoryRepository.findByNcm(ncm);
    
    if (category) {
      return category.id;
    }

    const defaultCategory = await this.categoryRepository.findDefault();
    return defaultCategory.id;
  }

  async categorizeProducts(products: Array<{ ncm: string }>): Promise<Map<string, string>> {
    const categoryMap = new Map<string, string>();
    
    for (const product of products) {
      if (!categoryMap.has(product.ncm)) {
        const categoryId = await this.getCategoryForProduct(product.ncm);
        categoryMap.set(product.ncm, categoryId);
      }
    }

    return categoryMap;
  }
}