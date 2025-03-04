import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../component/axios/Service";  // Make sure the service path is correct
import styles from "../css/Home.module.css";  // Import CSS module

const Home = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.homecontainer}>
      {/* Company Description Section */}
      <div className={styles.companySection}>
        <h2>About Our Company</h2>
        <p>
          Welcome to <strong>VP Store</strong>, your one-stop destination for
          quality products at the best prices. We take pride in offering
          top-notch products that meet your needs, ensuring customer
          satisfaction is our priority. Explore our latest collection and enjoy
          hassle-free shopping!
        </p>
      </div>

      <div className={styles.homecard}>
        {/* Product Listing Section */}
        <div className={styles.productlist}>
          {product.length > 0 ? (
            product.map((item) => (
              <div
                key={item.id}
                className={styles.productItem}
                onClick={() => handleProductClick(item.id)}
              >
                <div className={styles.productImage}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.productInfo}>
                  <h3>{item.title}</h3>
                  <p className={styles.price}>Price: ${item.price}</p>
                  <p className={styles.description}>
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>

      {/* Product Description Section */}
      <div className={styles.productDescriptionSection}>
        <h2>Why Choose Our Products?</h2>
        <p>
          Our products are made with high-quality materials, ensuring durability
          and top performance. We constantly update our catalog to bring you
          the latest and most innovative products in the market. Whether you're
          looking for fashion, electronics, or home essentials, we've got you
          covered!
        </p>
      </div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> 123 Main Street, Chennai, Tamil Nadu, India</p>
        <p><strong>Email:</strong> vp@store.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p>
          <strong>Working Hours:</strong> Monday - Saturday: 9:00 AM - 7:00 PM
        </p>
      </div>
    </div>
  );
};

export default Home;
