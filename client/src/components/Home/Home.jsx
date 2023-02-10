import React from "react";
import { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AppContext } from "../../Context/AppContext";
import {Link, useNavigate, useParams} from "react-router-dom"
import style from './home.module.css'
import Axios from 'axios'

export default function Home() {
  const navigate = useNavigate();
  const { customers} = useContext(AppContext);


  function handleDeleteSubmit(e,id){
    const deleteUrl = id && `http://localhost:5000/manage-customers/${id}/delete?_method=DELETE`
    
    e.preventDefault();
    Axios.delete(deleteUrl)
      .then(navigate('/'))
      .then(window.location.reload(true))
  }
  return (
    <>
      <div id="header" className={`${style.head} container`}>
        <h1>List Customers</h1>
        <div>
            <Link className='btn btn-success' to='/customer-info'>Tạo Đơn Hàng</Link>
            <Link className='btn btn-danger' style={{marginLeft: '1rem'}} to='/customer-info/deleted'>Thông Tin Đã Xóa</Link>
        </div>
      </div>
      <div className="container">
      <Table bordered hover>
        <thead>
          <tr style={{ backgroundColor: "#b6d4fe" }}>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Adress</th>
            <th>Order Value</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {customers === undefined ? (
            <tr>
              <td colSpan={5}>Loading. . . </td>
            </tr>
          ) : customers.map((customer, index) => {
            return (
                <tr key={customer._id}>
                  <td>{index+1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.orderValue ? customer.orderValue : 0}</td>
                  <td className="d-flex flex-row">
                    
                    <Link className={style.btnBlue} to={`/edit-customer-info/${customer._id}`}>Edit</Link>
                    <form onSubmit={e => handleDeleteSubmit(e,customer._id)}><button className={style.btnWarn} type="submit">Delete</button></form>
                    <Link className={style.btnBlue} to={`/info-customer-detail/${customer._id}`}>Detail</Link>
                  </td>
                </tr>
              )
          })}
          
        </tbody>
      </Table>
      </div>
      
    </>
  );
}
