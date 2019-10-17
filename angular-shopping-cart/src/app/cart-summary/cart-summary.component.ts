import { Component, Input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  templateUrl: "./cart-summary.component.html",
  styleUrls: ["./cart-summary.component.css"]
})
export class CartSummaryComponent {
  constructor() {}

  @Input() subTotal: number;
  @Input() tax: number;
  @Input() discount: number;
}
