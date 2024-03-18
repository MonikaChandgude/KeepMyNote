import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'


const Navbar = (props) => {
  let navigate = useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
       navigate('/login',{replace:true});

    }

    let location = useLocation();
    React.useEffect(() => {
      console.log( location.pathname);
    }, [location]);
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
       
       
      </ul>
      <div
              className={`form-check form-switch text-${
                props.mode === "light" ? "dark" : "light"
              }`}
            >
              <input
                className="form-check-input"
                onClick={props.toggleMode}
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
             
              </label>
            </div>
    {!localStorage.getItem('token')?<form className="d-flex">
    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
      
    </form>:  <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
