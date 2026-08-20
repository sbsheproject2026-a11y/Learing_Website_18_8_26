import React, { useEffect, useState } from "react";
import { getWebsiteContent } from "./HomeService";


function News() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);


    const [news, setNewss] = useState([]);

    useEffect(() => {
        loadNewsData();
    }, []);

    const loadNewsData = async () => {
        try {
            const [data16, data17] = await Promise.all([
                getWebsiteContent(16),
                getWebsiteContent(17),
            ]);

            const combinedData = [
                ...data16,
                ...data17
            ];

            setNewss(combinedData.filter(
                (item) => item.is_active === true
            ));

        } catch (error) {
            console.log("News data error:", error);
        }
    };



    const newsEvents = news.map((item) => ({
        id: item.id,
        title: item.name,
        type: item.menu_name,
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
 <style>{`
    /* =========================
       NEWS PAGE
    ========================= */

    .news-section {
        background: #f8f9fc;
    }

    .news-heading-line {
        width: 45px;
        height: 3px;
        background: #f5a623;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }

    .news-subtitle {
        letter-spacing: 4px;
        font-weight: 600;
    }

    /* =========================
       CONTROL CARD
    ========================= */

    .news-controls {
        background: #ffffff;
        border: 1px solid #edf0f5;
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
    }

    .news-search {
        max-width: 280px;
        position: relative;
    }

    .news-search input {
        border-radius: 8px !important;
        padding-left: 40px;
        height: 42px;
        border: 1px solid #e1e5eb;
    }

    .news-search-icon {
        position: absolute;
        left: 14px;
        top: 12px;
        color: #999;
        z-index: 2;
    }

    .news-record-select {
        width: 80px !important;
        height: 40px;
        border-radius: 7px !important;
        border: 1px solid #e1e5eb;
    }

    /* =========================
       TABLE CARD
    ========================= */

    .news-table-card {
        background: #ffffff;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #edf0f5;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.06);
    }

    .news-table {
        margin-bottom: 0;
    }

    .news-table thead th {
        background: #ff6600;
        color: #ffffff;
        border: none;
        padding: 16px 14px;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
    }

    .news-table tbody td {
        padding: 16px 14px;
        vertical-align: middle;
        color: #555;
        font-size: 14px;
        border-color: #edf0f5;
    }

    .news-table tbody tr {
        transition: all 0.2s ease;
    }

    .news-table tbody tr:hover {
        background: #f8fbff;
    }

    .news-sr {
        width: 70px;
        color: #999 !important;
        font-weight: 600;
    }

    .news-title {
        color: #222 !important;
        font-weight: 600;
        min-width: 180px;
    }

    .news-date {
        white-space: nowrap;
        color: #666 !important;
    }

    .news-description {
        min-width: 320px;
        max-width: 500px;
        line-height: 1.6;
        color: #777 !important;
    }

    /* =========================
       TYPE BADGES
    ========================= */

    .news-type-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
    }

    .news-type-event {
        background: #e7f8ef;
        color: #198754;
    }

    .news-type-news {
        background: #e8f1ff;
        color: #ff6600;
    }

    .blink-badge {
        animation: blinkBadge 1.5s ease-in-out infinite;
    }

    @keyframes blinkBadge {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.55;
        }

        100% {
            opacity: 1;
        }
    }

    /* =========================
       EMPTY STATE
    ========================= */

    .news-empty {
        padding: 50px 20px !important;
        color: #999 !important;
    }

    .news-empty-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #f1f5fa;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        font-size: 25px;
    }

    /* =========================
       PAGINATION
    ========================= */

    .news-pagination-wrapper {
        background: #ffffff;
        border: 1px solid #edf0f5;
        border-radius: 12px;
        padding: 15px 20px;
        margin-top: 20px;
    }

    .news-pagination .page-link {
        border: none;
        margin: 0 3px;
        border-radius: 7px !important;
        color: #555;
        min-width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        transition: all 0.2s ease;
    }

    .news-pagination .page-link:hover {
        background: #eaf2ff;
        color: #ff6600;
    }

    .news-pagination .page-item.active .page-link {
        background: #ff6600;
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(13, 110, 253, 0.25);
    }

    .news-pagination .page-item.disabled .page-link {
        color: #bbb;
        background: #f5f5f5;
    }

    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 767px) {

        .news-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
        }

        .news-section .container {
            padding-left: 15px;
            padding-right: 15px;
        }

        .news-heading {
            font-size: 28px;
        }

        .news-subtitle {
            font-size: 13px;
            letter-spacing: 2px !important;
        }

        .news-controls {
            padding: 15px;
        }

        .news-controls-left {
            margin-bottom: 15px;
        }

        .news-search {
            max-width: 100%;
            width: 100%;
        }

        .news-search input {
            width: 100%;
        }

        .news-table-card {
            border-radius: 10px;
        }

        .news-table thead th {
            padding: 12px 10px;
            font-size: 12px;
        }

        .news-table tbody td {
            padding: 13px 10px;
            font-size: 13px;
        }

        .news-description {
            min-width: 260px;
            max-width: 300px;
        }

        .news-pagination-wrapper {
            padding: 15px;
        }

        .news-pagination {
            margin-top: 15px;
            justify-content: flex-start !important;
            flex-wrap: wrap;
        }

        .news-pagination .page-link {
            min-width: 34px;
            height: 34px;
            font-size: 12px;
            margin: 2px;
        }
    }

    /* =========================
       SMALL MOBILE
    ========================= */

    @media (max-width: 480px) {

        .news-heading {
            font-size: 24px;
        }

        .news-record-text {
            font-size: 13px;
        }

        .news-description {
            min-width: 230px;
        }
    }
`}</style>


{/* =========================
    NEWS & EVENTS SECTION
========================= */}

<div className="container-fluid news-section py-5">

    <div className="container pt-4 pb-4">

        {/* =========================
            HEADING
        ========================== */}

        <div className="text-center mb-5">

            <h5 className="text-primary text-uppercase mb-3 news-subtitle">
                <span className="news-heading-line"></span>
                News & Events
            </h5>

            <h1 className="news-heading mb-0">
                Latest News & Events
            </h1>

            <p className="text-muted mt-3 mb-0">
                Stay updated with our latest announcements, news and events.
            </p>

        </div>


        {/* =========================
            CONTROLS
        ========================== */}

        <div className="news-controls mb-4">

            <div className="row align-items-center">

                {/* SHOW RECORDS */}

                <div className="col-md-6 news-controls-left">

                    <div className="d-flex align-items-center">

                        <span className="text-muted news-record-text mr-2">
                            Show
                        </span>

                        <select
                            className="form-control news-record-select"
                            value={recordsPerPage}
                            onChange={handleRecordsChange}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>

                        <span className="text-muted news-record-text ml-2">
                            entries
                        </span>

                    </div>

                </div>


                {/* SEARCH */}

                <div className="col-md-6">

                    <div className="d-flex justify-content-md-end">

                        <div className="news-search">

                            <i className="fa fa-search news-search-icon"></i>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search news or events..."
                                value={search}
                                onChange={handleSearch}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>


        {/* =========================
            TABLE
        ========================== */}

        <div className="news-table-card">

            <div className="table-responsive">

                <table className="table news-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Title
                            </th>

                            <th>
                                Type
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Description
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {currentNewsEvents?.length > 0 ? (

                            currentNewsEvents.map((item, index) => (

                                <tr key={item.id}>

                                    {/* SR NO */}

                                    <td className="news-sr">
                                        {startIndex + index + 1}
                                    </td>


                                    {/* TITLE */}

                                    <td className="news-title">
                                        {item.title}
                                    </td>


                                    {/* TYPE */}

                                    <td>

                                        <span
                                            className={`
                                                news-type-badge
                                                blink-badge
                                                ${
                                                    item.type === "Event"
                                                        ? "news-type-event"
                                                        : "news-type-news"
                                                }
                                            `}
                                        >

                                            <i
                                                className={
                                                    item.type === "Event"
                                                        ? "fa fa-calendar"
                                                        : "fa fa-newspaper-o"
                                                }
                                            ></i>

                                            {item.type}

                                        </span>

                                    </td>


                                    {/* DATE */}

                                    <td className="news-date">

                                        <i className="fa fa-calendar text-primary mr-2"></i>

                                        {item.date}

                                    </td>


                                    {/* DESCRIPTION */}

                                    <td className="news-description">

                                        {item.description || "—"}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center news-empty"
                                >

                                    <div className="news-empty-icon">
                                        <i className="fa fa-newspaper-o"></i>
                                    </div>

                                    <h6 className="text-dark">
                                        No News or Events Found
                                    </h6>

                                    <small>
                                        Try changing your search keyword.
                                    </small>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>


        {/* =========================
            PAGINATION
        ========================== */}

        <div className="news-pagination-wrapper">

            <div className="row align-items-center">

                {/* RECORD INFO */}

                <div className="col-md-6 mb-3 mb-md-0">

                    <span className="text-muted small">

                        Showing{" "}

                        <strong>
                            {filteredNewsEvents.length > 0
                                ? startIndex + 1
                                : 0}
                        </strong>

                        {" "}to{" "}

                        <strong>
                            {endIndex}
                        </strong>

                        {" "}of{" "}

                        <strong>
                            {filteredNewsEvents.length}
                        </strong>

                        {" "}entries

                    </span>

                </div>


                {/* PAGINATION */}

                <div className="col-md-6">

                    <nav>

                        <ul className="pagination news-pagination justify-content-md-end mb-0">

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
                                    <i className="fa fa-angle-left mr-1"></i>
                                    Prev
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
                                    <i className="fa fa-angle-right ml-1"></i>

                                </button>

                            </li>

                        </ul>

                    </nav>

                </div>

            </div>

        </div>

    </div>

</div>

      
        </>
    );
}

export default News;