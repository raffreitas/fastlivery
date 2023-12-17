import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';
import { ProductRepository } from '@/domain/product/application/repositories/product.repository';
import { OrderItem } from '../../enterprise/entities/order-item';
import { Order, OrderStatus } from '../../enterprise/entities/order.entity';
import { OrderRepository } from '../repositories/order-repository';
import { Either, left, right } from '@/@common/either';
import { ResourceNotFoundError } from '@/@common/errors';
import { InsufficientProductQuantityError } from './errors/insufficient-product-quantity.error';

export interface CreateOrderInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

type CreateOrderOutput = Either<ResourceNotFoundError | InsufficientProductQuantityError, { order: Order }>;

export class CreateOrderUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute({ customerId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      return left(new ResourceNotFoundError('Customer'));
    }

    const products = await this.productRepository.findByIds(items.map((item) => item.productId));

    const orderItemsOrError = items.map((item): Either<ResourceNotFoundError | InsufficientProductQuantityError, OrderItem> => {
      const product = products?.find((product) => product.id.toString() === item.productId);

      if (!product) {
        return left(new ResourceNotFoundError('Product'));
      }

      if (product.quantity < item.quantity) {
        return left(new InsufficientProductQuantityError());
      }

      const orderItem = OrderItem.create({
        productId: item.productId,
        price: product.price,
        quantity: item.quantity,
      });

      return right(orderItem);
    });

    let orderItems: OrderItem[] = [];
    try {
      orderItems = orderItemsOrError.map((item) => {
        if (item.isLeft()) {
          throw item.value;
        }

        return item.value;
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return left(error);
      }
      if (error instanceof InsufficientProductQuantityError) {
        return left(error);
      }

      throw error;
    }

    const order = Order.create({
      customerId: customer.id,
      status: OrderStatus.PENDING,
      items: orderItems,
    });

    await this.orderRepository.create(order);

    return right({ order });
  }
}
