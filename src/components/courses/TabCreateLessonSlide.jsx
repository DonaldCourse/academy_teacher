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

TabCreateLessonSlide.propTypes = {};

function TabCreateLessonSlide(props, { defaultValue, onBack }) {
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
      'lesson',
      'file',
    ]);
    const body = {
      lesson_id: lesson.lesson,
      priority: 1,
    }
    reset();
    createLessonSlide(body, lesson.file)
  }

  const createLessonSlide = async (body, file) => {
    const formData = new FormData();
    formData.append('files', file);
    try {
      const result = await UploadFileCDNService.UploadFile(formData);
      if (result.status == 201) {
        body.image_link = result.data[0].url
      }

      const data = await CourseServices.CreateLessonSlide(params.courseId, body);

      if (data.status == 201) {
        setLoading(false);
        swal({ title: "Thành công", text: 'Tạo bài học thành công !', icon: 'success', button: 'Đồng ý' })
        window.location.reload();
      } else {
        setLoading(false);
        swal({ title: "Lỗi", text: 'Tạo bài học thất bại !', icon: 'error', button: 'Đồng ý' })
      }
    } catch (error) {
      setLoading(false);
      swal({ title: "Lỗi", text: 'Tạo bài học thất bại !', icon: 'error', button: 'Đồng ý' })
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
              Tạo Slide bài học
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CLabel htmlFor="select">Bài học</CLabel>
                      <Controller
                        control={control}
                        id="lesson"
                        name="lesson"
                        rules={{ required: true }}
                        defaultValue={lessons.length > 0 ? lessons[0].value : ''}
                        render={(props) => (
                          <CSelect
                            {...props}
                            value={props.value}
                            onChange={(e) => {
                              props.onChange(e.target.value)
                            }}
                            invalid={!!errors.lesson}>
                            {lessons && lessons.length > 0 && lessons.map(({ value, label }, index) => (
                              <option key={index} value={value} label={label}>
                                {label}
                              </option>
                            ))}
                          </CSelect>
                        )}>
                      </Controller>
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.lesson`, '')}
                      </CInvalidFeedback>
                    </div>
                    {/* ////////////////////////////////////////// */}

                    <div className="mb-3" row>
                      <CLabel htmlFor="select">Tải lên Slide</CLabel>
                      <Controller
                        control={control}
                        rules={{ required: 'Vui lòng thêm tệp dữ liệu' }}
                        name="file"
                        render={({ onChange, value }) => (
                          <React.Fragment>
                            <CCol xs="12">
                              <CInputFile
                                accept='application/pdf'
                                onChange={e => {
                                  onChange(e.target.files[0]);
                                }} custom id="custom-file-input" />
                              <CLabel htmlFor="custom-file-input" variant="custom-file">
                                {value ? value.name : 'Chọn file(.pdf)'}
                              </CLabel>
                            </CCol>
                          </React.Fragment>
                        )}
                      />
                      <CInvalidFeedback className="help-block">
                        {get(errors, `name.file`, '')}
                      </CInvalidFeedback>
                    </div>
                  </CCol>

                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter style={{ "textAlign": "right" }}>
              <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />Đăng ký</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TabCreateLessonSlide;
