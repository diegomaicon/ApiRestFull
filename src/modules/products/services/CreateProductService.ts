import { Any, getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entites/Protuct";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity}: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExist = await productRepository.findByName(name);
    if (productExist) {
      throw new AppError('There is alresdy one product with this name');
    }
    const product = productRepository.create({
        name,price,quantity
    });

    await productRepository.save(product);

    return product;
  }
}
export default CreateProductService
