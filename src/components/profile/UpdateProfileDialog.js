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
UpdateProfileDialog.propTypes = {};

function UpdateProfileDialog({ open, onClose, onSubmit, defaultValues }) {
    const history = useHistory();
    const { auth } = useAuth();
    const { register, errors, control, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        setValue("name", defaultValues.name);
        setValue("email", defaultValues.email);
        setValue("education", defaultValues.education);
    }, [defaultValues]);

    return (
        <CModal show={open} onClose={onClose}>
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật thông tin cá nhân</CModalTitle>
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
                                <CLabel htmlFor="select">Họ và Tên</CLabel>
                                <Controller
                                    control={control}
                                    id="name"
                                    name="name"
                                    rules={{ required: 'Vui lòng nhập họ và tên !' }}
                                    render={({ onChange, value }) => (
                                        <CInput
                                            name="name"
                                            onChange={e => onChange(e.target.value)}
                                            value={value}
                                            invalid={!!errors.name}
                                        />
                                    )}
                                />
                                <CInvalidFeedback className="help-block">
                                    {get(errors, `name.name`, '')}
                                </CInvalidFeedback>
                            </div>
                            {/* ////////////////////////////////////////// */}
                            <div className="mb-3">
                                <CLabel htmlFor="select">Email</CLabel>
                                <Controller
                                    control={control}
                                    id="email"
                                    name="email"
                                    rules={{ required: 'Vui lòng nhập email !' }}
                                    render={({ onChange, value }) => (
                                        <CInput
                                            type="email"
                                            name="email"
                                            onChange={e => onChange(e.target.value)}
                                            value={value}
                                            invalid={!!errors.email}
                                        />
                                    )}
                                />
                                <CInvalidFeedback className="help-block">
                                    {get(errors, `name.name`, '')}
                                </CInvalidFeedback>
                            </div>
                            <div className="mb-3">
                                <CLabel htmlFor="select">Tốt nghiệp</CLabel>
                                <Controller
                                    control={control}
                                    id="education"
                                    name="education"
                                    rules={{ required: 'Vui lòng nhập trường tốt nghiệp !' }}
                                    render={({ onChange, value }) => (
                                        <CInput
                                            name="education"
                                            onChange={e => onChange(e.target.value)}
                                            value={value}
                                            invalid={!!errors.education}
                                        />
                                    )}
                                />
                                <CInvalidFeedback className="help-block">
                                    {get(errors, `name.name`, '')}
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

export default UpdateProfileDialog;
