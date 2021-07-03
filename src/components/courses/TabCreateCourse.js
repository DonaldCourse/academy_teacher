import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CForm, CRow, CInput, CLabel, CInvalidFeedback, CTextarea, CSelect, CInputFile, CButton } from '@coreui/react';
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith } from 'lodash';
TabCreateCourse.propTypes = {
    onSubmit: PropTypes.func,
    defaultValues: PropTypes.object,
};

function TabCreateCourse({ onSubmit, defaultValues }) {
    const { register, errors, control, handleSubmit } = useForm({
        defaultValues,
    });
    return (
        <div>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CRow>
                    <CCol xs="12" md="6">
                        <div className="mb-3">
                            <CLabel htmlFor="exampleFormControlInput1">Tên khoá học</CLabel>
                            <Controller
                                control={control}
                                id="name"
                                name="name"
                                rules={{ required: 'Vui lòng nhập tên thiết bị !' }}
                                render={({ onChange, value }) => (
                                    <CInput
                                        onChange={e => onChange(e.target.value)}
                                        value={value}
                                        invalid={!!errors.name}
                                    />
                                )}
                            />
                            <CInvalidFeedback className="help-block">
                                {get(errors, `name.message`, '')}
                            </CInvalidFeedback>
                        </div>

                        <div className="mb-3">
                            <CLabel htmlFor="exampleFormControlInput1">Mô tả</CLabel>
                            <Controller
                                control={control}
                                id="description"
                                name="description"
                                render={({ onChange, value }) => (
                                    <CTextarea
                                        rows="9"
                                        onChange={e => onChange(e.target.value)}
                                        value={value}
                                        invalid={!!errors.description}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <CLabel htmlFor="exampleFormControlInput1">Tổng quan</CLabel>
                            <Controller
                                control={control}
                                id="overview"
                                name="overview"
                                render={({ onChange, value }) => (
                                    <CTextarea
                                        rows="5"
                                        onChange={e => onChange(e.target.value)}
                                        value={value}
                                        invalid={!!errors.description}
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <CLabel htmlFor="select">Chọn level khoá học</CLabel>
                            <Controller
                                control={control}
                                id="level"
                                name="level"
                                as={CSelect}
                                defaultValue={1}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Controller>
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
                                        onChange={e => onChange(e.target.value)}
                                        value={value}
                                        invalid={!!errors.prerequisites}
                                    />
                                )}
                            />
                        </div>
                    </CCol>

                    <CCol xs="12" md="6">
                        <div row>
                            <CLabel htmlFor="select">Đặt ảnh đại diện</CLabel>
                            <CCol md={12}>
                                <CInputFile custom id="custom-file-input" />
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                    Chọn file
                                </CLabel>
                            </CCol>
                        </div>
                    </CCol>

                    <CCol>
                        <CButton type="button" onClick={handleSubmit(onSubmit)} size="sm" color="primary">Tiếp theo</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </div>
    );
}

export default TabCreateCourse;