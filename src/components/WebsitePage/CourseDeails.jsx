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
            setData(result);

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
        console.log("Sending Data:", applyForm);

        const result = await createUser(applyForm);

        console.log("Saved Successfully:", result);

           alert("Application submitted successfully!");
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
                            Courses
                        </h5>

                        <h1>Course Details</h1>
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
                                    <th>Course Code</th>
                                    <th>Course Name</th>
                                    <th>Duration</th>
                                    <th>Course Overview</th>
                                    <th>Subjects</th>
                                    <th>Study Material</th>
                                    <th>Action</th>
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
                                                {course.course_code}
                                            </td>

                                            <td>
                                                {course.name}
                                            </td>

                                            <td>
                                                {course.duration}
                                            </td>

                                            <td>
                                                {course.introduction}

                                            </td>


                                            <td>

                                                <Link
                                                    className="btn btn-info btn-sm"
                                                    to={`/subject-details/${course.slug}`}
                                                >
                                                    View Subjects
                                                </Link>

                                            </td>
                                            <td>
                                                {course.file?.trim() && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleViewFile(course.file)}
                                                    >
                                                        View File
                                                    </button>
                                                )}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        setApplyForm({
                                                            ...applyForm,
                                                            course_name: course.name,
                                                            course_id: course.id,
                                                        });

                                                        setShowApplyModal(true);
                                                    }}
                                                >
                                                    Buy Now
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
        className="modal fade show"
        style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
        tabIndex="-1"
    >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">

                {/* Header */}
                <div className="modal-header">
                    <h5 className="modal-title">
                        Buy Now for Book
                    </h5>

                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => setShowApplyModal(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Body */}
                <div
                    className="modal-body"
                    style={{
                        maxHeight: "70vh",
                        overflowY: "auto",
                    }}
                >
                    <div className="row">

                        {/* Course ID - Hidden */}
                        <input
                            type="hidden"
                            value={applyForm.course_id}
                            readOnly
                        />

                        {/* Course */}
                        <div className="col-12 mb-3">
                            <div className="row align-items-center">

                                <div className="col-12 col-md-2 mb-2 mb-md-0">
                                    <label className="form-label mb-0">
                                        Course{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                </div>

                                <div className="col-12 col-md-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={applyForm.course_name
}
                                        readOnly
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Name */}
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">
                                Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={applyForm.name}
                                onChange={(e) =>
                                    setApplyForm({
                                        ...applyForm,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Father Name */}
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">
                                Father Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Father Name"
                                value={applyForm.father_name}
                                onChange={(e) =>
                                    setApplyForm({
                                        ...applyForm,
                                        father_name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Mobile */}
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">
                                Mobile Number{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                value={applyForm.phone_number}
                                onChange={(e) =>
                                    setApplyForm({
                                        ...applyForm,
                                        phone_number: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Email */}
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">
                                Email{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={applyForm.email}
                                onChange={(e) =>
                                    setApplyForm({
                                        ...applyForm,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Address */}
                        <div className="col-12 col-md-8 mb-3">
                            <label className="form-label">
                                Address{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Full Address"
                                value={applyForm.address}
                                onChange={(e) =>
                                    setApplyForm({
                                        ...applyForm,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Pincode */}
                        <div className="col-12 col-md-4 mb-3">
                            <label className="form-label">
                                Pincode{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control"
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

                        {/* Copy Type */}
                        <div className="col-12 mb-3">

                            <label className="form-label d-block">
                                Select Copy Type{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="d-flex flex-wrap gap-3">

                                {/* Soft Copy */}
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
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

                                    <label
                                        className="form-check-label"
                                        htmlFor="softCopy"
                                    >
                                        Soft Copy
                                    </label>
                                </div>

                                {/* Hard Copy */}
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
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

                                    <label
                                        className="form-check-label"
                                        htmlFor="hardCopy"
                                    >
                                        Hard Copy
                                    </label>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 w-100">

                        <button
                            type="button"
                            className="btn btn-success mx-3"
                           onClick={() => CreateUser(applyForm)}
>
                            Submit Application
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowApplyModal(false)}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>
        </div>
    </div>
)}


        </>
    );
}

export default CourseDeails;
