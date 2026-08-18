  import React, { useState } from "react";
 

function StudentSupport() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const newsEvents = [
        {
            id: 1,
            title: "Admission Open for 2026",
            type: "News",
            date: "10 Aug 2026",
            description:
                "Admissions are now open for the academic session 2026.",
        },
        {
            id: 2,
            title: "Annual Sports Meet 2026",
            type: "Event",
            date: "15 Aug 2026",
            description:
                "Annual sports meet will be organized on campus.",
        },
        {
            id: 3,
            title: "Independence Day Celebration",
            type: "Event",
            date: "15 Aug 2026",
            description:
                "Special Independence Day celebration at the institute.",
        },
        {
            id: 4,
            title: "Scholarship Form Submission",
            type: "News",
            date: "20 Aug 2026",
            description:
                "Students can submit their scholarship applications.",
        },
        {
            id: 5,
            title: "Career Counselling Session",
            type: "Event",
            date: "25 Aug 2026",
            description:
                "Career counselling session for final year students.",
        },
        {
            id: 6,
            title: "Semester Examination Notice",
            type: "News",
            date: "01 Sep 2026",
            description:
                "Semester examination schedule has been announced.",
        },
        {
            id: 7,
            title: "Teacher's Day Celebration",
            type: "Event",
            date: "05 Sep 2026",
            description:
                "Teacher's Day celebration will be held on campus.",
        },
        {
            id: 8,
            title: "Placement Drive 2026",
            type: "Event",
            date: "10 Sep 2026",
            description:
                "Placement drive for eligible students.",
        },
        {
            id: 9,
            title: "New Course Announcement",
            type: "News",
            date: "15 Sep 2026",
            description:
                "New professional courses have been introduced.",
        },
        {
            id: 10,
            title: "Workshop on Web Development",
            type: "Event",
            date: "20 Sep 2026",
            description:
                "A practical workshop on modern web development.",
        },
        {
            id: 11,
            title: "Exam Result Announcement",
            type: "News",
            date: "25 Sep 2026",
            description:
                "Semester examination results will be published.",
        },
        {
            id: 12,
            title: "Campus Orientation Program",
            type: "Event",
            date: "01 Oct 2026",
            description:
                "Orientation program for newly admitted students.",
        },
    ];

    // =========================
    // SEARCH
    // =========================

    const filteredNewsEvents = newsEvents.filter((item) => {
        const searchText = search.toLowerCase().trim();

        return (
            item.title.toLowerCase().includes(searchText) ||
            item.type.toLowerCase().includes(searchText) ||
            item.date.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText)
        );
    });

    // =========================
    // PAGINATION
    // =========================

    const totalPages = Math.ceil(
        filteredNewsEvents.length / recordsPerPage
    );

    const startIndex =
        (currentPage - 1) * recordsPerPage;

    const endIndex = Math.min(
        startIndex + recordsPerPage,
        filteredNewsEvents.length
    );

    const currentNewsEvents = filteredNewsEvents.slice(
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
    // RECORDS PER PAGE
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
 
 <style>{`
                .blink-badge {
                    display: inline-block;
                    animation: blinkBadge 1.2s ease-in-out infinite;
                }

                @keyframes blinkBadge {
                    0% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 0.35;
                    }

                    100% {
                        opacity: 1;
                    }
                }

                .news-event-table th {
                    white-space: nowrap;
                }

                .news-event-table td {
                    vertical-align: middle;
                }

                .news-event-description {
                    min-width: 300px;
                }

                @media (max-width: 768px) {
                    .news-event-description {
                        min-width: 250px;
                    }

                    .pagination {
                        justify-content: flex-start !important;
                    }
                }
            `}</style>

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
                        News & Events
                    </h5>

                    <h1>Latest News & Events</h1>

                </div>

                {/* =========================
                    TOP CONTROLS
                ========================== */}

                <div className="row align-items-center mb-3">

                    {/* SHOW RECORDS */}

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

                    {/* SEARCH */}

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
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
                    TABLE
                ========================== */}

                <div className="table-responsive">

                    <table className="table table-bordered table-striped table-hover align-middle">

                        <thead className="table-primary">

                            <tr>
                                <th>Sr. No.</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Description</th>
                                {/* <th>View</th> */}
                            </tr>

                        </thead>

                        <tbody>

                            {currentNewsEvents.length > 0 ? (

                                currentNewsEvents.map((item, index) => (

                                    <tr key={item.id}>

                                        <td>
                                            {startIndex + index + 1}
                                        </td>

                                        <td>
                                            {item.title}
                                        </td>

                                        {/* =========================
                                            TYPE - BLINKING BADGE
                                        ========================== */}

                                        <td>

                                            <span
                                                className={`badge blink-badge ${
                                                    item.type === "Event"
                                                        ? "bg-success text-white"
                                                        : "bg-primary text-white"
                                                }`}
                                            >
                                                {item.type}
                                            </span>

                                        </td>

                                        <td>
                                            {item.date}
                                        </td>

                                        <td>
                                            {item.description}
                                        </td>

                                        {/* <td>

                                            <button
                                                className="btn btn-primary btn-sm"
                                            >
                                                View
                                            </button>

                                        </td> */}

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                    >
                                        No news or events found
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

                    {/* RECORD INFO */}

                    <div className="col-md-6 mb-3 mb-md-0">

                        <span className="text-muted">

                            Showing{" "}

                            {filteredNewsEvents.length > 0
                                ? startIndex + 1
                                : 0}

                            {" "}to{" "}

                            {endIndex}

                            {" "}of{" "}

                            {filteredNewsEvents.length}

                            {" "}entries

                        </span>

                    </div>

                    {/* PAGINATION */}

                    <div className="col-md-6">

                        <nav>

                            <ul className="pagination justify-content-md-end mb-0">

                                {/* PREVIOUS */}

                                <li
                                    className={`page-item ${
                                        currentPage === 1
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
                                        className={`page-item ${
                                            currentPage === page
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
                                    className={`page-item ${
                                        currentPage === totalPages
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

export default StudentSupport;