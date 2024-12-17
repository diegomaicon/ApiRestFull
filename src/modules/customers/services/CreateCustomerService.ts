import { Any, getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";



interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email}: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const emailExist = await customerRepository.findByEmail(email);

     if (emailExist) {
      throw new AppError('Email address already used.');
    }

    const customer = customerRepository.create({
        name, email
    });

    await customerRepository.save(customer);

    return customer;
  }
}
export default CreateCustomerService
