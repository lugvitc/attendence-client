import React from "react";
import QRCode from 'qrcode';
import  { useState, useEffect } from "react";

function Qrcode() {
    const [ImageUrl, setImageUrl] = useState('');
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL("7018332852");
      console.log(response);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <button onClick={generateQrCode} >Generate</button>
      </div>
        Horizontally and Vertically Centered Element
    </>
  );
}

export default Qrcode;
