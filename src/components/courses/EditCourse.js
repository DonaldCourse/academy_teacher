import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith, toInteger, toNumber } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CRow, CInput, CLabel, CInvalidFeedback, CTextarea, CSelect, CInputFile, CButton, CCardFooter, CNav, CNavLink, CNavItem, CTabContent, CTabPane, CCardText, CTabs } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import lodash from 'lodash'
import { Editor } from "react-draft-wysiwyg";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import UploadFileCDNService from '../../services/UploadFileCDNService';
import CourseServices from '../../services/CourseServices';
import CurriculumService from '../../services/CurriculumService';
import { useAuth } from '../../context/auth';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";
import { useHistory, useRouteMatch } from 'react-router-dom';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

EditCourse.propTypes = {

};

function EditCourse(props) {
    const { register, errors, control, handleSubmit, reset, setValue } = useForm({});
    const [curriculums, setCurriculum] = useState([]);
    const [description, setDescription] = useState(EditorState.createEmpty());
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");
    const { auth } = useAuth();
    const { params } = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
        getCurriculum();
        getCourseDetail();
    }, []);

    const htmlDecode = input => {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

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
        console.log(body);
        reset();
        updateCourse(body, course.file)
    }

    const updateCourse = async (body, file) => {
        console.log(file);
        if (file?.name) {
            const formData = new FormData();
            formData.append('files', file);
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.avatar = result.data[0].path
            }
        }

        try {
            const data = await CourseServices.UpdateCourse(body, params.courseId);
            if (data.status == 200) {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'C???p nh???t kho?? h???c th??nh c??ng !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    history.replace(`/courses/${params.courseId}`);
                })
            } else {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'C???p nh???t kho?? h???c th???t b???i !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'C???p nh???t kho?? h???c th???t b???i !',
                showConfirmButton: false,
                timer: 1500
            })
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
        setDescription(state);
    }


    const getCourseDetail = async () => {
        try {
            const res = await CourseServices.GetCourseDetailOfTeacher(params.courseId);
            console.log(res.data.data);
            setValue("name", res.data.data.title);
            setValue("categories", res.data.data.categories_id);
            setValue("minimum_skill", res.data.data.minimum_skill);
            setValue("overview", res.data.data.overview);
            setValue("file", res.data.data.avatar);
            const blocksFromHtml = htmlToDraft(htmlDecode(res.data.data.description));
            const { contentBlocks, entityMap } = blocksFromHtml;
            if (contentBlocks) {
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);
                setDescription(editorState);
            }
            // setCourse(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
            <CCard>
                <CCardHeader style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                    Ch???nh s???a kho?? h???c
                </CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol>
                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">T??n kho?? h???c</CLabel>
                                    <Controller
                                        control={control}
                                        id="name"
                                        name="name"
                                        rules={{ required: 'Vui l??ng nh???p t??n kho?? h???c !' }}
                                        render={({ onChange, value }) => (
                                            <CInput
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.name}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.name.message`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="select">Thu???c danh m???c</CLabel>
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
                                        {get(errors, `name.categories.message`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="select">Ch???n level kho?? h???c</CLabel>
                                    <Controller
                                        control={control}
                                        id="minimum_skill"
                                        name="minimum_skill"
                                        as={CSelect}
                                        defaultValue={0}>
                                        <option value={"beginner"}>beginner</option>
                                        <option value={"intermediate"}>intermediate</option>
                                        <option value={"advanced"}>advanced</option>
                                    </Controller>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">T???ng quan</CLabel>
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
                                    <CLabel htmlFor="exampleFormControlInput1">M?? t???</CLabel>
                                    <Editor
                                        editorState={description}
                                        wrapperClassName="description-edit"
                                        editorClassName="description"
                                        onEditorStateChange={onChangeDescription}>
                                    </Editor>
                                </div>


                                <div className="mb-3" row>
                                    <CLabel htmlFor="select">?????t ???nh ?????i di???n</CLabel>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'Vui l??ng th??m t???p d??? li???u' }}
                                        name="file"
                                        render={({ onChange, value }) => (
                                            <React.Fragment>
                                                <CCol xs="12">
                                                    <CInputFile onChange={e => {
                                                        onChange(e.target.files[0]);
                                                    }} custom name="custom-file-input" name="file" id="custom-file-input" />
                                                    <CLabel name="file" htmlFor="custom-file-input" variant="custom-file">
                                                        {value ? (value?.name || value) : 'T???i ???nh'}
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
                    <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />????ng k??</CButton>
                </CCardFooter>
            </CCard>
        </div>
    );
}

export default EditCourse;