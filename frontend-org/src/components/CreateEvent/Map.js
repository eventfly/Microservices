import React from 'react'
import MapPicker from 'react-google-map-picker'
import { useState } from 'react';

// const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;

const Map = ({DefaultLocation, onChange}) => {
    const defaultLocation = DefaultLocation;
    const [zoom, setZoom] = useState(DefaultZoom);
      
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
                onChangeLocation={(lat, lng) => onChange({lat:lat, lng:lng})} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
            />
        </div>
    )

}

export default Map