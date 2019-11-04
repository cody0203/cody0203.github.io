import { Component, DoCheck } from "@angular/core";
import { ProductService } from "./product.service";
import { PromoCodeService } from "./promo-code.service";
import { Product } from "./Product";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements DoCheck {
  constructor(
    public productService: ProductService,
    public promocodeService: PromoCodeService
  ) {
    this.products = this.productService.products;
  }
  products: Product[];
  totalQuantity: number = 0;
  subTotal: number = 0;
  tax: number = 5;
  discountCount: number = 0;
  discount: number = 0;

  ngDoCheck() {
    this.totalQuantity = this.products.reduce((acc, products) => {
      return acc + products.quantity;
    }, 0);
    this.subTotal = this.products.reduce((acc, products) => {
      return acc + products.price * products.quantity;
    }, 0);
    this.discount = this.subTotal * this.discountCount;
  }

  quantityChangeHandler(product: { id: number; quantity: number }): void {
    this.productService.updateQuantity(product.id, product.quantity);
  }

  removeProduct(product: { id: number }) {
    this.productService.removeProduct(product.id);
  }

  applyPromoCode(code: string) {
    this.discountCount = this.promocodeService.applyPromoCode(code);
    this.discount = this.subTotal * this.discountCount;
    if (this.discount > 0) {
      alert(`The promotional code was applied.`);
    } else {
      alert(
        'Sorry, the promotional code you entered is not valid! Try code "Autumn" (discount 10% to all cart items), "Winter" (discount 30% to all cart items), "Spring (discount 20% to all cart items) or "Summer" (discount 50% to all cart items).'
      );
    }
  }
}
