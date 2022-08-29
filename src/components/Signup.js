import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/signup.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
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
    const email=data.email
    const password = data.password
    const asyncPostCall = async () => {
      try {
        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        console.log(response);
        if (response.status === 200) {
          toast.success("User has been Registered successfully. Please Login");
          setTimeout(() => {
            navigate("/login")
          }, 2000);
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
      <div className="bgColor">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <form onSubmit={handleSubmit(onsubmit)} name="myForm">
                <div className="loginBox">
                  <div className="row">
                    <h1 style={{ textAlign: "center" }}>Signup</h1>
                  </div>
                  <div className="row">
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                    <div className="col-12 col-sm-12 col-md-6 col-xs-12 form-group">
                      <label className="label-content">
                        Email Id<span className="manditory">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        {...register("email", {
                          required: "This field is required",
                          minLength: {
                            value: 4,
                            message: "Please Enter a Valid Email Address",
                          },
                          maxLength: {
                            value: 32,
                            message: "Please Enter a Valid Email Address",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Please Enter a Valid email Address",
                          },
                        })}
                        className="form-control"
                      />
                      <p className="error-msg">{errors.email?.message}</p>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                  </div>
                  <div className="row">
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                    <div className="col-12 col-sm-12 col-md-6 col-xs-12 form-group">
                      <label className="label-content">
                        {" "}
                        Password<span className="manditory">*</span>
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: "This field is required",
                          minLength: {
                            value: 6,
                            message: "Please Enter Valid Phone Number",
                          },
                        })}
                        className="form-control"
                      />
                      <p className="error-msg">{errors.password?.message}</p>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                  </div>
                  <div className="row" style={{ marginTop: 4 }}>
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                    <div className="col-3 col-sm-3 col-md-2 col-xs-2">
                      <button type="submit" class="btn btn-primary">
                        Signup
                      </button>
                    </div>
                    <div className="col-3 col-sm-3 col-md-2 col-xs-2">
                      <button
                        onClick={() => navigate("/login")}
                        type="submit"
                        class="btn btn-primary"
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-xs-3"></div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;

