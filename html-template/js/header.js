class ShoppingCartHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let totalProductsInBag = this.props.products.reduce((a, b) => {
      return a + b.quantity;
    }, 0)
    const header = (
      <header className="container">
        <h1>Shopping Cart</h1>
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>
        <span className="count">
          {totalProductsInBag} items in the bag
        </span>
      </header>
    );
    return header;
  }
}
