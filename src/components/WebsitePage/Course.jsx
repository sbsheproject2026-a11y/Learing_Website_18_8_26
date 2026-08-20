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

    <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">

            <span className="department-label">
                DEPARTMENTS
            </span>

            <h2 className="department-title">
                Explore Our Departments
            </h2>

            <p className="department-subtitle">
                Discover courses designed to build skills and careers.
            </p>

        </div>


        {/* Department Filter */}
        <div className="department-tabs mb-4">

            {departments.map((department) => (

                <button
                    key={department}
                    type="button"
                    className={`department-btn ${
                        activeDepartment === department ? "active" : ""
                    }`}
                    onClick={() => setActiveDepartment(department)}
                >
                    {department}
                </button>

            ))}

        </div>


        {/* Cards */}
        <div className="row">

            {filteredData?.filter(
                (item) => item.is_active === true
            ).length > 0 ? (

                filteredData
                    .filter((item) => item.is_active === true)
                    .map((item) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={item.id}
                        >

                            <div className="department-card">

                                {/* Image */}
                                <div className="department-image">

                                    {item.file ? (

                                        <img
                                            src={item.file}
                                            alt={item.name}
                                        />

                                    ) : (

                                        <div className="department-placeholder">
                                            <i className="fa fa-book"></i>
                                        </div>

                                    )}

                                    <span className="course-badge">
                                        {item.course_count || 0} Courses
                                    </span>

                                </div>


                                {/* Content */}
                                <div className="department-content">

                                    <Link
                                        to={`/course-details/${item.slug}`}
                                        className="department-name"
                                    >
                                        {item.name}
                                    </Link>

                                    <p>
                                        {item.description ||
                                            "Explore professional courses and develop practical skills for your career."}
                                    </p>

                                    <Link
                                        to={`/course-details/${item.slug}`}
                                        className="department-link"
                                    >
                                        Explore Courses
                                        <i className="fa fa-arrow-right"></i>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

            ) : (

                <div className="col-12">

                    <div className="department-empty">
                        <i className="fa fa-folder-open"></i>

                        <h5>No Department Found</h5>

                        <p>
                            No courses are available for this department.
                        </p>
                    </div>

                </div>

            )}

        </div>

    </div>


    <style>
        {`

        /* ================================
           SECTION
        ================================= */

        .department-section {
            background: #f8f9fc;
        }

        .department-label {
            color: #ff6600;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3px;
        }

        .department-title {
            margin: 8px 0;
            font-size: 32px;
            font-weight: 700;
            color: #222;
        }

        .department-subtitle {
            color: #777;
            font-size: 14px;
            margin: 0 auto;
        }


        /* ================================
           FILTER BUTTONS
        ================================= */

        .department-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
        }

        .department-btn {
            border: 1px solid #ff6600;
            background: #fff;
            color: #ff6600;
            padding: 8px 18px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: .25s ease;
        }

        .department-btn:hover,
        .department-btn.active {
            background: #ff6600;
            color: #fff;
            box-shadow: 0 5px 15px rgba(255,102,0,.20);
        }


        /* ================================
           CARD
        ================================= */

        .department-card {
            background: #fff;
            border-radius: 14px;
            overflow: hidden;
            height: 100%;
            border: 1px solid #eee;
            box-shadow: 0 5px 18px rgba(0,0,0,.06);
            transition: .3s ease;
        }

        .department-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 28px rgba(0,0,0,.12);
        }


        /* ================================
           IMAGE
        ================================= */

        .department-image {
            height: 190px;
            position: relative;
            overflow: hidden;
            background: #f1f1f1;
        }

        .department-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: .4s ease;
        }

        .department-card:hover .department-image img {
            transform: scale(1.05);
        }

        .department-placeholder {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff6600;
            font-size: 45px;
        }

        .course-badge {
            position: absolute;
            bottom: 12px;
            left: 12px;
            background: #ff6600;
            color: #fff;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
        }


        /* ================================
           CONTENT
        ================================= */

        .department-content {
            padding: 18px;
        }

        .department-name {
            display: block;
            color: #222;
            font-size: 18px;
            font-weight: 700;
            text-decoration: none;
            margin-bottom: 8px;
        }

        .department-name:hover {
            color: #ff6600;
            text-decoration: none;
        }

        .department-content p {
            color: #777;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 14px;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .department-link {
            color: #ff6600;
            font-size: 12px;
            font-weight: 700;
            text-decoration: none;
        }

        .department-link:hover {
            color: #e55500;
            text-decoration: none;
        }

        .department-link i {
            margin-left: 7px;
            transition: .2s;
        }

        .department-link:hover i {
            margin-left: 10px;
        }


        /* ================================
           EMPTY
        ================================= */

        .department-empty {
            text-align: center;
            background: #fff;
            padding: 45px 20px;
            border-radius: 14px;
            color: #777;
        }

        .department-empty i {
            color: #ff6600;
            font-size: 40px;
            margin-bottom: 10px;
        }

        .department-empty h5 {
            color: #333;
        }


        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 767px) {

            .department-section {
                padding-top: 40px !important;
                padding-bottom: 40px !important;
            }

            .department-title {
                font-size: 26px;
            }

            .department-subtitle {
                font-size: 13px;
            }

            /* Hide filters on mobile */
            .department-tabs {
                display: none;
            }

            .department-image {
                height: 190px;
            }

            .department-content {
                padding: 16px;
            }

        }

        `}
    </style>

</div>

        </>
    );
}

export default Course;
