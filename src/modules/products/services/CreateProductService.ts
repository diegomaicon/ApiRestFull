import { Any, getCustomRepository } from "typeorm";
import ProductRepository  from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Protuct";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const redisCache = RedisCache;
    const productRepository = getCustomRepository(ProductRepository);
    const productExist = await productRepository.findByName(name);
    if (productExist) {
      throw new AppError('There is alresdy one product with this name');
    }
    const product = productRepository.create({
        name,price,quantity
    });

    await redisCache.invalidate(process.env.REDIS_PRODUCT_KEY as string);
    await productRepository.save(product);

    return product;
  }
}
export default CreateProductService
