import React, { useState } from "react";
import swal from "sweetalert";
import PropTypes from "prop-types";
import {
  CCol,
  CForm,
  CRow,
  CInput,
  CLabel,
  CInvalidFeedback,
  CTextarea,
  CSelect,
  CInputFile,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";
import CourseServices from "../../services/CourseServices";
import { useRouteMatch } from "react-router-dom";

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

TabCreateLessonTitle.propTypes = {};

function TabCreateLessonTitle() {
  const [title, setTitle] = useState();
  const match = useRouteMatch();
  const { params } = match;
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      title,
      course_id: params.courseId,
    };

    const res = await CourseServices.CreateLessonTitle(params.courseId, body);
    if (res.status == 201) {
      setLoading(false);
      swal({
        title: "Thành công",
        text: "Tạo bài hoc thành công !",
        icon: "success",
        button: "Đồng ý",
      }).then(value => {
        if (value) {
          window.location.reload();
        }
      });
    } else {
      setLoading(false);
      swal({
        title: "Thất bại",
        text: "Tạo thất bại !",
        icon: "error",
        button: "Đồng ý",
      });
    }
  };

  return (
    <div>
      <div className="backdrop" hidden={!loading}>
        <HashLoader color={color} loading={loading} css={override} size={50} />
      </div>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              Tạo bài học
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={onSubmit}>
                <CRow>
                  <CCol xs="12" md="12">
                    <div className="mb-3">
                      <CLabel htmlFor="exampleFormControlInput1">
                        Tên bài học
                      </CLabel>
                      <CInput
                        placeholder="Tên bài học"
                        name="title"
                        onChange={onChange}
                      />
                    </div>

                    <CRow>
                      <CCol
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <CButton
                          type="submit"
                          size="sm-3"
                          color="primary"
                          className="action"
                        // style={{ marginRight: "10px" }}
                        >
                          <span>Xác nhận</span>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TabCreateLessonTitle;
