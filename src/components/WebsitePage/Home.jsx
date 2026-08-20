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

                    <div className="announcement-wrapper">

                        <div className="announcement-bar">

                            {/* =========================
                TITLE
            ========================== */}

                            <div className="announcement-title">

                                <div className="announcement-icon">
                                    <i className="fa fa-bullhorn"></i>
                                </div>

                                <span>
                                    Announcements
                                </span>

                            </div>


                            {/* =========================
                SCROLL AREA
            ========================== */}

                            <div className="announcement-content">

                                <div className="announcement-track">

                                    {/* First copy */}

                                    <div className="announcement-items">

                                        {announcements.map((item, index) => (

                                            <React.Fragment key={item.id}>

                                                <span className="announcement-item">
                                                    {item.name}
                                                </span>

                                                {index < announcements.length - 1 && (
                                                    <span className="announcement-separator">
                                                        •
                                                    </span>
                                                )}

                                            </React.Fragment>

                                        ))}

                                    </div>


                                    {/* Duplicate copy for smooth infinite scroll */}

                                    <div className="announcement-items">

                                        {announcements.map((item, index) => (

                                            <React.Fragment key={`duplicate-${item.id}`}>

                                                <span className="announcement-item">
                                                    {item.name}
                                                </span>

                                                {index < announcements.length - 1 && (
                                                    <span className="announcement-separator">
                                                        •
                                                    </span>
                                                )}

                                            </React.Fragment>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =========================
            CSS
        ========================== */}

                        <style>
                            {`

            /* =========================================
               ANNOUNCEMENT WRAPPER
            ========================================= */

            .announcement-wrapper {
                width: 100%;
                padding: 0;
                background: #ff6600;
            }


            /* =========================================
               MAIN BAR
            ========================================= */

            .announcement-bar {
                width: 100%;

                min-height: 48px;

                display: flex;
                align-items: center;

                background:
                    linear-gradient(
                        90deg,
                        #ff6600 0%,
                        #ff6600 50%,
                        #ff6600100%
                    );

                color: #ffffff;

                box-shadow:
                    0 4px 15px rgba(0, 123, 255, 0.18);

                overflow: hidden;
            }


            /* =========================================
               TITLE
            ========================================= */

            .announcement-title {
                position: relative;

                z-index: 5;

                height: 48px;

                min-width: 180px;

                padding: 0 20px;

                display: flex;
                align-items: center;
                justify-content: center;

                gap: 10px;

                background: #ff6600;

                color: #ffffff;

                font-size: 14px;

                font-weight: 700;

                white-space: nowrap;

                box-shadow:
                    5px 0 15px rgba(0, 0, 0, 0.12);
            }


            /* Small angled design */

            .announcement-title::after {
                content: "";

                position: absolute;

                right: -12px;

                top: 0;

                width: 25px;

                height: 100%;

                background: #ff6600;

                transform: skewX(-15deg);

                z-index: -1;
            }


            /* =========================================
               ICON
            ========================================= */

            .announcement-icon {
                width: 28px;
                height: 28px;

                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 50%;

                background: rgba(255, 255, 255, 0.18);

                color: #ffffff;

                font-size: 13px;

                animation: announcementBell 1.8s ease-in-out infinite;
            }


            @keyframes announcementBell {

                0%,
                70%,
                100% {
                    transform: rotate(0deg);
                }

                75% {
                    transform: rotate(12deg);
                }

                80% {
                    transform: rotate(-12deg);
                }

                85% {
                    transform: rotate(8deg);
                }

                90% {
                    transform: rotate(-5deg);
                }

            }


            /* =========================================
               SCROLL AREA
            ========================================= */

            .announcement-content {
                position: relative;

                flex: 1;

                min-width: 0;

                height: 48px;

                display: flex;

                align-items: center;

                overflow: hidden;
            }


            /* Fade edges */

            .announcement-content::before {
                content: "";

                position: absolute;

                left: 0;
                top: 0;

                width: 35px;
                height: 100%;

                z-index: 2;

                background:
                    linear-gradient(
                        to right,
                        #ff6600,
                        transparent
                    );

                pointer-events: none;
            }


            .announcement-content::after {
                content: "";

                position: absolute;

                right: 0;
                top: 0;

                width: 35px;
                height: 100%;

                z-index: 2;

                background:
                    linear-gradient(
                        to left,
                        #ff6600,
                        transparent
                    );

                pointer-events: none;
            }


            /* =========================================
               TRACK
            ========================================= */

            .announcement-track {
                display: flex;

                width: max-content;

                align-items: center;

                animation:
                    announcementScroll 28s linear infinite;
            }


            .announcement-track:hover {
                animation-play-state: paused;
            }


            @keyframes announcementScroll {

                from {
                    transform: translateX(0);
                }

                to {
                    transform: translateX(-50%);
                }

            }


            /* =========================================
               ITEMS
            ========================================= */

            .announcement-items {
                display: flex;

                align-items: center;

                white-space: nowrap;
            }


            .announcement-item {
                display: inline-flex;

                align-items: center;

                color: #ffffff;

                font-size: 14px;

                font-weight: 500;

                padding: 0 12px;

                cursor: default;
            }


            .announcement-separator {
                color: #ffd166;

                font-size: 18px;

                font-weight: 700;

                margin: 0 3px;
            }


            /* =========================================
               MOBILE
            ========================================= */

            @media (max-width: 767px) {

                .announcement-bar {
                    min-height: 42px;
                }


                .announcement-title {
                    min-width: 125px;

                    height: 42px;

                    padding: 0 10px;

                    gap: 7px;

                    font-size: 11px;
                }


                .announcement-icon {
                    width: 24px;
                    height: 24px;

                    min-width: 24px;

                    font-size: 11px;
                }


                .announcement-content {
                    height: 42px;
                }


                .announcement-item {
                    font-size: 12px;

                    padding: 0 9px;
                }


                .announcement-separator {
                    font-size: 15px;
                }


                .announcement-track {
                    animation-duration: 22s;
                }

            }


            /* =========================================
               SMALL MOBILE
            ========================================= */

            @media (max-width: 480px) {

                .announcement-title {
                    min-width: 105px;

                    padding: 0 7px;

                    font-size: 10px;

                    gap: 5px;
                }


                .announcement-icon {
                    width: 21px;
                    height: 21px;

                    min-width: 21px;

                    font-size: 9px;
                }


                .announcement-item {
                    font-size: 11px;

                    padding: 0 7px;
                }


                .announcement-separator {
                    font-size: 13px;
                }


                .announcement-track {
                    animation-duration: 18s;
                }

            }


            /* =========================================
               REDUCED MOTION
            ========================================= */

            @media (prefers-reduced-motion: reduce) {

                .announcement-track {
                    animation: none;
                }

                .announcement-icon {
                    animation: none;
                }

            }

            `}
                        </style>

                    </div>
                )}




                {/* ================================
    TOTAL COUNTS SECTION
================================ */}

                <section className="count-section">

                    <div className="container py-5">

                        <div className="row justify-content-center">

                            {totalcounts?.slice().reverse().map((item, index) => (

                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 mb-4"
                                    key={index}
                                >

                                    <div className="count-card">

                                        {/* Orange Icon */}
                                        <div className="count-icon">
                                            <i className="fa fa-graduation-cap"></i>
                                        </div>

                                        {/* Content */}
                                        <div className="count-content">

                                            <h2>
                                                {item.short_name}
                                            </h2>

                                            <p>
                                                {item.name}
                                            </p>

                                        </div>

                                        {/* Decorative Number */}
                                        <span className="count-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Bottom Arrow */}
                                        <div className="count-arrow">
                                            <i className="fa fa-arrow-right"></i>
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                <style>
                    {`

/* =========================================
   MAIN SECTION
========================================= */

.count-section {
    position: relative;

    background:
        linear-gradient(
            135deg,
            #fff7f0 0%,
            #ffffff 45%,
            #fff4e8 100%
        );

    overflow: hidden;
}


/* Decorative background circles */

.count-section::before {
    content: "";

    position: absolute;

    width: 300px;
    height: 300px;

    border-radius: 50%;

    background: rgba(255, 102, 0, 0.06);

    top: -130px;
    left: -100px;
}

.count-section::after {
    content: "";

    position: absolute;

    width: 350px;
    height: 350px;

    border-radius: 50%;

    background: rgba(255, 102, 0, 0.05);

    right: -150px;
    bottom: -170px;
}


/* =========================================
   CARD
========================================= */

.count-card {
    position: relative;

    min-height: 155px;

    padding: 26px 24px;

    display: flex;
    align-items: center;

    gap: 18px;

    background: #ffffff;

    border: 1px solid rgba(255, 102, 0, 0.12);

    border-radius: 20px;

    overflow: hidden;

    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.06);

    transition:
        transform 0.35s ease,
        box-shadow 0.35s ease,
        border-color 0.35s ease;
}


/* Orange top line */

.count-card::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 5px;

    background: #ff6600;

    transition: height 0.3s ease;
}


/* Hover */

.count-card:hover {

    transform: translateY(-8px);

    border-color: rgba(255, 102, 0, 0.35);

    box-shadow:
        0 18px 40px rgba(255, 102, 0, 0.16);
}

.count-card:hover::before {
    height: 7px;
}


/* =========================================
   ICON
========================================= */

.count-icon {

    width: 62px;
    height: 62px;

    min-width: 62px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 16px;

    background: #fff1e6;

    color: #ff6600;

    font-size: 25px;

    box-shadow:
        0 6px 15px rgba(255, 102, 0, 0.08);

    transition:
        all 0.35s ease;
}


.count-card:hover .count-icon {

    background: #ff6600;

    color: #ffffff;

    transform: scale(1.08) rotate(-3deg);

    box-shadow:
        0 8px 20px rgba(255, 102, 0, 0.25);
}


/* =========================================
   CONTENT
========================================= */

.count-content {

    position: relative;

    z-index: 2;

    padding-right: 30px;
}


.count-content h2 {

    margin: 0 0 6px;

    color: #222222;

    font-size: 30px;

    font-weight: 800;

    line-height: 1.15;

    transition: color 0.3s ease;
}


.count-card:hover .count-content h2 {
    color: #ff6600;
}


.count-content p {

    margin: 0;

    color: #777777;

    font-size: 14px;

    font-weight: 500;

    line-height: 1.5;
}


/* =========================================
   DECORATIVE NUMBER
========================================= */

.count-number {

    position: absolute;

    right: -5px;
    bottom: -18px;

    font-size: 78px;

    font-weight: 900;

    line-height: 1;

    color: rgba(255, 102, 0, 0.055);

    pointer-events: none;

    user-select: none;

    transition: color 0.3s ease;
}


.count-card:hover .count-number {
    color: rgba(255, 102, 0, 0.09);
}


/* =========================================
   ARROW
========================================= */

.count-arrow {

    position: absolute;

    right: 18px;
    top: 18px;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #fff5ed;

    color: #ff6600;

    font-size: 12px;

    opacity: 0;

    transform: translateX(-8px);

    transition: all 0.3s ease;
}


.count-card:hover .count-arrow {

    opacity: 1;

    transform: translateX(0);
}


/* =========================================
   DIFFERENT CARD ACCENTS
========================================= */

/* Card 2 */

.col-xl-3:nth-child(2) .count-card::before {
    background: #ff8533;
}

.col-xl-3:nth-child(2) .count-icon {
    background: #fff3e9;
    color: #ff8533;
}


/* Card 3 */

.col-xl-3:nth-child(3) .count-card::before {
    background: #e85d04;
}

.col-xl-3:nth-child(3) .count-icon {
    background: #fff0e5;
    color: #e85d04;
}


/* Card 4 */

.col-xl-3:nth-child(4) .count-card::before {
    background: #cc5200;
}

.col-xl-3:nth-child(4) .count-icon {
    background: #fff0e5;
    color: #cc5200;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 991px) {

    .count-card {
        min-height: 145px;
        padding: 24px 20px;
    }

    .count-icon {
        width: 56px;
        height: 56px;
        min-width: 56px;
        font-size: 22px;
    }

    .count-content h2 {
        font-size: 27px;
    }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 767px) {

    .count-section {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .count-card {

        min-height: 130px;

        padding: 20px;

        border-radius: 16px;

        gap: 15px;
    }

    .count-icon {

        width: 52px;
        height: 52px;

        min-width: 52px;

        border-radius: 14px;

        font-size: 20px;
    }

    .count-content h2 {
        font-size: 25px;
    }

    .count-content p {
        font-size: 13px;
    }

    .count-number {
        font-size: 62px;
    }

    .count-arrow {
        display: none;
    }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

    .count-card {

        min-height: 115px;

        padding: 18px;

        gap: 13px;

        border-radius: 14px;
    }

    .count-icon {

        width: 48px;
        height: 48px;

        min-width: 48px;

        font-size: 18px;

        border-radius: 12px;
    }

    .count-content h2 {
        font-size: 22px;
    }

    .count-content p {
        font-size: 12px;
    }

    .count-number {
        font-size: 55px;
    }

}

`}
                </style>




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


            <div className="testimonial-section">

    <div className="container py-5">

        {/* ============================
            SECTION HEADER
        ============================= */}

        <div className="testimonial-heading text-center mb-5">

            <div className="testimonial-label">
                <span></span>
                TESTIMONIAL
                <span></span>
            </div>

            <h1>
                What Our Students Say
            </h1>

            <p>
                Real experiences from students who have learned,
                grown and achieved their goals with us.
            </p>

        </div>


        {/* ============================
            SLIDER
        ============================= */}

        <div className="testimonial-slider">

            <div className="testimonial-overflow">

                <div
                    className="testimonial-track"
                    style={{
                        transform: `translateX(-${activeTestimonial * 100}%)`
                    }}
                >

                    {testimonial?.slice().reverse().map((item, index) => (

                        <div
                            key={item.id}
                            className="testimonial-slide"
                        >

                            <div className="row justify-content-center">

                                <div className="col-xl-9 col-lg-10">

                                    {/* ============================
                                        TESTIMONIAL CARD
                                    ============================= */}

                                    <div className="testimonial-card">

                                        {/* Decorative Quote */}
                                        <div className="quote-bg">
                                            "
                                        </div>


                                        {/* Top */}
                                        <div className="testimonial-top">

                                            {/* Student Image */}

                                            <div className="testimonial-image-wrapper">

                                                <div className="testimonial-image-ring">

                                                    {item.file_url ? (

                                                        <img
                                                            src={item.file_url}
                                                            alt={item.name || "Student"}
                                                            className="testimonial-image"
                                                        />

                                                    ) : (

                                                        <div className="testimonial-placeholder">
                                                            <i className="fa fa-user"></i>
                                                        </div>

                                                    )}

                                                </div>

                                                <div className="verified-badge">
                                                    <i className="fa fa-check"></i>
                                                </div>

                                            </div>


                                            {/* Student Info */}

                                            <div className="testimonial-student-info">

                                                <h3>
                                                    {item.name}
                                                </h3>

                                                <p>
                                                    {item.short_name}
                                                </p>

                                                <div className="testimonial-stars">

                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Divider */}

                                        <div className="testimonial-divider"></div>


                                        {/* Review */}

                                        <div className="testimonial-review">

                                            <div className="quote-icon">
                                                <i className="fa fa-quote-left"></i>
                                            </div>

                                            <p>
                                                {item.short_intro}
                                            </p>

                                            <div className="quote-icon quote-right">
                                                <i className="fa fa-quote-right"></i>
                                            </div>

                                        </div>


                                        {/* Bottom */}

                                        <div className="testimonial-bottom">

                                            <span>
                                                <i className="fa fa-graduation-cap"></i>
                                                Student Experience
                                            </span>

                                            <span>
                                                <i className="fa fa-heart"></i>
                                                Happy Student
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* ============================
                SLIDER CONTROLS
            ============================= */}

            {testimonial?.length > 1 && (

                <div className="testimonial-controls">

                    {/* Previous */}

                    <button
                        type="button"
                        className="testimonial-arrow"
                        onClick={() =>
                            setActiveTestimonial(
                                activeTestimonial === 0
                                    ? testimonial.length - 1
                                    : activeTestimonial - 1
                            )
                        }
                    >
                        <i className="fa fa-arrow-left"></i>
                    </button>


                    {/* Dots */}

                    <div className="testimonial-dots">

                        {testimonial?.slice().reverse().map((_, index) => (

                            <button
                                key={index}
                                type="button"
                                className={`testimonial-dot ${
                                    activeTestimonial === index
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveTestimonial(index)
                                }
                            />

                        ))}

                    </div>


                    {/* Next */}

                    <button
                        type="button"
                        className="testimonial-arrow"
                        onClick={() =>
                            setActiveTestimonial(
                                activeTestimonial === testimonial.length - 1
                                    ? 0
                                    : activeTestimonial + 1
                            )
                        }
                    >
                        <i className="fa fa-arrow-right"></i>
                    </button>

                </div>

            )}

        </div>

    </div>


    {/* ============================
        CSS
    ============================= */}

    <style>
        {`

        /* =========================================
           MAIN SECTION
        ========================================= */

        .testimonial-section {
            position: relative;
            background:
                radial-gradient(
                    circle at 10% 20%,
                    rgba(255,102,0,0.08),
                    transparent 30%
                ),
                radial-gradient(
                    circle at 90% 80%,
                    rgba(255,102,0,0.06),
                    transparent 30%
                ),
                #f8f9fc;

            overflow: hidden;
        }


        /* Decorative background */

        .testimonial-section::before {
            content: "";
            position: absolute;

            width: 300px;
            height: 300px;

            border-radius: 50%;

            background: rgba(255,102,0,0.04);

            top: -120px;
            left: -120px;
        }

        .testimonial-section::after {
            content: "";
            position: absolute;

            width: 250px;
            height: 250px;

            border-radius: 50%;

            background: rgba(255,102,0,0.04);

            right: -100px;
            bottom: -100px;
        }


        /* =========================================
           HEADER
        ========================================= */

        .testimonial-heading {
            position: relative;
            z-index: 2;
        }

        .testimonial-label {
            display: flex;
            justify-content: center;
            align-items: center;

            gap: 10px;

            color: #ff6600;

            font-size: 13px;

            font-weight: 800;

            letter-spacing: 4px;
        }

        .testimonial-label span {
            width: 30px;
            height: 3px;

            background: #ff6600;

            display: inline-block;

            border-radius: 5px;
        }

        .testimonial-heading h1 {
            margin-top: 15px;

            color: #20242a;

            font-size: 38px;

            font-weight: 800;
        }

        .testimonial-heading p {
            max-width: 620px;

            margin: 12px auto 0;

            color: #777;

            font-size: 15px;

            line-height: 1.7;
        }


        /* =========================================
           SLIDER
        ========================================= */

        .testimonial-slider {
            position: relative;

            z-index: 2;

            max-width: 1050px;

            margin: auto;
        }

        .testimonial-overflow {
            overflow: hidden;

            padding: 15px 10px 25px;
        }

        .testimonial-track {
            display: flex;

            transition:
                transform 0.65s
                cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-slide {
            min-width: 100%;

            flex: 0 0 100%;
        }


        /* =========================================
           CARD
        ========================================= */

        .testimonial-card {
            position: relative;

            background: #ffffff;

            border-radius: 24px;

            padding: 38px 45px;

            border: 1px solid #edf0f5;

            box-shadow:
                0 15px 45px
                rgba(20, 30, 50, 0.08);

            overflow: hidden;

            transition: all 0.3s ease;
        }

        .testimonial-card:hover {
            box-shadow:
                0 20px 55px
                rgba(255,102,0,0.13);
        }


        /* Orange top line */

        .testimonial-card::before {
            content: "";

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 5px;

            background:
                linear-gradient(
                    90deg,
                    #ff6600,
                    #ff8c42
                );
        }


        /* =========================================
           BACKGROUND QUOTE
        ========================================= */

        .quote-bg {
            position: absolute;

            right: 25px;
            top: 5px;

            font-family: Georgia, serif;

            font-size: 150px;

            font-weight: 900;

            line-height: 1;

            color: rgba(255,102,0,0.045);

            pointer-events: none;

            user-select: none;
        }


        /* =========================================
           TOP AREA
        ========================================= */

        .testimonial-top {
            position: relative;
            z-index: 2;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 25px;
        }


        /* =========================================
           IMAGE
        ========================================= */

        .testimonial-image-wrapper {
            position: relative;

            width: 125px;
            height: 125px;

            flex-shrink: 0;
        }

        .testimonial-image-ring {
            width: 125px;
            height: 125px;

            padding: 5px;

            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #ff6600,
                    #ffb37a,
                    #ff6600
                );

            display: flex;

            align-items: center;
            justify-content: center;
        }

        .testimonial-image {
            width: 115px;
            height: 115px;

            object-fit: cover;

            border-radius: 50%;

            border: 4px solid #fff;

            display: block;
        }


        /* Placeholder */

        .testimonial-placeholder {
            width: 115px;
            height: 115px;

            border-radius: 50%;

            background: #fff;

            color: #ff6600;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 42px;
        }


        /* Verified */

        .verified-badge {
            position: absolute;

            right: 2px;
            bottom: 4px;

            width: 30px;
            height: 30px;

            border-radius: 50%;

            background: #28a745;

            color: white;

            border: 3px solid white;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 12px;
        }


        /* =========================================
           STUDENT INFO
        ========================================= */

        .testimonial-student-info h3 {
            margin: 0 0 5px;

            color: #222;

            font-size: 25px;

            font-weight: 750;
        }

        .testimonial-student-info p {
            margin: 0 0 10px;

            color: #777;

            font-size: 14px;

            font-weight: 500;
        }


        /* Stars */

        .testimonial-stars {
            display: flex;

            gap: 4px;
        }

        .testimonial-stars i {
            color: #ffb400;

            font-size: 15px;
        }


        /* =========================================
           DIVIDER
        ========================================= */

        .testimonial-divider {
            width: 100%;

            height: 1px;

            background: #edf0f4;

            margin: 30px 0;
        }


        /* =========================================
           REVIEW
        ========================================= */

        .testimonial-review {
            position: relative;

            max-width: 800px;

            margin: auto;

            padding: 0 40px;

            text-align: center;
        }

        .testimonial-review p {
            margin: 0;

            color: #555;

            font-size: 17px;

            line-height: 1.9;

            font-weight: 400;
        }


        /* Quote icons */

        .quote-icon {
            position: absolute;

            left: 0;
            top: -5px;

            color: #ff6600;

            font-size: 22px;

            opacity: 0.8;
        }

        .quote-right {
            left: auto;

            right: 0;

            top: auto;

            bottom: -5px;
        }


        /* =========================================
           BOTTOM
        ========================================= */

        .testimonial-bottom {
            display: flex;

            justify-content: center;

            align-items: center;

            gap: 35px;

            margin-top: 30px;

            padding-top: 22px;

            border-top: 1px dashed #e3e6eb;

            color: #888;

            font-size: 12px;

            font-weight: 600;
        }

        .testimonial-bottom i {
            color: #ff6600;

            margin-right: 6px;
        }


        /* =========================================
           CONTROLS
        ========================================= */

        .testimonial-controls {
            display: flex;

            align-items: center;

            justify-content: center;

            gap: 20px;

            margin-top: 10px;
        }


        /* Arrow */

        .testimonial-arrow {
            width: 44px;
            height: 44px;

            border-radius: 50%;

            border: 1px solid #e4e7ec;

            background: #fff;

            color: #ff6600;

            display: flex;

            align-items: center;
            justify-content: center;

            cursor: pointer;

            transition: all 0.3s ease;

            box-shadow:
                0 5px 15px
                rgba(0,0,0,0.06);
        }

        .testimonial-arrow:hover {
            background: #ff6600;

            color: #fff;

            border-color: #ff6600;

            transform: translateY(-2px);
        }


        /* =========================================
           DOTS
        ========================================= */

        .testimonial-dots {
            display: flex;

            align-items: center;

            gap: 7px;
        }

        .testimonial-dot {
            width: 9px;
            height: 9px;

            padding: 0;

            border: none;

            border-radius: 50%;

            background: #d7dbe1;

            cursor: pointer;

            transition: all 0.3s ease;
        }

        .testimonial-dot.active {
            width: 28px;

            border-radius: 10px;

            background: #ff6600;
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

            .testimonial-heading h1 {
                font-size: 33px;
            }

            .testimonial-card {
                padding: 35px 30px;
            }

            .testimonial-image-wrapper,
            .testimonial-image-ring {
                width: 110px;
                height: 110px;
            }

            .testimonial-image,
            .testimonial-placeholder {
                width: 100px;
                height: 100px;
            }

            .testimonial-student-info h3 {
                font-size: 22px;
            }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

            .testimonial-section {
                padding-top: 20px;
            }

            .testimonial-heading h1 {
                font-size: 28px;

                padding: 0 10px;
            }

            .testimonial-heading p {
                font-size: 13px;

                padding: 0 15px;
            }

            .testimonial-label {
                font-size: 11px;

                letter-spacing: 3px;
            }

            .testimonial-label span {
                width: 20px;
            }

            .testimonial-card {
                border-radius: 20px;

                padding: 30px 20px;
            }

            .testimonial-top {
                flex-direction: column;

                text-align: center;

                gap: 15px;
            }

            .testimonial-student-info h3 {
                font-size: 21px;
            }

            .testimonial-stars {
                justify-content: center;
            }

            .testimonial-divider {
                margin: 25px 0;
            }

            .testimonial-review {
                padding: 0 20px;
            }

            .testimonial-review p {
                font-size: 14px;

                line-height: 1.8;
            }

            .quote-icon {
                font-size: 16px;
            }

            .testimonial-bottom {
                flex-direction: column;

                gap: 8px;

                margin-top: 25px;
            }

            .quote-bg {
                font-size: 100px;

                right: 5px;
            }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

            .testimonial-heading h1 {
                font-size: 24px;
            }

            .testimonial-card {
                padding: 27px 16px;
            }

            .testimonial-image-wrapper,
            .testimonial-image-ring {
                width: 95px;
                height: 95px;
            }

            .testimonial-image,
            .testimonial-placeholder {
                width: 85px;
                height: 85px;
            }

            .testimonial-placeholder {
                font-size: 30px;
            }

            .verified-badge {
                width: 26px;
                height: 26px;

                font-size: 10px;
            }

            .testimonial-review {
                padding: 0 12px;
            }

            .testimonial-review p {
                font-size: 13px;
            }

            .testimonial-arrow {
                width: 40px;
                height: 40px;
            }

        }

        `}
    </style>

</div>







            {/* <!-- Blog Start --> */}

         <div className="container-fluid blog-section py-5">

    <div className="container py-4">

        {/* =================================
            SECTION HEADER
        ================================= */}

        <div className="blog-heading text-center mb-5">

            <div className="blog-label">
                <span></span>
                OUR BLOG
                <span></span>
            </div>

            <h1>
                Latest From Our Blog
            </h1>

            <p>
                Stay updated with our latest videos, news,
                educational content and important updates.
            </p>

        </div>


        {/* =================================
            BLOG CARDS
        ================================= */}

        <div className="row">

            {ourBlogs?.length > 0 ? (

                ourBlogs.map((item, index) => {

                    const youtubeUrl = getYoutubeUrl(item.description);

                    return (

                        <div
                            className="col-xl-4 col-lg-4 col-md-6 mb-4"
                            key={item.id}
                        >

                            <div className="blog-card h-100">

                                {/* =========================
                                    VIDEO
                                ========================== */}

                                <div className="blog-video">

                                    {youtubeUrl ? (

                                        <iframe
                                            key={item.id}
                                            src={youtubeUrl}
                                            title={item.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />

                                    ) : (

                                        <div className="blog-no-video">

                                            <i className="fa fa-video-camera"></i>

                                            <span>
                                                Video Not Available
                                            </span>

                                        </div>

                                    )}


                                    {/* Video Badge */}

                                    <div className="blog-video-badge">

                                        <i className="fa fa-play"></i>

                                        VIDEO

                                    </div>


                                    {/* Number */}

                                    <div className="blog-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                </div>


                                {/* =========================
                                    CONTENT
                                ========================== */}

                                <div className="blog-content">

                                    <div className="blog-meta">

                                        <span>
                                            <i className="fa fa-play-circle"></i>
                                            Educational Video
                                        </span>

                                    </div>


                                    <h3>
                                        {item.name}
                                    </h3>


                                    <div className="blog-bottom">

                                        <span className="blog-read">

                                            Watch Video

                                            <i className="fa fa-arrow-right"></i>

                                        </span>

                                        <span className="blog-icon">
                                            <i className="fa fa-video-camera"></i>
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    );

                })

            ) : (

                /* =========================
                    EMPTY STATE
                ========================== */

                <div className="col-12">

                    <div className="blog-empty">

                        <div className="blog-empty-icon">
                            <i className="fa fa-newspaper-o"></i>
                        </div>

                        <h4>
                            No Blog Posts Available
                        </h4>

                        <p>
                            Please check back later for new videos
                            and educational content.
                        </p>

                    </div>

                </div>

            )}

        </div>

    </div>


    {/* =================================
        CSS
    ================================= */}

    <style>
        {`

        /* =========================================
           MAIN SECTION
        ========================================= */

        .blog-section {
            position: relative;

            background:
                radial-gradient(
                    circle at 0% 0%,
                    rgba(255,102,0,0.07),
                    transparent 28%
                ),
                radial-gradient(
                    circle at 100% 100%,
                    rgba(255,102,0,0.05),
                    transparent 28%
                ),
                #f8f9fc;

            overflow: hidden;
        }


        /* =========================================
           HEADER
        ========================================= */

        .blog-heading {
            position: relative;
            z-index: 2;
        }

        .blog-label {
            display: flex;

            align-items: center;
            justify-content: center;

            gap: 10px;

            color: #ff6600;

            font-size: 13px;

            font-weight: 800;

            letter-spacing: 4px;
        }

        .blog-label span {
            width: 30px;
            height: 3px;

            background: #ff6600;

            border-radius: 5px;

            display: inline-block;
        }

        .blog-heading h1 {
            margin-top: 15px;
            margin-bottom: 10px;

            color: #20242a;

            font-size: 38px;

            font-weight: 800;
        }

        .blog-heading p {
            max-width: 650px;

            margin: auto;

            color: #777;

            font-size: 15px;

            line-height: 1.7;
        }


        /* =========================================
           BLOG CARD
        ========================================= */

        .blog-card {
            position: relative;

            background: #ffffff;

            border-radius: 20px;

            overflow: hidden;

            border: 1px solid #edf0f5;

            box-shadow:
                0 8px 28px
                rgba(20,30,50,0.07);

            transition:
                transform 0.35s ease,
                box-shadow 0.35s ease,
                border-color 0.35s ease;

            display: flex;

            flex-direction: column;
        }

        .blog-card:hover {
            transform: translateY(-9px);

            border-color: rgba(255,102,0,0.25);

            box-shadow:
                0 20px 45px
                rgba(255,102,0,0.14);
        }


        /* Orange top line */

        .blog-card::before {
            content: "";

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 4px;

            background:
                linear-gradient(
                    90deg,
                    #ff6600,
                    #ff9b5c
                );

            z-index: 5;
        }


        /* =========================================
           VIDEO
        ========================================= */

        .blog-video {
            position: relative;

            width: 100%;

            aspect-ratio: 16 / 9;

            background: #101010;

            overflow: hidden;
        }

        .blog-video iframe {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            border: none;

            display: block;
        }


        /* =========================================
           VIDEO OVERLAY
        ========================================= */

        .blog-video::after {
            content: "";

            position: absolute;

            inset: 0;

            background:
                linear-gradient(
                    180deg,
                    rgba(0,0,0,0.05),
                    transparent 55%,
                    rgba(0,0,0,0.35)
                );

            pointer-events: none;
        }


        /* =========================================
           VIDEO BADGE
        ========================================= */

        .blog-video-badge {
            position: absolute;

            left: 15px;
            bottom: 15px;

            z-index: 3;

            display: flex;

            align-items: center;

            gap: 7px;

            padding: 7px 12px;

            background: #ff6600;

            color: #ffffff;

            border-radius: 20px;

            font-size: 10px;

            font-weight: 800;

            letter-spacing: 1px;

            box-shadow:
                0 5px 15px
                rgba(255,102,0,0.3);
        }

        .blog-video-badge i {
            font-size: 9px;
        }


        /* =========================================
           NUMBER
        ========================================= */

        .blog-number {
            position: absolute;

            top: 15px;
            right: 15px;

            z-index: 3;

            width: 38px;
            height: 38px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background: rgba(255,255,255,0.95);

            color: #ff6600;

            font-size: 12px;

            font-weight: 800;

            box-shadow:
                0 5px 15px
                rgba(0,0,0,0.15);
        }


        /* =========================================
           CONTENT
        ========================================= */

        .blog-content {
            padding: 23px 23px 20px;

            display: flex;

            flex-direction: column;

            flex: 1;
        }


        /* =========================================
           META
        ========================================= */

        .blog-meta {
            margin-bottom: 10px;
        }

        .blog-meta span {
            display: inline-flex;

            align-items: center;

            gap: 7px;

            color: #ff6600;

            font-size: 11px;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 0.5px;
        }

        .blog-meta i {
            font-size: 13px;
        }


        /* =========================================
           TITLE
        ========================================= */

        .blog-content h3 {
            margin: 0;

            color: #222;

            font-size: 19px;

            font-weight: 750;

            line-height: 1.5;

            display: -webkit-box;

            -webkit-line-clamp: 2;

            -webkit-box-orient: vertical;

            overflow: hidden;

            min-height: 57px;
        }


        /* =========================================
           BOTTOM
        ========================================= */

        .blog-bottom {
            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: 20px;

            padding-top: 15px;

            border-top: 1px dashed #e5e7eb;
        }

        .blog-read {
            color: #ff6600;

            font-size: 12px;

            font-weight: 700;

            display: flex;

            align-items: center;

            gap: 8px;
        }

        .blog-read i {
            transition:
                transform 0.3s ease;
        }

        .blog-card:hover .blog-read i {
            transform: translateX(5px);
        }


        /* Icon */

        .blog-icon {
            width: 34px;
            height: 34px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 10px;

            background: #fff1e8;

            color: #ff6600;

            font-size: 13px;

            transition: all 0.3s ease;
        }

        .blog-card:hover .blog-icon {
            background: #ff6600;

            color: #ffffff;

            transform: rotate(-5deg);
        }


        /* =========================================
           NO VIDEO
        ========================================= */

        .blog-no-video {
            width: 100%;
            height: 100%;

            display: flex;

            flex-direction: column;

            align-items: center;
            justify-content: center;

            gap: 10px;

            color: #ffffff;

            background:
                linear-gradient(
                    135deg,
                    #1c1c1c,
                    #333
                );
        }

        .blog-no-video i {
            width: 55px;
            height: 55px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background: #ff6600;

            font-size: 20px;
        }

        .blog-no-video span {
            font-size: 12px;

            color: #bbb;
        }


        /* =========================================
           EMPTY STATE
        ========================================= */

        .blog-empty {
            background: #fff;

            border-radius: 20px;

            padding: 60px 20px;

            text-align: center;

            border: 1px solid #edf0f5;

            box-shadow:
                0 8px 25px
                rgba(0,0,0,0.05);
        }

        .blog-empty-icon {
            width: 70px;
            height: 70px;

            margin: 0 auto 20px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background: #fff1e8;

            color: #ff6600;

            font-size: 27px;
        }

        .blog-empty h4 {
            color: #222;

            font-weight: 700;

            margin-bottom: 8px;
        }

        .blog-empty p {
            margin: 0;

            color: #888;

            font-size: 14px;
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

            .blog-heading h1 {
                font-size: 33px;
            }

            .blog-content {
                padding: 20px;
            }

            .blog-content h3 {
                font-size: 18px;
            }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

            .blog-section {
                padding-top: 45px !important;
                padding-bottom: 45px !important;
            }

            .blog-heading {
                margin-bottom: 35px !important;
            }

            .blog-heading h1 {
                font-size: 28px;

                padding: 0 10px;
            }

            .blog-heading p {
                font-size: 13px;

                padding: 0 15px;
            }

            .blog-label {
                font-size: 11px;

                letter-spacing: 3px;
            }

            .blog-label span {
                width: 20px;
            }

            .blog-card {
                border-radius: 17px;
            }

            .blog-video-badge {
                left: 12px;
                bottom: 12px;
            }

            .blog-number {
                top: 12px;
                right: 12px;

                width: 34px;
                height: 34px;
            }

            .blog-content h3 {
                font-size: 17px;

                min-height: auto;
            }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

            .blog-heading h1 {
                font-size: 24px;
            }

            .blog-heading p {
                font-size: 12px;
            }

            .blog-content {
                padding: 18px;
            }

            .blog-content h3 {
                font-size: 16px;
            }

            .blog-meta span {
                font-size: 10px;
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