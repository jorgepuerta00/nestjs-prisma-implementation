import { Customer } from "src/lib/entities/customer.entity";

export interface CustomerUseCaseInterface {
  execute(): Promise<Customer[]>;
}