import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CDataTable,
    CRow,
    CModal,
    CModalBody,
    CContainer,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CLabel,
    CSelect,
    CInvalidFeedback
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form';
import { get } from 'lodash'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import CourseServices from "../../services/CourseServices";

ListLessonSlide.propTypes = {

};

// Table : Config
const fields = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'imageLink', label: 'File' },
    { key: 'actions', label: 'Chức năng', _classes: 'action', _style: { minWidth: '120px' }, sorter: false, filter: false },
]


function ListLessonSlide({ lessons }) {

    const { register, errors, control, handleSubmit, reset } = useForm({});
    const [slides, setSlides] = useState([]);
    console.log(lessons);
    const { params } = useRouteMatch();

    const [selectedLesson, setSelectedLesson] = useState(lessons[0].value || '');

    useEffect(() => {
        getSlideOfLesson()
    }, [selectedLesson]);

    const handleChangLesson = (value) => {
        console.log(value);
        setSelectedLesson(value)
    }

    const getSlideOfLesson = () => {
        CourseServices.getLessonSlide(selectedLesson).then(res => {
            console.log(res);
            if (res.status == 200) {
                setSlides(res.data);
            }
        }).catch(err => {
            setSlides([]);
        })
    }

    return (
        <>
            <CRow className="content-camera">
                <CCol>
                    <CCard>
                        <CCardHeader style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                            Danh sách Slide bài học
                        </CCardHeader>
                        <CCardBody>
                            <CRow style={{ marginBottom: 10 }}>
                                <CCol sm="12" className="filter" style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <div className="mb-3">
                                        <CLabel htmlFor="select">Thuộc bài học</CLabel>
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
                                                        props.onChange(e.target.value);
                                                        handleChangLesson(e.target.value)
                                                    }}
                                                    invalid={!!errors.lessons}>
                                                    {lessons && lessons.map(({ value, label }, index) => (
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
                                </CCol>
                            </CRow>
                            <CDataTable
                                items={slides}
                                fields={fields}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
                                // columnFilter
                                noItemsView={{ noItems: 'Không có dữ liệu' }}
                                clickableRows
                                size="sm"
                                itemsPerPage={100}
                                pagination
                                scopedSlots={{
                                    'id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                                    },
                                    'imageLink': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.imageLink} </td>
                                    },
                                    'actions':
                                        (item, index) => {
                                            const canActive = item.is_connected ? false : true
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <CButton title="Cập nhật" className="action" color="info" size="sm">
                                                        <CIcon name="cil-pencil" />
                                                    </CButton>
                                                    <CButton title="Xóa" className="action" color="danger" size="sm" style={{ marginLeft: '10px' }}>
                                                        <CIcon name="cil-trash" />
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default ListLessonSlide;