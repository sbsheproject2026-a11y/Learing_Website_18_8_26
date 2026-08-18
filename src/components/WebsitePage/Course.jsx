import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDepartments } from './CourseServiceData';

function Course() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const result = await getDepartments();

            // console.log("Department Data", result);

            setData(result);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>







            {/* <!-- Courses Start --> */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Department</h5>
                        <h1>Our Popular Department</h1>
                    </div>
                    <div className="row">

                         
                        {data.map((item) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                                <div className="rounded overflow-hidden mb-2">

                                    <img
                                        src={item.file}
                                        alt={item.name}
                                        style={{
                                            width: "100%",
                                            height: "220px",
                                            objectFit: "contain",
                                            backgroundColor: "#f5f5f5",
                                            display: "block",
                                        }}
                                    />
                                    <div className="bg-secondary p-4">
                                        <Link
                                            className="h5"
                                            to={`/course-details/${item.slug}`}
                                        >
                                            {item.name}
                                        </Link>

                                        <p style={{ fontSize: "14px" }} className="mt-3 mb-3">
                                            {item.description
                                                ?.split(" ")
                                                .slice(0, 30)
                                                .join(" ")}
                                            {item.description?.split(" ").length > 30 ? "..." : ""}
                                        </p>

                                        <div className="border-top mt-4 pt-4">
                                            <div className="d-flex justify-content-between">

                                                <h6 className="m-0">
                                                    <i className="fa fa-book text-primary mr-2"></i>
                                                    {item.course_count} Courses
                                                </h6>


                                                <Link
                                                    className="btn btn-primary   font-weight-semi-bold mt-2"
                                                    to={`/course-details/${item.slug}`}
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <!-- Courses End --> */}

        </>
    )
}

export default Course