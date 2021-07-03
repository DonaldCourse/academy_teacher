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
  CMedia,
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
import AuthServices from "../../services/AuthServices";
import UpdateProfile from "./updateProfile";
Profile.propTypes = {};

function Profile(props) {
  const history = useHistory();
  const { auth } = useAuth();
  const { register, errors, control, handleSubmit, reset } = useForm({});
  const [tutor, setTutor] = useState({});
  const [isOpen, setOpen] = useState(false);

  useEffect(async () => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await AuthServices.getProfileTutor();
      console.log(res);
      if (res.status == 200) {
        setTutor(res.data.data);
      }
    } catch (error) {

    }
  }

  const onSubmit = (data, e) => {
    const info = pick(data, [
      "lastName",
      "experience",
      "education",
      "introduction",
      "interest",
      "professionalBackground",
      "avatar",
      "introVideo",
    ]);
    const body = {
      firstName: "",
      lastName: info.lastName ? info.lastName : tutor.name,
      experience: info.experience ? info.experience : tutor.experience,
      education: info.education ? info.education : tutor.education,
      introduction: info.introduction ? info.introduction : tutor.introduction,
      interest: info.interest ? info.interest : tutor.interest,
      professionalBackground: info.professionalBackground
        ? info.professionalBackground
        : tutor.professionalBackground,
    };
    reset();
    // console.log(body);
    updateProfile(body, info.avatar, info.introVideo);
  };

  const updateProfile = async (body, avatar, video) => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append("files", avatar);
    formData2.append("files", video);
    setOpen(false);
    try {
      if (avatar) {
        const result1 = await UploadFileCDNService.UploadFile(formData1);
        if (result1.status == 201) {
          body.avatar = result1.data[0].url;
        } else {
          body.avatar = "";
        }
      } else {
        // body.avatar = "";
      }
      if (video) {
        const result2 = await UploadFileCDNService.UploadFile(formData2);
        if (result2.status == 201) {
          body.introVideo = result2.data[0].url;
        } else {
          body.introVideo = "";
        }
      } else {
        // body.introVideo = "";
      }

      const data = await AuthServices.UpdateProfileTutor(body);

      if (data.status == 200) {
        swal({
          title: "Thành công",
          text: "Tạo khoá học thành công !",
          icon: "success",
          button: "Đồng ý",
        });
        window.location.reload();
      } else {
        swal({
          title: "Lỗi",
          text: "Tạo khoá học thất bại !",
          icon: "error",
          button: "Đồng ý",
        });
      }
    } catch (error) {
      swal({
        title: "Lỗi",
        text: "Tạo khoá học thất bại !",
        icon: "error",
        button: "Đồng ý",
      });
    }
  };

  return (
    <>
      <CRow style={{ display: "flex", justifyContent: "center" }}>
        <CCol xs="12" md="8">
          <UpdateProfile
            tutor={tutor}
            open={isOpen}
            close={() => setOpen(false)}
          />
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              Quản lý tài khoản
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ width: "30%" }} class="text-md-left">
                    Họ và tên:{" "}
                  </p>
                  <p style={{ width: "70%" }} class="text-md-left">
                    {tutor.name}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ width: "30%" }} class="text-md-left">
                    Email:{" "}
                  </p>
                  <p style={{ width: "70%" }} class="text-md-left">
                    {tutor.email}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ width: "30%" }} class="text-md-left">
                    Tốt nghiệp:{" "}
                  </p>
                  <p style={{ width: "70%" }} class="text-md-left">
                    {tutor.education}
                  </p>
                </div>{" "}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p style={{ width: "30%" }} class="text-md-left">
                    Kinh nghiệm:{" "}
                  </p>
                  <p style={{ width: "70%" }} class="text-md-left">
                    {tutor.professional_background}
                  </p>
                </div>
              </div>
            </CCardBody>

            <CCardFooter style={{ textAlign: "right" }}>
              <CButton onClick={() => setOpen(true)} size="sm" color="primary">
                <CIcon name="cil-scrubber" />
                Cập nhật
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {/* ///////////////////////////////////
      //////////////////////
      //////////////////////////// */}
      {isOpen ? (
        <CModal show={isOpen} closeOnBackdrop={false}>
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
                  Cập nhật
                </CCardHeader>
                <CCardBody>
                  <CForm
                    // action=""
                    // method="post"
                    // encType="multipart/form-data"
                    className="form-horizontal"
                  >
                    <CRow>
                      <CCol>
                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Họ và tên
                          </CLabel>
                          <Controller
                            control={control}
                            id="lastName"
                            name="lastName"
                            // rules={{ required: "Vui lòng nhập tên của ban !" }}
                            render={({ onChange, value }) => (
                              <CInput
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.name}
                                invalid={!!errors.name}
                              />
                            )}
                          />
                          <CInvalidFeedback className="help-block">
                            {get(errors, `name.name`, "")}
                          </CInvalidFeedback>
                        </div>

                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Kinh nghiệm
                          </CLabel>
                          <Controller
                            control={control}
                            id="experience"
                            name="experience"
                            // rules={{ required: "Kinh nghiệm!" }}
                            render={({ onChange, value }) => (
                              <CInput
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.experience}
                                invalid={!!errors.experience}
                              />
                            )}
                          />
                          <CInvalidFeedback className="help-block">
                            {get(errors, `name.name`, "")}
                          </CInvalidFeedback>
                        </div>

                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Tốt nghiệp
                          </CLabel>
                          <Controller
                            control={control}
                            id="education"
                            name="education"
                            render={({ onChange, value }) => (
                              <CTextarea
                                rows="5"
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.education}
                                invalid={!!errors.education}
                              />
                            )}
                          />
                        </div>

                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Giới thiệu
                          </CLabel>
                          <Controller
                            control={control}
                            id="introduction"
                            name="introduction"
                            render={({ onChange, value }) => (
                              <CTextarea
                                rows="5"
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.introduction}
                                invalid={!!errors.introduction}
                              />
                            )}
                          />
                        </div>

                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Mối quan tâm
                          </CLabel>
                          <Controller
                            control={control}
                            id="interest"
                            name="interest"
                            render={({ onChange, value }) => (
                              <CTextarea
                                rows="5"
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.interest}
                                invalid={!!errors.interest}
                              />
                            )}
                          />
                        </div>

                        <div className="mb-3">
                          <CLabel htmlFor="exampleFormControlInput1">
                            Chuyên môn
                          </CLabel>
                          <Controller
                            control={control}
                            id="professionalBackground"
                            name="professionalBackground"
                            render={({ onChange, value }) => (
                              <CTextarea
                                rows="5"
                                onChange={(e) => onChange(e.target.value)}
                                value={value}
                                defaultValue={tutor.professionalBackground}
                                invalid={!!errors.professionalBackground}
                              />
                            )}
                          />
                        </div>

                        <div className="mb-3" row>
                          <CLabel htmlFor="select">Đặt ảnh đại diện</CLabel>
                          <Controller
                            control={control}
                            // rules={{ required: "Vui lòng thêm tệp dữ liệu" }}
                            name="avatar"
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

                        <div className="mb-3" row>
                          <CLabel htmlFor="select">Đặt video đại diện</CLabel>
                          <Controller
                            control={control}
                            // rules={{ required: "Vui lòng thêm tệp dữ liệu" }}
                            name="introVideo"
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
                                    {value ? value.name : "Tải video"}
                                  </CLabel>
                                </CCol>
                              </React.Fragment>
                            )}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>

                <CCardFooter style={{ textAlign: "right" }}>
                  <CButton
                    onClick={() => setOpen(false)}
                    size="sm"
                    color="primary"
                    style={{ marginRight: 5 }}
                  >
                    Hủy
                  </CButton>
                  <CButton
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    size="sm"
                    color="primary"
                  >
                    Cập nhật
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CModal>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
