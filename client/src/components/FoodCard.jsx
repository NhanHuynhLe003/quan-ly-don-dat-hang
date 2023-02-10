import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
/**
 * Nhấn nút Add vào giỏ hàng =>
 */



function FoodCard({
  foodId,
  foodName,
  price,
  img,
  width,
  itemInfoList,
  setItemInfoList,
  
}) {
  
  function handleAddToCart() {
    setItemInfoList((prev) => {
      
      return [
        ...prev,
        {
          foodId,
          foodName,
          img,
          price,
          quantity: 1,
          totalPrice: price,
        },
      ];
    });
  }
  return (
    <Card style={{ width: width, margin: "1rem 1rem" }}>
      <Card.Img variant="top" style={{height: '18rem'}} src={img} />
      <Card.Body style={{position:'relative', height: '10rem'}}>
        <Card.Title>{foodName}</Card.Title>
        <Card.Text
          style={{ fontSize: "1.4rem", color: "orange", fontWeight: "bold" }}
        >
          ${price}
        </Card.Text>
        <Button style={{position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem'}} onClick={handleAddToCart} variant="primary">
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FoodCard;
