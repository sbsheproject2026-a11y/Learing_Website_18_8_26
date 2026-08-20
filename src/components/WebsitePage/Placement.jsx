  import React, { useEffect, useState } from "react";
import { getWebsiteContent } from "./HomeService";
 

function  Placement () {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

     const [placements, setPlacements] = useState([]);
    
        useEffect(() => {
            loadPlacementData();
        }, []);
    
       const loadPlacementData = async () => {
        try {
            const placementData = await getWebsiteContent(15);
     
            setPlacements(placementData.filter(
        (item) => item.is_active === true
    ));
        } catch (error) {
            console.log("Career data error:", error);
        }
    };
    
    
       const newsEvents = placements.map((item) => ({
        id: item.id,
        title: item.name,
       
        date: item.date
            ? item.date.split("-").reverse().join("-")
            : "",
        description: item.description,
    }));

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
                    Placement Opportunities
                    </h5>

                  <h1>Latest Placement Updates</h1>

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

export default  Placement ;