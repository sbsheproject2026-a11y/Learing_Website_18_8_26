import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getSubjects } from "./CourseServiceData";

function Subject() {
    const { slug } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (slug) {
            loadSubjects(slug);
        }
    }, [slug]);

    const loadSubjects = async (slug) => {
        try {
            const result = await getSubjects(slug);

            setData(result.filter(
                (item) => item.is_active === true
            ));
        } catch (error) {
            console.log(error);
        }
    };
    console.log("Hello ", data);
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
            <div className="container-fluid py-5 subject-section">
    <div className="container pt-4 pb-4">

        {/* =========================
            PAGE HEADER
        ========================== */}
        <div className="text-center mb-5">
            <div className="section-label">
                SUBJECT
            </div>

            <h1 className="subject-heading">
                Subject Details
            </h1>

            <p className="subject-subtitle">
                Explore subjects, syllabus, assessments and question papers
            </p>
        </div>


        {/* =========================
            CONTROLS
        ========================== */}
        <div className="subject-toolbar">

            {/* Records */}
            <div className="records-control">
                <span>Show</span>

                <select
                    className="records-select"
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


            {/* Search */}
            <div className="search-box">
                <i className="fa fa-search"></i>

                <input
                    type="text"
                    placeholder="Search subject..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

        </div>


        {/* =========================
            TABLE CARD
        ========================== */}
        <div className="subject-table-card">

            <div className="table-responsive">

                <table className="subject-table">

                    <thead>
                        <tr>
                            <th width="70">#</th>
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Sem / Year</th>
                            <th>Documents</th>
                        </tr>
                    </thead>


                    <tbody>

                        {data?.length > 0 ? (

                            data.map((course, index) => (

                                <tr key={course.id}>

                                    {/* Serial Number */}
                                    <td>
                                        <span className="serial-number">
                                            {startIndex + index + 1}
                                        </span>
                                    </td>


                                    {/* Subject Code */}
                                    <td>
                                        <span className="subject-code">
                                            {course.subject_code || "-"}
                                        </span>
                                    </td>


                                    {/* Subject Name */}
                                    <td>
                                        <div className="subject-name">
                                            <div className="subject-icon">
                                                <i className="fa fa-book"></i>
                                            </div>

                                            <span>
                                                {course.subject_name || "-"}
                                            </span>
                                        </div>
                                    </td>


                                    {/* Semester / Year */}
                                    <td>
                                        <span className="academic-badge">
                                            {course.academic_year_display || "-"}
                                        </span>
                                    </td>


                                    {/* Documents */}
                                    <td>

                                        <div className="document-buttons">

                                            {/* Syllabus */}
                                            {course.syllabus?.file?.trim() && (

                                                <button
                                                    type="button"
                                                    className="document-btn syllabus-btn"
                                                    onClick={() =>
                                                        window.open(
                                                            course.syllabus.file,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-file-text mr-1"></i>
                                                    <span>Syllabus</span>
                                                </button>

                                            )}


                                            {/* Assessment */}
                                            {course.assessment?.file?.trim() && (

                                                <button
                                                    type="button"
                                                    className="document-btn assessment-btn"
                                                    onClick={() =>
                                                        window.open(
                                                            course.assessment.file,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-check-square-o mr-1"></i>
                                                    <span>Assessment</span>
                                                </button>

                                            )}


                                            {/* Question Paper */}
                                            {course.question_paper?.file?.trim() && (

                                                <button
                                                    type="button"
                                                    className="document-btn question-btn"
                                                    onClick={() =>
                                                        window.open(
                                                            course.question_paper.file,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-file-pdf-o mr-1"></i>
                                                    <span>Question Paper</span>
                                                </button>

                                            )}


                                            {/* No Documents */}
                                            {!course.syllabus?.file?.trim() &&
                                                !course.assessment?.file?.trim() &&
                                                !course.question_paper?.file?.trim() && (

                                                    <span className="no-document">
                                                        No documents
                                                    </span>

                                                )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="no-data"
                                >
                                    <div className="no-data-content">
                                        <i className="fa fa-folder-open-o"></i>

                                        <h5>No Subjects Found</h5>

                                        <p>
                                            No subjects are available for this course.
                                        </p>
                                    </div>
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>


        {/* =========================
            BOTTOM
        ========================== */}
        <div className="subject-bottom">

            {/* Record Information */}
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


            {/* Pagination */}
            <nav>

                <ul className="subject-pagination">

                    {/* Previous */}
                    <li
                        className={
                            currentPage === 1
                                ? "disabled"
                                : ""
                        }
                    >
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            <i className="fa fa-angle-left"></i>
                            <span>Previous</span>
                        </button>
                    </li>


                    {/* Pages */}
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (

                        <li
                            key={page}
                            className={
                                currentPage === page
                                    ? "active"
                                    : ""
                            }
                        >
                            <button
                                onClick={() =>
                                    setCurrentPage(page)
                                }
                            >
                                {page}
                            </button>
                        </li>

                    ))}


                    {/* Next */}
                    <li
                        className={
                            currentPage === totalPages
                                ? "disabled"
                                : ""
                        }
                    >
                        <button
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


        {/* =========================
            CSS
        ========================== */}
        <style>
            {`

            /* =================================
               MAIN SECTION
            ================================= */

            .subject-section {
                background: #f8f9fc;
            }


            /* =================================
               HEADER
            ================================= */

            .section-label {
                display: inline-block;
                color: #ff6600;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 4px;
                margin-bottom: 10px;
                position: relative;
            }

            .section-label::before {
                content: "";
                display: inline-block;
                width: 25px;
                height: 3px;
                background: #ff6600;
                margin-right: 10px;
                vertical-align: middle;
            }

            .subject-heading {
                font-size: 38px;
                font-weight: 700;
                color: #222;
                margin-bottom: 10px;
            }

            .subject-subtitle {
                color: #777;
                font-size: 15px;
                margin: 0;
            }


            /* =================================
               TOOLBAR
            ================================= */

            .subject-toolbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #fff;
                padding: 18px 20px;
                border-radius: 10px 10px 0 0;
                border: 1px solid #eee;
                border-bottom: 0;
            }

            .records-control {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #555;
                font-size: 14px;
            }

            .records-select {
                width: 75px;
                height: 38px;
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 5px 10px;
                outline: none;
            }

            .records-select:focus {
                border-color: #ff6600;
                box-shadow: 0 0 0 2px rgba(255, 102, 0, .10);
            }


            /* =================================
               SEARCH
            ================================= */

            .search-box {
                width: 260px;
                height: 40px;
                display: flex;
                align-items: center;
                background: #f8f9fc;
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 0 12px;
            }

            .search-box i {
                color: #999;
                margin-right: 8px;
            }

            .search-box input {
                width: 100%;
                border: 0;
                outline: none;
                background: transparent;
                font-size: 14px;
            }


            /* =================================
               TABLE CARD
            ================================= */

            .subject-table-card {
                background: #fff;
                border: 1px solid #eee;
                border-radius: 0 0 10px 10px;
                overflow: hidden;
                box-shadow: 0 5px 25px rgba(0,0,0,.05);
            }


            /* =================================
               TABLE
            ================================= */

            .subject-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 850px;
            }

            .subject-table thead {
                background: #ff6600;
            }

            .subject-table thead th {
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                padding: 15px 14px;
                border: none;
                white-space: nowrap;
            }

            .subject-table tbody tr {
                transition: all .2s ease;
            }

            .subject-table tbody tr:hover {
                background: #fff8f3;
            }

            .subject-table tbody td {
                padding: 16px 14px;
                border-bottom: 1px solid #eee;
                vertical-align: middle;
                font-size: 14px;
                color: #555;
            }

            .subject-table tbody tr:last-child td {
                border-bottom: 0;
            }


            /* =================================
               SERIAL
            ================================= */

            .serial-number {
                width: 30px;
                height: 30px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                background: #fff1e8;
                color: #ff6600;
                border-radius: 50%;
                font-size: 12px;
                font-weight: 700;
            }


            /* =================================
               SUBJECT CODE
            ================================= */

            .subject-code {
                display: inline-block;
                background: #f1f4f8;
                color: #555;
                padding: 6px 10px;
                border-radius: 5px;
                font-size: 12px;
                font-weight: 600;
            }


            /* =================================
               SUBJECT NAME
            ================================= */

            .subject-name {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #222;
                font-weight: 600;
                min-width: 180px;
            }

            .subject-icon {
                width: 38px;
                height: 38px;
                min-width: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff1e8;
                color: #ff6600;
                border-radius: 8px;
                font-size: 15px;
            }


            /* =================================
               ACADEMIC BADGE
            ================================= */

            .academic-badge {
                display: inline-block;
                padding: 6px 12px;
                background: #eaf7f0;
                color: #198754;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
            }


            /* =================================
               DOCUMENT BUTTONS
            ================================= */

            .document-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 7px;
                min-width: 300px;
            }

            .document-btn {
                border: 0;
                border-radius: 5px;
                padding: 7px 10px;
                color: #fff;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all .25s ease;
                white-space: nowrap;
            }

            .document-btn:hover {
                transform: translateY(-2px);
            }

            .syllabus-btn {
                background: #0d6efd;
            }

            .syllabus-btn:hover {
                background: #0b5ed7;
            }

            .assessment-btn {
                background: #198754;
            }

            .assessment-btn:hover {
                background: #157347;
            }

            .question-btn {
                background: #dc3545;
            }

            .question-btn:hover {
                background: #bb2d3b;
            }

            .no-document {
                color: #999;
                font-size: 12px;
                font-style: italic;
            }


            /* =================================
               NO DATA
            ================================= */

            .no-data {
                text-align: center;
                padding: 50px !important;
            }

            .no-data-content i {
                font-size: 40px;
                color: #ddd;
                margin-bottom: 15px;
            }

            .no-data-content h5 {
                color: #555;
                margin-bottom: 5px;
            }

            .no-data-content p {
                color: #999;
                margin: 0;
                font-size: 13px;
            }


            /* =================================
               BOTTOM
            ================================= */

            .subject-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                gap: 15px;
            }

            .record-info {
                color: #777;
                font-size: 13px;
            }

            .record-info strong {
                color: #333;
            }


            /* =================================
               PAGINATION
            ================================= */

            .subject-pagination {
                display: flex;
                align-items: center;
                gap: 5px;
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .subject-pagination button {
                border: 1px solid #ddd;
                background: #fff;
                color: #555;
                min-width: 36px;
                height: 36px;
                padding: 0 10px;
                border-radius: 5px;
                font-size: 12px;
                cursor: pointer;
                transition: all .2s ease;
            }

            .subject-pagination button:hover {
                border-color: #ff6600;
                color: #ff6600;
            }

            .subject-pagination li.active button {
                background: #ff6600;
                border-color: #ff6600;
                color: #fff;
            }

            .subject-pagination li.disabled button {
                opacity: .45;
                cursor: not-allowed;
            }


            /* =================================
               TABLET
            ================================= */

            @media (max-width: 991px) {

                .subject-heading {
                    font-size: 32px;
                }

                .subject-toolbar {
                    padding: 15px;
                }

                .subject-table {
                    min-width: 800px;
                }

            }


            /* =================================
               MOBILE
            ================================= */

            @media (max-width: 767px) {

                .subject-section {
                    padding-top: 40px !important;
                    padding-bottom: 40px !important;
                }

                .subject-heading {
                    font-size: 27px;
                }

                .subject-subtitle {
                    font-size: 13px;
                }

                .subject-toolbar {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 15px;
                    padding: 15px;
                }

                .records-control {
                    justify-content: flex-start;
                }

                .search-box {
                    width: 100%;
                }

                .subject-table-card {
                    border-radius: 0 0 8px 8px;
                }

                .subject-table {
                    min-width: 800px;
                }

                .subject-bottom {
                    flex-direction: column;
                    align-items: stretch;
                }

                .record-info {
                    text-align: center;
                }

                .subject-pagination {
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .subject-pagination button {
                    min-width: 34px;
                    height: 34px;
                }

                .subject-pagination li:first-child span,
                .subject-pagination li:last-child span {
                    display: none;
                }

            }


            /* =================================
               SMALL MOBILE
            ================================= */

            @media (max-width: 480px) {

                .section-label {
                    font-size: 12px;
                    letter-spacing: 3px;
                }

                .subject-heading {
                    font-size: 24px;
                }

                .subject-table thead th,
                .subject-table tbody td {
                    padding: 12px 10px;
                }

                .document-buttons {
                    min-width: 250px;
                }

            }

            `}
        </style>

    </div>
</div>

        </>
    );
}

export default Subject;
