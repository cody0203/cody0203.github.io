class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: "",
      invalid: "",
      promoDiscount: 200000
    }
    this.isPromoCodeValid = this.isPromoCodeValid.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      promoCode: event.target.value
    })
  }

  isPromoCodeValid() {
    if (this.state.promoCode !== "Autumn") {
      this.setState({
        invalid: true
      })
    } else {
      this.setState({
        invalid: false
      })
    }
  }
  render() {
    const subTotal = this.props.products.reduce((a, b) => {
      return (a + b.price) * b.quantity
    }, 0)
    const tax = 50000;
    let totalPrice;
    if (this.state.invalid === false) {
      totalPrice = <div>
        <li>Subtotal <span>{convertPrice(this.state.promoDiscount)}</span></li>
        < li className="total">
          Total <span>{convertPrice(subTotal + tax - this.state.promoDiscount)}</span>
        </li>
      </div>
    } else {
      totalPrice = < li className="total">
        Total <span>{convertPrice(subTotal + tax)}</span>
      </li>
    }
    let invalidPromoCode = <div className="invalid-message">Invalid Promo Code!!!</div>;
    const checkout = (
      <section className="container">
        <div className="promotion">
          <label htmlFor="promo-code">Have A Promo Code?</label>
          <input type="text" id="promo-code" onChange={this.handleChange} /> <button type="button" onClick={this.isPromoCodeValid} />
          {this.state.invalid == true && invalidPromoCode}
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
      </section >
    );
    return checkout;
  }
}
