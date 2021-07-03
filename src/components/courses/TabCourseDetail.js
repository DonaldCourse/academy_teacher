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

TabCourseDetail.propTypes = {};

function TabCourseDetail({ course }) {
  const match = useRouteMatch();
  const { params } = match;

  const htmlDecode = input => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

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
                    style={{ width: "100%" }}
                    src={course.avatar}
                  ></CImg>
                </CCol>
                <CCol md="8">
                  <CCardBody>
                    <CCardTitle>{course.title}</CCardTitle>
                    <CCardText>{course.overview}</CCardText>
                    <div dangerouslySetInnerHTML={{ __html: htmlDecode(course.description) }} />
                    <CCardText>Level : {course.minimum_skill}</CCardText>
                  </CCardBody>
                </CCol>
              </CRow>
              <ListLesson id={course._id}></ListLesson>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TabCourseDetail;
