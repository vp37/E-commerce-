import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShippingFast } from "react-icons/fa";
import { useCart } from "../axios/CardProvider";
import Cookies from "js-cookie"; // Import Cookies to handle login state

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Get login status from cookies
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";
  
  // Retrieve the username from localStorage if the user is logged in
  const username = isLoggedIn ? localStorage.getItem("username") : null;

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("isLoggedIn"); 
    
    navigate("/"); 
  };

  return (
    <div className="navcontainer1">
      {/* Announcement Section */}
      <div className="announcontainer">
        <h1><FaShippingFast /> Free Delivery</h1>
        <h1>Welcome Offer: 20% Off</h1>     
        <h1>Free Returns</h1>
      </div>

      {/* Navbar Section */}
      <div className="navwrapper">
        <div className="navleft">
          <span className="store">VP</span>
          <div className="navsearch">
            <input type="text" placeholder="Search" />
            <IoSearchSharp className="searchIcon" />
          </div>
        </div>

        <div className="navcenter">
          <h1 className="navlogo">Rise of Product</h1>
        </div>

        <div className="navright">
          {isLoggedIn ? (
            // Show "Logout" if the user is logged in
            <>
              <div className="navmenuitem">
                <span className="navlink" onClick={handleLogout}>Logout</span>
              </div>
              <div className="navmenuitem">
                <span className="navlink">{username}</span> {/* Display the username */}
              </div>
            </>
          ) : (
            // Show "Login" and "Register" if the user is not logged in
            <>
              <div className="navmenuitem">
                <NavLink to="/register" className="navlink">Register</NavLink>
              </div>
              <div className="navmenuitem">
                <NavLink to="/login" className="navlink">Login</NavLink>
              </div>
            </>
          )}
          <div className="navmenuitem">
            <NavLink to="/cart" className="navlink">
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              <LuShoppingCart className="cartIcon" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
