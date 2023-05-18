import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapParam } from '../../const';
import { useEffect } from 'react';

export default function Map() {

  const mapRef = useRef(null);
  const isRenderedRef = useRef(false);

  const activeMapIcon = leaflet.icon({
    iconUrl: 'img/svg/pin-active.svg',
    iconSize: [22, 42],
    iconAnchor: [11, 42],
  });

  useEffect(() => {

    if (mapRef.current !== null && !isRenderedRef.current) {

      const mapOptions = {
        center: {lat: MapParam.latitude, lng: MapParam.longitude},
        zoom: MapParam.zoom
      };

      const myMap = leaflet.map(mapRef.current, mapOptions);

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</  a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(myMap);

      leaflet
        .marker(mapOptions.center, {
          icon: activeMapIcon
        }).addTo(myMap);

      isRenderedRef.current = true;
    }
  }, [mapRef, activeMapIcon]);

  return (
    <div className="map__container" style={{height: '370px'}} ref={mapRef}></div>
  );
}

