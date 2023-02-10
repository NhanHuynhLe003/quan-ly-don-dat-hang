import React from "react";

import Table from "react-bootstrap/Table";
export default function TableFoodBill({itemInfoList, setItemInfoList }) {
  
  function handleCounter(e,indexFoodList) {
    
    const newFoodList = [...itemInfoList];
    newFoodList.forEach((foodItem,index) => {
      if(index === indexFoodList){
        foodItem.quantity = Number(e.target.value);
        foodItem.totalPrice = foodItem.quantity * Number(foodItem.price)
      }
      
      return newFoodList
    })
    setItemInfoList(newFoodList);
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên Món Hàng</th>
          <th>số lượng</th>
          <th>Tổng Tiền</th>
        </tr>
      </thead>
      <tbody>
        {itemInfoList.length>0 && itemInfoList.map((item, index) => {
          return (
            <tr key={`${item}_${index}_${Math.floor(Math.random(1000))}`}>
              <td>{index+1}</td>
              <td>{item.foodName}</td>
              <td>
                <input
                  onChange={(e) => handleCounter(e, index)}
                  style={{ width: "4rem" }}
                  value={item.quantity}
                  type="number"
                  name="quantityGoods"
                  id="quantityGoods"
                  min="1"
                />
              </td>
              <td>{item.totalPrice}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
