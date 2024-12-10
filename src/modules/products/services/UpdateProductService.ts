import { Any, getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entites/Protuct";
import AppError from "@shared/errors/AppError";
interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute({ id, name, price, quantity }:IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.')
    }

    const productExist = await productRepository.findByName(name);

    if (productExist && name != product.name) {
      throw new AppError('There is alresdy one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}
export default UpdateProductService
