 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDepartments } from "./CourseServiceData";

function Course() {
    const [data, setData] = useState([]);
    const [activeDepartment, setActiveDepartment] = useState("ALL");

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const result = await getDepartments();

            console.log("Department Data:", result);

         setData(
    (result || []).filter((item) => item.is_active === true)
);
        } catch (error) {
            console.log("Department Error:", error);
        }
    };

    // =========================
    // DEPARTMENT NAMES
    // =========================

    const departments = [
        "ALL",
        ...new Set(
            data
                ?.map((item) => item.name)
                .filter(Boolean)
        ),
    ];

    // =========================
    // FILTER DATA
    // =========================

    const filteredData =
        activeDepartment === "ALL"
            ? data
            : data?.filter(
                  (item) => item.name === activeDepartment
              );

    return (
        <>
            {/* =========================================
                DEPARTMENT SECTION
            ========================================= */}

            <div className="container-fluid py-5 department-section">

                <div className="container py-4">

                    {/* =====================================
                        HEADING
                    ===================================== */}

                    <div className="text-center mb-4">

                        <h5
                            className="text-primary text-uppercase mb-3"
                            style={{
                                letterSpacing: "5px",
                            }}
                        >
                            Department
                        </h5>

                        <h1 className="department-main-title">
                            Our Popular Department
                        </h1>

                    </div>


                    {/* =====================================
                        DEPARTMENT FILTER
                        PC + LAPTOP + TABLET ONLY
                        MOBILE HIDDEN
                    ===================================== */}

                    <div className="department-tabs mb-5">

                        <div className="department-tabs-scroll">

                            {departments.map(
                                (department) => (
                                    <button
                                        key={department}
                                        type="button"
                                        className={`department-btn ${
                                            activeDepartment ===
                                            department
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveDepartment(
                                                department
                                            )
                                        }
                                    >
                                        {department}
                                    </button>
                                )
                            )}

                        </div>

                    </div>


                    {/* =====================================
                        COURSE / DEPARTMENT CARDS
                    ===================================== */}

                    <div className="row">

                        {filteredData?.filter((item) => item.is_active === true).length > 0 ? (

                            filteredData.map((item) => (

                                <div
                                    className="col-xl-4 col-lg-4 col-md-6 mb-4 d-flex"
                                    key={item.id}
                                >

                                    <div className="course-card w-100">

                                        {/* =========================
                                            IMAGE
                                        ========================= */}

                                        <div className="course-image">

                                            {item.file ? (

                                                <img
                                                    src={item.file}
                                                    alt={item.name}
                                                />

                                            ) : (

                                                <div className="no-image">
                                                    <i className="fa fa-book"></i>
                                                </div>

                                            )}

                                            {/* Course Count */}

                                            <div className="course-count">

                                                <i className="fa fa-book mr-2"></i>

                                                {item.course_count || 0} Courses

                                            </div>

                                        </div>


                                        {/* =========================
                                            CONTENT
                                        ========================= */}

                                        <div className="course-content">

                                            {/* Title */}

                                            <Link
                                                to={`/course-details/${item.slug}`}
                                                className="course-title"
                                            >
                                                {item.name}
                                            </Link>


                                            {/* Description */}

                                            <p className="course-description">

                                                {item.description ||
                                                    "Explore our professional courses and develop practical skills for your career."}

                                            </p>


                                            {/* Footer */}

                                            <div className="course-footer">

                                                <div className="course-type">

                                                    <i className="fa fa-graduation-cap mr-2"></i>

                                                    Professional Course

                                                </div>


                                                <Link
                                                    to={`/course-details/${item.slug}`}
                                                    className="learn-btn"
                                                >
                                                    Learn More

                                                    <i className="fa fa-arrow-right ml-2"></i>

                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="col-12">

                                <div className="no-data">

                                    <i className="fa fa-folder-open"></i>

                                    <h4>
                                        No Department Found
                                    </h4>

                                    <p>
                                        No courses are available
                                        for this department.
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                </div>
            </div>


            {/* =========================================
                CSS
            ========================================= */}

            <style>
                {`

                /* =====================================
                   MAIN SECTION
                ===================================== */

                .department-section {
                    background: #ffffff;
                }

                .department-main-title {
                    font-weight: 700;
                    color: #222222;
                }


                /* =====================================
                   DEPARTMENT TABS
                   PC / LAPTOP / TABLET
                ===================================== */

                .department-tabs {
                    width: 100%;
                    display: block;
                }

                .department-tabs-scroll {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                }

                .department-btn {
                    border: 1px solid #ff6600;

                    background: #ffffff;

                    color: #ff6600;

                    padding: 10px 20px;

                    margin: 5px;

                    border-radius: 25px;

                    font-size: 13px;

                    font-weight: 600;

                    cursor: pointer;

                    outline: none;

                    transition: all 0.3s ease;
                }

                .department-btn:hover {
                    background: #ff6600;

                    color: #ffffff;

                    transform: translateY(-2px);

                    box-shadow:
                        0 5px 15px
                        rgba(255, 102, 0, 0.20);
                }

                .department-btn.active {
                    background: #ff6600;

                    color: #ffffff;

                    border-color: #ff6600;

                    box-shadow:
                        0 5px 15px
                        rgba(255, 102, 0, 0.25);
                }


                /* =====================================
                   COURSE CARD
                ===================================== */

                .course-card {
                    background: #ffffff;

                    border-radius: 15px;

                    overflow: hidden;

                    box-shadow:
                        0 5px 20px
                        rgba(0, 0, 0, 0.08);

                    display: flex;

                    flex-direction: column;

                    height: 100%;

                    transition:
                        transform 0.35s ease,
                        box-shadow 0.35s ease;
                }

                .course-card:hover {
                    transform: translateY(-7px);

                    box-shadow:
                        0 15px 35px
                        rgba(0, 0, 0, 0.14);
                }


                /* =====================================
                   IMAGE
                ===================================== */

                .course-image {
                    position: relative;

                    width: 100%;

                    height: 220px;

                    min-height: 220px;

                    background: #f5f5f5;

                    overflow: hidden;

                    display: flex;

                    align-items: center;

                    justify-content: center;
                }

                .course-image img {
                    width: 100%;

                    height: 100%;

                    min-width: 100%;

                    min-height: 100%;

                    object-fit: cover;

                    object-position: center;

                    display: block;

                    transition:
                        transform 0.4s ease;
                }

                .course-card:hover
                .course-image img {
                    transform: scale(1.04);
                }


                /* =====================================
                   NO IMAGE
                ===================================== */

                .no-image {
                    width: 100%;

                    height: 100%;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #f5f5f5;

                    color: #ff6600;

                    font-size: 55px;
                }


                /* =====================================
                   COURSE COUNT
                ===================================== */

                .course-count {
                    position: absolute;

                    bottom: 12px;

                    left: 12px;

                    background: #ff6600;

                    color: #ffffff;

                    padding: 7px 14px;

                    border-radius: 20px;

                    font-size: 12px;

                    font-weight: 600;

                    line-height: 1;

                    box-shadow:
                        0 3px 10px
                        rgba(0, 0, 0, 0.20);
                }


                /* =====================================
                   CONTENT
                ===================================== */

                .course-content {
                    padding: 22px;

                    display: flex;

                    flex-direction: column;

                    height: 280px;

                    min-height: 280px;
                }


                /* =====================================
                   TITLE
                ===================================== */

                .course-title {
                    color: #222222;

                    font-size: 19px;

                    font-weight: 700;

                    line-height: 1.4;

                    text-decoration: none;

                    height: 54px;

                    min-height: 54px;

                    overflow: hidden;

                    display: -webkit-box;

                    -webkit-line-clamp: 2;

                    -webkit-box-orient: vertical;
                }

                .course-title:hover {
                    color: #ff6600;

                    text-decoration: none;
                }


                /* =====================================
                   DESCRIPTION
                ===================================== */

                .course-description {
                    color: #777777;

                    font-size: 14px;

                    line-height: 1.6;

                    height: 68px;

                    min-height: 68px;

                    margin: 12px 0 0;

                    overflow: hidden;

                    display: -webkit-box;

                    -webkit-line-clamp: 3;

                    -webkit-box-orient: vertical;
                }


                /* =====================================
                   FOOTER
                ===================================== */

                .course-footer {
                    margin-top: auto;

                    padding-top: 16px;

                    border-top:
                        1px solid #eeeeee;

                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    gap: 10px;
                }


                /* =====================================
                   COURSE TYPE
                ===================================== */

                .course-type {
                    color: #777777;

                    font-size: 12px;

                    white-space: nowrap;
                }

                .course-type i {
                    color: #ff6600;
                }


                /* =====================================
                   LEARN BUTTON
                ===================================== */

                .learn-btn {
                    background: #ff6600;

                    color: #ffffff !important;

                    padding: 9px 15px;

                    border-radius: 6px;

                    font-size: 12px;

                    font-weight: 600;

                    text-decoration: none !important;

                    white-space: nowrap;

                    display: inline-flex;

                    align-items: center;

                    justify-content: center;

                    transition: all 0.3s ease;
                }

                .learn-btn:hover {
                    background: #e55500;

                    color: #ffffff !important;

                    transform: translateX(2px);
                }


                /* =====================================
                   NO DATA
                ===================================== */

                .no-data {
                    text-align: center;

                    padding: 60px 20px;

                    color: #777777;
                }

                .no-data i {
                    font-size: 50px;

                    color: #ff6600;

                    margin-bottom: 15px;
                }

                .no-data h4 {
                    color: #333333;

                    margin-bottom: 8px;
                }


                /* =====================================
                   TABLET
                ===================================== */

                @media (max-width: 991px) and (min-width: 768px) {

                    .course-image {
                        height: 210px;

                        min-height: 210px;
                    }

                    .course-content {
                        height: 275px;

                        min-height: 275px;

                        padding: 20px;
                    }

                    .department-btn {
                        padding: 9px 16px;

                        font-size: 12px;
                    }

                }


                /* =====================================
                   MOBILE
                   DEPARTMENT TABS HIDDEN
                ===================================== */

                @media (max-width: 767px) {

                    /* Hide Department Tabs */

                    .department-tabs {
                        display: none !important;
                    }


                    /* Heading */

                    .department-main-title {
                        font-size: 28px;
                    }


                    /* Course Image */

                    .course-image {
                        height: 220px;

                        min-height: 220px;
                    }


                    /* Content */

                    .course-content {
                        height: 270px;

                        min-height: 270px;

                        padding: 20px;
                    }

                    .course-title {
                        font-size: 18px;
                    }

                    .course-description {
                        font-size: 13px;
                    }

                    .course-type {
                        font-size: 11px;
                    }

                    .learn-btn {
                        padding: 8px 12px;

                        font-size: 11px;
                    }

                }


                /* =====================================
                   SMALL MOBILE
                ===================================== */

                @media (max-width: 480px) {

                    .department-main-title {
                        font-size: 24px;
                    }

                    .course-image {
                        height: 200px;

                        min-height: 200px;
                    }

                    .course-content {
                        height: 270px;

                        min-height: 270px;

                        padding: 18px;
                    }

                    .course-title {
                        font-size: 17px;
                    }

                    .course-description {
                        font-size: 13px;

                        line-height: 1.55;
                    }

                    .course-type {
                        display: none;
                    }

                    .course-footer {
                        justify-content: flex-end;
                    }

                    .learn-btn {
                        padding: 9px 14px;

                        font-size: 11px;
                    }

                }

                `}
            </style>
        </>
    );
}

export default Course;
