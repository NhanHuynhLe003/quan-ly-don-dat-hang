import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import Axios from 'axios';

import { useRef } from 'react';
export default function EditUserSelected() {
  
    const { customers } = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();
    const [customerData, setCustomerData] = useState({
      name: "",
      phone: "",
      address: "",
    });
    const urlEdit = params.id !== undefined && `http://localhost:5000/manage-customers/update-customer-info/${params.id}?_method=PUT`
    
    useEffect(() => {
        if(customers !== undefined){
            const curCustomer = customers.filter((customer,index) => customer._id === params.id);
            
            setCustomerData(prev => ({
                ...prev,
                name: curCustomer[0].name,
                phone: curCustomer[0].phone,
                address: curCustomer[0].address
            }))
            
        }
    },[customers])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.put(urlEdit, {
            name: customerData.name,
            phone: customerData.phone,
            address: customerData.address
        })
        .then(navigate('/'))
        .then(window.location.reload(true))
        
    }

    
    function handleChange(e){
        const newCustomerData = {...customerData};
        newCustomerData[e.target.id] = e.target.value;
        setCustomerData(newCustomerData)
    }
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
            Update
          </button>
        </form>
      </div>
    </>
  )
}
