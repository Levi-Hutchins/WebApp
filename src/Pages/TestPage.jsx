import React from 'react';
import CustomBadge from '../Components/Badge/CustomBadge';
import { useSelector } from "react-redux";
import UserDetailsTable from '../Components/DynamicTables/UserDetailsTable';

import { toast } from "react-toastify";

const TestPage = () => { 
  const cartItems = useSelector((state) => state.cart.cartItems)

  return (
    <div>
      <h3 style={{ color: 'white' }}>
        We can use this page as our dev page for components
      </h3>
      <UserDetailsTable toast={toast}/>
    </div>
  );
};

export default TestPage;
