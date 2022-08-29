import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AirlineHome from "../components/airline/AirlineHome";
import CreateAirline from "../components/airline/CreateAirline";
import ViewAirLine from "../components/airline/ViewAirLine";
import {
  PublicRoute,
  PrivateRoute,
} from "../components/commonComponent/TokenRoute";
import Home from "../components/Home";
import Login from "../components/Login";
import CreatePassanger from "../components/passanger/CreatePassanger";
import PassangerDetail from "../components/passanger/PassangerDetail";
import ViewPassanger from "../components/passanger/ViewPassanger";
import Signup from "../components/Signup";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route
          path="/Login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        <Route
          path="/airline-home"
          element={
            <PrivateRoute>
              <AirlineHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-airline/:id"
          element={
            <PrivateRoute>
              <ViewAirLine />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-airline"
          element={
            <PrivateRoute>
              <CreateAirline />
            </PrivateRoute>
          }
        />
        <Route
          path="/passanger-detail"
          element={
            <PrivateRoute>
              <PassangerDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-passanger"
          element={
            <PrivateRoute>
              <CreatePassanger />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-passanger/:id"
          element={
            <PrivateRoute>
              <ViewPassanger />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
