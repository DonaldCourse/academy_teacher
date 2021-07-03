import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith, toInteger, toNumber } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CRow, CInput, CLabel, CInvalidFeedback, CTextarea, CSelect, CInputFile, CButton, CCardFooter, CNav, CNavLink, CNavItem, CTabContent, CTabPane, CCardText, CTabs } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import swal from 'sweetalert';
import lodash from 'lodash'
import { Editor } from "react-draft-wysiwyg";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import UploadFileCDNService from '../../services/UploadFileCDNService';
import CourseServices from '../../services/CourseServices';
import CurriculumService from '../../services/CurriculumService';
import { useAuth } from '../../context/auth';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

CreateCourse.propTypes = {

};

function CreateCourse(props) {
    const { register, errors, control, handleSubmit, reset } = useForm({});
    const [curriculums, setCurriculum] = useState([]);
    const [description, setDescription] = useState(EditorState.createEmpty());
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");
    const { auth } = useAuth();
    useEffect(() => {
        getCurriculum();
    }, []);

    const onSubmit = (data, e) => {
        setLoading(true);
        const course = pick(data, [
            'name',
            'minimum_skill',
            'overview',
            'description',
            'file',
            'categories',
        ]);
        const body = {
            title: course.name,
            minimum_skill: course.minimum_skill,
            overview: course.overview,
            categories_id: course.categories,
            description: draftToHtml(convertToRaw(description.getCurrentContent())),
        }
        reset();
        createCourse(body, course.file)
    }

    const createCourse = async (body, file) => {
        // const formData = new FormData();
        // formData.append('files', file);
        try {
            // const result = await UploadFileCDNService.UploadFile(formData);
            // if (result.status == 201) {
            //     body.avatar = result.data[0].url
            // }
            body.avatar = "https://www.cambly.com/fe/static/login_illustration_big.png"
            const data = await CourseServices.CreateCourse(body);
            if (data.status == 201) {
                setLoading(false);
                swal({ title: "Thành công", text: 'Tạo khoá học thành công !', icon: 'success', button: 'Đồng ý' })
                window.location.reload();
            } else {
                setLoading(false);
                swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
            }
        } catch (error) {
            setLoading(false);
            swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
        }
    }

    const getCurriculum = () => {
        CurriculumService.GetCurriculumsTutor()
            .then(res => {
                if (res.status == 200) {
                    const newArray = res.data.data && res.data.data.map(({ _id, name }) => {
                        return { value: _id, label: name }
                    });
                    setCurriculum(newArray);
                }
            }).catch(err => {

            })
    }

    const onChangeDescription = state => {
        console.log(state);
        setDescription(state);
    }

    return (
        <div>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                            Tạo khoá học
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CRow>
                                    <CCol>
                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">Tên khoá học</CLabel>
                                            <Controller
                                                control={control}
                                                id="name"
                                                name="name"
                                                rules={{ required: 'Vui lòng nhập tên khoá học !' }}
                                                render={({ onChange, value }) => (
                                                    <CInput
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

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">Thuộc danh mục</CLabel>
                                            <Controller
                                                control={control}
                                                id="categories"
                                                name="categories"
                                                rules={{ required: true }}
                                                defaultValue={curriculums.length > 0 ? curriculums[0].value : ''}
                                                render={(props) => (
                                                    <CSelect
                                                        {...props}
                                                        value={props.value}
                                                        onChange={(e) => {
                                                            props.onChange(e.target.value)
                                                        }}
                                                        invalid={!!errors.curriculums}>
                                                        {curriculums && curriculums.map(({ value, label }, index) => (
                                                            <option key={index} value={value} label={label}>
                                                                {label}
                                                            </option>
                                                        ))}
                                                    </CSelect>
                                                )}>
                                            </Controller>
                                            <CInvalidFeedback className="help-block">
                                                {get(errors, `name.categories`, '')}
                                            </CInvalidFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">Chọn level khoá học</CLabel>
                                            <Controller
                                                control={control}
                                                id="minimum_skill"
                                                name="minimum_skill"
                                                as={CSelect}
                                                defaultValue={0}>
                                                <option value={"beginner"}>beginner</option>
                                                <option value={"intermediate"}>intermediate</option>
                                                <option value={"advance"}>advance</option>
                                            </Controller>
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
                                            <CLabel htmlFor="exampleFormControlInput1">Mô tả</CLabel>
                                            <Editor
                                                editorState={description}
                                                wrapperClassName="description-edit"
                                                editorClassName="description"
                                                onEditorStateChange={onChangeDescription}>
                                            </Editor>
                                        </div>


                                        <div className="mb-3" row>
                                            <CLabel htmlFor="select">Đặt ảnh đại diện</CLabel>
                                            <Controller
                                                control={control}
                                                rules={{ required: 'Vui lòng thêm tệp dữ liệu' }}
                                                name="file"
                                                render={({ onChange, value }) => (
                                                    <React.Fragment>
                                                        <CCol xs="12">
                                                            <CInputFile onChange={e => {
                                                                onChange(e.target.files[0]);
                                                            }} custom id="custom-file-input" />
                                                            <CLabel htmlFor="custom-file-input" variant="custom-file">
                                                                {value ? value.name : 'Tải ảnh'}
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

                        <CCardFooter style={{ "textAlign": "right" }}>
                            <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />Đăng ký</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow >
        </div>
    );
}

export default CreateCourse;