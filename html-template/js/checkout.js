class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let products = this.props.products;
    const subTotal = products.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);
    const tax = 50000;
    let totalPrice;
    const promoCode = this.props.promoCode;
    const promoCodeList = this.props.promoCodeList;
    let discountPrice = promoCodeList[promoCode];
    if (promoCodeList.hasOwnProperty(promoCode)) {
      totalPrice = (
        <div>
          <li>
            Discount <span>{convertPrice(discountPrice)}</span>
          </li>
          <li className="total">
            Total <span>{convertPrice(subTotal + tax - discountPrice)}</span>
          </li>
        </div>
      );
    } else {
      totalPrice = (
        <li className="total">
          Total <span>{convertPrice(subTotal + tax)}</span>
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
            <input
              type="text"
              id="promo-code"
              onChange={this.props.handleChange}
            />{" "}
            <button type="button" onClick={this.props.isPromoCodeValid} />
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
                Tax <span>{convertPrice(tax)}</span>
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
  }
}
