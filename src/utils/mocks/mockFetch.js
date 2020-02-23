import { products } from './mocks.js';

export const mockFetch = async () => {
  await setTimeout(() => {}, 500);

  // return products;
  return Promise.reject({status: 500})
}
