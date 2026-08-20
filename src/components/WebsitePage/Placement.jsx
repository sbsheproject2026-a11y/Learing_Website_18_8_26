import React, { useEffect, useState } from "react";
import { getWebsiteContent } from "./HomeService";


function Placement() {
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

<div className="container-fluid py-5 placement-section">
    <div className="container pt-4 pb-4">

        {/* =========================
            HEADER
        ========================== */}
        <div className="text-center mb-5">

            <div className="placement-label">
                <span></span>
                Placement Opportunities
                <span></span>
            </div>

            <h1 className="placement-heading">
                Latest Placement Updates
            </h1>

            <p className="placement-subtitle">
                Discover the latest placement opportunities and career
                openings to take the next step in your professional journey.
            </p>

        </div>


        {/* =========================
            TOOLBAR
        ========================== */}
        <div className="placement-toolbar">

            {/* SHOW RECORDS */}
            <div className="placement-records">

                <span>Show</span>

                <select
                    className="form-select"
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
            <div className="placement-search">

                <i className="fa fa-search"></i>

                <input
                    type="text"
                    placeholder="Search placements..."
                    value={search}
                    onChange={handleSearch}
                />

            </div>

        </div>


        {/* =========================
            PLACEMENT LIST
        ========================== */}
        <div className="placement-list">

            {currentNewsEvents.length > 0 ? (

                currentNewsEvents.map((item, index) => (

                    <div
                        className="placement-card"
                        key={item.id}
                    >

                        {/* =========================
                            LEFT ICON
                        ========================== */}
                        <div className="placement-icon-wrapper">

                            <div className="placement-icon">
                                <i className="fa fa-building"></i>
                            </div>

                            <span className="placement-number">
                                {String(
                                    startIndex + index + 1
                                ).padStart(2, "0")}
                            </span>

                        </div>


                        {/* =========================
                            CONTENT
                        ========================== */}
                        <div className="placement-content">

                            <div className="placement-title-row">

                                <h4>
                                    {item.title}
                                </h4>

                                <span className="placement-badge">
                                    <i className="fa fa-check-circle mr-1"></i>
                                    Placement
                                </span>

                            </div>


                            <p className="placement-description">
                                {item.description}
                            </p>


                            <div className="placement-meta">

                                <span>
                                    <i className="fa fa-calendar mr-2"></i>
                                    {item.date}
                                </span>

                                <span>
                                    <i className="fa fa-briefcase mr-2"></i>
                                    Placement Opportunity
                                </span>

                            </div>

                        </div>


                        {/* =========================
                            DATE / ARROW
                        ========================== */}
                        <div className="placement-action">

                            <div className="placement-date">
                                <small>DATE</small>
                                <strong>
                                    {item.date}
                                </strong>
                            </div>

                            <div className="placement-arrow">
                                <i className="fa fa-arrow-right"></i>
                            </div>

                        </div>

                    </div>

                ))

            ) : (

                /* =========================
                    EMPTY
                ========================== */
                <div className="placement-empty">

                    <div className="placement-empty-icon">
                        <i className="fa fa-building"></i>
                    </div>

                    <h4>
                        No Placement Updates Found
                    </h4>

                    <p>
                        There are currently no placement opportunities
                        matching your search.
                    </p>

                </div>

            )}

        </div>


        {/* =========================
            PAGINATION
        ========================== */}
        <div className="placement-pagination-wrapper">

            {/* RECORD INFO */}
            <div className="placement-info">

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

            </div>


            {/* PAGINATION */}
            <nav>

                <ul className="pagination placement-pagination mb-0">

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
                            <i className="fa fa-angle-right ml-1"></i>
                        </button>

                    </li>

                </ul>

            </nav>

        </div>

    </div>


    {/* =========================
        CSS
    ========================== */}
    <style>
        {`

        /* =====================================
           MAIN
        ===================================== */

        .placement-section {
            background: #f8f9fc;
        }


        /* =====================================
           HEADER
        ===================================== */

        .placement-label {
            display: flex;
            justify-content: center;
            align-items: center;

            gap: 12px;

            color: #ff6600;

            font-size: 14px;
            font-weight: 700;

            letter-spacing: 4px;
            text-transform: uppercase;

            margin-bottom: 12px;
        }

        .placement-label span {
            width: 28px;
            height: 3px;

            background: #ff6600;

            border-radius: 10px;
        }

        .placement-heading {
            color: #202124;

            font-size: 38px;
            font-weight: 700;

            margin-bottom: 12px;
        }

        .placement-subtitle {
            max-width: 680px;

            margin: auto;

            color: #777;

            font-size: 15px;
            line-height: 1.7;
        }


        /* =====================================
           TOOLBAR
        ===================================== */

        .placement-toolbar {
            background: #fff;

            padding: 18px 22px;

            border-radius: 12px;

            box-shadow: 0 4px 18px rgba(0, 0, 0, .06);

            display: flex;

            justify-content: space-between;
            align-items: center;

            margin-bottom: 25px;
        }


        .placement-records {
            display: flex;

            align-items: center;

            gap: 10px;

            color: #555;

            font-size: 14px;
        }

        .placement-records select {
            width: 85px;

            height: 38px;

            border-radius: 6px;

            border: 1px solid #ddd;

            font-size: 14px;
        }


        /* =====================================
           SEARCH
        ===================================== */

        .placement-search {
            position: relative;

            width: 300px;

            height: 42px;
        }

        .placement-search i {
            position: absolute;

            left: 14px;
            top: 13px;

            color: #999;
        }

        .placement-search input {
            width: 100%;
            height: 100%;

            border: 1px solid #e2e2e2;

            border-radius: 8px;

            padding: 0 15px 0 40px;

            outline: none;

            font-size: 14px;

            transition: .3s;
        }

        .placement-search input:focus {
            border-color: #ff6600;

            box-shadow:
                0 0 0 3px
                rgba(255, 102, 0, .08);
        }


        /* =====================================
           LIST
        ===================================== */

        .placement-list {
            display: flex;

            flex-direction: column;

            gap: 16px;
        }


        /* =====================================
           CARD
        ===================================== */

        .placement-card {
            position: relative;

            background: #fff;

            border: 1px solid #eee;

            border-radius: 14px;

            padding: 20px;

            display: flex;

            align-items: center;

            gap: 20px;

            box-shadow:
                0 4px 15px
                rgba(0, 0, 0, .04);

            transition: all .3s ease;

            overflow: hidden;
        }

        .placement-card::before {
            content: "";

            position: absolute;

            left: 0;
            top: 0;
            bottom: 0;

            width: 4px;

            background: #ff6600;

            transform: scaleY(0);

            transition: .3s;
        }

        .placement-card:hover {
            transform: translateY(-4px);

            border-color:
                rgba(255, 102, 0, .25);

            box-shadow:
                0 12px 30px
                rgba(0, 0, 0, .09);
        }

        .placement-card:hover::before {
            transform: scaleY(1);
        }


        /* =====================================
           ICON
        ===================================== */

        .placement-icon-wrapper {
            position: relative;

            flex-shrink: 0;

            width: 75px;

            text-align: center;
        }

        .placement-icon {
            width: 65px;
            height: 65px;

            margin: auto;

            border-radius: 14px;

            background:
                linear-gradient(
                    135deg,
                    #fff1e8,
                    #ffe3d1
                );

            color: #ff6600;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 25px;
        }

        .placement-number {
            position: absolute;

            bottom: -7px;
            right: -2px;

            width: 25px;
            height: 25px;

            border-radius: 50%;

            background: #ff6600;

            color: #fff;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 10px;

            font-weight: 700;

            border: 3px solid #fff;
        }


        /* =====================================
           CONTENT
        ===================================== */

        .placement-content {
            flex: 1;

            min-width: 0;
        }

        .placement-title-row {
            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            margin-bottom: 8px;
        }

        .placement-title-row h4 {
            margin: 0;

            color: #222;

            font-size: 19px;

            font-weight: 700;

            line-height: 1.4;
        }


        /* =====================================
           BADGE
        ===================================== */

        .placement-badge {
            flex-shrink: 0;

            background: #eaf8f0;

            color: #159957;

            padding: 5px 12px;

            border-radius: 20px;

            font-size: 11px;

            font-weight: 600;
        }


        /* =====================================
           DESCRIPTION
        ===================================== */

        .placement-description {
            color: #777;

            font-size: 14px;

            line-height: 1.7;

            margin: 8px 0 13px;

            display: -webkit-box;

            -webkit-line-clamp: 2;

            -webkit-box-orient: vertical;

            overflow: hidden;
        }


        /* =====================================
           META
        ===================================== */

        .placement-meta {
            display: flex;

            align-items: center;

            gap: 25px;

            color: #999;

            font-size: 12px;
        }

        .placement-meta i {
            color: #ff6600;
        }


        /* =====================================
           RIGHT SIDE
        ===================================== */

        .placement-action {
            min-width: 125px;

            border-left: 1px solid #eee;

            padding-left: 20px;

            display: flex;

            align-items: center;

            gap: 15px;
        }

        .placement-date {
            display: flex;

            flex-direction: column;

            gap: 3px;
        }

        .placement-date small {
            color: #aaa;

            font-size: 9px;

            letter-spacing: 1px;

            font-weight: 700;
        }

        .placement-date strong {
            color: #333;

            font-size: 12px;

            white-space: nowrap;
        }


        .placement-arrow {
            width: 34px;
            height: 34px;

            border-radius: 50%;

            background: #fff1e8;

            color: #ff6600;

            display: flex;

            align-items: center;
            justify-content: center;

            transition: .3s;
        }

        .placement-card:hover .placement-arrow {
            background: #ff6600;

            color: #fff;

            transform: translateX(3px);
        }


        /* =====================================
           EMPTY
        ===================================== */

        .placement-empty {
            background: #fff;

            border: 1px solid #eee;

            border-radius: 14px;

            text-align: center;

            padding: 60px 20px;
        }

        .placement-empty-icon {
            width: 70px;
            height: 70px;

            margin: auto auto 15px;

            border-radius: 50%;

            background: #fff1e8;

            color: #ff6600;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 28px;
        }

        .placement-empty h4 {
            color: #333;

            font-weight: 600;
        }

        .placement-empty p {
            color: #888;

            margin: 0;
        }


        /* =====================================
           PAGINATION
        ===================================== */

        .placement-pagination-wrapper {
            margin-top: 25px;

            display: flex;

            justify-content: space-between;

            align-items: center;
        }

        .placement-info {
            color: #777;

            font-size: 13px;
        }

        .placement-info strong {
            color: #333;
        }


        .placement-pagination {
            gap: 5px;
        }

        .placement-pagination .page-link {
            min-width: 38px;

            height: 38px;

            border: 1px solid #e5e5e5;

            background: #fff;

            color: #555;

            border-radius: 6px !important;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 13px;

            transition: .2s;
        }

        .placement-pagination
        .page-link:hover {
            background: #fff1e8;

            border-color: #ff6600;

            color: #ff6600;
        }

        .placement-pagination
        .active .page-link {
            background: #ff6600;

            border-color: #ff6600;

            color: #fff;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 991px) {

            .placement-heading {
                font-size: 32px;
            }

            .placement-toolbar {
                padding: 15px;
            }

            .placement-card {
                padding: 17px;
            }

            .placement-action {
                min-width: 105px;

                padding-left: 15px;
            }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 767px) {

            .placement-section {
                padding-top: 35px !important;

                padding-bottom: 35px !important;
            }

            .placement-heading {
                font-size: 27px;
            }

            .placement-label {
                font-size: 11px;

                letter-spacing: 2px;
            }

            .placement-label span {
                width: 18px;
            }

            .placement-subtitle {
                font-size: 13px;
            }


            /* Toolbar */

            .placement-toolbar {
                flex-direction: column;

                align-items: stretch;

                gap: 15px;
            }

            .placement-records {
                justify-content: center;
            }

            .placement-search {
                width: 100%;
            }


            /* Card */

            .placement-card {
                flex-direction: column;

                align-items: stretch;

                gap: 15px;

                padding: 15px;
            }


            .placement-icon-wrapper {
                width: 100%;
            }

            .placement-icon {
                width: 58px;
                height: 58px;

                font-size: 22px;
            }

            .placement-number {
                right: calc(50% - 38px);
            }


            .placement-content {
                padding: 0;
            }


            .placement-title-row {
                align-items: flex-start;
            }

            .placement-title-row h4 {
                font-size: 16px;
            }

            .placement-badge {
                font-size: 10px;

                padding: 4px 9px;
            }


            .placement-description {
                font-size: 13px;
            }


            .placement-meta {
                flex-direction: column;

                align-items: flex-start;

                gap: 7px;
            }


            /* Right section */

            .placement-action {
                width: 100%;

                border-left: 0;

                border-top: 1px solid #eee;

                padding-left: 0;

                padding-top: 12px;

                justify-content: space-between;
            }


            /* Pagination */

            .placement-pagination-wrapper {
                flex-direction: column;

                gap: 15px;
            }

            .placement-info {
                text-align: center;
            }

            .placement-pagination {
                flex-wrap: wrap;

                justify-content: center;
            }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 480px) {

            .placement-heading {
                font-size: 24px;
            }

            .placement-title-row {
                display: block;
            }

            .placement-badge {
                display: inline-block;

                margin-top: 8px;
            }

            .placement-pagination .page-link {
                min-width: 34px;

                height: 34px;

                font-size: 12px;
            }

        }

        `}
    </style>
</div>


          

        </>
    );
}

export default Placement;