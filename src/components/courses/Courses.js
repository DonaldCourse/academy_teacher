import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth";
import CourseServices from "../../services/CourseServices";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPagination,
} from "@coreui/react";
import ItemCourse from "./ItemCourse";
import _ from "lodash";
import { useHistory } from "react-router";
Courses.propTypes = {};

function Courses(props) {
  const history = useHistory();
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");

  useEffect(() => {
    getAllCourseOfTeacher(page, limit);
  }, [page]);

  const getAllCourseOfTeacher = async (page, limit) => {
    const data = await CourseServices.GetAllCourseOfTeacher(page, limit);
    if (data.status == 200) {
      setCourses(data.data.list);
      setTotalPage(data.data.totalPages);
    }
  };

  const pageChange = newPage => {
    setPage(newPage);
  }


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
            Danh sách khoá học
          </CCardHeader>
          <CCardBody>
            <CRow style={{ marginBottom: 10 }}>
              <CCol
                sm="12"
                className="filter"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <CButton
                  size="sm-3"
                  color="danger"
                  className="action"
                  style={{ marginLeft: "5px" }}
                  onClick={() => history.push("/courses/add")}
                >
                  <span>New Course</span>
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              {courses &&
                courses.map((item, index) => {
                  return (
                    <CCol style={{ marginTop: "12px" }} key={index} xs={6} sm={4} lg={3}>
                      <ItemCourse key={index} defaultValue={item}></ItemCourse>
                    </CCol>
                  );
                })}
            </CRow>

            <CPagination
              className="mt-3"
              activePage={page}
              onActivePageChange={pageChange}
              pages={totalPage}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Courses;
