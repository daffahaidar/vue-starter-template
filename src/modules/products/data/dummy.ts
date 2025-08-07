import { faker } from '@faker-js/faker'

export const dummyProductData = Array.from({ length: 100 }, (_, index) => ({
  product_id: index + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseInt(faker.commerce.price({ min: 10000, max: 50000000 })),
  stock_quantity: faker.number.int({ min: 0, max: 100 }),
}))
