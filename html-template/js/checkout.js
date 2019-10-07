function Checkout() {
    const checkout =
        <section className="container">
            <div className="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input type="text" id="promo-code" /> <button type="button" />
            </div>
            <div className="summary">
                <ul>
                    <li>Subtotal <span>$21.97</span></li>
                    <li>Tax <span>$5.00</span></li>
                    <li className="total">Total <span>$26.97</span></li>
                </ul>
            </div>
            <div className="checkout">
                <button type="button">Check Out</button>
            </div>
        </section>;
    return checkout;
}