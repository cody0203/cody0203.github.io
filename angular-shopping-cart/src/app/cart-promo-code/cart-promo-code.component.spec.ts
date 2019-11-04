import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPromoCodeComponent } from './cart-promo-code.component';

describe('CartPromoCodeComponent', () => {
  let component: CartPromoCodeComponent;
  let fixture: ComponentFixture<CartPromoCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPromoCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
