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
  CCardTitle,
  CCardText,
  CCardBody,
  CBadge,
  CTabPane,
  CImg
} from "@coreui/react";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router-dom";
import ListLesson from "./ListLesson";
import ListLessonSlide from "./ListLessonSlide";
import ListVideo from "./ListVideo";

TabCourseDetail.propTypes = {};

function TabCourseDetail({ course }) {
  const match = useRouteMatch();
  const { params } = match;

  return (
    <div>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              Chi tiết khóa học
            </CCardHeader>
            <CCardBody>
              <CRow className="g-0">
                <CCol md="4">
                  <CImg
                    fluid
                    thumbnail
                    style={{ width: "100%", height: "50%" }}
                    src={course.avatar}
                  ></CImg>
                </CCol>
                <CCol md="8">
                  <CCardBody>
                    <CCardTitle>{course.name}</CCardTitle>
                    <CCardText>{course.description}</CCardText>
                    <CCardText>{course.prerequisites}</CCardText>
                    <CCardText>{course.overview}</CCardText>
                    <CCardText>Level : {course.level}</CCardText>
                  </CCardBody>
                </CCol>
              </CRow>
              <ListLesson lessons={course.lessons}></ListLesson>
              {course.lessons && course.lessons.length > 0 && <ListLessonSlide lessons={course.lessons && course.lessons.map(({ id, title }) => { return { value: id, label: title } })}></ListLessonSlide>}
              {course.lessons && course.lessons.length > 0 && <ListVideo lessons={course.lessons && course.lessons.map(({ id, title }) => { return { value: id, label: title } })}></ListVideo>}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TabCourseDetail;
