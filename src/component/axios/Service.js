import Axios from "./Axios";

export const getProducts = () => {
  return Axios.get("/products"); 
};

export const getProduct = (productId) => {
  return Axios.get(`/products/${productId}`);  
};

