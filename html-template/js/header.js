function ShoppingCartHeader(props) {
  const header =
    <header className="container">
      <h1>Shopping Cart</h1>
      <ul className="breadcrumb">
        <li>Home</li>
        <li>Shopping Cart</li>
      </ul>
      <span className="count">3 items in the bag</span>
    </header>;
  return header
}