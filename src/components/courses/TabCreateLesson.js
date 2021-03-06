import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
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
  CCardText,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import axios from "axios";
import CourseServices from "../../services/CourseServices";
import { useRouteMatch } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith, toInteger, toNumber } from 'lodash'
import UploadFileCDNService from '../../services/UploadFileCDNService';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

TabCreateLesson.propTypes = {};

function TabCreateLesson(props, { defaultValue, onBack }) {
  const { register, errors, control, handleSubmit, reset } = useForm({});
  const [lessons, setLessons] = useState({});
  const match = useRouteMatch();
  const { params } = match;
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");
  useEffect(() => {
    getLessonOfCourse();
  }, []);

  const getLessonOfCourse = () => {
    CourseServices.GetLessonTitle(params.courseId).then(res => {
      console.log(res);
      if (res.status == 200) {
        console.log(res.data);
        const newArray = res.data && res.data.map(({ id, title }) => {
          return { value: id, label: title }
        });
        setLessons(newArray);
      }
    }).catch(err => {

    })
  }

  const onSubmit = (data) => {
    setLoading(true);
    const lesson = pick(data, [
      'title',
      'thumbnail',
      'video',
    ]);
    const body = {
      title: lesson.title,
    }
    createLessonSlide(body, lesson.thumbnail, lesson.video)
  }

  const createLessonSlide = async (body, thumbnail, video) => {

    const formData = new FormData();
    formData.append('files', thumbnail);

    const formData1 = new FormData();
    formData1.append('files', video);

    try {
      const [
        { data: dataThumbnail, status: isSuccessThumbnail },
        { data: dataVideo, status: isSuccessVideo }] = await Promise.all([UploadFileCDNService.UploadFile(formData), UploadFileCDNService.UploadFile(formData1)]);
      if (isSuccessThumbnail == 201 && isSuccessVideo == 201) {
        body.thumbnail = dataThumbnail[0].path
        body.video_url = dataVideo[0].path
        
        const data = await CourseServices.CreateLessonTitle(params.courseId, body);
        console.log(data);
        if (data.status == 201) {
          setLoading(false);
          reset({ 'thumbnail': '', 'video': '', 'title': '' })
          swal({ title: "Th??nh c??ng", text: 'T???o video b??i h???c th??nh c??ng !', icon: 'success', button: '?????ng ??' })
          window.location.reload();
        } else {
          setLoading(false);
          swal({ title: "L???i", text: 'T???o video b??i h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
        }
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      swal({ title: "L???i", text: 'T???o video b??i h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
    }
  }

  return (
    <div>
      <div className="backdrop" hidden={!loading}>
        <HashLoader color={color} loading={loading} css={override} size={50} />
      </div>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              T???o b??i h???c
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CLabel htmlFor="select">T??n b??i h???c</CLabel>
                      <Controller
                        control={control}
                        id="title"
                        name="title"
                        rules={{ required: 'Vui l??ng nh???p t??n kho?? h???c !' }}
                        render={({ onChange, value }) => (
                          <CInput
                            onChange={e => onChange(e.target.value)}
                            value={value}
                            invalid={!!errors.title}
                          />
                        )}
                      />
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.title`, '')}
                      </CInvalidFeedback>
                    </div>
                    {/* ////////////////////////////////////////// */}
                    <div className="mb-3" row>
                      <CLabel htmlFor="select">T???i l??n anh thumbnail</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: 'Vui l??ng th??m t???p d??? li???u' }}
                        name="thumbnail"
                        defaultValue=""
                        render={({ onChange, value }) => (
                          <React.Fragment>
                            <CCol xs="12">
                              <CInputFile
                                accept='image/*'
                                invalid={!!errors.thumbnail}
                                onChange={e => {
                                  onChange(e.target.files[0]);
                                }} custom id="custom-file-input" />
                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {value ? value.name : 'Ch???n file(.png)'}
                              </CLabel>
                            </CCol>
                          </React.Fragment>
                        )}
                      />
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.thumbnail`, '')}
                      </CInvalidFeedback>
                    </div>
                    <div className="mb-3" row>
                      <CLabel htmlFor="select">T???i l??n Video</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: 'Vui l??ng th??m t???p d??? li???u' }}
                        name="video"
                        defaultValue=""
                        render={({ onChange, value }) => (
                          <React.Fragment>
                            <CCol xs="12">
                              <CInputFile
                                accept='video/mp4,video/x-m4v,video/*'
                                invalid={!!errors.video}
                                onChange={e => {
                                  onChange(e.target.files[0]);
                                }} custom id="custom-file-input" />
                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {value ? value.name : 'Ch???n file(.mp4)'}
                              </CLabel>
                            </CCol>
                          </React.Fragment>
                        )}
                      />
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.video`, '')}
                      </CInvalidFeedback>
                    </div>
                  </CCol>

                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter style={{ "textAlign": "right" }}>
              <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />????ng k??</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TabCreateLesson;
