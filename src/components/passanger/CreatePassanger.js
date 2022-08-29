import React from "react";
import Navbar from "../commonComponent/Navbar";
import { useForm } from "react-hook-form";
import "../../style/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePassanger = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onTouched",
  });

  const onsubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    const name = data.name;
    const trip = data.trip;
    const airline = data.airline;
    
    const asyncPostCall = async () => {
      try {
        const response = await fetch(
          "https://api.instantwebtools.net/v1/passenger",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              trip: trip,
              airline: airline,
              
            }),
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("User has been Registered successfully. Please Login");
        }
        const data = await response.json();

        console.log(data);
      } catch (error) {
        toast.success("Something went wrong");
      }
    };
    asyncPostCall();
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-xl-4 col-xxl-4"></div>
        <div
          className="col-12 col-xs-12 col-sm-12 col-md-4 col-xl-4 col-xxl-4"
          style={{ marginTop: 10 }}
        >
          <h1>Create Passanger</h1>
          <div className="row">
            <form onSubmit={handleSubmit(onsubmit)} name="myForm">
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Name<span className="manditory">*</span>
                </label>
                <input
                type="text"
                  {...register("name", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.name?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
              <label className="label-content">
                  Trips<span className="manditory">*</span>
                </label>
                <input
                type="number"
                  {...register("trip", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.trip?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
              <label className="label-content">
                  Airline<span className="manditory">*</span>
                </label>
                <input
                type="number"
                  {...register("airline", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.airline?.message}</p>
              </div>

              
              
              

              
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-xs-12 col-sm-12 col-md-4 col-xl-4 col-xxl-4"></div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePassanger;