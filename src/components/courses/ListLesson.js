import React from 'react';
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';

ListLesson.propTypes = {

};

// Table : Config
const fields = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'name', label: 'Tên' },
    { key: 'actions', label: 'Chức năng', _classes: 'action', _style: { minWidth: '120px' }, sorter: false, filter: false },
]

function ListLesson({ lessons }) {
    return (
        <>
            <CRow className="content-camera">
                <CCol>
                    <CCard>
                        <CCardHeader style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                            Danh sách bài học
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={lessons}
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
                                    'name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.title} </td>
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