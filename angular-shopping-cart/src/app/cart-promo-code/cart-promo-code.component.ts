import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart-promo-code",
  templateUrl: "./cart-promo-code.component.html",
  styleUrls: ["./cart-promo-code.component.css"]
})
export class CartPromoCodeComponent {
  promoCode: string;

  @Output() applyPromoCode = new EventEmitter();

  applyPromoCodeHandler() {
    const code = this.promoCode;
    if (code && code.trim() !== "") {
      this.applyPromoCode.emit(code);
    }
  }
}
