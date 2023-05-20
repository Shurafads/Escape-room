import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { AppRoute, ContactsMapParam, MapParam } from '../../const';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { getQuestPlaces } from '../../store/booking-data/booking-data-selectors';

type MapProps = {
  height: string;
}

export default function Map({height}: MapProps) {

  const location = useLocation();

  const mapRef = useRef(null);
  const isRenderedRef = useRef(false);
  const questPlaces = useAppSelector(getQuestPlaces);

  const activeMapIcon = leaflet.icon({
    iconUrl: '/img/svg/pin-active.svg',
    iconSize: [22, 42],
    iconAnchor: [11, 42],
  });

  const defaultMapIcon = leaflet.icon({
    iconUrl: '/img/svg/pin-default.svg',
    iconSize: [22, 42],
    iconAnchor: [11, 42],
  });

  useEffect(() => {

    if (mapRef.current !== null && !isRenderedRef.current) {

      const markers = (map: leaflet.Map) => {
        if (location.pathname === AppRoute.Contacts) {
          return leaflet
            .marker(ContactsMapParam, {
              icon: activeMapIcon
            }).addTo(map);
        }
        questPlaces.map((place) => leaflet.marker(
          {
            lat: Number(place.location.coords[0]),
            lng: Number(place.location.coords[1]),
          }, {
            icon: activeMapIcon
          }).addTo(map)
        );
      };

      const mapOptions = {
        center: {lat: MapParam.latitude, lng: MapParam.longitude},
        zoom: MapParam.zoom
      };

      const cityMap = leaflet.map(mapRef.current, mapOptions);

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</  a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(cityMap);

      markers(cityMap);

      isRenderedRef.current = true;
    }
  }, [mapRef, activeMapIcon, defaultMapIcon, questPlaces, location]);

  return (
    <div className="map__container" style={{height: height}} ref={mapRef}></div>
  );
}

