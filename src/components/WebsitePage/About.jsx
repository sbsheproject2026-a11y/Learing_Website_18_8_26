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

            <div className="container-fluid about-section py-5">

                <div className="container py-5">

                    {/* =================================
            ABOUT INTRO
        ================================= */}
                    <div className="row align-items-center about-intro">

                        {/* ================= IMAGE ================= */}
                        <div className="col-lg-5 mb-5 mb-lg-0">

                            <div className="about-image-wrapper">

                                <div className="about-image-frame">

                                    <img
                                        src={aboutus?.[0]?.file}
                                        alt={aboutus?.[0]?.name || "About Us"}
                                        className="about-main-image"
                                    />

                                </div>



                            </div>

                        </div>


                        {/* ================= CONTENT ================= */}
                        <div className="col-lg-7">

                            <div className="about-content">

                                <div className="section-label">
                                    <span></span>
                                    ABOUT US
                                </div>

                                <h1 className="about-title">
                                    {aboutus?.[0]?.name}
                                </h1>

                                <div
                                    className="about-description"
                                    dangerouslySetInnerHTML={{
                                        __html: aboutus?.[0]?.description || ""
                                    }}
                                />

                                <div className="about-divider"></div>


                                {/* Features */}
                                <div className="about-features">

                                    <div className="about-feature">

                                        <div className="feature-icon">
                                            <i className="fa fa-check"></i>
                                        </div>

                                        <div>
                                            <h6>Quality Learning</h6>
                                            <p>
                                                Focused on practical and meaningful education.
                                            </p>
                                        </div>

                                    </div>


                                    <div className="about-feature">

                                        <div className="feature-icon">
                                            <i className="fa fa-users"></i>
                                        </div>

                                        <div>
                                            <h6>Student Focused</h6>
                                            <p>
                                                Supporting learners for personal and professional growth.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
            VISION / MISSION / GOALS
        ================================= */}

                    <div className="about-values">

                        <div className="text-center mb-5">

                            <div className="section-label justify-content-center">
                                <span></span>
                                OUR PURPOSE
                                <span></span>
                            </div>

                            <h2 className="values-heading">
                                Our Vision, Mission & Goals
                            </h2>

                            <p className="values-subtitle">
                                Building a better future through education, skills and
                                meaningful opportunities.
                            </p>

                        </div>


                        <div className="row">

                            {/* ================= VISION ================= */}
                            <div className="col-lg-4 col-md-6 mb-4">

                                <div className="value-card vision-card h-100">

                                    <div className="value-card-top">

                                        <div className="value-icon">
                                            <i className="fa fa-bullseye"></i>
                                        </div>

                                        <span className="value-number">
                                            01
                                        </span>

                                    </div>

                                    <h3>Vision</h3>

                                    <div className="value-line"></div>

                                    <p>
                                        To build an educated, healthy, skilled, and
                                        empowered society where every individual has
                                        access to opportunities for personal and
                                        professional growth.
                                    </p>

                                </div>

                            </div>


                            {/* ================= MISSION ================= */}
                            <div className="col-lg-4 col-md-6 mb-4">

                                <div className="value-card mission-card h-100">

                                    <div className="value-card-top">

                                        <div className="value-icon">
                                            <i className="fa fa-rocket"></i>
                                        </div>

                                        <span className="value-number">
                                            02
                                        </span>

                                    </div>

                                    <h3>Mission</h3>

                                    <div className="value-line"></div>

                                    <p>
                                        To work towards the holistic development of
                                        individuals and communities through meaningful
                                        initiatives in education, healthcare, skill
                                        development, and social awareness.
                                    </p>

                                </div>

                            </div>


                            {/* ================= GOALS ================= */}
                            <div className="col-lg-4 col-md-6 mb-4">

                                <div className="value-card goals-card h-100">

                                    <div className="value-card-top">

                                        <div className="value-icon">
                                            <i className="fa fa-line-chart"></i>
                                        </div>

                                        <span className="value-number">
                                            03
                                        </span>

                                    </div>

                                    <h3>Goals</h3>

                                    <div className="value-line"></div>

                                    <ul className="goals-list">

                                        <li>
                                            <i className="fa fa-check"></i>
                                            <span>
                                                Expand into new high-growth sectors nationally
                                            </span>
                                        </li>

                                        <li>
                                            <i className="fa fa-check"></i>
                                            <span>
                                                Grow industry partnerships for on-the-job training
                                            </span>
                                        </li>

                                        <li>
                                            <i className="fa fa-check"></i>
                                            <span>
                                                Reach underserved communities
                                            </span>
                                        </li>

                                        <li>
                                            <i className="fa fa-check"></i>
                                            <span>
                                                Build Centres of Excellence with simulation labs
                                            </span>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>

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

        .about-section {
            background: #f7f9fc;
            overflow: hidden;
        }


        /* =========================================
           ABOUT INTRO
        ========================================= */

        .about-intro {
            min-height: 500px;
        }


        /* =========================================
           IMAGE WRAPPER
        ========================================= */

        .about-image-wrapper {
            position: relative;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 14px;
        }


        /* Decorative border */
        .about-image-wrapper::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100% - 20px);
            height: calc(100% - 20px);

            
            border-radius: 22px;

            z-index: 0;
        }


        /* =========================================
           IMAGE FRAME
        ========================================= */

        .about-image-frame {
            position: relative;
            z-index: 1;

            width: 100%;
            min-height: 430px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #ffffff;

            border-radius: 20px;

            overflow: hidden;

            box-shadow:
                0 15px 40px rgba(0, 0, 0, 0.10);

            padding: 15px;
        }


        /* =========================================
           MAIN IMAGE - IMPORTANT
        ========================================= */

        .about-main-image {
            width: 100%;
            height: 400px;

            display: block;

            /*
             * IMPORTANT:
             * contain = full image visible
             * cover = image crop hoti hai
             */
            object-fit: contain;

            object-position: center;

            border-radius: 12px;

            background: #fff;
        }


        /* =========================================
           IMAGE BADGE
        ========================================= */

        .about-image-badge {
            position: absolute;

            z-index: 5;

            left: 35px;
            bottom: 28px;

            display: flex;
            align-items: center;

            gap: 12px;

            padding: 12px 18px;

            background: rgba(255, 255, 255, 0.98);

            border-radius: 14px;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.15);

            max-width: 250px;
        }


        .badge-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #ff6600;

            color: #fff;

            border-radius: 10px;

            font-size: 18px;
        }


        .badge-content strong {
            display: block;

            color: #222;

            font-size: 14px;

            font-weight: 700;

            line-height: 1.3;
        }


        .badge-content small {
            display: block;

            color: #777;

            font-size: 11px;

            margin-top: 3px;
        }


        /* =========================================
           SECTION LABEL
        ========================================= */

        .section-label {
            display: flex;

            align-items: center;

            gap: 9px;

            color: #ff6600;

            font-size: 13px;

            font-weight: 700;

            letter-spacing: 4px;
        }


        .section-label span {
            width: 28px;
            height: 3px;

            background: #f5a623;

            display: inline-block;

            border-radius: 5px;
        }


        /* =========================================
           CONTENT
        ========================================= */

        .about-content {
            padding-left: 35px;
        }


        .about-title {
            color: #222;

            font-size: 38px;

            font-weight: 700;

            line-height: 1.25;

            margin: 15px 0 20px;
        }


        .about-description {
            color: #666;

            font-size: 15px;

            line-height: 1.9;
        }


        .about-description p {
            margin-bottom: 12px;
        }


        .about-description ul {
            padding-left: 20px;
        }


        .about-divider {
            width: 60px;
            height: 3px;

            background: #ff6600;

            margin: 25px 0;
        }


        /* =========================================
           FEATURES
        ========================================= */

        .about-features {
            display: flex;

            gap: 30px;

            flex-wrap: wrap;
        }


        .about-feature {
            display: flex;

            gap: 12px;

            align-items: flex-start;

            flex: 1;

            min-width: 200px;
        }


        .feature-icon {
            width: 42px;
            height: 42px;

            min-width: 42px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 10px;

            background: #eaf3ff;

            color: #ff6600;
        }


        .about-feature h6 {
            margin: 0 0 4px;

            color: #222;

            font-weight: 700;

            font-size: 14px;
        }


        .about-feature p {
            margin: 0;

            color: #777;

            font-size: 12px;

            line-height: 1.5;
        }


        /* =========================================
           VALUES SECTION
        ========================================= */

        .about-values {
            margin-top: 100px;
        }


        .values-heading {
            font-size: 34px;

            font-weight: 700;

            color: #222;

            margin-top: 15px;
        }


        .values-subtitle {
            max-width: 650px;

            margin: 10px auto 0;

            color: #777;

            font-size: 14px;

            line-height: 1.7;
        }


        /* =========================================
           VALUE CARD
        ========================================= */

        .value-card {
            position: relative;

            padding: 30px;

            background: #ffffff;

            border-radius: 18px;

            border: 1px solid #eeeeee;

            box-shadow:
                0 8px 30px rgba(0, 0, 0, 0.06);

            overflow: hidden;

            transition:
                transform 0.35s ease,
                box-shadow 0.35s ease;
        }


        .value-card::before {
            content: "";

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 4px;

            background: #ff6600;
        }


        .value-card:hover {
            transform: translateY(-8px);

            box-shadow:
                0 18px 40px rgba(0, 0, 0, 0.11);
        }


        /* =========================================
           CARD TOP
        ========================================= */

        .value-card-top {
            display: flex;

            justify-content: space-between;

            align-items: center;
        }


        .value-icon {
            width: 58px;
            height: 58px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 14px;

            background: #eaf3ff;

            color: #ff6600;

            font-size: 24px;
        }


        .value-number {
            font-size: 42px;

            font-weight: 800;

            color: #f1f3f6;

            line-height: 1;
        }


        /* =========================================
           CARD CONTENT
        ========================================= */

        .value-card h3 {
            color: #222;

            font-size: 24px;

            font-weight: 700;

            margin-top: 25px;

            margin-bottom: 10px;
        }


        .value-line {
            width: 45px;
            height: 3px;

            background: #ff6600;

            margin-bottom: 18px;

            border-radius: 5px;
        }


        .value-card p {
            color: #777;

            font-size: 14px;

            line-height: 1.8;

            margin: 0;
        }


        /* =========================================
           MISSION COLOR
        ========================================= */

        .mission-card::before {
            background: #f5a623;
        }


        .mission-card .value-icon {
            background: #fff4e2;

            color: #f5a623;
        }


        .mission-card .value-line {
            background: #f5a623;
        }


        /* =========================================
           GOALS COLOR
        ========================================= */

        .goals-card::before {
            background: #28a745;
        }


        .goals-card .value-icon {
            background: #e8f8ed;

            color: #28a745;
        }


        .goals-card .value-line {
            background: #28a745;
        }


        /* =========================================
           GOALS LIST
        ========================================= */

        .goals-list {
            list-style: none;

            padding: 0;

            margin: 0;
        }


        .goals-list li {
            display: flex;

            align-items: flex-start;

            gap: 10px;

            color: #666;

            font-size: 13px;

            line-height: 1.6;

            margin-bottom: 13px;
        }


        .goals-list li:last-child {
            margin-bottom: 0;
        }


        .goals-list i {
            color: #28a745;

            margin-top: 4px;

            font-size: 11px;
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

            .about-intro {
                min-height: auto;
            }

            .about-image-wrapper {
                max-width: 600px;
            }

            .about-image-frame {
                min-height: 400px;
            }

            .about-main-image {
                height: 370px;
            }

            .about-content {
                padding-left: 0;

                margin-top: 20px;
            }

            .about-title {
                font-size: 32px;
            }

            .about-values {
                margin-top: 70px;
            }

            .value-card {
                padding: 25px;
            }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

            .about-section {
                padding-top: 35px !important;

                padding-bottom: 35px !important;
            }


            .about-image-wrapper {
                padding: 8px;

                margin-bottom: 20px;
            }


            .about-image-wrapper::before {
                top: 0;

                left: 0;

                width: calc(100% - 8px);

                height: calc(100% - 8px);

                border-width: 2px;

                border-radius: 16px;
            }


            .about-image-frame {
                min-height: 300px;

                padding: 10px;

                border-radius: 16px;
            }


            .about-main-image {
                width: 100%;

                height: 280px;

                object-fit: contain;

                border-radius: 10px;
            }


            .about-image-badge {
                left: 18px;

                bottom: 18px;

                padding: 9px 12px;

                gap: 9px;

                max-width: 210px;
            }


            .badge-icon {
                width: 36px;

                height: 36px;

                min-width: 36px;

                font-size: 15px;
            }


            .badge-content strong {
                font-size: 12px;
            }


            .badge-content small {
                font-size: 9px;
            }


            .section-label {
                font-size: 11px;

                letter-spacing: 3px;
            }


            .about-title {
                font-size: 27px;

                margin-top: 12px;
            }


            .about-description {
                font-size: 14px;

                line-height: 1.8;
            }


            .about-features {
                flex-direction: column;

                gap: 18px;
            }


            .about-values {
                margin-top: 60px;
            }


            .values-heading {
                font-size: 27px;
            }


            .values-subtitle {
                font-size: 13px;

                padding: 0 10px;
            }


            .value-card {
                padding: 24px;
            }


            .value-card h3 {
                font-size: 22px;
            }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

            .about-image-frame {
                min-height: 250px;

                padding: 8px;
            }


            .about-main-image {
                height: 230px;
            }


            .about-image-badge {
                left: 15px;

                bottom: 15px;

                max-width: 190px;
            }


            .about-title {
                font-size: 24px;
            }


            .values-heading {
                font-size: 24px;
            }


            .value-icon {
                width: 50px;

                height: 50px;

                font-size: 20px;
            }


            .value-number {
                font-size: 34px;
            }


            .value-card p {
                font-size: 13px;
            }

        }

        `}
                </style>

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