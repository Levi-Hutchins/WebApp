import React from 'react';
import Inventory from './Components/Inventory';
import CustomerAccounts from './Components/Accounts';
import './Styles/EmployeePage.css';

const EmployeePage = () => {
  return (
    <div className="employee-page-container">
      <h1>Employee Inventory Page</h1>
      <div className="tables-container">
        <Inventory />
        <CustomerAccounts />
      </div>
    </div>
  );
};

export default EmployeePage;