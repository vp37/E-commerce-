import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../component/axios/CardProvider";  // Import CartContext for cart-related methods
import '../css/ProductDetail.css';
import { getProduct } from "../component/axios/Service"; // Import the getProduct function

const ProductDetail = () => {
  const { productId } = useParams();  // Get the product ID from URL
  const [product, setProduct] = useState(null);  // Store product data
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();  // Cart context methods

  useEffect(() => {
    // Fetch product details using .then() and .catch()
    getProduct(productId)
      .then((response) => {
        setProduct(response.data);  // Set product data from the response
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);  // Re-run effect when productId changes

  const iconClick = () => {
    navigate('/'); // Navigate to homepage when clicking the arrow icon
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);  // Check if product is in the cart
  };

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <div className="producticons" onClick={iconClick}><FaArrowLeft /> </div>
          <div className="productdetailimg">
            <img src={product.image} alt={product.title} />  {/* Display product image */}
          </div>
          <div className="productdes">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>Price: </strong>${product.price}</p>

            {isInCart(product.id) ? (
              <button
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => removeFromCart(product.id)} // Remove from cart
              >
                Remove from Cart
              </button>
            ) : (
              <button onClick={() => addToCart(product)} style={{backgroundColor:'green', color:'white'}}>Add to Cart</button>  // Add to cart
            )}
          </div>
        </div>
      ) : (
        <div>Loading product details...</div> 
      )}
    </div>
  );
};

export default ProductDetail;
