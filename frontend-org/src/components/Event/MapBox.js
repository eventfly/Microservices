import * as React from 'react';
import { useState, useEffect } from "react";
import Map, {Marker} from 'react-map-gl';
import markerImg from '../../images/marker.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/MapBox.css'

const MapBox = ({defaultLat, defaultLng, onDrag, displayType, displayMarker, isDraggable}) =>{

  const [marker, setMarker] = useState(null);

  useEffect(()=>{

    if(marker == null){
      setMarker({
        lat: defaultLat,
        lng: defaultLng
      })
    }

  }, [defaultLat, defaultLng])

  return (
    <>
        <label htmlFor="location" className={"label"}> Location </label>
        <Map
            initialViewState={{
              longitude: defaultLng,
              latitude: defaultLat,
              zoom: 10
            }}
            style={{width: '100%', height: '300px'}}
            scrollZoom={displayType == 'block' ? true : false}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoidGFuemltYXphZCIsImEiOiJjbDZ4eDN1NnIwMHV5M2NvMTdvZWVzc2txIn0.mEyo9nBDPWk1noTinwQbDg"
        >


        <Marker 
          longitude={marker ? marker.lng : defaultLng} 
          latitude={marker ? marker.lat : defaultLat}
          draggable={isDraggable}
          anchor="bottom"
          onDragEnd={(evt)=>{

            setMarker({
              lat: evt.lngLat.lat,
              lng: evt.lngLat.lng
            })
            onDrag(evt.lngLat.lat, evt.lngLat.lng)
          }} 
        >
          
          <img src={markerImg} className="map-marker-style" 
            style={{
              display: `${displayMarker}`
            }} 
          />
        
        </Marker>

        </Map>
    </>
  )
}

export default MapBox;