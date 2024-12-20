import { Any, getCustomRepository } from "typeorm";
import  ProductRepository  from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
interface IRequest {
  id: string;
}
class DeleteProductService {
  public async execute({ id }:IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = RedisCache;

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.')
    }
    await redisCache.invalidate(process.env.REDIS_PRODUCT_KEY as string);
    await productRepository.remove(product);

  }
}
export default DeleteProductService
