import { Route, Routes } from "react-router-dom";
import Layout from "./WebLayout/Layout";
import Home from "./WebsitePage/Home";
import About from "./WebsitePage/About";
import Course from "./WebsitePage/Course";

import Contact from "./WebsitePage/Contact";
import StudentSupport from "./WebsitePage/StudentSupport";
import CourseDeails from "./WebsitePage/CourseDeails";
import ScrollToTop from "./WebLayout/ScrollToTop";
import News from "./WebsitePage/News";
import Subject from "./WebsitePage/Subject";




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
          <Route path="student-support" element={<StudentSupport />} />
        </Route>
      </Routes>
    </>
  );
}

export default WebsiteRoutes;