import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { get, pick } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import AvatarUpload from './AvatarUpload';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

UploadAvatarDialog.propTypes = {

};

function UploadAvatarDialog({ open, onClose, onSubmit }) {
    const [image, setImage] = useState();

    const handleChangeImage = (image) => {
        setImage(image);
    }

    const handleSubmit = () => {
        onSubmit(image);
    }

    return (
        <Dialog fullWidth={true} onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Cập nhật ảnh đại diện
            </DialogTitle>
            <DialogContent dividers>
                <AvatarUpload onChangeImage={handleChangeImage}></AvatarUpload>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} color="primary">
                    Huỷ
                </Button>

                <Button onClick={handleSubmit}
                    color="primary">
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadAvatarDialog;