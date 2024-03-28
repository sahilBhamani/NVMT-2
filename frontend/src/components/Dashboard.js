import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';



import inventoryIcon from '../assets/inventory.png';
import ordersIcon from '../assets/oandp.png';
import suppliersIcon from '../assets/supplier.webp';

// Other imports and code

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { state: { message: 'Logout successful' } });
  };

  return (
    <div className="dashboardContainer">
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
      <div className="flexBoxesContainer">
        <div className="flexBox" onClick={() => navigate('/inventory')}>
          <img src={inventoryIcon} alt="Inventory Icon" className="icon" />
          <p>INVENTORY</p>
        </div>
        <div className="flexBox" onClick={() => navigate('/suppliers')}>
          <img src={suppliersIcon} alt="Suppliers Icon" className="icon" />
          <p>Suppliers</p>
        </div>
        <div className="flexBox" onClick={() => navigate('/orders')}>
          <img src={ordersIcon} alt="Orders & Purchases Icon" className="icon" />
          <p>Orders & Purchases</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
