import { useSelector } from "react-redux";
import * as SC from "./style";
import image from "../../../../assets/icons/defaultAvatar.png";

const LocalVideo = (props) => {
  const { camStatus } = useSelector((state) => state.jitsi);

  return (
    <SC.Container
      style={!camStatus ? { border: "1px solid rgba(255,255,255,0.5)" } : {}}
    >
      {camStatus ? <SC.Webcamm /> : <SC.Avatar src={image} />}
    </SC.Container>
  );
};

export default LocalVideo;
