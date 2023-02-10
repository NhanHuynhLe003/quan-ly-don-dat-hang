import React, { useContext, useEffect, useState } from "react";
import style from "./infoDetail.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  FaAddressBook,
  FaDollarSign,
  FaHome,
  FaLocationArrow,
  FaMoneyBill,
  FaPhone,
  FaUtensils,
} from "react-icons/fa";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
export default function InfoDetail({deleted}) {
  const { customers , deletedInfo} = useContext(AppContext);
  const params = useParams();
  let tempCustomerData = customers;
  if(deleted === true){
    tempCustomerData = deletedInfo
  }
  const [curCustomer, setCurCustomer] = useState(undefined);

  useEffect(() => {
    if (tempCustomerData !== undefined) {
      const customer = tempCustomerData.filter((customer, index) => {
        return customer._id === params.id;
      });
      setCurCustomer(customer[0]);
    }
    
  }, [tempCustomerData]);

  return (
    <>
    <Link to='/'><FaHome className={style.homeIcon} fontSize={'3rem'} color={'#333'} fontWeight={'bold'} style={{position:'absolute', left:'1rem', top: '1rem', cursor:'pointer', zIndex:'10'}}/></Link>
      
      {curCustomer !== undefined ? (
        <div className={style.infoContainer}>
          <div className={clsx(style.leftInfoDetail)}>
            <div className={clsx(style.avatar)}>
              <img
                style={{ width: "100%" }}
                src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                alt="avatar"
              />
            </div>
            <div className="info-customer">
              <h2
                id="nameCustomer"
                className={clsx(style.bold, "text-center", "mt-3", "mb-3")}
              >
                {curCustomer.name.toUpperCase()}
              </h2>
              <div id="phoneNumber" className={clsx("d-flex", "mt-3")}>
                <b>
                  <FaPhone className={clsx(style.phoneIcon)} />
                </b>
                <h4
                  className={clsx("m-0", "d-flex flex-row align-items-center")}
                >
                  {curCustomer.phone}
                </h4>
              </div>
              <div id="address" className={clsx("d-flex", "mt-3")}>
                <b>
                  <FaAddressBook className={clsx(style.locationIcon)} />
                </b>
                <h4
                  className={clsx("m-0", "d-flex flex-row align-items-center")}
                >
                  {curCustomer.address}
                </h4>
              </div>
              <div id="orderValue" className={clsx("d-flex", "mt-3")}>
                <b>
                  <FaDollarSign className={clsx(style.orderValue)} />
                </b>
                <h4
                  className={clsx("m-0", "d-flex flex-row align-items-center")}
                >
                  {curCustomer.orderValue}
                </h4>
              </div>
            </div>
          </div>
          <div className={clsx(style.rightInfoDetail)}>
            <h1 id="menuSeleted">Thực Đơn Đã Lựa Chọn</h1>
            {/* {curCustomer.MenuSelected && curCustomer.MenuSelected.map((food,index) => {
            console.log(food)
        })} */}
            {curCustomer.MenuSelected.map((food, index) => (
              <div className="cardFoodList">
                <div className={clsx(style.foodCardContainer)}>
                  <div className={clsx(style.cardInfoLeft)}>
                    <h2 className={style.foodIndex}>{index + 1}</h2>
                    <div className="foodThumbnail">
                      <img
                        style={{ width: "13rem", height:'100%', borderRadius: "20px", boxShadow:'5px 5px 3px #caac00' }}
                        src={food.img}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className={clsx(style.cardInfoRight)}>
                    <h4 className="nameFood">
                      <FaUtensils /> {food.foodName}
                    </h4>
                    <h5 className="priceFood">
                      <FaMoneyBill /> {food.price}
                    </h5>
                    <h5 className="quantity">Số lượng: {food.quantity}</h5>
                    <h5 className="totalPrice">Tổng tiền: {food.totalPrice}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1><LoadingComponent/> </h1>
      )}
    </>
  );
}
