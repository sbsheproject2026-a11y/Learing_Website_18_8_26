import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWebsiteContent } from '../WebsitePage/HomeService';

function Header() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        loadPageData();

    }, []);

    const loadPageData = async () => {
        try {
            const [

                notesData

            ] = await Promise.all([

                getWebsiteContent(21)

            ]);


        setNotes(
    (notesData || []).filter(
        (item) => item.is_active === true
    )
);

         

        } catch (error) {
            console.log("Page data error:", error);
        }
    };
    return (
        <>
            {/* <!-- Topbar Start --> */}
            <div className="container-fluid d-none d-lg-block" style={{paddingRight:"0px",paddingLeft:"0px"}}>
                {notes?.length > 0 && (
                    <div className="bg-primary text-white py-2 d-flex align-items-center" >

                        <div
                            className="font-weight-bold px-3"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            📢 Note:
                        </div>

                        <div className="flex-grow-1 overflow-hidden">
                            <marquee behavior="scroll" direction="left">
                                {notes.map((item, index) => (
                                    <span key={item.id}>
                                        {item.name}
                                        {index < notes.length - 1 && " | "}
                                    </span>
                                ))}
                            </marquee>
                        </div>

                    </div>
                )}
                

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
                            <div className="d-lg-none">

                                {/* Announcement - Mobile Only */}
                              

                                              {notes?.length > 0 && (
    <div className="announcement-bar bg-primary text-white d-flex align-items-center">

        <div className="announcement-title font-weight-bold">
            📢 Note  :
        </div>

        <div className="announcement-scroll flex-grow-1 overflow-hidden">
            <marquee behavior="scroll" direction="left">
                {notes.map((item, index) => (
                    <span key={item.id}>
                        {item.name}
                        {index < notes.length - 1 && "  |  "}
                    </span>
                ))}
            </marquee>
        </div>

        <style>
            {`
                .announcement-bar {
                    min-height: 42px;
                    width: 100%;
                }

                .announcement-title {
                    white-space: nowrap;
                    padding: 0 15px;
                    font-size: 15px;
                }

                .announcement-scroll {
                    min-width: 0;
                    font-size: 15px;
                }

                /* Mobile */
                @media (max-width: 767px) {
                    .announcement-bar {
                        min-height: 38px;
                    }

                    .announcement-title {
                        padding: 0 8px;
                        font-size: 12px;
                    }

                    .announcement-scroll {
                        font-size: 12px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .announcement-title {
                        padding: 0 6px;
                        font-size: 11px;
                    }

                    .announcement-scroll {
                        font-size: 11px;
                    }
                }
            `}
        </style>

    </div>
)}

                                {/* Mobile Logo */}
                                <a
                                    href=""
                                    className="text-decoration-none d-block"
                                >
                                    <img
                                        className="position-relative w-100"
                                        src="/assets/img/websheddlogo.png"
                                        alt="Logo"
                                        style={{
                                            height: "80px",
                                            marginBottom: "10px",
                                            objectFit: "contain"
                                        }}
                                    />
                                </a>

                            </div>

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
                                    <Link to="/career" className="nav-item nav-link">Career</Link>
                                    <Link to="/placement" className="nav-item nav-link">Placement</Link>
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