class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "",
          image: "",
          description: "",
          price: 0,
          quantity: 0
        }
      ]
    }
  }

  render() {
      
    return (
      <section className="container">
        <ul className="products">
          <li className="row">
            <div className="col left">
              <div className="thumbnail">
                <a href="#">
                  <img src="https://via.placeholder.com/200x150" alt="img" />
                </a>
              </div>
              <div className="detail">
                <div className="name"><a href="#">PRODUCT ITEM NUMBER 1</a></div>
                <div className="description">
                  Description for product item number 1
              </div>
                <div className="price">$5.99</div>
              </div>
            </div>
            <div className="col right">
              <div className="quantity">
                <input type="number" className="quantity" step={1} defaultValue={2} />
              </div>
              <div className="remove">
                <svg version="1.1" className="close" xmlns="//www.w3.org/2000/svg" xmlnsXlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enableBackground="new 0 0 60 60" xmlSpace="preserve">
                  <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                </svg>
              </div>
            </div>
          </li>
          <li className="row">
            <div className="col left">
              <div className="thumbnail">
                <a href="#">
                  <img src="https://via.placeholder.com/200x150" alt="img" />
                </a>
              </div>
              <div className="detail">
                <div className="name"><a href="#">PRODUCT ITEM NUMBER 2</a></div>
                <div className="description">
                  Description for product item number 2
              </div>
                <div className="price">$9.99</div>
              </div>
            </div>
            <div className="col right">
              <div className="quantity">
                <input type="number" className="quantity" step={1} defaultValue={1} />
              </div>
              <div className="remove">
                <svg version="1.1" className="close" xmlns="//www.w3.org/2000/svg" xmlnsXlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enableBackground="new 0 0 60 60" xmlSpace="preserve">
                  <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </section>
      )
    } 
}