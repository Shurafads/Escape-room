import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapParam } from '../../const';
import { ContactsMapParam } from '../../const';
import leaflet from 'leaflet';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getQuestPlaces } from '../../store/booking-data/booking-data-selectors';
import { useAppSelector } from '../../store';
import { useState } from 'react';
import { TQuestPlaces } from '../../types/quest-places';

type MapProps = {
  height: string;
}

export default function Map({height}: MapProps) {

  const location = useLocation();
  const questPlaces = useAppSelector(getQuestPlaces);

  const [currentMarker, setCurrentMarker] = useState(questPlaces[0]);

  const activeMapIcon = leaflet.icon({
    iconUrl: '/img/svg/pin-active.svg',
    iconSize: [22, 42],
    iconAnchor: [11, 42],
  });

  const handleMarkerClick = (place: TQuestPlaces) => {
    setCurrentMarker(place);
  };


  return (
    <MapContainer center={[MapParam.latitude, MapParam.longitude]} zoom={MapParam.zoom} scrollWheelZoom={false} style={{height: height}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</  a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      {location.pathname === AppRoute.Contacts ?
        <Marker position={[ContactsMapParam.lat, ContactsMapParam.lng]} icon={activeMapIcon} /> :
        questPlaces.map((place) =>
          <Marker key={place.id} position={[Number(place.location.coords[0]), Number(place.location.coords[1])]} icon={activeMapIcon} eventHandlers={{click: () => handleMarkerClick(place)}}/>
        )}
    </MapContainer>
  );
}

