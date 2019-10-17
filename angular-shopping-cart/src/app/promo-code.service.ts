import { Injectable } from "@angular/core";
import { PROMOCODES } from "./mocks-promoCodes";

@Injectable({
  providedIn: "root"
})
export class PromoCodeService {
  constructor() {}

  applyPromoCode(code: string): number {
    const promoCode = PROMOCODES.find(promoCode => promoCode.code === code);
    if (promoCode) {
      return promoCode.discount;
    }
    return 0;
  }
}
