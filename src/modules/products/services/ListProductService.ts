import { Any, getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Protuct";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return products;
  }
}
export default ListProductService
