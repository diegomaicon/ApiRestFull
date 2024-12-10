import { EntityRepository, EntityRepository, Repository } from "typeorm";
import Product from '../entites/Protuct'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
  public async findByName(name: String): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name
      }
    })

    return product;
  }
}
