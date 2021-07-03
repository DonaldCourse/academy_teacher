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

ListLesson.propTypes = {

};

// Table : Config
const fields = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'title', label: 'Tên' },
    { key: 'thumbnail', label: 'Thumbnail' },
    { key: 'video', label: 'Video' },
    { key: 'actions', label: 'Chức năng', _classes: 'action', _style: { minWidth: '120px' }, sorter: false, filter: false },
]

function ListLesson({ id }) {

    const { register, errors, control, handleSubmit, reset } = useForm({});
    const [slides, setSlides] = useState([]);
    const { params } = useRouteMatch();
    useEffect(() => {
        getLesson()
    }, []);

    const getLesson = () => {
        CourseServices.GetLessonTitle(params.courseId).then(res => {
            console.log(res);
            if (res.status == 200) {
                setSlides(res.data.data);
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
                            Danh sách Video bài học
                        </CCardHeader>
                        <CCardBody>
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
                                    'title': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.title} </td>
                                    },
                                    'thumbnail': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.thumbnail} </td>
                                    },
                                    'video': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.video_url} </td>
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

export default ListLesson;