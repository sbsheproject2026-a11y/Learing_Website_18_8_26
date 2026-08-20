import React, { useEffect, useState } from 'react'
import { getWebsiteContent } from './HomeService';

function About() {
    const [aboutus, setAboutUss] = useState([]);
    const [recognitions, setRecognitionss] = useState([]);

    useEffect(() => {
        loadPageData();
    }, []);

    const loadPageData = async () => {
        try {
            const [aboutUsData, recognitionsData] =
                await Promise.all([
                    getWebsiteContent(10),   // Slider
                    getWebsiteContent(20),   // About Us
                    // getWebsiteContent(3),  // Courses
                    // getWebsiteContent(8),  // Courses
                ]);

            setAboutUss(aboutUsData.filter(
                (item) => item.is_active === true
            ));
            setRecognitionss(recognitionsData.filter(
                (item) => item.is_active === true
            ));
            // setTotalcounts(totalcountsData);
            // setWhyChosseUs(WhyChosseUsdata);

        } catch (error) {
            console.log("Page data error:", error);
        }
    };
    return (
        <>




            {/* <!-- About Start --> */}

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <img
                                className="img-fluid rounded mb-4 mb-lg-0"
                                src={aboutus?.[0]?.file}
                                alt={aboutus?.[0]?.name || "Why SBSHE"}
                            />

                        </div>
                        <div className="col-lg-7">
                            <div className="text-left mb-4">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>About Us</h5>
                                <h1>{aboutus?.[0]?.name}</h1>
                            </div>
                            <div

                                dangerouslySetInnerHTML={{
                                    __html: aboutus?.[0]?.description || ""
                                }}
                            />


                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row">

                        {/* Vision */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div
                                className="h-100 p-4 bg-white border rounded"
                                style={{ minHeight: "345px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: "#e8f0ff",
                                        fontSize: "24px"
                                    }}
                                >
                                    🎯
                                </div>

                                <h4 className="text-dark mb-3">
                                    Vision
                                </h4>

                                <p className="text-muted mb-0">
                                    To build an educated, healthy, skilled, and empowered
                                    society where every individual has access to opportunities
                                    for personal and professional growth.
                                </p>
                            </div>
                        </div>


                        {/* Mission */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div
                                className="h-100 p-4 bg-white border rounded"
                                style={{ minHeight: "345px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: "#fff1dc",
                                        fontSize: "24px"
                                    }}
                                >
                                    🚀
                                </div>

                                <h4 className="text-dark mb-3">
                                    Mission
                                </h4>

                                <p className="text-muted mb-0">
                                    To work towards the holistic development of individuals
                                    and communities through meaningful initiatives in
                                    education, healthcare, skill development, and social
                                    awareness.
                                </p>
                            </div>
                        </div>


                        {/* Goals */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div
                                className="h-100 p-4 bg-white border rounded"
                                style={{ minHeight: "345px" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: "#e5f6ee",
                                        fontSize: "24px"
                                    }}
                                >
                                    📈
                                </div>

                                <h4 className="text-dark mb-3">
                                    Goals
                                </h4>

                                <p className="text-muted mb-0">
                                    <span className="text-primary">→</span> Expand into new
                                    high-growth sectors nationally
                                    <br /><br />

                                    <span className="text-primary">→</span> Grow industry
                                    partnerships for on-the-job training
                                    <br /><br />

                                    <span className="text-primary">→</span> Reach underserved
                                    communities through the Vocational Guidance Cell
                                    <br /><br />

                                    <span className="text-primary">→</span> Build Centres of
                                    Excellence with simulation labs
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <!-- About End --> */}
            {/* <!-- About Start --> */}

            <div className="container-fluid py-5 recognition-section">
                <div className="container py-4">

                    {/* =====================================
            SECTION HEADER
        ===================================== */}

                    <div className="recognition-header text-center mb-5">

                        <div className="recognition-label">

                            <span className="recognition-line"></span>

                            <span>
                                Recognitions
                            </span>

                            <span className="recognition-line"></span>

                        </div>

                        <h2 className="recognition-title">
                            Trusted & Government Recognized
                        </h2>

                        <p className="recognition-subtitle">
                            Recognized by leading institutions and organizations
                            for quality, trust and excellence.
                        </p>

                    </div>


                    {/* =====================================
            RECOGNITION CARDS
        ===================================== */}

                    <div className="row justify-content-center">

                        {recognitions?.map((item) => (

                            <div
                                className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4 d-flex"
                                key={item.id}
                            >

                                <div className="recognition-card w-100">

                                    {/* Icon */}

                                    <div className="recognition-icon-wrapper">

                                        <div className="recognition-icon">

                                            {item.short_name || "🏛️"}

                                        </div>

                                    </div>


                                    {/* Name */}

                                    <h6 className="recognition-name">
                                        {item.name}
                                    </h6>


                                    {/* Small bottom line */}

                                    <div className="recognition-bottom-line"></div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* =====================================
        CSS
    ===================================== */}

                <style>
                    {`

        /* =========================================
           SECTION
        ========================================= */

        .recognition-section {
            background: #f8f9fa;
        }


        /* =========================================
           HEADER
        ========================================= */

        .recognition-header {
            max-width: 750px;
            margin-left: auto;
            margin-right: auto;
        }


        .recognition-label {
            display: flex;
            align-items: center;
            justify-content: center;

            gap: 10px;

            color: #ff6600;

            font-size: 13px;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 4px;

            margin-bottom: 12px;
        }


        .recognition-line {
            width: 30px;

            height: 3px;

            background: #f5a623;

            border-radius: 5px;

            display: inline-block;
        }


        .recognition-title {
            color: #222222;

            font-size: 32px;

            font-weight: 700;

            margin-bottom: 12px;

            line-height: 1.3;
        }


        .recognition-subtitle {
            color: #777777;

            font-size: 15px;

            line-height: 1.7;

            margin: 0 auto;

            max-width: 600px;
        }


        /* =========================================
           CARD
        ========================================= */

        .recognition-card {
            position: relative;

            background: #ffffff;

            border: 1px solid #eeeeee;

            border-radius: 14px;

            padding: 25px 15px 20px;

            min-height: 170px;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            text-align: center;

            overflow: hidden;

            box-shadow:
                0 5px 18px rgba(0, 0, 0, 0.05);

            transition:
                transform 0.35s ease,
                box-shadow 0.35s ease,
                border-color 0.35s ease;
        }


        .recognition-card:hover {
            transform: translateY(-7px);

            border-color: rgba(255, 102, 0, 0.25);

            box-shadow:
                0 14px 30px rgba(0, 0, 0, 0.10);
        }


        /* =========================================
           ICON WRAPPER
        ========================================= */

        .recognition-icon-wrapper {
            width: 68px;

            height: 68px;

            display: flex;

            align-items: center;

            justify-content: center;

            margin-bottom: 15px;

            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #fff7ed,
                    #f3f0e8
                );

            transition:
                transform 0.35s ease,
                background 0.35s ease;
        }


        .recognition-card:hover
        .recognition-icon-wrapper {
            transform: scale(1.08);

            background:
                linear-gradient(
                    135deg,
                    #fff0df,
                    #f8e7d0
                );
        }


        /* =========================================
           ICON
        ========================================= */

        .recognition-icon {
            width: 50px;

            height: 50px;

            border-radius: 50%;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 25px;

            line-height: 1;

            color: #ff6600;

            background: #ffffff;

            box-shadow:
                0 3px 10px
                rgba(0, 0, 0, 0.06);

            overflow: hidden;
        }


        /* =========================================
           NAME
        ========================================= */

        .recognition-name {
            color: #333333;

            font-size: 14px;

            font-weight: 700;

            line-height: 1.45;

            margin: 0;

            min-height: 40px;

            display: flex;

            align-items: center;

            justify-content: center;
        }


        /* =========================================
           BOTTOM LINE
        ========================================= */

        .recognition-bottom-line {
            width: 30px;

            height: 3px;

            background: #ff6600;

            border-radius: 10px;

            margin-top: 12px;

            transition:
                width 0.35s ease;
        }


        .recognition-card:hover
        .recognition-bottom-line {
            width: 50px;
        }


        /* =========================================
           LARGE DESKTOP
        ========================================= */

        @media (min-width: 1200px) {

            .recognition-card {
                min-height: 175px;

                padding: 25px 15px;
            }

        }


        /* =========================================
           LAPTOP / DESKTOP
        ========================================= */

        @media (max-width: 1199px) {

            .recognition-title {
                font-size: 30px;
            }

            .recognition-card {
                min-height: 165px;
            }

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

            .recognition-section {
                padding-top: 50px !important;

                padding-bottom: 40px !important;
            }

            .recognition-title {
                font-size: 28px;
            }

            .recognition-subtitle {
                font-size: 14px;
            }

            .recognition-card {
                min-height: 165px;

                padding: 22px 12px;
            }

            .recognition-icon-wrapper {
                width: 62px;

                height: 62px;
            }

            .recognition-icon {
                width: 47px;

                height: 47px;

                font-size: 23px;
            }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

            .recognition-section {
                padding-top: 40px !important;

                padding-bottom: 30px !important;
            }


            .recognition-header {
                padding: 0 10px;

                margin-bottom: 30px !important;
            }


            .recognition-label {
                font-size: 11px;

                letter-spacing: 3px;

                gap: 7px;
            }


            .recognition-line {
                width: 20px;

                height: 2px;
            }


            .recognition-title {
                font-size: 24px;

                line-height: 1.35;
            }


            .recognition-subtitle {
                font-size: 13px;

                line-height: 1.6;
            }


            /* 2 cards per row */

            .recognition-card {
                min-height: 155px;

                padding: 18px 8px;

                border-radius: 12px;
            }


            .recognition-icon-wrapper {
                width: 58px;

                height: 58px;

                margin-bottom: 12px;
            }


            .recognition-icon {
                width: 44px;

                height: 44px;

                font-size: 21px;
            }


            .recognition-name {
                font-size: 12px;

                min-height: 36px;
            }


            .recognition-bottom-line {
                width: 25px;

                margin-top: 9px;
            }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

            .recognition-title {
                font-size: 21px;
            }


            .recognition-subtitle {
                font-size: 12px;
            }


            .recognition-card {
                min-height: 145px;

                padding: 16px 7px;
            }


            .recognition-icon-wrapper {
                width: 54px;

                height: 54px;

                margin-bottom: 10px;
            }


            .recognition-icon {
                width: 41px;

                height: 41px;

                font-size: 19px;
            }


            .recognition-name {
                font-size: 11px;

                line-height: 1.4;
            }

        }

        `}
                </style>

            </div>


        </>
    )
}

export default About