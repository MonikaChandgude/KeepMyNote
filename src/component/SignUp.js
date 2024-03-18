import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
    localStorage.setItem("token", json.authtoken);
    navigate("/");
    props.showAlert("SignUP successfully","success");
  }
  else{
      props.showAlert("Invalid or User already exist ","danger");
  }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="container vh-100 bg-image" style={{}}>
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div
                  className="card my-4"
                  style={{ borderRadius: "15px", height: "50%" }}
                >
                  <div className="card-body p-5">
                  <div className="text-center" >
                    <img  className="text-center mb-2" src="note.png" style={{ height: "10vh" }} alt="icon"/>
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
                    </div>
                   

                    <form   onSubmit={handleSubmit}>
                      <div className="form-outline my-4">
                      <label className="form-label" htmlFor="name">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          onChange={onChange}
                          name="name"
                          className="form-control form-control-lg"
                          required
                          minLength={5}
                        />
                       
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          onChange={onChange}
                          name="email"
                          className="form-control form-control-lg"
                          required
                          minLength={5}
                        />
                       
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          onChange={onChange}
                          name="password"
                          className="form-control form-control-lg"
                          required
                          minLength={5}
                        />
                       
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="cpassword">
                          Repeat your password
                        </label>
                        <input
                          type="password"
                          id="cpassword"
                          onChange={onChange}
                          name="cpassword"
                          className="form-control form-control-lg"
                          required
                          minLength={5}
                        />
                       
                      </div>

                      {/* <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div> */}

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
