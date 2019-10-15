import { Component, DoCheck } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "./Product";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements DoCheck {
  constructor(public productService: ProductService) {
    this.products = this.productService.products;
  }
  products: Product[];
  totalQuantity: number = 0;
  subTotal: number = 0;
  tax: number = 5;

  ngDoCheck() {
    this.totalQuantity = this.products.reduce((acc, products) => {
      return acc + products.quantity;
    }, 0);
    this.subTotal = this.products.reduce((acc, products) => {
      return acc + products.price;
    }, 0);
  }

  quantityChangeHandler(product: { id: number; quantity: number }): void {
    this.productService.updateQuantity(product.id, product.quantity);
  }

  removeProduct(product: { id: number }) {
    this.productService.removeProduct(product.id);
  }
}
