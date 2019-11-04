import { Injectable } from "@angular/core";
import { Product } from "./Product";
import { PRODUCTS } from "./mocks-products";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor() {}
  products: Product[] = PRODUCTS;
  updateQuantity(id: number, quantity: number) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      product.quantity = quantity || 0;
    }
  }

  removeProduct(id: number) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }

    return false;
  }
}
