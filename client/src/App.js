import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../src/components/Home/Home'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './Context/AppContext';
import GetUserInformation from './components/GetUserInformationPage/GetUserInformation';
import ManageGoodsPage from './components/ManageGoodsPage/ManageGoodsPage';
import EditUserSelected from './components/EditUserInfoSelected/EditUserSelected';
import InfoDetail from './components/InformationDetailPage/InfoDetail';
import InfoDeletedStore from './components/InfoDeletedStore/InfoDeletedStore';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <AppProvider>
            <Home/>
          </AppProvider>
        }/>
        <Route path='/customer-info' element={
          <AppProvider>
            <GetUserInformation/>
          </AppProvider>
        }/>
        <Route path='/customer-info/deleted' element={
          <AppProvider>
            <InfoDeletedStore/>
          </AppProvider>
        }/>
        <Route path='/food-select' element={
          <AppProvider>
            <ManageGoodsPage/>
          </AppProvider>
        }/>
        <Route path='/edit-customer-info/:id' element={
          <AppProvider>
            <EditUserSelected/>
          </AppProvider>
        }/>
        <Route path='/info-customer-detail/:id' element={
          <AppProvider>
            <InfoDetail deleted={false}/>
          </AppProvider>
        }/>
        <Route path='/info-customer-detail/:id/deleted' element={
          <AppProvider>
            <InfoDetail deleted={true}/>
          </AppProvider>
        }/>
      </Routes>
    </div>
  );
}

export default App;
