import React from "react";
import PropTypes from "prop-types";
import {
  CCard,
  CCardBody,
  CCardImgOverlay,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CImg,
  CCardFooter,
  CLink
} from "@coreui/react";
import { useHistory } from "react-router";

ItemCourse.propTypes = {};

function ItemCourse({ defaultValue }) {
  const history = useHistory();

  return (
    <CCard style={{ height: "100%" }}>
      <CCardBody>
        <CImg
          thumbnail
          fluid
          className="mb-2"
          style={{ width: "100%", maxHeight: "200px", height: "100%" }}
          src={defaultValue.avatar}
          onClick={() => history.push(`/courses/${defaultValue._id}`)}
        ></CImg>
        <CCardTitle className="title-class">{defaultValue.title}</CCardTitle>
        <CCardText className="text-class">{defaultValue.overview}</CCardText>
      </CCardBody>
      <CCardFooter>
        <CLink
          onClick={() => history.push(`/courses/${defaultValue._id}`)}
          target="_blank">
          Xem chi tiết
        </CLink>
      </CCardFooter>
    </CCard>
  );
}

export default ItemCourse;
