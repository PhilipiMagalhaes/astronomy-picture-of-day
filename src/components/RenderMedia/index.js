import React from 'react';
import './styles.css'
export default function RenderMedia({ APOD }) {
  function returnMedia(){
    try {
      if (APOD.media_type === 'video') {
        return (<iframe src={APOD.url} title={APOD.title} />);
      }
      if (APOD.media_type === 'image') {
        return (<img src={APOD.url} alt={APOD.title} />);
      }
    }
    catch{
      return (
        <div className='notFound'>
          <h1>OOOOPS</h1>
          <strong>Maybe your frame is lost in space :/</strong>
        </div>
      );
    }
  }

  return (
    <>
    {returnMedia()}
    </>
    );
}
