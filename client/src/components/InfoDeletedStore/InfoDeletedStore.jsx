import React, { useContext } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import Axios from 'axios';
import style from './InfoDeletedStore.module.css'
import ConfirmDeleteModal from '../ConfirmDeleteModal';
export default function InfoDeletedStore() {
    const { deletedInfo} = useContext(AppContext);
    const navigate = useNavigate();
    function handleRestoreSubmit(e,id) {
      e.preventDefault();
      const restoreUrl = `http://localhost:5000/manage-customers/restore-info-customer/${id}?_method=PATCH`;
      Axios.patch(restoreUrl)
        .then(navigate('/'))
        .then(window.location.reload(true))
    }
    function handleDeleteSubmit(e,id){
      e.preventDefault();
      const delUrl = `http://localhost:5000/manage-customers/delete-info-permanently/${id}?_method=DELETE`;
      Axios.delete(delUrl)
      .then(window.location.reload(true))
    }
    return (
      <>
        <div id="header" className={`${style.head} container`}>
          <h1>Thông Tin Đã Xóa</h1>
          <div>
              <Link className='btn btn-success mt-3 mb-3' to='/'>Trở Về Trang Chủ</Link>
              
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
            {deletedInfo === undefined ? (
              <tr>
                <td colSpan={5}>Loading. . . </td>
              </tr>
            ) : deletedInfo.map((customer, index) => {
              return (
                  <tr key={customer._id}>
                    <td>{index+1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>{customer.orderValue}</td>
                    <td className='d-flex flex-row'>
                      <form onSubmit={e => handleRestoreSubmit(e, customer._id)}>< button type='submit' className={style.btnBlue}>Khôi Phục</button></form>
                      {/* <form onSubmit={e => handleDeleteSubmit(e, customer._id)}><button type='submit' className={style.btnWarn}>Delete</button></form> */}
                      <ConfirmDeleteModal handleDeleteSubmit={handleDeleteSubmit} idCustomer={customer._id}/>
                      
                      <Link className={style.btnBlue} to={`/info-customer-detail/${customer._id}/deleted`}>Chi Tiết Đơn Hàng</Link>
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
