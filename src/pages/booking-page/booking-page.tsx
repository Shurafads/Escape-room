import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store';
import { getLoadingQuestInfoStatus, getQuestInfo } from '../../store/quests-data/quests-data-selectors';
import { useEffect, useState } from 'react';
import { fetchBookingQuestAction, fetchQuestInfoAction } from '../../store/api-action';
import BookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import { getLoadingPlacesStatus, getQuestPlaces } from '../../store/booking-data/booking-data-selectors';
import { TQuestPlaces } from '../../types/quest-places';
import { useParams } from 'react-router-dom';
import LoadingPage from '../loading-page/loading-page';

export default function BookingPage() {

  const dispatch = useAppDispatch();
  const params = useParams();

  const currentQuest = useAppSelector(getQuestInfo);
  const questPlaces = useAppSelector(getQuestPlaces);
  const isLoadingPlaces = useAppSelector(getLoadingPlacesStatus);
  const isLoadingQuestInfoStatus = useAppSelector(getLoadingQuestInfoStatus);

  const [currentPlace, setCurrentPlace] = useState<TQuestPlaces | null>(null);

  useEffect(() => {
    if (currentQuest) {
      dispatch(fetchBookingQuestAction(currentQuest.id));
    }
  }, [currentQuest, dispatch]);

  useEffect(() => {
    if (questPlaces) {
      setCurrentPlace(questPlaces[0]);
    }
  }, [questPlaces]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchQuestInfoAction(params.id));
    }
  }, [params.id, dispatch]);

  if (!currentQuest) {
    return <LoadingPage />;
  }

  if (isLoadingQuestInfoStatus || isLoadingPlaces) {
    return <LoadingPage />;
  }
  const handleMarkerClick = (place: TQuestPlaces) => {
    setCurrentPlace(place);
  };

  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={currentQuest.coverImgWebp}/>
            <img src={currentQuest.coverImg} srcSet={currentQuest.coverImg} width="1366" height="1959" alt=""/>
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{currentQuest.title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <Map height={'529px'} onMarkerClick={handleMarkerClick} currentPlace={currentPlace}/>
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: {currentPlace?.location.address}</p>
            </div>
          </div>
          <BookingForm currentPlace={currentPlace}/>
        </div>
      </main>
    </>
  );
}
