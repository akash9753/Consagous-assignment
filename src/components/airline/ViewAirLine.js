import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../commonComponent/Navbar";

const ViewAirLine = () => {
  const { id } = useParams();

  const [airlineData, setAirlineData] = useState([]);

  useEffect(() => {
    async function getAirLineDataById(id) {
      try {
        const response = await fetch(
          `https://api.instantwebtools.net/v1/airlines/${id}`
        );
        const data = await response.json();
        console.log(data);
        setAirlineData(data);
        console.log(airlineData);
      } catch (err) {
        console.error(err);
      }
    }
    getAirLineDataById(id);
  }, [id, airlineData]);
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"></div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div className="row middlefirstRow"></div>
            <div className="row">
              <table id="table-to-xls">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Logo</th>
                    <th style={{ width: 80 }}>Slogan</th>
                    <th>Head Quaters</th>
                    <th>Website</th>
                    <th>Established</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{airlineData.name}</td>
                    <td>{airlineData.country}</td>
                    <td>
                      <img
                        src={airlineData.logo}
                        alt=""
                        width={80}
                        height={50}
                      />
                    </td>
                    <td>{airlineData.slogan}</td>
                    <td>{airlineData.head_quaters}</td>
                    <td>{airlineData.website}</td>
                    <td>{airlineData.established}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row"></div>
          </div>
          <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"></div>
        </div>
      </div>
    </>
  );
};

export default ViewAirLine;
