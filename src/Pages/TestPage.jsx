import React from 'react';
import CustomBadge from '../Components/Badge/CustomBadge';
import { useSelector } from "react-redux";


const TestPage = () => { 
  const cartItems = useSelector((state) => state.cart.cartItems)

  return (
    <div>
      <h3 style={{ color: 'white' }}>
        We can use this page as our dev page for components
      </h3>
      <CustomBadge/>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.ID} style={{color: 'white'}}>
            {item.Name} - {item.cartQuantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
