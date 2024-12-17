import { EntityRepository, In, Repository } from "typeorm";
import Product from '../entities/Protuct'

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product>{
  public async findByName(name: String): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name
      }
    })

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsIds)
      }
    });

    return existsProducts;
  }
}
export default ProductRepository
