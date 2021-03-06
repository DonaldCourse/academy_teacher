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
        const formData = new FormData();
        formData.append('files', file);
        try {
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.avatar = result.data[0].path
            }
            // body.avatar = "https://www.cambly.com/fe/static/login_illustration_big.png"
            const data = await CourseServices.CreateCourse(body);
            if (data.status == 201) {
                setLoading(false);
                swal({ title: "Th??nh c??ng", text: 'T???o kho?? h???c th??nh c??ng !', icon: 'success', button: '?????ng ??' })
                window.location.reload();
            } else {
                setLoading(false);
                swal({ title: "L???i", text: 'T???o kho?? h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
            }
        } catch (error) {
            setLoading(false);
            swal({ title: "L???i", text: 'T???o kho?? h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
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
                            T???o kho?? h???c
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
                                                {get(errors, `name.name`, '')}
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
                                                {get(errors, `name.categories`, '')}
                                            </CInvalidFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">Ch???n level kho?? h???c</CLabel>
                                            <Controller
                                                control={control}
                                                id="minimum_skill"
                                                name="minimum_skill"
                                                as={CSelect}
                                                defaultValue={"beginner"}>
                                                <option value={"beginner"}>beginner</option>
                                                <option value={"intermediate"}>intermediate</option>
                                                <option value={"advanced"}>advance</option>
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
                                                            }} custom id="custom-file-input" />
                                                            <CLabel htmlFor="custom-file-input" variant="custom-file">
                                                                {value ? value.name : 'T???i ???nh'}
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
                </CCol>
            </CRow >
        </div>
    );
}

export default CreateCourse;