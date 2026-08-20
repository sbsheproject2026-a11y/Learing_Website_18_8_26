import React, { useEffect, useState } from 'react'
import { getDepartments } from './CourseServiceData';
import { Link } from 'react-router-dom';
import Course from './Course';
import { getWebsiteContent } from './HomeService';

function Home() {

    const [dataepartments, setDataepartments] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [totalcounts, setTotalcounts] = useState([]);
    const [whyChosseUs, setWhychosseus] = useState([]);
    const [testimonial, setTestimonial] = useState([]);
    const [ourBlogs, setOurBlogs] = useState([]);


    useEffect(() => {
        loadPageData();
       
    }, []);

    const loadPageData = async () => {
        try {
            const [
                slidersData,
                announcementsData,
                totalcountsData,
                whyChosseUsdata,
                testimonialdata,
                ourBlogsdata
            ] = await Promise.all([
                getWebsiteContent(1), // Slider
                getWebsiteContent(2), // About Us
                getWebsiteContent(3), // Courses
                getWebsiteContent(8), // Why Choose Us
                getWebsiteContent(19), // Why Choose Us
                getWebsiteContent(9), // Why Choose Us
            ]);

            setSliders(slidersData.filter(
                (item) => item.is_active === true
            ));
            setAnnouncements(announcementsData.filter(
                (item) => item.is_active === true
            ));
            setTotalcounts(totalcountsData.filter(
                (item) => item.is_active === true
            ));
            setWhychosseus(whyChosseUsdata.filter(
                (item) => item.is_active === true
            ));
            setTestimonial(testimonialdata.filter(
                (item) => item.is_active === true
            ));
            setOurBlogs(ourBlogsdata.filter(
                (item) => item.is_active === true
            ));



        } catch (error) {
            console.log("Page data error:", error);
        }
    };


    const [activeSlide, setActiveSlide] = useState(0);

    const slides = sliders
        .filter(item => item.is_active && item.file)
        .map(item => item.file);

    useEffect(() => {
        setActiveSlide(0);
    }, [sliders]);

    useEffect(() => {

        if (slides.length <= 1) {
            return;
        }

        const interval = setInterval(() => {

            setActiveSlide(prev => {
                return (prev + 1) % slides.length;
            });

        }, 8000);

        return () => clearInterval(interval);

    }, [slides]);

    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        if (!testimonial || testimonial.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setActiveTestimonial((prev) => {
                return (prev + 1) % testimonial.length;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonial]);




   

    const getYoutubeUrl = (description) => {
        if (!description) return null;

        const match = description.match(
            /src=["'](https:\/\/www\.youtube\.com\/embed\/[^"']+)["']/
        );

        return match ? match[1] : null;
    };


    return (
        <>


            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0 pb-5 mb-5">

                <div id="header-carousel" className="carousel slide carousel-fade">

                    {/* Indicators */}
                    <ol className="carousel-indicators">
                        {slides?.slice().reverse().map((_, index) => (
                            <li
                                key={index}
                                className={activeSlide === index ? "active" : ""}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </ol>

                    {/* Slides */}
                    <div className="carousel-inner">

                        {slides?.slice().reverse().map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${activeSlide === index ? "active" : ""
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="header-slide-image"
                                />
                            </div>
                        ))}

                    </div>

                    {/* Responsive CSS */}
                    <style>
                        {`
            .header-slide-image {
                width: 100%;
                height: 700px;
                object-fit: cover;
                object-position: center;
                display: block;
            }

            /* Tablet */
            @media (max-width: 991px) {
                .header-slide-image {
                    height: 500px;
                }
            }

            /* Mobile */
            @media (max-width: 767px) {
                .header-slide-image {
                    height: 320px;
                    object-fit: cover;
                    object-position: center;
                }

                #header-carousel .carousel-indicators {
                    bottom: 5px;
                }

                #header-carousel .carousel-indicators li {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin: 0 4px;
                }
            }

            /* Small Mobile */
            @media (max-width: 480px) {
                .header-slide-image {
                    height: 250px;
                }
            }
        `}
                    </style>

                </div>


                {announcements?.length > 0 && (
                    <div className="announcement-bar bg-primary text-white d-flex align-items-center">

                        <div className="announcement-title font-weight-bold">
                            📢 Announcements:
                        </div>

                        <div className="announcement-scroll flex-grow-1 overflow-hidden">
                            <marquee behavior="scroll" direction="left">
                                {announcements.map((item, index) => (
                                    <span key={item.id}>
                                        {item.name}
                                        {index < announcements.length - 1 && "  |  "}
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



                <div className="container pt-5 pb-3">

                    <div className="row justify-content-center">
                        {totalcounts?.slice().reverse().map((item, index) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={index}>
                                <div className="bg-primary text-white rounded p-4 text-center">

                                    <h4 className="text-white font-weight-medium mb-2">
                                        {item.short_name}
                                    </h4>

                                    <span className="text-white">
                                        {item.name}
                                    </span>

                                </div>
                            </div>
                        ))}


                    </div>
                </div>



                {/* <!-- Why SBSHE  --> */}


                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <img
                                className="img-fluid rounded mb-4 mb-lg-0"
                                src={whyChosseUs?.[0]?.file}
                                alt={whyChosseUs?.[0]?.name || "Why SBSHE"}
                            />
                        </div>
                        <div className="col-lg-7">
                            <div className="text-left mb-4">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }} >  {whyChosseUs?.[0]?.menu_name}</h5>
                                <h3>  {whyChosseUs?.[0]?.name}</h3>
                            </div>
                            <div
                                style={{


                                    whiteSpace: "pre-line"
                                }}
                            >
                                {whyChosseUs?.[0]?.description || ""}
                            </div>



                        </div>



                    </div>
                </div>

                <Course />
            </div>

            {/* <!-- Registration Start --> */}

            {/* How It Works Start */}

            <div
                className="container-fluid bg-registration py-5 how-it-works-section"
                style={{ margin: "90px 0" }}
            >
                <div className="container py-5">

                    <div className="row align-items-center">

                        {/* =====================================
                LEFT CONTENT
            ===================================== */}

                        <div className="col-lg-7 mb-5 mb-lg-0">

                            <div className="mb-4">

                                <h5
                                    className="text-primary text-uppercase mb-3 how-subtitle"
                                    style={{ letterSpacing: "5px" }}
                                >
                                    How It Works
                                </h5>

                                <h1 className="text-white how-title">
                                    Start Learning In 4 Easy Steps
                                </h1>

                            </div>


                            <p className="text-white how-intro">
                                Getting started with our courses is simple. Choose your
                                course, enroll, learn at your own pace, and achieve your
                                learning goals.
                            </p>


                            {/* =====================================
                    STEPS
                ===================================== */}

                            <ul className="list-unstyled text-white m-0 how-steps">

                                {/* STEP 01 */}

                                <li className="how-step">

                                    <div className="step-icon">
                                        <i className="fa fa-check"></i>
                                    </div>

                                    <div className="step-content">

                                        <strong>
                                            01. Choose Your Course
                                        </strong>

                                        <p>
                                            Explore our courses and select the one
                                            that matches your goals.
                                        </p>

                                    </div>

                                </li>


                                {/* STEP 02 */}

                                <li className="how-step">

                                    <div className="step-icon">
                                        <i className="fa fa-check"></i>
                                    </div>

                                    <div className="step-content">

                                        <strong>
                                            02. Enroll Now
                                        </strong>

                                        <p>
                                            Register for your selected course and
                                            get started.
                                        </p>

                                    </div>

                                </li>


                                {/* STEP 03 */}

                                <li className="how-step">

                                    <div className="step-icon">
                                        <i className="fa fa-check"></i>
                                    </div>

                                    <div className="step-content">

                                        <strong>
                                            03. Learn & Practice
                                        </strong>

                                        <p>
                                            Learn from expert instructors and
                                            practice your skills.
                                        </p>

                                    </div>

                                </li>


                                {/* STEP 04 */}

                                <li className="how-step">

                                    <div className="step-icon">
                                        <i className="fa fa-check"></i>
                                    </div>

                                    <div className="step-content">

                                        <strong>
                                            04. Complete & Grow
                                        </strong>

                                        <p>
                                            Complete your course and take the next
                                            step toward your career goals.
                                        </p>

                                    </div>

                                </li>

                            </ul>

                        </div>


                        {/* =====================================
                RIGHT CARD
            ===================================== */}

                        <div className="col-lg-5">

                            <div className="learning-card">

                                {/* CARD HEADER */}

                                <div className="learning-card-header">

                                    <h2>
                                        Start Learning
                                    </h2>

                                </div>


                                {/* CARD BODY */}

                                <div className="learning-card-body">

                                    <div className="text-center text-white">

                                        <div className="learning-icon">

                                            <i className="fa fa-graduation-cap"></i>

                                        </div>


                                        <h3 className="text-white mb-3">
                                            Ready to Learn?
                                        </h3>


                                        <p className="learning-description">
                                            Find the right course for you and start
                                            building your skills today.
                                        </p>


                                        <a
                                            href="/department"
                                            className="btn btn-dark btn-block border-0 explore-btn"
                                        >
                                            Explore Courses

                                            <i className="fa fa-arrow-right ml-2"></i>
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================
        CSS
    ===================================== */}

                <style>
                    {`

        /* =========================================
           MAIN SECTION
        ========================================= */

        .how-it-works-section {
            position: relative;
            overflow: hidden;
        }


        /* =========================================
           HEADING
        ========================================= */

        .how-subtitle {
            font-size: 15px;
            font-weight: 600;
        }

        .how-title {
            font-size: 40px;
            font-weight: 700;
            line-height: 1.25;
        }

        .how-intro {
            font-size: 16px;
            line-height: 1.8;
            max-width: 650px;
        }


        /* =========================================
           STEPS
        ========================================= */

        .how-steps {
            margin-top: 25px !important;
        }

        .how-step {
            display: flex;
            align-items: flex-start;
            gap: 15px;

            padding: 14px 0;

            transition: all 0.3s ease;
        }


        /* =========================================
           STEP ICON
        ========================================= */

        .step-icon {
            flex: 0 0 30px;

            width: 30px;
            height: 30px;

            background: #ff6600;

            color: #ffffff;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 13px;

            margin-top: 2px;
        }


        /* =========================================
           STEP CONTENT
        ========================================= */

        .step-content {
            flex: 1;
        }

        .step-content strong {
            display: block;

            color: #ffffff;

            font-size: 16px;

            margin-bottom: 5px;
        }

        .step-content p {
            margin: 0;

            color: rgba(255, 255, 255, 0.85);

            font-size: 14px;

            line-height: 1.6;
        }


        /* =========================================
           LEARNING CARD
        ========================================= */

        .learning-card {
            background: #ffffff;

            border-radius: 12px;

            overflow: hidden;

            border: none;

            box-shadow:
                0 15px 40px
                rgba(0, 0, 0, 0.20);
        }


        /* =========================================
           CARD HEADER
        ========================================= */

        .learning-card-header {
            background: #f8f9fa;

            text-align: center;

            padding: 28px 20px;
        }

        .learning-card-header h2 {
            margin: 0;

            color: #222222;

            font-size: 28px;

            font-weight: 700;
        }


        /* =========================================
           CARD BODY
        ========================================= */

        .learning-card-body {
            background: #ff6600;

            padding: 45px 40px;
        }


        /* =========================================
           GRADUATION ICON
        ========================================= */

        .learning-icon {
            width: 90px;
            height: 90px;

            margin: 0 auto 25px;

            border-radius: 50%;

            background: rgba(255, 255, 255, 0.15);

            display: flex;
            align-items: center;
            justify-content: center;
        }

        .learning-icon i {
            font-size: 45px;

            color: #ffffff;
        }


        /* =========================================
           CARD TITLE
        ========================================= */

        .learning-card-body h3 {
            font-size: 26px;

            font-weight: 700;
        }


        /* =========================================
           CARD DESCRIPTION
        ========================================= */

        .learning-description {
            color: rgba(255, 255, 255, 0.9);

            font-size: 15px;

            line-height: 1.7;

            max-width: 350px;

            margin: 0 auto 25px;
        }


        /* =========================================
           EXPLORE BUTTON
        ========================================= */

        .explore-btn {
            padding: 14px 20px;

            border-radius: 7px;

            font-size: 14px;

            font-weight: 600;

            transition: all 0.3s ease;
        }

        .explore-btn:hover {
            background: #222222;

            transform: translateY(-2px);

            box-shadow:
                0 7px 18px
                rgba(0, 0, 0, 0.20);
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

            .how-it-works-section {
                margin: 60px 0 !important;
            }

            .how-title {
                font-size: 34px;
            }

            .how-intro {
                font-size: 15px;
            }

            .learning-card {
                margin-top: 20px;
            }

            .learning-card-body {
                padding: 40px 30px;
            }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

            .how-it-works-section {
                margin: 40px 0 !important;

                padding-top: 45px !important;
                padding-bottom: 45px !important;
            }


            .how-it-works-section
            .container {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }


            /* Subtitle */

            .how-subtitle {
                font-size: 12px;

                letter-spacing: 3px !important;

                margin-bottom: 12px !important;
            }


            /* Main Heading */

            .how-title {
                font-size: 27px;

                line-height: 1.35;

                margin-bottom: 20px;
            }


            /* Intro */

            .how-intro {
                font-size: 14px;

                line-height: 1.7;

                margin-bottom: 20px;
            }


            /* Steps */

            .how-step {
                gap: 12px;

                padding: 12px 0;
            }


            .step-icon {
                flex: 0 0 27px;

                width: 27px;
                height: 27px;

                font-size: 11px;
            }


            .step-content strong {
                font-size: 14px;

                line-height: 1.4;
            }


            .step-content p {
                font-size: 13px;

                line-height: 1.55;

                margin-top: 3px;
            }


            /* Learning Card */

            .learning-card {
                margin-top: 35px;

                border-radius: 10px;
            }


            .learning-card-header {
                padding: 22px 15px;
            }


            .learning-card-header h2 {
                font-size: 23px;
            }


            .learning-card-body {
                padding: 35px 22px;
            }


            /* Icon */

            .learning-icon {
                width: 75px;
                height: 75px;

                margin-bottom: 20px;
            }


            .learning-icon i {
                font-size: 38px;
            }


            /* Card Heading */

            .learning-card-body h3 {
                font-size: 22px;

                margin-bottom: 12px !important;
            }


            /* Description */

            .learning-description {
                font-size: 13px;

                line-height: 1.6;

                margin-bottom: 22px;
            }


            /* Button */

            .explore-btn {
                padding: 13px 15px;

                font-size: 13px;
            }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

            .how-title {
                font-size: 24px;
            }


            .how-intro {
                font-size: 13px;
            }


            .how-step {
                padding: 10px 0;
            }


            .step-content strong {
                font-size: 13px;
            }


            .step-content p {
                font-size: 12px;
            }


            .learning-card-header {
                padding: 20px 15px;
            }


            .learning-card-header h2 {
                font-size: 21px;
            }


            .learning-card-body {
                padding: 30px 18px;
            }


            .learning-card-body h3 {
                font-size: 20px;
            }


            .learning-description {
                font-size: 12px;
            }

        }

        `}
                </style>

            </div>


            {/* How It Works End */}


            {/* <!-- Registration End --> */}


            <div className="carousel-inner overflow-hidden">
                <div
                    style={{
                        display: "flex",
                        transition: "transform 0.6s ease-in-out",
                        transform: `translateX(-${activeTestimonial * 100}%)`,
                    }}
                >
                    {testimonial?.slice().reverse().map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                minWidth: "100%",
                                flex: "0 0 100%",
                            }}
                        >
                            {/* Section Header */}
                            <div className="text-center mb-5">
                                <span
                                    className="text-primary text-uppercase font-weight-bold"
                                    style={{
                                        letterSpacing: "4px",
                                        fontSize: "14px"
                                    }}
                                >
                                    Testimonial
                                </span>

                                <h1 className="mt-2 mb-3 font-weight-bold">
                                    What Say Our Students
                                </h1>


                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-md-10">

                                    <div
                                        className="bg-white rounded shadow-sm p-5 text-center"
                                        style={{
                                            minHeight: "350px"
                                        }}
                                    >

                                        {/* Student Image */}
                                        <div className="mb-4">
                                            {item.file_url ? (
                                                <img
                                                    src={item.file_url}
                                                    alt={item.name}
                                                    className="rounded-circle"
                                                    style={{
                                                        width: "110px",
                                                        height: "110px",
                                                        objectFit: "cover",
                                                        border: "5px solid #007bff"
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "110px",
                                                        height: "110px",
                                                        fontSize: "40px"
                                                    }}
                                                >
                                                    <i className="fa fa-user"></i>
                                                </div>
                                            )}
                                        </div>

                                        {/* Stars */}
                                        <div className="mb-3 text-warning">
                                            <i className="fa fa-star mr-1"></i>
                                            <i className="fa fa-star mr-1"></i>
                                            <i className="fa fa-star mr-1"></i>
                                            <i className="fa fa-star mr-1"></i>
                                            <i className="fa fa-star"></i>
                                        </div>

                                        {/* Short Intro */}
                                        <p
                                            className="text-muted mb-4"
                                            style={{
                                                fontSize: "17px",
                                                lineHeight: "1.8"
                                            }}
                                        >
                                            <i className="fa fa-quote-left text-primary mr-2"></i>

                                            {item.short_intro}

                                            <i className="fa fa-quote-right text-primary ml-2"></i>
                                        </p>

                                        {/* Name */}
                                        <h4 className="text-primary mb-1">
                                            {item.name}
                                        </h4>

                                        <small className="text-muted">

                                            {item.short_name}
                                        </small>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>






            {/* <!-- Blog Start --> */}

            <div className="container-fluid py-5 bg-light">
                <div className="container py-4">

                    {/* Section Header */}
                    <div className="text-center mb-5">
                        <span
                            className="text-primary text-uppercase font-weight-bold"
                            style={{
                                letterSpacing: "4px",
                                fontSize: "14px"
                            }}
                        >
                            Our Blog
                        </span>

                        <h1 className="mt-2 mb-3 font-weight-bold">
                            Latest From Our Blog
                        </h1>

                        <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
                            Stay updated with our latest videos, news, and educational
                            content.
                        </p>
                    </div>

                    {/* Blog Cards */}
                    <div className="row justify-content-center">

                        {ourBlogs?.map((item) => {
                            const youtubeUrl = getYoutubeUrl(item.description);

                            return (
                                <div
                                    className="col-lg-4 col-md-6 mb-4 d-flex"
                                    key={item.id}
                                >
                                    <div
                                        className="blog-card bg-white w-100 overflow-hidden"
                                        style={{
                                            borderRadius: "15px",
                                            boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
                                            transition: "all 0.3s ease",
                                        }}
                                    >

                                        {/* Video */}
                                        {youtubeUrl && (
                                            <div
                                                style={{
                                                    height: "220px",
                                                    overflow: "hidden",
                                                    background: "#000",
                                                }}
                                            >
                                                <iframe
                                                    key={item.id}
                                                    className="w-100"
                                                    height="220"
                                                    src={youtubeUrl}
                                                    title={item.name}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    style={{
                                                        display: "block",
                                                        border: "none",
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div
                                            className="p-4 d-flex flex-column"
                                            style={{
                                                minHeight: "145px",
                                            }}
                                        >
                                            <div className="mb-2">
                                                <span
                                                    className="badge badge-primary"
                                                    style={{
                                                        borderRadius: "20px",
                                                        padding: "6px 12px",
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    VIDEO
                                                </span>
                                            </div>

                                            <h5
                                                className="font-weight-bold mb-2"
                                                style={{
                                                    color: "#222",
                                                    lineHeight: "1.5",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {item.name}
                                            </h5>


                                        </div>

                                    </div>
                                </div>
                            );
                        })}


                    </div>

                </div>

                {/* Hover CSS */}
                <style>
                    {`
            .blog-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
            }

            .blog-card iframe {
                width: 100% !important;
                height: 220px !important;
                display: block;
                border: none !important;
            }

            @media (max-width: 767px) {
                .blog-card iframe {
                    height: 210px !important;
                }
            }
        `}
                </style>
            </div>



            {/* <!-- Blog End --> */}






        </>
    )
}

export default Home