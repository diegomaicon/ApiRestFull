import { Any, getCustomRepository } from "typeorm";
import OrderRepository from "../typeorm/repositories/OrdersRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";

interface IProduct {
  id: string;
  quantity: number;
}


interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products}: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrderRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customers with the given id.');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existesProductsIds = existsProducts.map(product => product.id);

    const checkInexists = products.filter(
      product => !existesProductsIds.includes(product.id)
    );

    if (checkInexists.length) {
      throw new AppError(`Could not find product: ${checkInexists[0].id}`);
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantiru: ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`);
    }

    const selializeProducts = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: existsProducts.filter(p => product.id)[0].price
      })
    );

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: selializeProducts
    });

    const { order_products } = order;

    const updateProductQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity:
          existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
      })
    );

    console.log(updateProductQuantity);

    await productsRepository.save(updateProductQuantity);

    return order;
  }
}
export default CreateOrderService
