import { Any, getCustomRepository } from "typeorm";
import ProductRepository  from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Protuct";
import AppError from "@shared/errors/AppError";
interface IRequest {
  id: string;
}
class ShowProductService {
  public async execute({ id }:IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.')
    }

    return product;
  }
}
export default ShowProductService
