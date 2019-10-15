import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart-products",
  templateUrl: "./cart-products.component.html",
  styleUrls: ["./cart-products.component.css"]
})
export class CartProductsComponent {
  @Input() products;

  @Output() quantityChangeHandler = new EventEmitter();
  @Output() removeProduct = new EventEmitter();

  inputHandler(id: number, inputElement: HTMLInputElement) {
    const value = inputElement.value;
    const intValue = parseInt(value);

    if (intValue < 1) {
      inputElement.value = -intValue + "";
    } else if (value.length > 2) {
      inputElement.value = value.slice(0, 2);
    }

    this.quantityChangeHandler.emit({
      id,
      quantity: parseInt(inputElement.value) || ""
    });
  }

  onRemoveHandler(id: number) {
    this.removeProduct.emit({
      id
    });
  }
}
