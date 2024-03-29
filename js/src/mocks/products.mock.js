import { faker } from "@faker-js/faker";

faker.location = 'es';

export const createFakerProducts = () => {
    const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({min: 100, max: 10000}),
        status: faker.number.int({min: 0, max: 1}),
        code: faker.number.int(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        thumbnails: [faker.image.url({width: 200, height: 200})],
        _id: faker.database.mongodbObjectId()
    };
    return product;
}