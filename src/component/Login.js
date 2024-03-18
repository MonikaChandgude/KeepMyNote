import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import NoteContext from "../context/notes/Notecontext";

const Login = (props) => {
  //const context = useContext(NoteContext);
  //const { setToken } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
 
  let navigate = useNavigate();
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
     
    //  save the auth token and redirect

     localStorage.setItem('token', json.authtoken);
    
      props.showAlert("Logged in successfully", "success");
     
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div >
     
     

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
                      Login page
                    </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
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

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup" className="fw-bold text-body">
                          <u>Register here</u>
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

export default Login;
