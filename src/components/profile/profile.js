import React, { useEffect, useRef, useState } from "react";
import PropTypes, { number } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { get, pick, startsWith, toInteger, toNumber } from "lodash";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import {
  makeStyles,
  Container,
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  Box,
  IconButton,
} from "@material-ui/core";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import UploadFileCDNService from "../../services/UploadFileCDNService";
import { useHistory } from "react-router";
import AuthServices from "../../services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { grey } from "@material-ui/core/colors";
import UploadAvatarDialog from "./UploadAvatarDialog";
import UploadProfileDialog from "./UpdateProfileDialog";
import { setAuth } from '../../reducer/AuthSlide';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


const BigAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin: 0 auto 16px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  container: {
    // background: "#e8e9ec",
  },
  title: {
    textAlign: "center",
  },
  action: {
    marginLeft: "auto",
  },
  margin: {
    marginLeft: theme.spacing(1)
  }
}));

Profile.propTypes = {};

function Profile(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");
  const [open, setOpen] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const userProfile = useSelector(state => state.authSlide.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(!open);
  }

  const onCloseProfileDialog = () => {
    setOpenProfileDialog(!openProfileDialog);
  }

  const onSubmit = async (image) => {
    onClose();
    onHandleChangeAvatar(image);
  }

  const onSubmitProfile = async (data) => {
    onCloseProfileDialog();
    setLoading(true);
    const info = pick(data, [
      'name',
      'email',
      'education',
    ]);
    const body = {
      name: info.name,
      email: info.email,
      education: info.education
    }
    updateUserProfile(body);
  }

  const onHandleChangeAvatar = async (file) => {
    setLoading(true);
    var data = new FormData();
    data.append("files", file);
    const results = await UploadFileCDNService.UploadFile(data);
    const body = {
      avatar: results.data[0].path
    }
    updateUserProfile(body);
  }

  const updateUserProfile = async (body) => {
    try {
      AuthServices.UpdateProfileTutor(body).then(res => {
        if (res.status == 200) {
          dispatch(setAuth(res.data.user));
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="backdrop" hidden={!loading}>
        <HashLoader color={color} loading={loading} css={override} size={50} />
      </div>
      <CRow style={{ display: "flex", justifyContent: "center" }}>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader style={{ fontSize: "30px", textAlign: "center" }}>
              Quản lý tài khoản
            </CCardHeader>
            <CCardBody>
              <BigAvatar
                $withBorder
                alt="Avatar"
                src={process.env.REACT_APP_BASE_URL_CDN + userProfile.avatar}
                imgProps={{
                  style: {
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  },
                }}
                onClick={() => setOpen(!open)}
              />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" component="p">
                  Họ và Tên : {userProfile.name}
                </Typography>
                <IconButton aria-label="delete" className={classes.margin} onClick={() => setOpenProfileDialog(!openProfileDialog)}>
                  <CreateOutlinedIcon fontSize="small" />
                </IconButton>
              </div>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" component="p">
                  Email : {userProfile.email}
                </Typography>
                <IconButton aria-label="delete" className={classes.margin} onClick={() => setOpenProfileDialog(!openProfileDialog)}>
                  <CreateOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" component="p">
                  Tốt nghiêp : {userProfile.education}
                </Typography>
                <IconButton aria-label="delete" className={classes.margin} onClick={() => setOpenProfileDialog(!openProfileDialog)}>
                  <CreateOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <UploadAvatarDialog open={open} onClose={onClose} onSubmit={onSubmit}></UploadAvatarDialog>
      <UploadProfileDialog open={openProfileDialog} onClose={onCloseProfileDialog} onSubmit={onSubmitProfile} defaultValues={{ name: userProfile.name, email: userProfile.email, education: userProfile.education }}></UploadProfileDialog>
    </>
  );
}

export default Profile;
