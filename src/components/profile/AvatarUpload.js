import { Avatar, Button as MuiButton, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
    CloudUpload as MuiCloudUpload,
    Delete as MuiDelete,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import React, { createRef, useState } from "react";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
  margin: 0 auto 16px;
  ${({ $withBorder }) =>
        $withBorder &&
        `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const AvatarUpload = ({ avatar, onChangeImage }) => {
    const [image, _setImage] = useState(null);
    const inputFileRef = createRef(null);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];

        if (newImage) {
            setImage(URL.createObjectURL(newImage));
            onChangeImage(newImage)
        }
    };

    /**
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
     */
    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }
    };

    return (
        <CenteredContent>
            <BigAvatar
                $withBorder
                alt="Avatar"
                src={image || avatar}
                imgProps={{
                    style: {
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "cover",
                    },
                }}
            />
            <input
                ref={inputFileRef}
                accept="image/*"
                hidden
                id="avatar-image-upload"
                type="file"
                onChange={handleOnChange}
            />
            <label htmlFor="avatar-image-upload">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    mb={2}
                    onClick={handleClick}
                >
                    {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                    {image ? "Limpar" : "Upload"}
                </Button>
            </label>
        </CenteredContent>
    );
};

export default AvatarUpload;