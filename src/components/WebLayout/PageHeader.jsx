 import React from "react";
import { Link, useLocation } from "react-router-dom";

function PageHeader() {
const location = useLocation();

const pageNames = {
    "/about-us": "About Us",
    "/department": "Department",
    "/news-events": "News & Events",
    "/contact-us": "Contact Us",
    "/student-support": "Student Support",
    "/course-details": "Course Details",
    "/subject-details": "Subject Details",
};

// Dynamic URL ko handle karo
let currentPath = location.pathname;

if (currentPath.startsWith("/course-details/")) {
    currentPath = "/course-details";
}

if (currentPath.startsWith("/subject-details/")) {
    currentPath = "/subject-details";
}

const pageName = pageNames[currentPath] || "Home";

// Home page par PageHeader nahi dikhana
if (location.pathname === "/") {
    return null;
}

  return (
    <>
      {/* Header Start */}

      <div
        className="container-fluid page-header"
        style={{ marginBottom: "90px" }}
      >
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ minHeight: "300px" }}
          >

            <h3 className="display-4 text-white text-uppercase">
              {pageName}
            </h3>

            <div className="d-inline-flex text-white">

              <p className="m-0 text-uppercase">
                <Link className="text-white" to="/">
                  Home
                </Link>
              </p>

              <i className="fa fa-angle-double-right pt-1 px-3 mx-1"></i>
  
              <p className="m-0 text-uppercase">
                 {pageName}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Header End */}
    </>
  );
}

export default PageHeader;