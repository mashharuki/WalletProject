import Button from "@mui/material/Button/Button";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography/Typography";
import { BrowserQRCodeReader } from "@zxing/browser";
import React, { useEffect, useRef, useState } from "react";
import './QrCodeReader.css';


/**
 * QrCodeReader Component
 * @param {*} param0 
 * @returns 
 */
const QrCodeReader = ({ onRead, setOpen }) => {
      const theme = useTheme();
      const videoRef = useRef(null);
      const mountedRef = useRef(false);
      
      const [devices, setDevices] = useState([]);
      const [currentCamera, setCurrentCamera] = useState(undefined);
    
      /**
       * setDevicesList function
       * @returns 
       */
      const setDevicesList = async () => {
            // const list = await BrowserQRCodeReader.listVideoInputDevices();
            const list = await navigator.mediaDevices.enumerateDevices();
            const result = [];
            for (const device of list) {
                  result.push({ id: device.deviceId, name: device.label });
            }
            setDevices([...result]);
            return result;
      };
    
      useEffect(() => {
            mountedRef.current = true;
            const codeReader = new BrowserQRCodeReader(undefined, 'video');
            setDevicesList();

            codeReader.decodeFromVideoDevice(undefined, videoRef.current, function (result, _, controls) {
                  if (mountedRef.current === false) {
                        controls.stop();
                        return;
                  }
                  if (typeof result !== "undefined") {
                        controls.stop();
                        onRead(result);
                  }
            });

            return function cleanup() {
                  mountedRef.current = false;
            };
      }, [currentCamera]);
    
    
      return (
            <div 
                  style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100vw",
                        backgroundColor: theme.palette.background.default,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                  }}
            >
                  <Typography 
                        variant="h6" 
                        style={{ marginBottom: "1em", width: "90%", maxWidth: "1000px" }} 
                        fontWeight="bold" 
                        align="center"
                  >
                        Please read QRCode
                  </Typography>
                  {
                        devices.length !== 0 &&
                        <Select
                              value={currentCamera === undefined ? devices[0]?.id : currentCamera}
                              onChange={e => { setCurrentCamera(e.target.value); }}
                              style={{ width: "90%", maxWidth: "1000px" }}
                        >
                              {devices.map((device, index) => <MenuItem value={device.id} key={index.toString()} >{device.name}</MenuItem>)}
                        </Select>
                  }
              
                  <video 
                        style={{ width: "90%", maxWidth: "1000px", borderRadius: "10px", marginTop: "1em", marginBottom: "1em" }} 
                        ref={videoRef} 
                  />
                  <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{ width: "90%", maxWidth: "1000px" }} 
                        onClick={() => setOpen(false)} 
                        size="large"
                  >
                        STOP
                  </Button>
            </div >
      );
    
};
    
export default QrCodeReader;