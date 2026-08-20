import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWebsiteContent } from '../WebsitePage/HomeService';

function Footer() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContactData();
    }, []);

    const loadContactData = async () => {
        try {
            const [contactsData] =
                await Promise.all([
                    getWebsiteContent(18),

                ]);

            setContacts(contactsData.filter(
        (item) => item.is_active === true
    ));


        } catch (error) {
            console.log("Page data error:", error);
        }
    };
    return (
        <>


            {/* <!-- Footer Start --> */}
            <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: "90px" }}>
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="row">
                            <div className="col-md-7 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Get In Touch</h5>
                                <div style={{ fontSize: "15px" }}
                                    dangerouslySetInnerHTML={{
                                        __html: contacts?.[0]?.description || ""
                                    }}
                                />

                                <div className="d-flex justify-content-start mt-4">
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-youtube"></i></Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-facebook-f"></i></Link>
                                    <Link className="btn btn-outline-light btn-square mr-2" to="/"><i className="fab fa-linkedin-in"></i></Link>
                                    <Link className="btn btn-outline-light btn-square" to="/"><i className="fab fa-instagram"></i></Link>
                                </div>
                            </div>
                            <div className="col-md-5 mb-5">
                                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Usefull Links</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-white mb-2" to="/about-us"><i className="fa fa-angle-right mr-2"></i>About</Link>
                                    <Link className="text-white mb-2" to="/department"><i className="fa fa-angle-right mr-2"></i>Syllabus</Link>
 
                                    <Link className="text-white mb-2" to="/department"><i className="fa fa-angle-right mr-2"></i>Assessment</Link>
                                    <Link className="text-white mb-2" to="/career"><i className="fa fa-angle-right mr-2"></i>Career</Link>
                                    <Link className="text-white mb-2" to="/placement"><i className="fa fa-angle-right mr-2"></i>Placement</Link>
                                    <Link className="text-white mb-2" to="/news-events"><i className="fa fa-angle-right mr-2"></i>News/Event</Link>
                                    <Link className="text-white mb-2" to="/contact-us"><i className="fa fa-angle-right mr-2"></i>Contact</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 mb-5">
                        <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>Newsletter</h5>
                        <p>Shaheed Bhagat Singh inspired young minds through his vision of education, awareness, and social progress. His ideas continue to encourage knowledge, critical thinking, and service to the nation.</p>
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
                        <p className="m-0 text-white">&copy; <a href="#">Shaheed Bhagat Singh Health and Education</a>. All Rights Reserved.


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