import React, { useEffect, useState } from "react";
import { getWebsiteContent } from "./HomeService";


function Career() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        loadCareerData();
    }, []);

    const loadCareerData = async () => {
        try {
            const careerData = await getWebsiteContent(14);

            console.log("Career Data:", careerData);

            setCareers(careerData.filter(
                (item) => item.is_active === true
            ));
        } catch (error) {
            console.log("Career data error:", error);
        }
    };


    const newsEvents = careers.map((item) => ({
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



            <div className="container-fluid py-5 career-section">
    <div className="container pt-4 pb-4">

        {/* =========================
            HEADER
        ========================== */}
        <div className="text-center mb-5">
            <div className="career-label">
                <span></span>
                Career Opportunities
                <span></span>
            </div>

            <h1 className="career-heading">
                Latest Career Updates
            </h1>

            <p className="career-subtitle">
                Explore the latest job opportunities, career updates and
                professional openings.
            </p>
        </div>


        {/* =========================
            SEARCH + RECORDS
        ========================== */}
        <div className="career-toolbar">

            <div className="career-records">
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


            <div className="career-search">
                <i className="fa fa-search"></i>

                <input
                    type="text"
                    placeholder="Search career updates..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

        </div>


        {/* =========================
            CAREER LIST
        ========================== */}
        <div className="career-list">

            {currentNewsEvents.length > 0 ? (

                currentNewsEvents.map((item, index) => (

                    <div
                        className="career-card"
                        key={item.id}
                    >

                        {/* DATE BOX */}
                        <div className="career-date">

                            <i className="fa fa-briefcase"></i>

                            <span>
                                {item.date}
                            </span>

                        </div>


                        {/* CONTENT */}
                        <div className="career-content">

                            <div className="career-title-row">

                                <h4>
                                    {item.title}
                                </h4>

                                <span className="career-badge">
                                    Career
                                </span>

                            </div>


                            <p>
                                {item.description}
                            </p>


                            <div className="career-meta">

                                <span>
                                    <i className="fa fa-calendar mr-2"></i>
                                    {item.date}
                                </span>

                                <span>
                                    <i className="fa fa-arrow-right mr-2"></i>
                                    Career Opportunity
                                </span>

                            </div>

                        </div>

                    </div>

                ))

            ) : (

                <div className="career-empty">

                    <div className="career-empty-icon">
                        <i className="fa fa-briefcase"></i>
                    </div>

                    <h4>
                        No Career Updates Found
                    </h4>

                    <p>
                        There are currently no career opportunities matching
                        your search.
                    </p>

                </div>

            )}

        </div>


        {/* =========================
            FOOTER / PAGINATION
        ========================== */}
        <div className="career-pagination-wrapper">

            {/* RECORD INFO */}
            <div className="career-info">

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

                <ul className="pagination career-pagination mb-0">

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

        /* =========================
           MAIN
        ========================== */

        .career-section {
            background: #f8f9fc;
        }


        /* =========================
           HEADER
        ========================== */

        .career-label {
            color: #ff6600;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 12px;
        }

        .career-label span {
            width: 28px;
            height: 3px;
            background: #ff6600;
            border-radius: 10px;
        }

        .career-heading {
            font-size: 38px;
            font-weight: 700;
            color: #202124;
            margin-bottom: 12px;
        }

        .career-subtitle {
            max-width: 650px;
            margin: auto;
            color: #777;
            font-size: 15px;
            line-height: 1.7;
        }


        /* =========================
           TOOLBAR
        ========================== */

        .career-toolbar {
            background: #fff;
            padding: 18px 22px;
            border-radius: 12px;
            box-shadow: 0 4px 18px rgba(0,0,0,.06);

            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 25px;
        }

        .career-records {
            display: flex;
            align-items: center;
            gap: 10px;

            color: #555;
            font-size: 14px;
        }

        .career-records select {
            width: 85px;
            height: 38px;
            border-radius: 6px;
            border: 1px solid #ddd;
            font-size: 14px;
        }


        /* =========================
           SEARCH
        ========================== */

        .career-search {
            width: 300px;
            height: 42px;

            position: relative;
        }

        .career-search i {
            position: absolute;
            left: 14px;
            top: 13px;
            color: #999;
        }

        .career-search input {
            width: 100%;
            height: 100%;

            border: 1px solid #e2e2e2;
            border-radius: 8px;

            padding: 0 15px 0 40px;

            outline: none;
            font-size: 14px;

            transition: .3s;
        }

        .career-search input:focus {
            border-color: #ff6600;
            box-shadow: 0 0 0 3px rgba(255,102,0,.08);
        }


        /* =========================
           CAREER CARD
        ========================== */

        .career-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .career-card {
            background: #fff;
            border-radius: 12px;

            padding: 20px;

            display: flex;
            align-items: stretch;

            border: 1px solid #eee;

            box-shadow: 0 4px 15px rgba(0,0,0,.04);

            transition: all .3s ease;
        }

        .career-card:hover {
            transform: translateY(-3px);

            box-shadow: 0 10px 30px rgba(0,0,0,.09);

            border-color: rgba(255,102,0,.25);
        }


        /* =========================
           DATE
        ========================== */

        .career-date {
            min-width: 120px;

            background: linear-gradient(
                135deg,
                #ff6600,
                #ff8533
            );

            border-radius: 10px;

            color: #fff;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            padding: 15px;
        }

        .career-date i {
            font-size: 25px;
            margin-bottom: 8px;
        }

        .career-date span {
            font-size: 12px;
            font-weight: 600;
            text-align: center;
        }


        /* =========================
           CONTENT
        ========================== */

        .career-content {
            flex: 1;
            padding-left: 22px;
            min-width: 0;
        }

        .career-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 15px;
            margin-bottom: 8px;
        }

        .career-title-row h4 {
            margin: 0;

            color: #222;

            font-size: 19px;
            font-weight: 700;

            line-height: 1.4;
        }

        .career-badge {
            flex-shrink: 0;

            background: #fff1e8;
            color: #ff6600;

            padding: 5px 12px;

            border-radius: 20px;

            font-size: 11px;
            font-weight: 600;
        }

        .career-content p {
            color: #777;

            font-size: 14px;
            line-height: 1.7;

            margin: 8px 0 15px;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            overflow: hidden;
        }


        /* =========================
           META
        ========================== */

        .career-meta {
            display: flex;
            align-items: center;
            gap: 25px;

            color: #999;

            font-size: 12px;
        }

        .career-meta i {
            color: #ff6600;
        }


        /* =========================
           EMPTY
        ========================== */

        .career-empty {
            background: #fff;

            border-radius: 12px;

            text-align: center;

            padding: 60px 20px;

            border: 1px solid #eee;
        }

        .career-empty-icon {
            width: 70px;
            height: 70px;

            margin: auto auto 15px;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #fff1e8;
            color: #ff6600;

            font-size: 28px;
        }

        .career-empty h4 {
            color: #333;
            font-weight: 600;
        }

        .career-empty p {
            color: #888;
            margin-bottom: 0;
        }


        /* =========================
           PAGINATION
        ========================== */

        .career-pagination-wrapper {
            margin-top: 25px;

            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .career-info {
            color: #777;
            font-size: 13px;
        }

        .career-info strong {
            color: #333;
        }

        .career-pagination {
            gap: 5px;
        }

        .career-pagination .page-link {
            border: 1px solid #e5e5e5;

            color: #555;

            background: #fff;

            border-radius: 6px !important;

            min-width: 38px;
            height: 38px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 13px;

            transition: .2s;
        }

        .career-pagination .page-link:hover {
            background: #fff1e8;
            color: #ff6600;
            border-color: #ff6600;
        }

        .career-pagination .active .page-link {
            background: #ff6600;
            border-color: #ff6600;
            color: #fff;
        }


        /* =========================
           TABLET
        ========================== */

        @media (max-width: 991px) {

            .career-heading {
                font-size: 32px;
            }

            .career-toolbar {
                padding: 15px;
            }

            .career-card {
                padding: 16px;
            }

            .career-date {
                min-width: 105px;
            }

        }


        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 767px) {

            .career-section {
                padding-top: 35px !important;
                padding-bottom: 35px !important;
            }

            .career-heading {
                font-size: 27px;
            }

            .career-label {
                font-size: 11px;
                letter-spacing: 2px;
            }

            .career-label span {
                width: 18px;
            }

            .career-subtitle {
                font-size: 13px;
            }


            /* Toolbar */

            .career-toolbar {
                flex-direction: column;
                align-items: stretch;

                gap: 15px;
            }

            .career-records {
                justify-content: center;
            }

            .career-search {
                width: 100%;
            }


            /* Card */

            .career-card {
                flex-direction: column;
                padding: 15px;
            }

            .career-date {
                width: 100%;
                min-width: 0;

                flex-direction: row;

                gap: 10px;

                padding: 11px;
            }

            .career-date i {
                font-size: 18px;
                margin-bottom: 0;
            }

            .career-content {
                padding-left: 0;
                padding-top: 15px;
            }

            .career-title-row {
                align-items: flex-start;
            }

            .career-title-row h4 {
                font-size: 16px;
            }

            .career-badge {
                font-size: 10px;
                padding: 4px 9px;
            }

            .career-content p {
                font-size: 13px;
            }

            .career-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 7px;
            }


            /* Pagination */

            .career-pagination-wrapper {
                flex-direction: column;
                align-items: center;

                gap: 15px;
            }

            .career-info {
                text-align: center;
            }

            .career-pagination {
                flex-wrap: wrap;
                justify-content: center;
            }

        }


        /* =========================
           SMALL MOBILE
        ========================== */

        @media (max-width: 480px) {

            .career-heading {
                font-size: 24px;
            }

            .career-title-row {
                display: block;
            }

            .career-badge {
                display: inline-block;
                margin-top: 8px;
            }

            .career-pagination .page-link {
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

export default Career;