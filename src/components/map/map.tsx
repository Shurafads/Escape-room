import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CityLocation } from '../../const';
import { ContactsLocation } from '../../const';
import leaflet from 'leaflet';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getQuestPlaces } from '../../store/booking-data/booking-data-selectors';
import { useAppSelector } from '../../store';
import { TQuestPlaces } from '../../types/quest-places';

type MapProps = {
  height: string;
  onMarkerClick?: (arg0: TQuestPlaces) => void;
  currentPlace?: TQuestPlaces | null;
}

export default function Map({height, onMarkerClick, currentPlace}: MapProps) {

  const location = useLocation();
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

  return (
    <MapContainer center={[CityLocation.latitude, CityLocation.longitude]} zoom={CityLocation.zoom} scrollWheelZoom={false} style={{height: height}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</  a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      {location.pathname === AppRoute.Contacts ?
        <Marker position={[ContactsLocation.lat, ContactsLocation.lng]} icon={activeMapIcon} /> :
        questPlaces.map((place) =>
          <Marker key={place.id} position={[Number(place.location.coords[0]), Number(place.location.coords[1])]} icon={currentPlace?.id === place.id ? activeMapIcon : defaultMapIcon} eventHandlers={{click: () => onMarkerClick?.(place)}}/>
        )}
    </MapContainer>
  );
}

