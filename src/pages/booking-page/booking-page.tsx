import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store';
import { getQuestInfo } from '../../store/quests-data/quests-data-selectors';
import { useEffect } from 'react';
import { fetchBookingQuestAction } from '../../store/api-action';
import BookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import { isLoadingPlaces } from '../../store/booking-data/booking-data-selectors';

export default function BookingPage() {

  const dispatch = useAppDispatch();

  const currentQuest = useAppSelector(getQuestInfo);
  const isLoading = useAppSelector(isLoadingPlaces);

  useEffect(() => {
    if (currentQuest) {
      dispatch(fetchBookingQuestAction(currentQuest.id));
    }
  }, [currentQuest, dispatch]);

  if (!currentQuest) {
    return null;
  }
  if (isLoading) {
    return null;
  }

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
                <Map height={'529px'}/>
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская</p>
            </div>
          </div>
          <BookingForm />
        </div>
      </main>
    </>
  );
}
