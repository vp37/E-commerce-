import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import  Cart  from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import { CartProvider } from '../component/axios/CardProvider';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <PrivateRoute />, // This will protect the routes
      children: [
        {
          path: '/',
          element: <Layout />, // Layout will wrap around Home
          children: [
            {
              path: '/',
              element: <Home />, // This is the Home component shown inside the Layout
            },
            {
                path: '/cart',
                element: <Cart />, // This is the Home component shown inside the Layout
              },
              {
                path: '/product/:productId', // Dynamic route for product detail
                element: <ProductDetail />,
              },
          ],
        },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />;
    </CartProvider>

  
)};

export default Router;
