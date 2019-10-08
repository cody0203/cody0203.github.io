class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: "",
      input: "",
      promoCodeList: {
        "Autumn": 200000,
        "Winter": 500000,
        "Spring": 150000,
        "Summer": 300000
      }
    }
    this.isPromoCodeValid = this.isPromoCodeValid.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      promoCode: "launched"
    })
  }

  handleChange(e) {
    this.setState({
      input: event.target.value
    })
  }

  isPromoCodeValid() {
    this.setState({
      promoCode: this.state.input
    })
  }
  render() {
    let products = this.props.products;
    const subTotal = products.reduce((a, b) => {
      return a + b.price * b.quantity
    }, 0)
    const tax = 50000;
    let totalPrice;
    const currentPromoCode = this.state.promoCode;
    const promoCodeList = this.state.promoCodeList;
    let discountPrice = promoCodeList[currentPromoCode];
    if (promoCodeList.hasOwnProperty(currentPromoCode)) {
      totalPrice =
        <div>
          <li>Discount <span>{convertPrice(discountPrice)}</span></li>
          < li className="total">
            Total <span>{convertPrice(subTotal + tax - discountPrice)}</span>
          </li>
        </div>
    } else {
      totalPrice =
        <li className="total">
          Total <span>{convertPrice(subTotal + tax)}</span>
        </li>
    }
    let invalidPromoCode = <div className="invalid-message">Invalid Promo Code!!!</div>;
    let checkout;
    if (products.length == 0) {
      checkout = (
        <div className="empty-product">
          <h3>There are no products in your cart.</h3>
          <button>Shopping now</button>
        </div>
      )
    } else {
      checkout = (
        <section className="container">
          <div className="promotion">
            <label htmlFor="promo-code">Have A Promo Code?</label>
            <input type="text" id="promo-code" onChange={this.handleChange} /> <button type="button" onClick={this.isPromoCodeValid} />
            {(!promoCodeList.hasOwnProperty(currentPromoCode) && currentPromoCode !== "launched") && invalidPromoCode}
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
    }
    return checkout;
  }
}
