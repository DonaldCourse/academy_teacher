import React, { useEffect, useState } from "react";
import {
  CCard,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CCardHeader,
  CCardBody,
  CTabPane,
  CButton,
} from "@coreui/react";
import PropTypes from "prop-types";
import TabCourseDetail from "./TabCourseDetail";
import TabCreateLessonTitle from "./TabCreateLessonTitle";
import TabCreateLessonSlide from "./TabCreateLessonSlide";
import TabCreateLessonVideo from "./TabCreateLessonVideo";
import CourseServices from "../../services/CourseServices";
import { useRouteMatch } from "react-router-dom";
import swal from 'sweetalert';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const [activeKey, setActiveKey] = useState(1);
  const [course, setCourse] = useState({});
  const { params } = useRouteMatch();
  const styleCNavItem = {
    width: "100%",
  };
  const listMenu = [
    {
      name: " Chi tiết khóa học",
      value: 1,
    },
    {
      name: "Tạo bài học",
      value: 2,
    },
    {
      name: "Tạo Slide bài học",
      value: 3,
    },
    {
      name: "Tạo video bài học",
      value: 4
    },
  ];

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = async () => {
    try {
      const res = await CourseServices.GetCourseDetailOfTeacher(params.courseId);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const publishedCourse = async () => {
    const body = {
      is_published: !course.isPublished,
      courseID: params.courseId
    }
    try {
      const res = await CourseServices.ActionPublishCourse(params.courseId, body);
      if (res.status == 201) {
        window.location.reload();
      } else {
        swal({ title: "Lỗi", text: 'Published khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
      }
    } catch (error) {
      swal({ title: "Lỗi", text: 'Published khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
    }
  }

  return (
    <CRow>
      <CCol xs="3" md="3">
        <CCard>
          <CNav variant="pills">
            {listMenu.map((item) => {
              return (
                <CNavItem style={styleCNavItem}>
                  <CNavLink
                    href="#"
                    active={activeKey === item.value}
                    onClick={() => setActiveKey(item.value)}
                  >
                    {item.name}
                  </CNavLink>
                </CNavItem>
              );
            })}
          </CNav>
          <CButton
            onClick={() => publishedCourse()}
            type="button"
            size="sm-3"
            color="primary"
            className="action"
            style={{ margin: '12px' }}>
            <span>{course && course.isPublished ? "Unpublished" : "Published"}</span>
          </CButton>
        </CCard>
      </CCol>
      <CCol xs="9" md="9">
        {activeKey === 1 ? <TabCourseDetail course={course} /> : ""}
        {activeKey === 2 ? <TabCreateLessonTitle /> : ""}
        {activeKey === 3 ? <TabCreateLessonSlide /> : ""}
        {activeKey === 4 ? <TabCreateLessonVideo /> : ""}

      </CCol>
    </CRow>
  );
}

export default CourseDetail;
