import React, { FC } from "react";
import { Camera } from "react-camera-pro";
import { useRef, useState } from "react";
import { Button } from "antd";
import {
  CameraOutlined,
  SwapOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import format from "date-fns/format";

const App: FC = () => {
  const webcamRef: any = useRef<any>(null);
  const [onCamera, setOnCamera] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [imageFile, setImageFile] = useState<any>(null);

  const convertBlobToFile = (blob: Blob, mimeType: string): File => {
    const fileName = `gambar${format(new Date(), "yyyyMMddhhmmssSSS")}.jpg`;
    // Create a new File object from the Blob
    const file = new File([blob], fileName, { type: mimeType });

    return file;
  };

  const handleCapture = async (dataUrl: string) => {
    const img = webcamRef.current.takePhoto();
    // const img = webcamRef.current.takePhoto({ width: size.width, height: size.height })
    setImage(img);

    // Here, you can send the file to the backend or save it as an object
    console.log("Image captured:", dataUrl);
    console.log("IMAGE FILE", imageFile);
  };

  const handleAddImage = () => {
    // conver blob to file
    const file = convertBlobToFile(image, "image/jpeg");

    setImageFile(file);
    console.log("Image captured:", file);
  };

  return (
    <div className="container">
      {!onCamera ? (
        //  ----------- Camera Off ------------ //
        <div>
          <div>
            <Button type="primary" onClick={() => setOnCamera(true)}>
              Kamera
            </Button>
          </div>
          {image ? (
            <>
              <div className="image-preview">
                <img src={`${image}`} alt="Image preview" />
              </div>
              <div>
                <Button
                  type="primary"
                  style={{
                    marginTop: "10px",
                  }}
                  onClick={() => handleAddImage()}
                >
                  Simpan Gambar
                </Button>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        //  ----------- Camera On ------------ //
        <div className="camera">
          <Camera
            ref={webcamRef}
            facingMode="environment"
            // aspectRatio={16 / 10}
            aspectRatio={"cover"}
            errorMessages={{
              noCameraAccessible:
                "No camera device accessible. Please connect your camera or try a different browser.",
              permissionDenied:
                "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to different one because there is only one video device accessible.",
              canvas: "Canvas is not supported.",
            }}
          />

          {/* ----- Button Back----- */}
          <Button
            type="link"
            className="back-button"
            icon={
              <ArrowLeftOutlined style={{ fontSize: "24px", color: "#000" }} />
            }
            style={{
              borderRadius: "100%",
              width: "50px",
              height: "50px",
            }}
            onClick={() => {
              setOnCamera(false);
            }}
          />

          {/* ----- Button Take Picture and Switch ----- */}
          <div className="button-take-picture">
            <Button
              type="primary"
              icon={
                <CameraOutlined style={{ fontSize: "30px", color: "#fff" }} />
              }
              style={{
                borderRadius: "100%",
                width: "62px",
                height: "62px",
                fontSize: "16px",
              }}
              onClick={(dataUrl: any) => {
                handleCapture(dataUrl), setOnCamera(false);
              }}
            />
            <Button
              type="primary"
              icon={
                <SwapOutlined style={{ fontSize: "17px", color: "#fff" }} />
              }
              style={{
                borderRadius: "100%",
                width: "50px",
                height: "50px",
                color: "#08c",
                marginLeft: "15px",
              }}
              onClick={(dataUrl: any) => {
                webcamRef?.current?.switchCamera();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
