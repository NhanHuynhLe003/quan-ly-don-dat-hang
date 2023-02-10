import React, { useState } from "react";
import  { useNavigate } from 'react-router-dom'
import Axios from "axios";

export default function GetUserInformation() {
  const navigate = useNavigate();
  const url = "http://localhost:5000/manage-customers/customer-info-store";
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(url, {
      name: customerData.name,
      phone: customerData.phone,
      address: customerData.address
    })
      .then(res => console.log(res))
      .then(navigate('/food-select'))
      .then(window.location.reload(true))
      
  }

  const handleChange = (e) => {
    const newCustomerData = {...customerData};
    newCustomerData[e.target.id] = e.target.value;
    setCustomerData(newCustomerData);
  };
  return (
    <>
      <div className="container mt-4 d-flex flex-column align-items-left">
        <h1 className="text-center">Nhập Thông Tin Khách Hàng</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              id="name"
              value={customerData.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={customerData.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={customerData.address}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
