import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing all components
import Home from "./components/Home";

import UserDashboard from "./components/User/UserDashboard";

import Dashboard from "./components/User/Dashboard";
import Services from "./components/User/Services";
import Application from "./components/User/Application";
import UserApplication from "./components/User/UserApplication";
import ApplicationForm from "./components/User/ApplicationForm";
import Profile from "./components/User/Profile";
import Myproperty from "./components/User/Myproperty";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import AdDashboard from "./components/admin/AdDashboard";
import ReviewApp from "./components/admin/ReviewApp";
import ApprovedApp from "./components/admin/ApprovedApp";
import NewApp from "./components/admin/NewApp";
import AdminView from "./components/admin/AdminView";
import Property from "./components/admin/Property";

import HelpDesk from "./components/home/HelpDesk";
import Payment from "./components/User/Payment";

import UserLoginNew from "./components/User/UserLoginNew";
import AdminLoginnew from "./components/admin/AdminLoginnew";
import UserRegFormNew from "./components/User/UserRegFormNew";

import Inst from "./components/User/Inst";
import LandForm from "./components/User/LandForm2";
import Form8A from "./components/User/form8A";
import Identity from "./components/User/Identity";

import GPay from "./components/User/GPay";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/registration" element={<UserRegFormNew />} />
        {/* <Route exact path="/registrationnew" element={<UserRegFormNew />} /> */}

        <Route exact path="/login" element={<UserLoginNew />} />
        {/* <Route exact path="/loginnew" element={<UserLoginNew />} /> */}

        <Route exact path="/adminlogin" element={<AdminLoginnew />} />
        {/* <Route exact path="/adminloginnew" element={<AdminLoginnew />} /> */}

        <Route exact path="/helpdesk" element={<HelpDesk />} />
        {/* <Route exact path="payment" element={<Payment />} /> */}
        <Route exact path="payment" element={<GPay />} />

        <Route exact path="user" element={<UserDashboard />}>
          <Route exact path="dashboard" index element={<Dashboard />} />
          <Route exact path="Myapplication" element={<Application />} />
          <Route exact path="Myapplication/:id/:status" element={<UserApplication />} />
          <Route exact path="Services" element={<Services />} />
          <Route exact path="myprofile" element={<Profile />} />
          <Route exact path="Services/LandRegistry" element={<ApplicationForm />} />
          <Route exact path="Services/Ins" element={<Inst />} />
          <Route exact path="Services/LandRegistry2" element={<LandForm />} />
          <Route exact path="Services/form8A" element={<Form8A />} />
          <Route exact path="Services/identity" element={<Identity />} />
          <Route exact path="Myproperty" element={<Myproperty />} />

        </Route>
        
        <Route exact path="admin" element={<AdminDashboard />}>
          <Route exact path="dashboard" index element={<AdDashboard />} />
          <Route exact path="review" element={<ReviewApp />} />
          <Route exact path="approve" element={<ApprovedApp />} />
          <Route exact path="newapp" element={<NewApp />} />
          <Route exact path="profile" element={<AdminProfile />} />
          <Route exact path="view/:app" element={<AdminView />} />
          <Route exact path="changetoken" element={<Property />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
