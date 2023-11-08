import { useState } from 'react'
import QRCode from "react-qr-code";

function App() {
  const [value, setValue] = useState('Hello There!')

  const handleChange = (e) => {
    setValue(e.target.value)
    console.log(value)
  }

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className='flex h-screen bg-slate-500 dark:bg-slate-800'>
      <div className='m-auto justify-center items-center flex flex-col'>
        <div className='p-4 bg-slate-300 rounded-xl shadow-lg dark:bg-slate-500'>
          <QRCode id="QRCode" value={value} />
        </div>
        <h2 className='text-center text-xl text-white font-bold font-mono p-2'>Enter You Link!</h2>
        <input className='rounded-md w-48 hover:w-60 focus:w-60 active:w-60 transition-all ease-in-out delay-150 p-2' type='text' placeholder={value} onChange={(e) => { handleChange(e) }}></input>
        <div className='p-4'>
        <button className='bg-slate-300 p-2 rounded-lg text-xl dark:bg-slate-500 dark:text-white font-normal font-mono' onClick={onImageCownload}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default App
