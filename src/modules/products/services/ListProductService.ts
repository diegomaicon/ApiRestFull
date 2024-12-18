import { Any, getCustomRepository } from "typeorm";
import ProductRepository  from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Protuct";
import RedisCache from "@shared/cache/RedisCache";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>(process.env.REDIS_PRODUCT_KEY as string);

    if (!products) {
      products = await productRepository.find();
      await redisCache.save(process.env.REDIS_PRODUCT_KEY as string, products);
    }

    return products;
  }
}
export default ListProductService

