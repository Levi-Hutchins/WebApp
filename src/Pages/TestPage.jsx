import React from 'react';
import UserDetailsTable from '../Components/DynamicTables/UserDetailsTable';

import { toast } from "react-toastify";

const TestPage = () => { 

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
