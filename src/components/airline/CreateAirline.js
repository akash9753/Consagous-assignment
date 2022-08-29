import React from "react";
import Navbar from "../commonComponent/Navbar";
import { useForm } from "react-hook-form";
import "../../style/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateAirline = () => {
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
    const country = data.country;
    const slogan = data.slogan;
    const logo = data.logo;
    const website = data.website;
    const established = data.establihsed;
    const asyncPostCall = async () => {
      try {
        const response = await fetch(
          "https://api.instantwebtools.net/v1/airlines",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              country: country,
              slogan: slogan,
              logo: logo,
              website: website,
              established: established,
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
          <h1>Create AirLine</h1>
          <div className="row">
            <form onSubmit={handleSubmit(onsubmit)} name="myForm">
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Name<span className="manditory">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.name?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Country<span className="manditory">*</span>
                </label>
                <input
                  {...register("country", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.country?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Slogan<span className="manditory">*</span>
                </label>
                <input
                  {...register("slogan", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.slogan?.message}</p>
              </div>

              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Head Quarter<span className="manditory">*</span>
                </label>
                <input
                  {...register("head_quaters", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.head_quaters?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Logo<span className="manditory">*</span>
                </label>
                <input
                  {...register("logo", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.logo?.message}</p>
              </div>
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Website<span className="manditory">*</span>
                </label>
                <input
                  {...register("website", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.website?.message}</p>
              </div>

              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <label className="label-content">
                  Establish<span className="manditory">*</span>
                </label>
                <input
                  {...register("establish", {
                    required: "This field is required",
                  })}
                  className="form-control"
                />
                <p className="error-msg">{errors.establish?.message}</p>
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

export default CreateAirline;
