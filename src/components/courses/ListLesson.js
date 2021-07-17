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
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form';
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import UploadFileCDNService from '../../services/UploadFileCDNService';
import CourseServices from "../../services/CourseServices";
import EditLessonDialog from './EditLessonDialog'
import Swal from 'sweetalert2'
import { get, pick, startsWith, toInteger, toNumber } from "lodash";
// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

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
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");

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

    const onClose = () => {
        setOpen(!open);
    }

    const onOpenDialog = (item) => {
        setOpen(!open);
        setItem(item);
    }

    const onSubmit = data => {
        onClose();
        setLoading(true);
        const lesson = pick(data, [
            'title',
            'thumbnail',
            'video',
        ]);
        const body = {
            title: lesson.title
        }
        updateLesson(body, lesson.thumbnail, lesson.video);
    }

    const updateLesson = async (body, thumbnail, video) => {
        if (thumbnail?.name) {
            const formData = new FormData();
            formData.append('files', thumbnail);
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.thumbnail = result.data[0].url
            }
        }

        if (video?.name) {
            const formData = new FormData();
            formData.append('files', video);
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.video_url = result.data[0].url
            }
        }

        try {
            const data = await CourseServices.UpdateLesson(params.courseId, item._id, body);
            console.log(data);
            if (data.status == 200) {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật bài học thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    window.location.reload();
                })
            } else {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Cập nhật bài học thất bại !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Cập nhật bài học thất bại !!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const deleteLesson = async (item) => {
        try {
            const data = await CourseServices.DeleteLesson(params.courseId, item._id);
            console.log(data);
            if (data.status == 200) {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Xoá bài học thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    window.location.reload();
                })
            } else {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Xoá bài học thất bại !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xoá bài học thất bại !!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    return (
        <>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
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
                                                    <CButton title="Cập nhật" className="action" color="info" size="sm" onClick={() => onOpenDialog(item)}>
                                                        <CIcon name="cil-pencil" />
                                                    </CButton>
                                                    <CButton title="Xóa" className="action" color="danger" size="sm" style={{ marginLeft: '10px' }} onClick={() => deleteLesson(item)}>
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
            <EditLessonDialog open={open} onClose={onClose} defaultValues={item} onSubmit={onSubmit}></EditLessonDialog>
        </>
    );
}

export default ListLesson;