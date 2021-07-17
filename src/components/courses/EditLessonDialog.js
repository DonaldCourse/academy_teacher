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
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router";
UpdateProfile.propTypes = {};

function UpdateProfile({ open, onClose, onSubmit, defaultValues }) {
    const history = useHistory();
    const { auth } = useAuth();
    const { register, errors, control, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        setValue("title", defaultValues.title);
        setValue("thumbnail", defaultValues.thumbnail);
        setValue("video", defaultValues.video_url);
    }, [defaultValues]);

    return (
        <CModal show={open} onClose={onClose}>
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật bài học</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal">
                    <CRow>
                        <CCol>
                            <div className="mb-3">
                                <CLabel htmlFor="select">Tên bài học</CLabel>
                                <Controller
                                    control={control}
                                    id="title"
                                    name="title"
                                    rules={{ required: 'Vui lòng nhập tên khoá học !' }}
                                    render={({ onChange, value }) => (
                                        <CInput
                                            name="title"
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
                                <CLabel htmlFor="select">Tải lên anh thumbnail</CLabel>
                                <Controller
                                    control={control}
                                    rules={{ required: 'Vui lòng thêm tệp dữ liệu' }}
                                    name="thumbnail"
                                    render={({ onChange, value }) => (
                                        <React.Fragment>
                                            <CCol xs="12">
                                                <CInputFile
                                                    accept='image/*'
                                                    invalid={!!errors.thumbnail}
                                                    onChange={e => {
                                                        onChange(e.target.files[0]);
                                                    }} name="thumbnail"
                                                    custom id="custom-file-input" />
                                                <CLabel name="thumbnail"
                                                    htmlFor="custom-file-input" variant="custom-file">
                                                    {value ? (value?.name || value) : 'Chọn file(.png)'}
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
                                <CLabel htmlFor="select">Tải lên Video</CLabel>
                                <Controller
                                    control={control}
                                    rules={{ required: 'Vui lòng thêm tệp dữ liệu' }}
                                    name="video"
                                    render={({ onChange, value }) => (
                                        <React.Fragment>
                                            <CCol xs="12">
                                                <CInputFile
                                                    name="video"
                                                    accept='video/mp4,video/x-m4v,video/*'
                                                    invalid={!!errors.video}
                                                    onChange={e => {
                                                        onChange(e.target.files[0]);
                                                    }} custom id="custom-file-input" />
                                                <CLabel style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                                    name="video"
                                                    htmlFor="custom-file-input" variant="custom-file">
                                                    {value ? (value?.name || value) : 'Chọn file(.mp4)'}
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
            </CModalBody>
            <CModalFooter>
                <CButton
                    type="reset"
                    size="sm"
                    color="secondary"
                    onClick={onClose}>Huỷ
                </CButton>
                <CButton className="ml-3"
                    type="button" onClick={handleSubmit(onSubmit)} size="sm" color="danger">Cập nhật</CButton>
            </CModalFooter>
        </CModal>
    );
}

export default UpdateProfile;
