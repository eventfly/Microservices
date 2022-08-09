import React from 'react'
import "../../styles/CreateEvent.css"

const CoverImage = ({uploadImage, height}) => {

  const clickInputButton = (e) => {
      document.getElementById("uploadInput").click();
  }

  return (
    <div 
    style={{
      backgroundImage: `url("")`,
      backgroundSize: "cover",
      width: "inherit",
      height: `${height}`,
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
  }}
  id={"banner"}>

      <button className='CoverButton' onClick={clickInputButton} >
        <input type={"file"} onChange={uploadImage} id={"uploadInput"} hidden></input>
          Upload Banner
      </button>
    
    </div>
  )
}

export default CoverImage