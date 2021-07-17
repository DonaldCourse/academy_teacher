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
import TabCreateLesson from "./TabCreateLesson";
import CourseServices from "../../services/CourseServices";
import { useHistory, useRouteMatch } from "react-router-dom";
import swal from 'sweetalert';

CourseDetail.propTypes = {};

function CourseDetail(props) {
  const history = useHistory();
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
  ];

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = async () => {
    try {
      const res = await CourseServices.GetCourseDetailOfTeacher(params.courseId);
      setCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const publishedCourse = async () => {
    const body = {
      is_published: !course.is_published,
    }
    try {
      const res = await CourseServices.ActionPublishCourse(params.courseId, body);
      if (res.status == 200) {
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
            <span>{course && course.is_published ? "Unpublished" : "Published"}</span>
          </CButton>
          <CButton
            onClick={() => history.push(`/courses/${params.courseId}/edit`)}
            type="button"
            size="sm-3"
            color="primary"
            className="action"
            style={{ margin: '12px' }}>
            <span>Chỉnh sửa</span>
          </CButton>
        </CCard>
      </CCol>
      <CCol xs="9" md="9">
        {activeKey === 1 ? <TabCourseDetail course={course} /> : ""}
        {activeKey === 2 ? <TabCreateLesson /> : ""}
      </CCol>
    </CRow>
  );
}

export default CourseDetail;
