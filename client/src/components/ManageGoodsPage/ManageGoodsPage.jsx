//render mat hang theo kieu check box, lat trang edit cung tuong tu nhung voi data da nhap
import React, { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import FoodCard from "../FoodCard";
import style from "./manageGoodsPage.module.css";
import clsx from "clsx";
import TableFoodBill from "../TableFoodBill";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function ManageGoodsPage() {
  const navigate = useNavigate();
  const {customers} = useContext(AppContext);
  
  const latestCustomer = customers !== undefined && customers[customers.length-1]
  const url = `http://localhost:5000/manage-customers/customer-info/${latestCustomer._id}?_method=PUT`;
  const { foodAbout } = useContext(AppContext);
  const [isClickCartBtn, setIsClickCartBtn] = useState(false);

  const [itemInfoList, setItemInfoList] = useState([]);
  const [totalOrderValue, setTotalOrderValue] = useState(1);
  function handleCartBtn() {
    setIsClickCartBtn(!isClickCartBtn);
  }
  
  useEffect(() => {
    
    const totalOrderPrice = itemInfoList.reduce((total,item) => (total+Number(item.totalPrice)),0)
    setTotalOrderValue(totalOrderPrice)
  },[itemInfoList])

  function handleSubmitBuy(e){
    e.preventDefault();
    itemInfoList.length > 0 &&
    Axios.put(url,{
      MenuSelected: itemInfoList,
      orderValue: totalOrderValue
    })
      .then(navigate('/'))
      .then(window.location.reload(true))
  }
  
  
  return (
    <div className={clsx('mt-3')}>
      <h1 className="text-center">Vui lòng chọn thực đơn</h1>
      <button onClick={() => handleCartBtn()} className={style.gioHang}>
        Giỏ Hàng
      </button>
      <div className={style.foodCardContainer}>
        {foodAbout === undefined ? (
          <h1>Loading Food .....</h1>
        ) : (
          foodAbout.map((food, index) => (
            <FoodCard
              foodId={index+1}
              itemInfoList = {itemInfoList}
              setItemInfoList= {setItemInfoList}
              width={"25%"}
              foodName={food.name}
              price={food.price}
              img={food.img}
              totalOrderValue={totalOrderValue}
              key={`${food}-${index}`}
            />
          ))
        )}
      </div>
      <div
        id="cart-info"
        className={clsx(style.cartInformation, {
          [style.cartInformationOpen]: isClickCartBtn,
        })}
      >
        <div className={clsx(style.cartContainer, "bg-light", style.menuInformation)}>
          <h2 className={clsx("text-center")}>Thông Tin Đơn Hàng</h2>
          <div className={clsx(style.infoBill)}>
            <div className={clsx(style.infoCustomer)}>
              <ul>
                <li><b>Name:</b><p>{latestCustomer.name}</p></li>
                <li><b>Phone Number:</b><p>{latestCustomer.phone}</p></li>
                <li><b>Address:</b><p>{latestCustomer.address}</p></li>
              </ul>
            </div>
            <h3>Thực Đơn Đã Chọn</h3>
            <div className={clsx(style.tableBill, "mt-3 mb-3")}>
              
              <TableFoodBill itemInfoList={itemInfoList} setItemInfoList={setItemInfoList}/>
            </div>
            <h4 className="mt-4 mb-4"><b>Tổng Hóa Đơn:</b> {totalOrderValue}</h4>
            <form onSubmit={e => handleSubmitBuy(e)}>
              <button className={clsx(style.buyBtn, 'bg-primary')} type="submit">Mua Hàng</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
