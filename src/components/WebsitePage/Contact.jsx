import React, { useEffect, useState } from 'react'
import { getWebsiteContent } from './HomeService';

function Contact() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContactData();
    }, []);

    const loadContactData = async () => {
        try {
            const [contactsData] =
                await Promise.all([
                    getWebsiteContent(18),

                ]);

            setContacts(contactsData.filter(
        (item) => item.is_active === true
    ));


        } catch (error) {
            console.log("Page data error:", error);
        }
    };
    return (
        <>





            {/* <!-- Contact Start --> */}
            
          <div className="container-fluid py-5 contact-section">
    <div className="container py-5">

        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center mb-5">

            <h5
                className="text-primary text-uppercase mb-3 contact-subtitle"
            >
                Contact
            </h5>

            <h1 className="contact-heading">
                Contact For Any Query
            </h1>

            <p className="text-muted mt-3 contact-intro">
                Have a question or need more information? Send us a message
                and our team will be happy to assist you.
            </p>

        </div>


        <div className="row g-4 align-items-stretch">

            {/* =========================
                CONTACT FORM
            ========================== */}
            <div className="col-lg-7">

                <div className="contact-card h-100">

                    <div className="contact-card-header">

                        <div className="contact-icon">
                            <i className="fa fa-envelope"></i>
                        </div>

                        <div>
                            <h3 className="mb-1">
                                Send Us a Message
                            </h3>

                            <p className="text-muted mb-0">
                                Fill in the form and we'll get back to you.
                            </p>
                        </div>

                    </div>


                    <form className="contact-form">

                        <div className="row">

                            {/* Name */}
                            <div className="col-md-6 mb-4">

                                <label>
                                    Your Name
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="fa fa-user"></i>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                    />

                                </div>

                            </div>


                            {/* Email */}
                            <div className="col-md-6 mb-4">

                                <label>
                                    Your Email
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="fa fa-envelope"></i>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />

                                </div>

                            </div>


                            {/* Subject */}
                            <div className="col-12 mb-4">

                                <label>
                                    Subject
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="input-wrapper">

                                    <i className="fa fa-tag"></i>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter subject"
                                    />

                                </div>

                            </div>


                            {/* Message */}
                            <div className="col-12 mb-4">

                                <label>
                                    Message
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="input-wrapper textarea-wrapper">

                                    <i className="fa fa-comment"></i>

                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        placeholder="Write your message..."
                                    ></textarea>

                                </div>

                            </div>


                            {/* Button */}
                            <div className="col-12">

                                <button
                                    type="submit"
                                    className="send-message-btn"
                                >
                                    <span>
                                        Send Message
                                    </span>

                                    <i className="fa fa-paper-plane ml-2"></i>
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>


            {/* =========================
                CONTACT INFORMATION
            ========================== */}
            <div className="col-lg-5">

                <div className="contact-info-card h-100">

                    <div className="contact-info-header">

                        <div className="info-main-icon">
                            <i className="fa fa-headphones"></i>
                        </div>

                        <h3>
                            Get In Touch
                        </h3>

                        <p>
                            We're here to help and answer any question
                            you might have.
                        </p>

                    </div>


                    {/* API CONTENT */}

                    <div className="contact-description">

                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    contacts?.[0]?.description || ""
                            }}
                        />

                    </div>


                    {/* Bottom Help Box */}

                    <div className="contact-help-box">

                        <div className="help-icon">
                            <i className="fa fa-comments"></i>
                        </div>

                        <div>
                            <h6>
                                Need Assistance?
                            </h6>

                            <p>
                                Feel free to contact us for any
                                course or admission related query.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    {/* =========================
        CSS
    ========================== */}

    <style>
        {`

        /* =====================================
           MAIN SECTION
        ===================================== */

        .contact-section {
            background: #f8f9fc;
        }

        .contact-subtitle {
            letter-spacing: 5px;
            font-size: 14px;
            font-weight: 700;
        }

        .contact-heading {
            font-weight: 700;
            color: #222;
        }

        .contact-intro {
            max-width: 650px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
        }


        /* =====================================
           FORM CARD
        ===================================== */

        .contact-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 35px;
            border: 1px solid #eeeeee;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.07);
            transition: all 0.3s ease;
        }

        .contact-card:hover {
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.10);
        }


        /* =====================================
           CARD HEADER
        ===================================== */

        .contact-card-header {
            display: flex;
            align-items: center;
            gap: 16px;
            padding-bottom: 25px;
            margin-bottom: 25px;
            border-bottom: 1px solid #eeeeee;
        }

        .contact-card-header h3 {
            font-size: 24px;
            font-weight: 700;
            color: #222;
        }

        .contact-icon {
            width: 55px;
            height: 55px;
            min-width: 55px;
            border-radius: 14px;
            background: rgba(0, 123, 255, 0.10);
            color: #ff6600;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
        }


        /* =====================================
           FORM
        ===================================== */

        .contact-form label {
            display: block;
            color: #333;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 9px;
        }

        .contact-form label .text-danger {
            margin-left: 3px;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper > i {
            position: absolute;
            left: 17px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            z-index: 2;
        }

        .input-wrapper .form-control {
            height: 52px;
            border: 1px solid #e2e2e2;
            border-radius: 9px;
            padding-left: 45px;
            padding-right: 15px;
            font-size: 14px;
            background: #fafafa;
            transition: all 0.25s ease;
            box-shadow: none;
        }

        .input-wrapper .form-control:focus {
            background: #ffffff;
            border-color: #ff6600;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.08);
        }

        .input-wrapper .form-control::placeholder {
            color: #aaa;
        }


        /* =====================================
           TEXTAREA
        ===================================== */

        .textarea-wrapper {
            position: relative;
        }

        .textarea-wrapper > i {
            top: 20px;
            transform: none;
        }

        .textarea-wrapper textarea {
            height: 145px !important;
            resize: vertical;
            padding-top: 15px;
        }


        /* =====================================
           SEND BUTTON
        ===================================== */

        .send-message-btn {
            width: 100%;
            height: 54px;
            border: none;
            border-radius: 9px;
            background: #ff6600;
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .send-message-btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.25);
        }


        /* =====================================
           CONTACT INFO
        ===================================== */

        .contact-info-card {
            position: relative;
            overflow: hidden;
            background: linear-gradient(
                145deg,
                #ff6600,
                #0056b3
            );
            border-radius: 18px;
            padding: 35px;
            color: #ffffff;
            box-shadow: 0 10px 35px rgba(0, 123, 255, 0.20);
        }

        .contact-info-card::before {
            content: "";
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: rgba(255,255,255,0.06);
            top: -70px;
            right: -60px;
        }

        .contact-info-card::after {
            content: "";
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            bottom: -50px;
            left: -50px;
        }


        /* =====================================
           INFO HEADER
        ===================================== */

        .contact-info-header {
            position: relative;
            z-index: 2;
            text-align: center;
            padding-bottom: 25px;
            border-bottom: 1px solid rgba(255,255,255,0.20);
        }

        .info-main-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 18px;
            border-radius: 50%;
            background: rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }

        .contact-info-header h3 {
            color: #ffffff;
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .contact-info-header p {
            color: rgba(255,255,255,0.85);
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 0;
        }


        /* =====================================
           API DESCRIPTION
        ===================================== */

        .contact-description {
            position: relative;
            z-index: 2;
            padding: 25px 5px;
            color: #ffffff;
            line-height: 1.8;
            font-size: 14px;
        }

        .contact-description p {
            color: rgba(255,255,255,0.90);
            margin-bottom: 12px;
        }

        .contact-description a {
            color: #ffffff;
            font-weight: 600;
        }


        /* =====================================
           HELP BOX
        ===================================== */

        .contact-help-box {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 18px;
            border-radius: 12px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.12);
        }

        .help-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 10px;
            background: rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .contact-help-box h6 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 5px;
        }

        .contact-help-box p {
            color: rgba(255,255,255,0.80);
            font-size: 12px;
            line-height: 1.6;
            margin: 0;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 991px) {

            .contact-card,
            .contact-info-card {
                padding: 28px;
            }

            .contact-heading {
                font-size: 32px;
            }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 767px) {

            .contact-section {
                padding-top: 45px !important;
                padding-bottom: 45px !important;
            }

            .contact-section > .container {
                padding-top: 20px !important;
                padding-bottom: 20px !important;
            }

            .contact-heading {
                font-size: 27px;
            }

            .contact-subtitle {
                font-size: 12px;
                letter-spacing: 3px;
            }

            .contact-intro {
                font-size: 13px;
                padding: 0 10px;
            }

            .contact-card,
            .contact-info-card {
                padding: 22px;
                border-radius: 14px;
            }

            .contact-card-header {
                align-items: flex-start;
            }

            .contact-card-header h3 {
                font-size: 20px;
            }

            .contact-card-header p {
                font-size: 12px;
            }

            .contact-icon {
                width: 48px;
                height: 48px;
                min-width: 48px;
                font-size: 18px;
            }

            .contact-form .col-md-6 {
                margin-bottom: 18px !important;
            }

            .input-wrapper .form-control {
                height: 50px;
            }

            .contact-info-header h3 {
                font-size: 22px;
            }

            .contact-description {
                padding: 20px 0;
            }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 480px) {

            .contact-heading {
                font-size: 24px;
            }

            .contact-card,
            .contact-info-card {
                padding: 18px;
            }

            .contact-card-header {
                gap: 12px;
            }

            .contact-card-header h3 {
                font-size: 18px;
            }

            .contact-card-header p {
                font-size: 11px;
            }

            .contact-form label {
                font-size: 13px;
            }

            .send-message-btn {
                height: 50px;
                font-size: 14px;
            }

            .contact-help-box {
                padding: 14px;
            }

        }

        `}
    </style>

</div>


            {/* <!-- Contact End --> */}


        </>
    )
}

export default Contact