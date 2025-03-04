import { useCart } from "../component/axios/CardProvider"; // Ensure correct path
import CartImg from "../images/cart.png"; 
import { useNavigate } from "react-router-dom";
import '../css/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const cartContext = useCart();

  if (!cartContext) {
    return <p>Loading...</p>;
  }

  const { cart, removeFromCart } = cartContext;

  // Calculate the total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  const goToPayment = () => {
    navigate("/home"); // Navigate to Payment Page
  };

  

  return (
    <>
      <div className="cart-container">
        <h1>Cart Products</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src={CartImg} alt="Empty Cart" width={250} />
            <p>Your cart is empty!</p>
            <button className="search-btn" onClick={() => navigate("/")}>
              Search Product
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-product">
                <div className="cartimg">
                  <img src={item.image || CartImg} alt={item.name} width={100} />
                </div>
                <div className="product-detail">
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="total-price">
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            <button className="checkout-btn" onClick={goToPayment}>
              Proceed to Payment Method
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
