import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>


            {/* <!-- Footer Start --> */}
            <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: "90px" }}>
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-md-6 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Get In Touch</h5>
                                <p><i className="fa fa-map-marker-alt mr-2"></i>New Delhi</p>
                                <p><i className="fa fa-phone-alt mr-2"></i>+91 1122 334455</p>
                                <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                                <div className="d-flex justify-content-start mt-4">
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-youtube"></i></Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-facebook-f"></i></Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-linkedin-in"></i></Link>
                                    <Link className="btn btn-outline-light btn-square" to="/"><i className="fab fa-instagram"></i></Link>
                                </div>
                            </div>
                            <div className="col-md-6 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Our Courses</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>About</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Syllabus</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Books</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Assessment</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Career</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Placement</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>News/Event</Link>
                                    <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Contact</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 mb-5">
                        <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Newsletter</h5>
                        <p>Shaheed Bhagat Singh was not only a great revolutionary but also a strong supporter of education, social awareness, and the well-being of society. He believed that education and good health were essential for building a strong and progressive nation. His ideas continue to inspire young people to gain knowledge, think critically, and contribute to the development of the country.</p>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-light" style={{ padding: "30px" }} placeholder="Your Email Address" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
                <div className="row">
                    <div className="col-lg-8 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">&copy; <a href="#">shaheed bhagat singh health and education</a>. All Rights Reserved.


                            Designed by <a href="#"> </a>
                        </p>
                    </div>
                    <div className="col-lg-4 text-center text-md-right">
                        <ul className="nav d-inline-flex">
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Privacy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Terms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa fa-angle-double-up"></i></a>



        </>
    )
}

export default Footer