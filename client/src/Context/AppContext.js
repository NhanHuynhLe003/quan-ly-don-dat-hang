import Axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState(undefined)
  const [foodAbout, setfoodAbout] = useState(undefined)
  const [deletedInfo, setDeletedInfo] = useState();
  useEffect(() => {
    fetch("/manage-customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  useEffect(() => {
    fetch("/manage-goods")
      .then(res => res.json())
      .then(data => setfoodAbout(data))
  },[])

  useEffect(() => {
    fetch("/manage-customers/deleted-informations")
      .then(res => res.json())
      .then(data => setDeletedInfo(data))
  },[])

  

  

  //tinh tong tien:
  useEffect(() => {
    //xu ly gia tien cho don hang
    customers !== undefined && customers.forEach((customer,index) => {
      const menuSelected = customer.MenuSelected;
      const totalPriceOrder = menuSelected.reduce((total,item) => (total + Number(item.totalPrice)),0);
      customer.orderValue = totalPriceOrder
    })
    
  },[customers])

  return (
    <AppContext.Provider value={{customers, foodAbout, deletedInfo}}>{children}</AppContext.Provider>
  );
};
