import { Route, Routes } from "react-router-dom";
import Layout from "./WebLayout/Layout";
import Home from "./WebsitePage/Home";
import About from "./WebsitePage/About";
import Course from "./WebsitePage/Course";

import Contact from "./WebsitePage/Contact";
 
import CourseDeails from "./WebsitePage/CourseDeails";
import ScrollToTop from "./WebLayout/ScrollToTop";
import News from "./WebsitePage/News";
import Subject from "./WebsitePage/Subject";
import Result from "./WebsitePage/Result";
import Career from "./WebsitePage/Career";
import Placement from "./WebsitePage/Placement";
 




function WebsiteRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="department" element={<Course />} />
          <Route  path="course-details/:slug" element={<CourseDeails />} />
          <Route path="subject-details/:slug" element={<Subject />} />
          <Route path="news-events" element={<News />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="career" element={<Career/>} />
          <Route path="placement" element={<Placement/>} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </>
  );
}

export default WebsiteRoutes;