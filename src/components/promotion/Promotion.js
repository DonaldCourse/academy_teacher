import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import PromotionService from '../../services/PromotionService';
import { DocsLink } from '../../reusable';
import { formatUnit } from '../../utils/unitUtils';
import { formatDate, formatDateTime } from '../../utils/datetimeFormatter';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import PromotionPopup from './PromotionPopup';
import PromotionTypePopup from './PromotionTypePopup';
import PromotionDiscountPopup from './PromotionDiscountPopup';

Promotion.propTypes = {

};

// Table : Config
const fieldsType = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'type_name', label: 'Tên' },
]

const fieldsDiscount = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'discounts', label: 'Giảm giá' },
    { key: 'unit', label: 'Đơn vị' },
]

const fieldsPromotions = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'type_name', label: 'Loại giảm giá', sorter: false, filter: false },
    { key: 'promotion_discount', label: 'Giảm giá' },
    { key: 'username', label: 'Người tạo' },
    { key: 'description', label: 'Mô tả', sorter: false, filter: false },
    { key: "start_date", label: 'Ngày bắt đầu', _style: { minWidth: '90px' } },
    { key: "expire_date", label: 'Ngày hết hạn', _style: { minWidth: '90px' } },
    { key: "created_at", label: 'Ngày tạo', _style: { minWidth: '90px' } },
    { key: "updated_at", label: 'Cập nhật lúc', _style: { minWidth: '90px' } },
    { key: 'is_active', label: 'Kích hoạt', _style: { minWidth: '100px' }, filter: false },
    { key: 'is_expire', label: 'Hết hạn', _style: { minWidth: '100px' }, filter: false },
    { key: 'actions', label: 'Hoạt động', _style: { minWidth: '130px' }, filter: false },
]

const getBadge = isActive => {
    return isActive ? 'success' : 'danger'
}

const getShowStatus = isActive => {
    return isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'
}

const getBadgeExpire = isActive => {
    return isActive ? 'danger' : 'success'
}
const getShowExpire = isActive => {
    return isActive ? 'Đã hết hạn' : 'Chưa hết hạn'
}

function Promotion(props) {

    const [promotionTypes, setPromotionTypes] = useState([]);
    const [promotionDiscounts, setPromotionDiscounts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [openPromotionPopup, setOpenPromotionPopup] = useState(false);
    const [openPromotionTypePopup, setOpenPromotionTypePopup] = useState(false);
    const [openPromotionDiscountPopup, setOpenPromotionDiscountTypePopup] = useState(false);
    // const [defaultPromotion, setDefaultPromotion] = useState({
    //     type: [],
    //     discount: [],
    //     description: '',
    //     startdate: '',
    //     expiredate: '',
    //     typeSelected: '',
    //     discountSelected: ''
    // });

    useEffect(() => {
        getPromotionType();
        getPromotionDiscount();
        getPromotions();
    }, []);

    const getPromotionType = () => {
        PromotionService.GetAllPromotionType().then(res => {
            if (res.status == 200) {
                setPromotionTypes(res.data);
            }
        }).catch(err => {

        })
    };

    const getPromotionDiscount = () => {
        PromotionService.GetAllPromotionDiscount().then(res => {
            if (res.status == 200) {
                setPromotionDiscounts(res.data);
            }
        }).catch(err => {

        })
    };

    const getPromotions = () => {
        PromotionService.GetAllPromotion().then(res => {
            if (res.status == 200) {
                setPromotions(res.data);
            }
        }).catch(err => {

        })
    };

    const onClosePromotionPopup = () => {
        setOpenPromotionPopup(!openPromotionPopup);
    }

    const onClosePromotionTypePopup = () => {
        setOpenPromotionTypePopup(!openPromotionTypePopup);
    }

    const onClosePromotionDiscountPopup = () => {
        setOpenPromotionDiscountTypePopup(!openPromotionDiscountPopup);
    }

    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các loại giảm giá
                            <CButton onClick={onClosePromotionTypePopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotionTypes}
                                fields={fieldsType}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
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
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.type_name} </td>
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các đơn vị giảm giá
                            <CButton onClick={onClosePromotionDiscountPopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotionDiscounts}
                                fields={fieldsDiscount}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
                                noItemsView={{ noItems: 'Không có dữ liệu' }}
                                clickableRows
                                size="sm"
                                itemsPerPage={100}
                                pagination
                                scopedSlots={{
                                    'id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                                    },
                                    'discounts': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.discounts} </td>
                                    },
                                    'unit': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {formatUnit(item.unit, true)} </td>
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các mã giảm giá
                            <CButton onClick={onClosePromotionPopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotions}
                                fields={fieldsPromotions}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
                                noItemsView={{ noItems: 'Không có dữ liệu' }}
                                clickableRows
                                size="sm"
                                itemsPerPage={100}
                                pagination
                                scopedSlots={{
                                    'id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                                    },
                                    'description': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.description} </td>
                                    },
                                    'type_name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.type_name} </td>
                                    },
                                    'promotion_discount': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.discounts + " " + formatUnit(item.unit)} </td>
                                    },
                                    'username': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.username} </td>
                                    },
                                    'is_expire':
                                        (item) => (
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <CBadge color={getBadgeExpire(item.is_expire)}>
                                                    {getShowExpire(item.is_expire)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'is_active':
                                        (item) => (
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <CBadge color={getBadge(item.is_active)}>
                                                    {getShowStatus(item.is_active)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'start_date': ({ start_date }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(start_date, true)}</td>;
                                    },
                                    'expire_date': ({ expire_date }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(expire_date, true)}</td>;
                                    },
                                    'created_at': ({ created_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(created_at, true)}</td>;
                                    },
                                    'updated_at': ({ updated_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(updated_at, true)}</td>;
                                    },
                                    'actions':
                                        (item, index) => {
                                            const canActive = item.is_connected ? false : true
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <CButton title="Kích hoạt promotion" className="action" color="primary" size="sm">
                                                        <CIcon name="cil-check-circle" />
                                                    </CButton>
                                                    <CButton title="Chỉnh promotion" className="action" color="info" size="sm" style={{ marginLeft: '5px' }}>
                                                        <CIcon name="cil-pencil" />
                                                    </CButton>
                                                    <CButton title="Xóa promotion" className="action" color="danger" size="sm" style={{ marginLeft: '5px' }}>
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

            <PromotionPopup open={openPromotionPopup}
                onClose={onClosePromotionPopup}
                defaultValues={{types: promotionTypes, discounts: promotionDiscounts}}>
            </PromotionPopup>

            <PromotionTypePopup open={openPromotionTypePopup}
                onClose={onClosePromotionTypePopup}>
            </PromotionTypePopup>

            <PromotionDiscountPopup
                open={openPromotionDiscountPopup}
                onClose={onClosePromotionDiscountPopup}
            >
            </PromotionDiscountPopup>
        </div>
    );
}

export default Promotion;