import "./OrderHistoryCard.css";

const OrderHistoryCard = () => {
  return (
    <article>
      <section className="orderHistory-order-card">
        <div className="orderHistory-order-card-title">Order ID: 334902461</div>
        <div className="orderHistory-order-card-date">
          <span>Order date:</span> &nbsp;<span>Feb 16, 2022</span>
        </div>
        <div className="orderHistory-order-card-product">
          <figure>
            <img
              src="https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg"
              alt="car"
            />
          </figure>
          <div className="orderHistory-order-card-product-desc">
            <div className="orderHistory-order-card-product-desc-title">
              MacBook Pro 14"
            </div>
            <div>
              <span>Space Grey</span>
              <span>32GB</span>
              <span>1TB</span>
            </div>
          </div>
          <div className="orderHistory-order-card-product-price">
            <div>$2599.00</div>
            <div>Something</div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default OrderHistoryCard;