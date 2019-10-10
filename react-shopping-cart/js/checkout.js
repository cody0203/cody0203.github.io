const Checkout = props => {
  let products = props.products;
  const subTotal = products.reduce((a, b) => {
    return a + b.price * b.quantity;
  }, 0);
  const vat = subTotal * 0.1;
  let totalPrice;
  const promoCode = props.promoCode;
  const promoCodeList = props.promoCodeList;
  let discountPrice = promoCodeList[promoCode] * subTotal;
  if (promoCodeList.hasOwnProperty(promoCode)) {
    totalPrice = (
      <div>
        <li>
          Discount <span>{convertPrice(discountPrice)}</span>
        </li>
        <li className="total">
          Total <span>{convertPrice(subTotal + vat - discountPrice)}</span>
        </li>
      </div>
    );
  } else {
    totalPrice = (
      <li className="total">
        Total <span>{convertPrice(subTotal + vat)}</span>
      </li>
    );
  }
  let invalidPromoCode = (
    <div className="invalid-message">Invalid Promo Code!!!</div>
  );
  let checkout;
  if (products.length == 0) {
    checkout = (
      <div className="empty-product">
        <h3>There are no products in your cart.</h3>
        <button>Shopping now</button>
      </div>
    );
  } else {
    checkout = (
      <section className="container">
        <div className="promotion">
          <label htmlFor="promo-code">Have A Promo Code?</label>
          <input type="text" id="promo-code" onChange={props.handleChange} />
          <button type="button" onClick={props.isPromoCodeValid} />
          {!promoCodeList.hasOwnProperty(promoCode) &&
            promoCode !== undefined &&
            invalidPromoCode}
        </div>
        <div className="summary">
          <ul>
            <li>
              Subtotal <span>{convertPrice(subTotal)}</span>
            </li>
            <li>
              VAT(10%) <span>{convertPrice(vat)}</span>
            </li>
            {totalPrice}
          </ul>
        </div>
        <div className="checkout">
          <button type="button">Check Out</button>
        </div>
      </section>
    );
  }
  return checkout;
};

Checkout.propTypes = {
  products: PropTypes.array,
  promoCode: PropTypes.string,
  promoCodeList: PropTypes.object,
  handleChange: PropTypes.func,
  isPromoCodeValid: PropTypes.func
}