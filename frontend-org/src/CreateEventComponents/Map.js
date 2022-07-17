import React from 'react'
import MapPicker from 'react-google-map-picker'
import { useState } from 'react';

const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;

const Map = () => {
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    
    function handleChangeLocation (lat, lng){
        sessionStorage.setItem("event_lat", String(lat));
        sessionStorage.setItem("event_long", String(lng));
        setLocation({lat:lat, lng:lng});
      }
      
    function handleChangeZoom (newZoom){
    setZoom(newZoom);
    }
    return (
        <div className={"Maps"}>
            <label htmlFor={"map"}>Select location</label>
            <div id={"mapDiv"} hidden>
            </div>
            <br></br><br></br>
            <MapPicker 
                defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height:'400px', width: 'inherit'}}
                onChangeLocation={handleChangeLocation} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyAUPUi1_v44DEqygsoTsHexjaT0Nx4snrE'
            />
        </div>
    )

}

export default Map