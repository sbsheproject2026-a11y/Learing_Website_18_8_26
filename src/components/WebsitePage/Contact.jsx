import React from 'react'

function Contact() {
  return (
    <> 


   


    {/* <!-- Contact Start --> */}
    <div className="container-fluid py-5">
        <div className="container py-5">
            <div className="text-center mb-5">
                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>Contact</h5>
                <h1>Contact For Any Query</h1>
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-8">
                    <div className="bg-secondary rounded p-5">
                        <h4 className="text-center mb-4">Contact Us</h4>
                        <form>
                            <div className="control-group mb-3">
                                <input type="text" className="form-control border-0 p-4" placeholder="Your Name" />
                            </div>
                            <div className="control-group mb-3">
                                <input type="email" className="form-control border-0 p-4" placeholder="Your Email" />
                            </div>
                            <div className="control-group mb-3">
                                <input type="text" className="form-control border-0 p-4" placeholder="Subject" />
                            </div>
                            <div className="control-group mb-3">
                                <textarea className="form-control border-0 py-3 px-4" rows="5" placeholder="Message" ></textarea>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
           
                <div className="col-lg-4">
                    <div className="bg-secondary rounded p-5">
               
                    
                            <div className="control-group mb-3">
                                           <p><i className="fa fa-map-marker-alt mr-2"></i>
                                           New Delhi</p>
                            </div>
                            <div className="control-group mb-3">
                                <p><i className="fa fa-phone-alt mr-2"></i>+91 1122 334455</p>
                            </div>
                            <div className="control-group mb-3">
                                 <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                            </div>
                            <div className="control-group mb-3">
                               
                            </div>
                            <div className="text-center">
                            
                            </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Contact End --> */}


    </>
  )
}

export default Contact