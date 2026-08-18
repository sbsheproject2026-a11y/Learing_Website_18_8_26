import React, { useEffect, useState } from 'react'
import { getDepartments } from './CourseServiceData';
import { Link } from 'react-router-dom';
import Course from './Course';

function Home() {

    const [dataepartments, setDataepartments] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        "/assets/img/carousel-1.jpg",
        "/assets/img/carousel-2.jpg",
        "/assets/img/carousel-3.jpg",

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // 3 seconds

        return () => clearInterval(interval);
    }, []);

    const loadDepartments = async () => {
        try {
            const result = await getDepartments();

            // console.log("Department Data", result);

            setDataepartments(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>


            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0 pb-5 mb-5">

                <div id="header-carousel" className="carousel slide carousel-fade">

                    <ol className="carousel-indicators">
                        {slides.map((_, index) => (
                            <li
                                key={index}
                                className={activeSlide === index ? "active" : ""}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </ol>

                    <div className="carousel-inner">
                        {slides.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${activeSlide === index ? "active" : ""
                                    }`}
                            >
                                <img
                                    className="position-relative w-100"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    style={{
                                        minHeight: "300px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="bg-primary text-white py-2 d-flex align-items-center">
                    <div
                        className="font-weight-bold px-3"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        📢 Announcements:
                    </div>

                    <div className="flex-grow-1 overflow-hidden">
                        <marquee behavior="scroll" direction="left">
                            Admissions are now open &nbsp; | &nbsp;
                            New courses available &nbsp; | &nbsp;
                            Stay connected with SBSHE for latest updates
                        </marquee>
                    </div>
                </div>



                <div className="container pt-5 pb-3">

                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="bg-primary text-white rounded p-4 text-center">

                                <h4 className="text-white font-weight-medium mb-2">
                                    754
                                </h4>

                                <span className="text-white">
                                    Happy Students
                                </span>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="bg-primary text-white rounded p-4 text-center">

                                <h4 className="text-white font-weight-medium mb-2">
                                    675
                                </h4>

                                <span className="text-white">
                                    Approved Courses
                                </span>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="bg-primary text-white rounded p-4 text-center">

                                <h4 className="text-white font-weight-medium mb-2">
                                    675
                                </h4>

                                <span className="text-white">
                                    Enquiries
                                </span>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="bg-primary text-white rounded p-4 text-center">

                                <h4 className="text-white font-weight-medium mb-2">
                                    1,248
                                </h4>

                                <span className="text-white">
                                    Completed Students
                                </span>

                            </div>
                        </div>

                    </div>
                </div>








                {/* <!-- Courses Start --> */}


                {/* <div className="container py-5">
                    <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Department</h5>
                        <h1>Our Popular Department</h1>
                    </div>
                    <div className="row">
                        {dataepartments.map((item) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                                <div className="rounded overflow-hidden mb-2">

                                    <img
                                        className="img-fluid"
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "100%",
                                            height: "220px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div className="bg-secondary p-4">
                                        <Link
                                            className="h5"
                                            to={`/course-details/${item.id}`}
                                        >
                                            {item.name}
                                        </Link>

                                        <p style={{ fontSize: "14px" }} className="mt-3 mb-3">
                                            {item.description
                                                ?.split(" ")
                                                .slice(0, 30)
                                                .join(" ")}
                                            {item.description?.split(" ").length > 30 ? "..." : ""}
                                        </p>

                                        <div className="border-top mt-4 pt-4">
                                            <div className="d-flex justify-content-between">

                                                <h6 className="m-0">
                                                    <i className="fa fa-book text-primary mr-2"></i>
                                                    {item.course_count} Courses
                                                </h6>


                                                <Link
                                                    className="btn btn-primary   font-weight-semi-bold mt-2"
                                                    to={`/course-details/${item.id}`}
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* <!-- Courses End --> */}
                {/* <!-- Why SBSHE  --> */}


                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <img className="img-fluid rounded mb-4 mb-lg-0" src="/assets/img/Logo.png" alt="" />
                        </div>
                        <div className="col-lg-7">
                            <div className="text-left mb-4">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }} >  Why SBSHE?</h5>
                                <h3>Choosing  Shaheed Bhagat Singh Health & Education (SBSHE)</h3>
                            </div>
                            <p>


                                means becoming part of an initiative focused on  education, healthcare, skill development, and social empowerment. We believe that every individual deserves the right opportunities, proper guidance, and access to resources that can help them build a better future.

                                Why Choose SBSHE?
                                <br />
                                1. Quality Education
                                We focus on providing meaningful learning opportunities that help students and individuals improve their knowledge, skills, and confidence.
                                <br />
                                2. Health & Well-being
                                We promote health awareness and encourage individuals and communities to adopt healthier and more informed lifestyles.
                                <br />
                                Our Commitment

                                At SBSHE, we are committed to creating opportunities that help individuals learn, grow, become self-reliant, and contribute positively to society. Our goal is to build a future where education and health become powerful tools for personal and social transformation.



                            </p>
                            {/* <a href="" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                        */}
                        </div>



                    </div>
                </div>

                <Course />
            </div>

            {/* <!-- Registration Start --> */}
            <div className="container-fluid bg-registration py-5" style={{ margin: "90px 0" }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="mb-4">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Need Any Courses</h5>
                                <h1 className="text-white">New Students</h1>
                            </div>
                            <p className="text-white">Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                                ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                                dolor</p>
                            <ul className="list-inline text-white m-0">
                                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Labore eos amet dolor amet diam</li>
                                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Etsea et sit dolor amet ipsum</li>
                                <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Diam dolor diam elitripsum vero.</li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0">
                                <div className="card-header bg-light text-center p-4">
                                    <h1 className="m-0">Sign Up Now</h1>
                                </div>
                                <div className="card-body rounded-bottom bg-primary p-5">
                                    <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control border-0 p-4" placeholder="Your name" required="required" />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control border-0 p-4" placeholder="Your mobile no." required="required" />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="custom-select border-0 px-4"
                                                style={{ height: "47px" }}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select a course
                                                </option>

                                                <option value="1">Course 1</option>
                                                <option value="2">Course 2</option>
                                                <option value="3">Course 3</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark btn-block border-0 py-3" type="submit">Sign Up Now</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Registration End --> */}





            {/* <!-- Blog Start --> */}
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Our Blog</h5>
                        <h1>Latest From Our Blog</h1>
                    </div>
                    <div className="row pb-3">

                        <div className="col-lg-4 mb-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">

                                <iframe
                                    className="w-100"
                                    height="220"
                                    src="https://www.youtube.com/embed/cDHAqjcHjuU"
                                    title="SBSHE Introduction Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{
                                        display: "block",
                                        border: "none",
                                    }}
                                ></iframe>

                                {/* Video Title */}
                                <div className="bg-secondary p-3">
                                    <h5 className="mb-0">
                                        SBSHE Introduction
                                    </h5>
                                </div>

                            </div>
                        </div>


                        <div className="col-lg-4 mb-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">

                                <iframe
                                    className="w-100"
                                    height="220"
                                    src="https://www.youtube.com/embed/cDHAqjcHjuU"
                                    title="SBSHE Introduction Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{
                                        display: "block",
                                        border: "none",
                                    }}
                                ></iframe>

                                {/* Video Title */}
                                <div className="bg-secondary p-3">
                                    <h5 className="mb-0">
                                        SBSHE Introduction
                                    </h5>
                                </div>

                            </div>
                        </div>

                        
                        <div className="col-lg-4 mb-4">
                            <div className="blog-item position-relative overflow-hidden rounded mb-2">

                                <iframe
                                    className="w-100"
                                    height="220"
                                    src="https://www.youtube.com/embed/cDHAqjcHjuU"
                                    title="SBSHE Introduction Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{
                                        display: "block",
                                        border: "none",
                                    }}
                                ></iframe>

                                {/* Video Title */}
                                <div className="bg-secondary p-3">
                                    <h5 className="mb-0">
                                        SBSHE Introduction
                                    </h5>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {/* <!-- Blog End --> */}






        </>
    )
}

export default Home