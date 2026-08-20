import React, { useState } from "react";

function Result() {
    const [rollNo, setRollNo] = useState("");
    const [dob, setDob] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rollNo || !dob) {
            alert("Please enter Roll Number and Date of Birth");
            return;
        }

        console.log("Roll No:", rollNo);
        console.log("DOB:", dob);

        // Yahan API call karna hai
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">

                {/* Page Heading */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">
                        Student Result Verification
                    </h2>

                    <p className="text-muted mb-0">
                        Verify your examination result using your Roll Number
                        and Date of Birth
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-10">

                        {/* Result Card */}
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                            {/* Card Header */}
                            <div className="bg-primary text-white text-center py-4">
                                <div
                                    className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "32px"
                                    }}
                                >
                                    🎓
                                </div>

                                <h4 className="fw-bold mb-1">
                                    Check Your Result
                                </h4>

                                <p className="mb-0 opacity-75">
                                    Enter your details below
                                </p>
                            </div>

                            {/* Form */}
                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* Roll Number */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Roll Number
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                            <i className="fa fa-user"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Roll Number"
                                                value={rollNo}
                                                onChange={(e) =>
                                                    setRollNo(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Date of Birth
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                              <i className="fa fa-calendar"></i>
                                            </span>

                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dob}
                                                onChange={(e) =>
                                                    setDob(e.target.value)
                                                }
                                            />
                                        </div>

                                        <small className="text-muted">
                                            Enter your date of birth as registered
                                            with the institute.
                                        </small>
                                    </div>

                                    {/* Verify Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                    >
                                        <i className="bi bi-search me-2"></i>
                                        Verify Result
                                    </button>

                                </form>

                                {/* Help Text */}
                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        🔒 Your information is securely verified
                                        with SBSHE records.
                                    </small>
                                </div>

                            </div>
                        </div>

                        {/* Bottom Information */}
                        <div className="text-center mt-4">
                            <p className="text-muted mb-1">
                                Having trouble finding your result?
                            </p>

                            <span className="text-primary fw-semibold">
                                Please contact the institute administration.
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Result;