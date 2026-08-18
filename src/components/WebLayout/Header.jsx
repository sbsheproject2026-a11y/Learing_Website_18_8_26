import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            {/* <!-- Topbar Start --> */}
            <div className="container-fluid d-none d-lg-block">
                <div className="row align-items-center py-4 px-xl-5">
                    <div className="col-lg-6">
                        <Link to="/" className="text-decoration-none">
                            <img className="position-relative w-100" src="/assets/img/websheddlogo.png" />
                 
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to="/" className="text-decoration-none">
                            <img className="position-relative w-100" src="/assets/img/APORVED.png" />
                 
                        </Link>
                    </div>
                    
                    
                </div>
            </div>
            {/* <!-- Topbar End --> */}
            {/* <!-- Navbar Start --> */}

            <div className="container-fluid">
                <div className="row border-top px-xl-5">
                   
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0  sticky-top">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                 <img className="position-relative w-100" src="/assets/img/websheddlogo.png" style={{height:"80px",marginBottom:"10px"}} />
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav py-0">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                      <Link to="/about-us" className="nav-item nav-link">About</Link>  

                                 

                                    <Link to="/department" className="nav-item nav-link">Syllabus</Link>
                                    {/* <Link to="/department" className="nav-item nav-link">Books</Link> */}
                                    <Link to="/department" className="nav-item nav-link">Assessment</Link>
                                    <Link to="/student-support" className="nav-item nav-link">Career</Link>
                                    <Link to="/student-support" className="nav-item nav-link">Placement</Link>
                                    <Link to="/news-events" className="nav-item nav-link">News/Event</Link>
                                    <Link to="https://sbshe.in/Rollno-Verification.aspx" className="nav-item nav-link">Result</Link>
                                    <Link to="/contact-us" className="nav-item nav-link">Contact</Link>
                                  
                                </div>
                               
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            
            {/* <!-- Navbar End --> */}

        </>
    )
}

export default Header