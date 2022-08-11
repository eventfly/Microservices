import '../../styles/Map.css'

import React, { useEffect, useState } from 'react'; 
import maplibre from 'maplibre-gl';
import Map from 'react-map-gl';
import olms from 'ol-mapbox-style';
import * as proj from 'ol/proj';

const MapNew = ({mapIsReadyCallback}) => {

    let mapContainer;
    let marker;

    useEffect(() => {
      const myAPIKey = 'c43472efc7374853a471479c85954ee7'; 
      const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
  
      const initialState = {
        lng: 11,
        lat: 49,
        zoom: 4
      };

      olms(mapContainer, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
        map.getView().setCenter(proj.transform([initialState.lng, initialState.lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(initialState.zoom);
  
        mapIsReadyCallback(map);
      });
  
    //   const map = new maplibre.Map({
    //     container: mapContainer,
    //     style: `${mapStyle}?apiKey=${myAPIKey}`,
    //     center: [initialState.lng, initialState.lat],
    //     zoom: initialState.zoom
    //     });


    //     marker = new maplibre.Marker({
    //         color: "#FF0000",
    //         draggable: true
    //         }).setLngLat([11, 49])
    //         .addTo(map);
            
    //         var lngLat = marker.getLngLat();
    //         console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
  
    //   mapIsReadyCallback(marker);
  
    }, [mapContainer, marker]);


    return ( 

        <>
        
        <div className="map-container" ref={el => mapContainer = el}></div>
        
        </>

    );
}
 
export default MapNew;