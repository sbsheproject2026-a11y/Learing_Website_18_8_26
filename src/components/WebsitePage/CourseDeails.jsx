import React, { useEffect, useState } from "react";
import { createUser, getCourses } from "./CourseServiceData";
import { Link, useParams } from "react-router-dom";

function CourseDeails() {
    const { slug } = useParams();
    const [data, setData] = useState([]);

    const [showFileModal, setShowFileModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [fileType, setFileType] = useState("");

    const handleViewFile = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error("File load failed");
            }

            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);

            setSelectedFile(blobUrl);
            setFileType(blob.type);
            setShowFileModal(true);

        } catch (error) {
            console.error("File Error:", error);
        }
    };


    const [showApplyModal, setShowApplyModal] = useState(false);



    useEffect(() => {
        if (slug) {
            loadCourses(slug);
        }
    }, [slug]);




    const loadCourses = async (slug) => {
        try {
            const result = await getCourses(slug);
            setData(result.filter(
                (item) => item.is_active === true
            ));

        } catch (error) {
            console.log(error);
        }
    };

    const [applyForm, setApplyForm] = useState({
        name: "",
        father_name: "",
        email: "",
        phone_number: "",
        address: "",
        pincode: "",
        copy_type: "1",
        course_name: "",
        course_id: "",
    });


    const CreateUser = async (applyForm) => {
        try {
            //console.log("Sending Data:", applyForm);

            const result = await createUser(applyForm);

            // console.log("Saved Successfully:", result);

            alert("Application submitted successfully!");

            // Form reset
            setApplyForm({
                name: "",
                father_name: "",
                email: "",
                phone_number: "",
                address: "",
                pincode: "",
                copy_type: "",
                course_name: "",
                course_id: "",
            });
            setShowApplyModal(false);

        } catch (error) {
            console.log("API Error:", error.response?.data || error);
        }
    };





    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);


    // =========================
    // SEARCH
    // =========================
    const filteredCourses = data.filter((course) => {
        const searchText = search.toLowerCase().trim();

        return (
            String(course.courseCode ?? "")
                .toLowerCase()
                .includes(searchText) ||

            String(course.courseName ?? "")
                .toLowerCase()
                .includes(searchText) ||

            String(course.duration ?? "")
                .toLowerCase()
                .includes(searchText) ||

            String(course.year ?? "")
                .toLowerCase()
                .includes(searchText)
        );
    });

    // =========================
    // PAGINATION
    // =========================
    const totalPages = Math.ceil(
        filteredCourses.length / recordsPerPage
    );

    const startIndex =
        (currentPage - 1) * recordsPerPage;

    const endIndex = Math.min(
        startIndex + recordsPerPage,
        filteredCourses.length
    );

    const currentCourses = filteredCourses.slice(
        startIndex,
        endIndex
    );

    // =========================
    // SEARCH HANDLER
    // =========================
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // =========================
    // RECORD PER PAGE
    // =========================
    const handleRecordsChange = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // =========================
    // PREVIOUS
    // =========================
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // =========================
    // NEXT
    // =========================
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>

            <div className="container-fluid py-5 course-section">
                <div className="container pt-4 pb-4">

                    {/* ================= HEADING ================= */}
                    <div className="text-center mb-5">
                        <span className="course-label">
                            COURSES
                        </span>

                        <h1 className="course-heading">
                            Course Details
                        </h1>

                        <p className="course-subtitle">
                            Explore our courses, durations, subjects and study materials
                        </p>
                    </div>

                    {/* ================= TOP CONTROLS ================= */}
                    <div className="course-controls mb-4">

                        {/* SHOW ENTRIES */}
                        <div className="entries-control">
                            <span>Show</span>

                            <select
                                className="entries-select"
                                value={recordsPerPage}
                                onChange={handleRecordsChange}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>

                            <span>entries</span>
                        </div>

                        {/* SEARCH */}
                        <div className="search-box">
                            <i className="fa fa-search"></i>

                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                    </div>

                    {/* ================= TABLE ================= */}
                    <div className="course-table-wrapper">

                        <div className="table-responsive">

                            <table className="course-table">

                                <thead>
                                    <tr>
                                        <th width="70">#</th>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Duration</th>
                                        <th>Overview</th>
                                        <th>Subjects</th>
                                        <th>Material</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {data.length > 0 ? (

                                        data.map((course, index) => (

                                            <tr key={course.id}>

                                                {/* SERIAL */}
                                                <td>
                                                    <span className="serial-number">
                                                        {startIndex + index + 1}
                                                    </span>
                                                </td>

                                                {/* COURSE CODE */}
                                                <td>
                                                    <span className="course-code">
                                                        {course.course_code || "-"}
                                                    </span>
                                                </td>

                                                {/* COURSE NAME */}
                                                <td>
                                                    <div className="course-name">
                                                        {course.name}
                                                    </div>
                                                </td>

                                                {/* DURATION */}
                                                <td>
                                                    <span className="duration-badge">
                                                        <i className="fa fa-clock-o mr-1"></i>
                                                        {course.duration || "-"}
                                                    </span>
                                                </td>

                                                {/* OVERVIEW */}
                                                <td>
                                                    <div className="course-overview">
                                                        {course.introduction || "No overview available"}
                                                    </div>
                                                </td>

                                                {/* SUBJECTS */}
                                                <td>
                                                    <Link
                                                        to={`/subject-details/${course.slug}`}
                                                        className="action-btn subject-btn"
                                                    >
                                                        <i className="fa fa-book mr-1"></i>
                                                        Subjects
                                                    </Link>
                                                </td>

                                                {/* STUDY MATERIAL */}
                                                <td>
                                                    {course.file?.trim() ? (

                                                        <button
                                                            type="button"
                                                            className="action-btn material-btn"
                                                            onClick={() =>
                                                                handleViewFile(course.file)
                                                            }
                                                        >
                                                            <i className="fa fa-file-pdf-o mr-1"></i>
                                                            View
                                                        </button>

                                                    ) : (

                                                        <span className="no-file">
                                                            Not Available
                                                        </span>

                                                    )}
                                                </td>

                                                {/* ACTION */}
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="action-btn buy-btn"
                                                        onClick={() => {
                                                            setApplyForm({
                                                                ...applyForm,
                                                                course_name: course.name,
                                                                course_id: course.id,
                                                            });

                                                            setShowApplyModal(true);
                                                        }}
                                                    >
                                                        <i className="fa fa-shopping-cart mr-1"></i>
                                                        Buy Now
                                                    </button>
                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="no-course"
                                            >
                                                <div>
                                                    <i className="fa fa-search"></i>

                                                    <h5>
                                                        No Courses Found
                                                    </h5>

                                                    <p>
                                                        Try searching with a different keyword.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* ================= BOTTOM ================= */}
                    <div className="course-bottom">

                        {/* RECORD INFO */}
                        <div className="record-info">

                            Showing{" "}

                            <strong>
                                {filteredCourses.length > 0
                                    ? startIndex + 1
                                    : 0}
                            </strong>

                            {" "}to{" "}

                            <strong>
                                {endIndex}
                            </strong>

                            {" "}of{" "}

                            <strong>
                                {filteredCourses.length}
                            </strong>

                            {" "}entries

                        </div>

                        {/* PAGINATION */}
                        <nav>
                            <ul className="course-pagination">

                                {/* PREVIOUS */}
                                <li>
                                    <button
                                        className={
                                            currentPage === 1
                                                ? "disabled"
                                                : ""
                                        }
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        <span>Previous</span>
                                    </button>
                                </li>

                                {/* PAGE NUMBERS */}
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (

                                    <li key={page}>

                                        <button
                                            className={
                                                currentPage === page
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                        >
                                            {page}
                                        </button>

                                    </li>

                                ))}

                                {/* NEXT */}
                                <li>
                                    <button
                                        className={
                                            currentPage === totalPages
                                                ? "disabled"
                                                : ""
                                        }
                                        onClick={handleNext}
                                        disabled={
                                            currentPage === totalPages
                                        }
                                    >
                                        <span>Next</span>
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </li>

                            </ul>
                        </nav>

                    </div>

                </div>

                {/* ================= CSS ================= */}
                <style>
                    {`

        /* =========================
           MAIN SECTION
        ========================= */

        .course-section {
            background: #f8f9fc;
        }

        .course-label {
            display: inline-block;
            color: #ff6600;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 4px;
            margin-bottom: 10px;
        }

        .course-heading {
            font-size: 36px;
            font-weight: 700;
            color: #222;
            margin-bottom: 8px;
        }

        .course-subtitle {
            color: #777;
            font-size: 15px;
            margin: 0;
        }


        /* =========================
           CONTROLS
        ========================= */

        .course-controls {
            background: #fff;
            padding: 18px 20px;
            border-radius: 10px;
            border: 1px solid #eee;

            display: flex;
            justify-content: space-between;
            align-items: center;

            box-shadow: 0 3px 15px rgba(0,0,0,.04);
        }

        .entries-control {
            display: flex;
            align-items: center;
            gap: 8px;

            color: #666;
            font-size: 14px;
        }

        .entries-select {
            width: 75px;
            height: 38px;

            border: 1px solid #ddd;
            border-radius: 6px;

            padding: 0 8px;
            color: #444;
            background: #fff;
        }

        .search-box {
            width: 280px;
            height: 40px;

            display: flex;
            align-items: center;

            border: 1px solid #ddd;
            border-radius: 7px;
            background: #fff;

            padding: 0 12px;
        }

        .search-box i {
            color: #999;
            margin-right: 9px;
        }

        .search-box input {
            border: none;
            outline: none;

            width: 100%;

            font-size: 14px;
            color: #444;
        }


        /* =========================
           TABLE
        ========================= */

        .course-table-wrapper {
            background: #fff;
            border-radius: 12px;

            border: 1px solid #eee;

            overflow: hidden;

            box-shadow: 0 5px 25px rgba(0,0,0,.06);
        }

        .course-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
            min-width: 1050px;
        }

        .course-table thead th {
            background: #ff6600;
            color: #fff;

            font-size: 13px;
            font-weight: 600;

            padding: 15px 13px;

            border: none;

            white-space: nowrap;
        }

        .course-table tbody td {
            padding: 15px 13px;

            border-bottom: 1px solid #eee;

            vertical-align: middle;

            font-size: 13px;
            color: #555;
        }

        .course-table tbody tr {
            transition: .2s ease;
        }

        .course-table tbody tr:hover {
            background: #f8fbff;
        }

        .course-table tbody tr:last-child td {
            border-bottom: none;
        }


        /* =========================
           SERIAL
        ========================= */

        .serial-number {
            width: 30px;
            height: 30px;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            background: #eef5ff;
            color: #ff6600;

            border-radius: 50%;

            font-size: 12px;
            font-weight: 600;
        }


        /* =========================
           COURSE CODE
        ========================= */

        .course-code {
            background: #f3f5f8;
            color: #555;

            padding: 5px 9px;

            border-radius: 5px;

            font-size: 11px;
            font-weight: 600;

            white-space: nowrap;
        }


        /* =========================
           COURSE NAME
        ========================= */

        .course-name {
            width: 220px;

            color: #222;

            font-weight: 600;
            line-height: 1.5;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            overflow: hidden;
        }


        /* =========================
           DURATION
        ========================= */

        .duration-badge {
            display: inline-block;

            background: #fff5e9;
            color: #e88a00;

            padding: 6px 9px;

            border-radius: 5px;

            font-size: 11px;
            font-weight: 600;

            white-space: nowrap;
        }


        /* =========================
           OVERVIEW
        ========================= */

        .course-overview {
            width: 260px;

            line-height: 1.5;

            color: #777;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            overflow: hidden;
        }


        /* =========================
           BUTTONS
        ========================= */

        .action-btn {
            border: none;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            padding: 7px 11px;

            border-radius: 5px;

            font-size: 11px;
            font-weight: 600;

            white-space: nowrap;

            text-decoration: none !important;

            cursor: pointer;

            transition: .25s ease;
        }

        .subject-btn {
            background: #e8f7ff;
            color: #008bc9;
        }

        .subject-btn:hover {
            background: #ff6600;
            color: #fff;
        }

        .material-btn {
            background: #fff0f0;
            color: #e53935;
        }

        .material-btn:hover {
            background: #e53935;
            color: #fff;
        }

        .buy-btn {
            background: #ff6600;
            color: #fff;
        }

        .buy-btn:hover {
            background: #e85b00;
            transform: translateY(-1px);
        }

        .no-file {
            color: #aaa;
            font-size: 11px;
            white-space: nowrap;
        }


        /* =========================
           EMPTY
        ========================= */

        .no-course {
            padding: 60px 20px !important;
            text-align: center;
        }

        .no-course i {
            font-size: 35px;
            color: #bbb;
            margin-bottom: 12px;
        }

        .no-course h5 {
            color: #555;
            margin-bottom: 5px;
        }

        .no-course p {
            color: #999;
            margin: 0;
            font-size: 13px;
        }


        /* =========================
           BOTTOM
        ========================= */

        .course-bottom {
            margin-top: 20px;

            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .record-info {
            color: #888;
            font-size: 13px;
        }

        .record-info strong {
            color: #444;
        }


        /* =========================
           PAGINATION
        ========================= */

        .course-pagination {
            list-style: none;

            display: flex;
            align-items: center;

            margin: 0;
            padding: 0;

            gap: 5px;
        }

        .course-pagination button {
            min-width: 34px;
            height: 34px;

            border: 1px solid #ddd;
            background: #fff;

            color: #555;

            border-radius: 5px;

            font-size: 12px;

            padding: 0 9px;

            cursor: pointer;

            transition: .2s ease;
        }

        .course-pagination button:hover:not(.disabled) {
            background: #eef5ff;
            border-color: #ff6600;
            color: #ff6600;
        }

        .course-pagination button.active {
            background: #ff6600;
            border-color: #ff6600;
            color: #fff;
        }

        .course-pagination button.disabled {
            opacity: .45;
            cursor: not-allowed;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 991px) {

            .course-heading {
                font-size: 32px;
            }

            .course-controls {
                padding: 15px;
            }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 767px) {

            .course-section {
                padding-top: 35px !important;
                padding-bottom: 35px !important;
            }

            .course-heading {
                font-size: 27px;
            }

            .course-subtitle {
                font-size: 13px;
            }

            .course-label {
                font-size: 11px;
                letter-spacing: 3px;
            }

            .course-controls {
                flex-direction: column;
                align-items: stretch;
                gap: 15px;
            }

            .entries-control {
                justify-content: center;
            }

            .search-box {
                width: 100%;
            }

            .course-table-wrapper {
                border-radius: 8px;
            }

            .course-bottom {
                flex-direction: column;
                gap: 18px;
                align-items: center;
            }

            .record-info {
                text-align: center;
            }

            .course-pagination {
                justify-content: center;
                flex-wrap: wrap;
            }

            .course-pagination button {
                height: 32px;
                min-width: 32px;
            }

        }


        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {

            .course-heading {
                font-size: 24px;
            }

            .course-label {
                font-size: 10px;
            }

            .course-pagination button span {
                display: none;
            }

            .course-pagination button {
                padding: 0 8px;
            }

        }

        `}
                </style>
            </div>



            {/* Books Show krne k liya  */}

            {showFileModal && (
                <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Study Material File
                                </h5>



                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-info mx-2"
                                        onClick={() => {
                                            URL.revokeObjectURL(selectedFile);
                                            setShowFileModal(false);
                                            setSelectedFile("");
                                        }}
                                    >
                                        Close
                                    </button>

                                    {/* <button
                                        type="button"
                                        className="btn btn-success btn-sm mx-2"
                                        onClick={() => setShowApplyModal(true)}
                                    >
                                        Apply
                                    </button> */}
                                </div>
                            </div>

                            <div className="modal-body text-center">

                                {fileType === "application/pdf" ? (
                                    <iframe
                                        src={`${selectedFile}#toolbar=0`}
                                        title="PDF"
                                        style={{
                                            width: "100%",
                                            height: "75vh",
                                            border: "none"
                                        }}
                                    />
                                ) : fileType.startsWith("image/") ? (
                                    <img
                                        src={selectedFile}
                                        alt="Course"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "75vh"
                                        }}
                                    />
                                ) : (
                                    <p>File format not supported.</p>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            )}


            {/* Books  ko apply krne k liya  */}

            {showApplyModal && (
                <div
                    className="buy-modal-overlay"
                    onClick={() => setShowApplyModal(false)}
                >
                    <div
                        className="buy-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* ================= HEADER ================= */}
                        <div className="buy-modal-header">

                            <div className="buy-header-left">

                                <div className="buy-header-icon">
                                    <i className="fa fa-shopping-cart"></i>
                                </div>

                                <div>
                                    <h4>Buy Course</h4>
                                    <p>Complete the form to continue</p>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setShowApplyModal(false)}
                            >
                                <i className="fa fa-times"></i>
                            </button>

                        </div>


                        {/* ================= BODY ================= */}
                        <div className="buy-modal-body">

                            {/* Hidden Course ID */}
                            <input
                                type="hidden"
                                value={applyForm.course_id}
                                readOnly
                            />


                            {/* ================= SELECTED COURSE ================= */}
                            <div className="selected-course-box">

                                <div className="selected-course-icon">
                                    <i className="fa fa-graduation-cap"></i>
                                </div>

                                <div className="selected-course-content">

                                    <span>Selected Course</span>

                                    <h5>
                                        {applyForm.course_name || "Course"}
                                    </h5>

                                </div>

                                <div className="selected-check">
                                    <i className="fa fa-check"></i>
                                </div>

                            </div>


                            {/* ================= PERSONAL INFORMATION ================= */}
                            <div className="form-section">

                                <div className="section-heading">

                                    <div className="section-icon">
                                        <i className="fa fa-user"></i>
                                    </div>

                                    <div>
                                        <h5>Personal Information</h5>
                                        <p>Please provide your basic details</p>
                                    </div>

                                </div>


                                <div className="row">

                                    {/* Name */}
                                    <div className="col-md-6 mb-3">

                                        <label className="custom-label">
                                            Full Name
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <i className="fa fa-user"></i>

                                            <input
                                                type="text"
                                                className="custom-input"
                                                placeholder="Enter your full name"
                                                value={applyForm.name}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Father Name */}
                                    <div className="col-md-6 mb-3">

                                        <label className="custom-label">
                                            Father Name
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <i className="fa fa-user"></i>

                                            <input
                                                type="text"
                                                className="custom-input"
                                                placeholder="Enter father name"
                                                value={applyForm.father_name}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        father_name: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Mobile */}
                                    <div className="col-md-6 mb-3">

                                        <label className="custom-label">
                                            Mobile Number
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <i className="fa fa-phone"></i>

                                            <input
                                                type="tel"
                                                className="custom-input"
                                                placeholder="Enter mobile number"
                                                value={applyForm.phone_number}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        phone_number: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Email */}
                                    <div className="col-md-6 mb-3">

                                        <label className="custom-label">
                                            Email Address
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <i className="fa fa-envelope"></i>

                                            <input
                                                type="email"
                                                className="custom-input"
                                                placeholder="Enter email address"
                                                value={applyForm.email}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= DELIVERY INFORMATION ================= */}
                            <div className="form-section">

                                <div className="section-heading">

                                    <div className="section-icon orange">
                                        <i className="fa fa-map-marker"></i>
                                    </div>

                                    <div>
                                        <h5>Delivery Information</h5>
                                        <p>Required for hard copy delivery</p>
                                    </div>

                                </div>


                                <div className="row">

                                    {/* Address */}
                                    <div className="col-md-8 mb-3">

                                        <label className="custom-label">
                                            Complete Address
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper textarea-wrapper">

                                            <i className="fa fa-home"></i>

                                            <textarea
                                                className="custom-input custom-textarea"
                                                placeholder="House/Flat No., Street/Area, City, State..."
                                                value={applyForm.address}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                        <small className="field-help">
                                            <i className="fa fa-info-circle"></i>
                                            Please provide your complete address including
                                            Pincode for courier delivery.
                                        </small>

                                    </div>


                                    {/* Pincode */}
                                    <div className="col-md-4 mb-3">

                                        <label className="custom-label">
                                            Pincode
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <i className="fa fa-map-pin"></i>

                                            <input
                                                type="text"
                                                className="custom-input"
                                                placeholder="Enter Pincode"
                                                value={applyForm.pincode}
                                                onChange={(e) =>
                                                    setApplyForm({
                                                        ...applyForm,
                                                        pincode: e.target.value,
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= COPY TYPE ================= */}
                            <div className="form-section copy-section">

                                <div className="section-heading">

                                    <div className="section-icon green">
                                        <i className="fa fa-file"></i>
                                    </div>

                                    <div>
                                        <h5>Select Copy Type</h5>
                                        <p>Choose how you want to receive your course</p>
                                    </div>

                                </div>


                                <div className="copy-options">

                                    {/* SOFT COPY */}
                                    <label
                                        htmlFor="softCopy"
                                        className={`copy-option ${applyForm.copy_type === "1"
                                                ? "selected"
                                                : ""
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="copyType"
                                            id="softCopy"
                                            value="1"
                                            checked={
                                                applyForm.copy_type === "1"
                                            }
                                            onChange={(e) =>
                                                setApplyForm({
                                                    ...applyForm,
                                                    copy_type: e.target.value,
                                                })
                                            }
                                        />

                                        <div className="copy-icon soft">
                                            <i className="fa fa-file-text-o"></i>
                                        </div>

                                        <div className="copy-content">

                                            <strong>Soft Copy</strong>

                                            <small>
                                                Digital copy delivered online
                                            </small>

                                        </div>

                                        <div className="copy-check">
                                            <i className="fa fa-check"></i>
                                        </div>

                                    </label>


                                    {/* HARD COPY */}
                                    <label
                                        htmlFor="hardCopy"
                                        className={`copy-option ${applyForm.copy_type === "2"
                                                ? "selected"
                                                : ""
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="copyType"
                                            id="hardCopy"
                                            value="2"
                                            checked={
                                                applyForm.copy_type === "2"
                                            }
                                            onChange={(e) =>
                                                setApplyForm({
                                                    ...applyForm,
                                                    copy_type: e.target.value,
                                                })
                                            }
                                        />

                                        <div className="copy-icon hard">
                                            <i className="fa fa-file-text"></i>
                                        </div>

                                        <div className="copy-content">

                                            <strong>Hard Copy</strong>

                                            <small>
                                                Printed copy delivered by courier
                                            </small>

                                        </div>

                                        <div className="copy-check">
                                            <i className="fa fa-check"></i>
                                        </div>

                                    </label>

                                </div>

                            </div>

                        </div>


                        {/* ================= FOOTER ================= */}
                        <div className="buy-modal-footer">

                            <div className="footer-note">
                                <i className="fa fa-lock"></i>
                                Your information is secure
                            </div>

                            <div className="footer-buttons">

                               

                                <button
                                    type="button"
                                    className="submit-btn"
                                    onClick={() =>
                                        CreateUser(applyForm)
                                    }
                                >
                                    <i className="fa fa-check mr-2"></i>
                                    Submit Application
                                </button>


                                 <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setShowApplyModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ================= CSS ================= */}
                    <style>
                        {`

            /* =====================================
               OVERLAY
            ===================================== */

            .buy-modal-overlay {
                position: fixed;
                inset: 0;

                background: rgba(15, 23, 42, 0.72);

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 20px;

                z-index: 99999;

                backdrop-filter: blur(3px);
            }


            /* =====================================
               MODAL
            ===================================== */

            .buy-modal {
                width: 100%;
                max-width: 850px;

                max-height: 94vh;

                background: #fff;

                border-radius: 16px;

                overflow: hidden;

                display: flex;
                flex-direction: column;

                box-shadow:
                    0 25px 70px rgba(0,0,0,.25);

                animation: buyModalShow .25s ease;
            }

            @keyframes buyModalShow {

                from {
                    opacity: 0;
                    transform: translateY(20px) scale(.98);
                }

                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

            }


            /* =====================================
               HEADER
            ===================================== */

            .buy-modal-header {
                padding: 18px 24px;

                background: linear-gradient(
                    135deg,
                    #ff6600,
                    #0056b3
                );

                color: #fff;

                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .buy-header-left {
                display: flex;
                align-items: center;
                gap: 13px;
            }

            .buy-header-icon {
                width: 46px;
                height: 46px;

                border-radius: 12px;

                background: rgba(255,255,255,.16);

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 21px;
            }

            .buy-header-left h4 {
                margin: 0;

                color: #fff;

                font-size: 20px;
                font-weight: 700;
            }

            .buy-header-left p {
                margin: 3px 0 0;

                color: rgba(255,255,255,.8);

                font-size: 12px;
            }

            .modal-close-btn {
                width: 36px;
                height: 36px;

                border: none;

                border-radius: 50%;

                background: rgba(255,255,255,.14);

                color: #fff;

                cursor: pointer;

                transition: .2s ease;
            }

            .modal-close-btn:hover {
                background: rgba(255,255,255,.25);
                transform: rotate(90deg);
            }


            /* =====================================
               BODY
            ===================================== */

            .buy-modal-body {
                padding: 24px;

                overflow-y: auto;

                background: #f8fafc;
            }


            /* =====================================
               SELECTED COURSE
            ===================================== */

            .selected-course-box {
                background: #fff;

                border: 1px solid #e4e9f0;

                border-left: 4px solid #ff6600;

                border-radius: 10px;

                padding: 14px 16px;

                display: flex;
                align-items: center;

                margin-bottom: 22px;

                box-shadow: 0 3px 12px rgba(0,0,0,.03);
            }

            .selected-course-icon {
                width: 44px;
                height: 44px;

                border-radius: 10px;

                background: #eaf3ff;

                color: #ff6600;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 19px;

                margin-right: 13px;
            }

            .selected-course-content {
                flex: 1;
                min-width: 0;
            }

            .selected-course-content span {
                display: block;

                color: #999;

                font-size: 10px;

                text-transform: uppercase;

                letter-spacing: 1px;

                margin-bottom: 3px;
            }

            .selected-course-content h5 {
                margin: 0;

                color: #222;

                font-size: 15px;

                font-weight: 700;

                line-height: 1.4;
            }

            .selected-check {
                width: 28px;
                height: 28px;

                border-radius: 50%;

                background: #e8f8ef;

                color: #20a464;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 12px;
            }


            /* =====================================
               FORM SECTION
            ===================================== */

            .form-section {
                background: #fff;

                border: 1px solid #e8edf3;

                border-radius: 11px;

                padding: 20px;

                margin-bottom: 18px;
            }

            .section-heading {
                display: flex;
                align-items: center;

                gap: 11px;

                margin-bottom: 18px;

                padding-bottom: 13px;

                border-bottom: 1px solid #edf0f4;
            }

            .section-icon {
                width: 38px;
                height: 38px;

                flex-shrink: 0;

                border-radius: 9px;

                background: #eaf3ff;

                color: #ff6600;

                display: flex;
                align-items: center;
                justify-content: center;
            }

            .section-icon.orange {
                background: #fff3e6;
                color: #f28c28;
            }

            .section-icon.green {
                background: #e8f8ef;
                color: #20a464;
            }

            .section-heading h5 {
                margin: 0;

                color: #222;

                font-size: 15px;

                font-weight: 700;
            }

            .section-heading p {
                margin: 2px 0 0;

                color: #999;

                font-size: 11px;
            }


            /* =====================================
               LABEL
            ===================================== */

            .custom-label {
                display: block;

                color: #444;

                font-size: 12px;

                font-weight: 600;

                margin-bottom: 7px;
            }

            .custom-label span {
                color: #e53935;

                margin-left: 3px;
            }


            /* =====================================
               INPUT
            ===================================== */

            .input-wrapper {
                height: 44px;

                display: flex;
                align-items: center;

                background: #fff;

                border: 1px solid #dfe4ea;

                border-radius: 7px;

                padding: 0 12px;

                transition: .2s ease;
            }

            .input-wrapper:focus-within {
                border-color: #ff6600;

                box-shadow:
                    0 0 0 3px rgba(0,123,255,.08);
            }

            .input-wrapper > i {
                color: #a5adb7;

                width: 20px;

                margin-right: 8px;

                font-size: 13px;
            }

            .custom-input {
                width: 100%;

                border: none;
                outline: none;

                color: #333;

                font-size: 13px;

                background: transparent;
            }

            .custom-input::placeholder {
                color: #b0b5bb;
            }

            .textarea-wrapper {
                height: 82px;

                align-items: flex-start;

                padding-top: 11px;
            }

            .custom-textarea {
                height: 60px;

                resize: none;
            }

            .field-help {
                display: block;

                color: #999;

                font-size: 10px;

                margin-top: 6px;

                line-height: 1.5;
            }

            .field-help i {
                color: #ff6600;

                margin-right: 4px;
            }


            /* =====================================
               COPY OPTIONS
            ===================================== */

            .copy-options {
                display: grid;

                grid-template-columns: 1fr 1fr;

                gap: 14px;
            }

            .copy-option {
                position: relative;

                display: flex;
                align-items: center;

                padding: 14px;

                border: 1px solid #e0e5eb;

                border-radius: 10px;

                cursor: pointer;

                background: #fff;

                transition: .2s ease;
            }

            .copy-option:hover {
                border-color: #ff6600;

                background: #f8fbff;
            }

            .copy-option.selected {
                border-color: #ff6600;

                background: #f5faff;

                box-shadow:
                    0 0 0 2px rgba(0,123,255,.08);
            }

            .copy-option input {
                display: none;
            }

            .copy-icon {
                width: 42px;
                height: 42px;

                flex-shrink: 0;

                border-radius: 9px;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 17px;

                margin-right: 11px;
            }

            .copy-icon.soft {
                background: #eaf3ff;
                color: #ff6600;
            }

            .copy-icon.hard {
                background: #fff1e7;
                color: #ef7d22;
            }

            .copy-content {
                display: flex;
                flex-direction: column;

                min-width: 0;
            }

            .copy-content strong {
                color: #333;

                font-size: 13px;

                margin-bottom: 3px;
            }

            .copy-content small {
                color: #999;

                font-size: 10px;
            }

            .copy-check {
                margin-left: auto;

                width: 22px;
                height: 22px;

                border-radius: 50%;

                border: 1px solid #d7dce2;

                color: transparent;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 9px;
            }

            .copy-option.selected .copy-check {
                background: #ff6600;

                border-color: #ff6600;

                color: #fff;
            }


            /* =====================================
               FOOTER
            ===================================== */

            .buy-modal-footer {
                padding: 15px 24px;

                background: #fff;

                border-top: 1px solid #e8edf2;

                display: flex;
                align-items: center;
                justify-content: space-between;

                gap: 15px;
            }

            .footer-note {
                color: #999;

                font-size: 11px;
            }

            .footer-note i {
                color: #20a464;

                margin-right: 5px;
            }

            .footer-buttons {
                display: flex;
                gap: 9px;
            }

            .cancel-btn,
            .submit-btn {
                height: 40px;

                padding: 0 17px;

                border-radius: 6px;

                font-size: 12px;

                font-weight: 600;

                cursor: pointer;

                transition: .2s ease;
            }

            .cancel-btn {
                border: 1px solid #ddd;

                background: #fff;

                color: #666;
            }

            .cancel-btn:hover {
                background: #f5f5f5;
            }

            .submit-btn {
                border: none;

                background: #ff6600;

                color: #fff;

                box-shadow: 0 4px 12px rgba(0,123,255,.2);
            }

            .submit-btn:hover {
                background: #0069d9;

                transform: translateY(-1px);
            }


            /* =====================================
               TABLET
            ===================================== */

            @media (max-width: 767px) {

                .buy-modal-overlay {
                    padding: 10px;
                }

                .buy-modal {
                    max-height: 96vh;

                    border-radius: 12px;
                }

                .buy-modal-header {
                    padding: 14px 16px;
                }

                .buy-header-icon {
                    width: 40px;
                    height: 40px;
                }

                .buy-header-left h4 {
                    font-size: 17px;
                }

                .buy-modal-body {
                    padding: 15px;
                }

                .form-section {
                    padding: 15px;
                }

                .copy-options {
                    grid-template-columns: 1fr;
                }

                .buy-modal-footer {
                    padding: 12px 15px;

                    flex-direction: column;

                    align-items: stretch;
                }

                .footer-note {
                    text-align: center;
                }

                .footer-buttons {
                    width: 100%;
                }

                .cancel-btn,
                .submit-btn {
                    flex: 1;
                }

            }


            /* =====================================
               SMALL MOBILE
            ===================================== */

            @media (max-width: 480px) {

                .buy-modal-overlay {
                    padding: 5px;
                }

                .buy-modal {
                    max-height: 98vh;
                }

                .buy-modal-header {
                    padding: 12px;
                }

                .buy-header-left {
                    gap: 9px;
                }

                .buy-header-icon {
                    width: 36px;
                    height: 36px;

                    font-size: 16px;
                }

                .buy-header-left h4 {
                    font-size: 15px;
                }

                .buy-header-left p {
                    font-size: 10px;
                }

                .modal-close-btn {
                    width: 32px;
                    height: 32px;
                }

                .buy-modal-body {
                    padding: 10px;
                }

                .selected-course-box {
                    padding: 11px;
                }

                .selected-course-icon {
                    width: 38px;
                    height: 38px;

                    font-size: 16px;
                }

                .selected-course-content h5 {
                    font-size: 13px;
                }

                .form-section {
                    padding: 12px;
                }

                .section-heading {
                    margin-bottom: 14px;
                }

                .section-heading h5 {
                    font-size: 14px;
                }

                .input-wrapper {
                    height: 42px;
                }

                .textarea-wrapper {
                    height: 78px;
                }

                .custom-textarea {
                    height: 58px;
                }

                .footer-buttons {
                    flex-direction: column;
                }

                .cancel-btn,
                .submit-btn {
                    width: 100%;
                     padding: 10px 0px;
                }

            }

            `}
                    </style>
                </div>
            )}



        </>
    );
}

export default CourseDeails;
