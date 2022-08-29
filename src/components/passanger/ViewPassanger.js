import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../commonComponent/Navbar";

const ViewPassanger = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.instantwebtools.net/v1/passenger/${id}`)
      .then((response) => {
        console.log("responseresponse", response.data);
        let tempArray = [];
        response.data.airline.map((air) => {
          tempArray.push({
            _id: response.data._id,
            username: response.data.name,
            trips: response.data.trips,
            airlineName:air.name,
            country: air.country,
            logo: air.logo,
            slogan: air.slogan,
            head_quaters: air.head_quaters,
            website: air.website,
            established: air.established,
          });
        });
        console.log("tempArray", tempArray);
        setData(tempArray);
      })
      .catch((error) => {});
  }, [id]);

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
                    <th>Pasaanger Name</th>
                    <th>Pasaanger Trips</th>
                    <th>Airlane Name</th>
                    <th>Country</th>
                    <th>Logo</th>
                    <th style={{ width: 80 }}>Slogan</th>
                    <th>Head Quaters</th>
                    <th>Website</th>
                    <th>Established</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((items) => {
                    return (
                      <>
                        <tr>
                          <td>{items.username}</td>
                          <td>{items.trips}</td>
                          <td>{items.airlineName}</td>
                          <td>{items.country}</td>
                          <td>
                            <img
                        src={items.logo}
                        alt=""
                        width={80}
                        height={50}
                      />
                          </td>
                          <td>{items.slogan}</td>
                          <td>{items.head_quaters}</td>
                          <td>{items.website}</td>
                          <td>{items.established}</td>
                        </tr>
                      </>
                    );
                  })}
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

export default ViewPassanger;
