import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Installation from './Installation/Installation_View';
import CCTV from './Pages/Sasindu/CCTV';
import DOOR_PHONE from './Pages/Sasindu/DOOR_PHONE';
import DOOR_LOCK from './Pages/Sasindu/DOOR_LOCK';
import ALARM_MOTION from './Pages/Sasindu/ALARM_MOTION'
import StockManagerDashboard from './Pages/Sasindu/StockManagerDashboard';
import Advertisement from './Pages/Sasindu/Advertisement';
import Stock from './Pages/Sasindu/Stock';
import AllAdsDetails from './Pages/Sasindu/AllAdsDetails';
import EditAds from './Pages/Sasindu/EditAds';
import AddStock from './Pages/Sasindu/AddStock';
import AllStockDetails from './Pages/Sasindu/AllStockDetails';
import EditStock from './Pages/Sasindu/EditStock';
import SellingPrice from './Pages/Sasindu/SellingPrice';
import Inventory from './Pages/Sasindu/Inventory';
//anjana
import NumberPageForm from './Pages/Anjana/NumberPageForm';
import reportWebVitals from './Pages/Anjana/reportWebVitals';
import DirectPageForm from './Pages/Anjana/DirectPageForm';
import BankPageForm from './Pages/Anjana/BankPageForm';
import Payments from './Pages/Anjana/Payments';


import Repair from './Pages/Samidi/Repair';
import Cart_View from './Installation/Cart_View';

import Financialhome from './Pages/Rasindu/financialhome.js';
import Addexpences from './Pages/Rasindu/Addexpences';
import Expence from './Pages/Rasindu/expence';
import Income from './Pages/Rasindu/Income';
import UpdateExpence from './Pages/Rasindu/update.js'
import ExpenseReport from './Pages/Rasindu/ExpenseReport.js';
import FinalReport from './Pages/Rasindu/finalReport.js';




ReactDOM.render(

  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/cctv' element={<CCTV />} />
        <Route path='/doorphone' element={<DOOR_PHONE />} />
        <Route path='/doorlock' element={<DOOR_LOCK />} />
        <Route path='/alarm' element={<ALARM_MOTION />} />
        <Route path='/smdashboard' element={<StockManagerDashboard />} />
        <Route path='/ads' element={<Advertisement />} />
        <Route path='/stock' element={<Stock />} />
        <Route path='/view/:itemId' element={<Installation />} />
        <Route path='/viewAllAds' element={<AllAdsDetails />} />
        <Route path='/editAds/:itemId' element={<EditAds />} />
        <Route path='/addstock' element={<AddStock />} />
        <Route path='/viewAllStock' element={<AllStockDetails />} />
        <Route path='/editStock/:itemId' element={<EditStock />} />
        <Route path='/sellingPrice' element={<SellingPrice />} />
        <Route path='/inventory' element={<Inventory />} />



        <Route path='/view/:itemId' element={<Installation />} />
        <Route path='/repair' element={<Repair />} />
        <Route path='/Cart_View' element={<Cart_View />} />

        <Route path="/Payments" element={<Payments />} />
      <Route path="/NumberPageForm" element={<NumberPageForm />} />
      <Route path="/DirectPageForm" element={<DirectPageForm />} />
      <Route path="/BankPageForm" element={<BankPageForm/>} />


        <Route path='/' element={<App />}/>
        <Route path='/exform' element={<Expence />}/>
        <Route path='/home' element={<Financialhome />}/>
        <Route path='/intable' element={<Income />}/>
        <Route path='/addexpence' element={<Addexpences />}/>
        <Route path='/updateExpence/:expenceId' element={<UpdateExpence />}/>
        <Route path='/report' element={<ExpenseReport />}/>
        <Route path='/finalReport' element={<FinalReport/>}/>
        
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


