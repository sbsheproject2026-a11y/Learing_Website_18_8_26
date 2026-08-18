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
 
            setData(result);
        } catch (error) {
            console.log(error);
        }
    };
           console.log("Hello ",data);
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
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">

                    {/* =========================
              HEADING
          ========================== */}
                    <div className="text-center mb-5">
                        <h5
                            className="text-primary text-uppercase mb-3"
                            style={{ letterSpacing: "5px" }}
                        >
                            Subject
                        </h5>

                        <h1>Subject Details</h1>
                    </div>

                    {/* =========================
              TOP CONTROLS
          ========================== */}
                    <div className="row align-items-center mb-3">

                        {/* LEFT - SHOW RECORDS */}
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="d-flex align-items-center">

                                <span className="me-2">
                                    Show
                                </span>

                                <select
                                    className="form-select"
                                    value={recordsPerPage}
                                    onChange={handleRecordsChange}
                                    style={{ width: "90px" }}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <span className="ms-2">
                                    entries
                                </span>

                            </div>
                        </div>

                        {/* RIGHT - SEARCH */}
                        <div className="col-md-6">

                            <div className="d-flex justify-content-md-end">

                                <div
                                    className="input-group"
                                    style={{ maxWidth: "250px" }}
                                >

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={handleSearch}
                                        placeholder="Search"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =========================
              TABLE
          ========================== */}
                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover   align-middle">

                            <thead className="table-primary">
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                     <th>Sem/Year</th>
                                    <th>Syllabus</th>
                                    <th>Assessment</th>
                                    <th>Question Papers</th>


                                </tr>
                            </thead>

                            <tbody>

                                {data.length > 0 ? (

                                    data.map((course, index) => (

                                        <tr key={course.id}>

                                            <td>
                                                {startIndex + index + 1}
                                            </td>

                                            <td>
                                                {course.subject_code}
                                            </td>

                                            <td>
                                                {course.title}
                                            </td>

                                            

                                            <td>
                                                {course.academic_year_display}
                                            </td>


                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => window.open(course.file, "_blank")}
                                                >
                                                    View Syllabus
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => window.open(course.file, "_blank")}
                                                >
                                                    View Assessment
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => window.open(course.file, "_blank")}
                                                >
                                                    Question Papers
                                                </button>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-4"
                                        >
                                            No courses found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* =========================
              BOTTOM PAGINATION
          ========================== */}
                    <div className="row align-items-center mt-3">

                        {/* LEFT - RECORD INFO */}
                        <div className="col-md-6 mb-3 mb-md-0">

                            <span className="text-muted">

                                Showing{" "}

                                {filteredCourses.length > 0
                                    ? startIndex + 1
                                    : 0}

                                {" "}to{" "}

                                {endIndex}

                                {" "}of{" "}

                                {filteredCourses.length}

                                {" "}entries

                            </span>

                        </div>

                        {/* RIGHT - PAGINATION */}
                        <div className="col-md-6">

                            <nav>

                                <ul className="pagination justify-content-md-end mb-0">

                                    {/* PREVIOUS */}
                                    <li
                                        className={`page-item ${currentPage === 1
                                            ? "disabled"
                                            : ""
                                            }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={handlePrevious}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {/* PAGE NUMBERS */}
                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (

                                        <li
                                            key={page}
                                            className={`page-item ${currentPage === page
                                                ? "active"
                                                : ""
                                                }`}
                                        >

                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </button>

                                        </li>

                                    ))}

                                    {/* NEXT */}
                                    <li
                                        className={`page-item ${currentPage === totalPages
                                            ? "disabled"
                                            : ""
                                            }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={handleNext}
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Subject;
