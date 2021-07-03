import React, { useEffect, useRef, useState } from "react";
import PropTypes, { number } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { get, pick, startsWith, toInteger, toNumber } from "lodash";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CRow,
  CInput,
  CLabel,
  CInvalidFeedback,
  CTextarea,
  CSelect,
  CInputFile,
  CButton,
  CCardFooter,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CCardText,
  CTabs,
  CModal,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";
import lodash from "lodash";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import UploadFileCDNService from "../../services/UploadFileCDNService";
import CourseServices from "../../services/CourseServices";
import CurriculumService from "../../services/CurriculumService";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router";
import * as SC from "./style";
UpdateProfile.propTypes = {};

function UpdateProfile(props) {
  const history = useHistory();
  const { auth } = useAuth();
  const { register, errors, control, handleSubmit, reset } = useForm({});

  return (
    <CModal>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              Quản lý tài khoản
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CLabel htmlFor="exampleFormControlInput1">
                        Tên khoá học
                      </CLabel>
                      <Controller
                        control={control}
                        id="name"
                        name="name"
                        rules={{ required: "Vui lòng nhập tên khoá học !" }}
                        render={({ onChange, value }) => (
                          <CInput
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            invalid={!!errors.name}
                          />
                        )}
                      />
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.name`, "")}
                      </CInvalidFeedback>
                    </div>

                    <div className="mb-3">
                      <CLabel htmlFor="select">Thuộc danh mục</CLabel>
                      <Controller
                        control={control}
                        id="curriculums"
                        name="curriculums"
                        rules={{ required: true }}
                        render={(props) => (
                          <CSelect
                            {...props}
                            value={props.value}
                            onChange={(e) => {
                              props.onChange(e.target.value);
                            }}
                            invalid={!!errors.curriculums}
                          >
                            eqwewqeqweweq
                          </CSelect>
                        )}
                      ></Controller>
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.curriculums`, "")}
                      </CInvalidFeedback>
                    </div>

                    <div className="mb-3">
                      <CLabel htmlFor="select">Chọn level khoá học</CLabel>
                      <Controller
                        control={control}
                        id="level"
                        name="level"
                        as={CSelect}
                        defaultValue={0}
                      >
                        <option value={0}>any_level</option>
                        <option value={1}>beginner</option>
                        <option value={2}>intermediate</option>
                        <option value={3}>advance</option>
                      </Controller>
                    </div>

                    <div className="mb-3">
                      <CLabel htmlFor="exampleFormControlInput1">Mô tả</CLabel>
                      <Controller
                        control={control}
                        id="description"
                        name="description"
                        render={({ onChange, value }) => (
                          <CTextarea
                            rows="5"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            invalid={!!errors.description}
                          />
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <CLabel htmlFor="select">Điều kiện tiên quyết</CLabel>
                      <Controller
                        control={control}
                        id="prerequisites"
                        name="prerequisites"
                        render={({ onChange, value }) => (
                          <CTextarea
                            rows="5"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            invalid={!!errors.prerequisites}
                          />
                        )}
                      />
                    </div>

                    <div className="mb-3" row>
                      <CLabel htmlFor="select">Đặt ảnh đại diện</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: "Vui lòng thêm tệp dữ liệu" }}
                        name="file"
                        render={({ onChange, value }) => (
                          <React.Fragment>
                            <CCol xs="12">
                              <CInputFile
                                onChange={(e) => {
                                  onChange(e.target.files[0]);
                                }}
                                custom
                                id="custom-file-input"
                              />
                              <CLabel
                                htmlFor="custom-file-input"
                                variant="custom-file"
                              >
                                {value ? value.name : "Tải ảnh"}
                              </CLabel>
                            </CCol>
                          </React.Fragment>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <CLabel htmlFor="exampleFormControlInput1">
                        Tổng quan
                      </CLabel>
                      <Controller
                        control={control}
                        id="overview"
                        name="overview"
                        render={({ onChange, value }) => (
                          <CTextarea
                            rows="50"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            invalid={!!errors.description}
                          />
                        )}
                      />
                    </div>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>

            <CCardFooter style={{ textAlign: "right" }}>
              <CButton
                type="submit"
                //   onClick={handleSubmit(onSubmit)}
                size="sm"
                color="primary"
              >
                <CIcon name="cil-scrubber" />
                Đăng ký
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CModal>
  );
}

export default UpdateProfile;
