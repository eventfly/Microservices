import React from 'react'
import { useState, useEffect} from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const CoverImage = () => {
  const [bannerImage, setBannerImage] = useState(null);

  const clickInputButton = (e) => {
      document.getElementById("uploadInput").click();
  }
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
        (snapshot) => {
            console.log("Loading");
        },
        (error) => {
            console.log("Error");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                console.log(downloadUrl);
                setBannerImage(downloadUrl);
                sessionStorage.setItem("event_banner", downloadUrl);
                document.getElementById("banner").style.backgroundImage = `url(${downloadUrl})`;
            })
        }
    );
}
  return (
    <div 
    style={{
      backgroundImage: `url("")`,
      backgroundSize: "cover",
      width: "inherit",
      height: "500px",
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