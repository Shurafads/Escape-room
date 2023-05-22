import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card-list/card-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchReservationAction } from '../../store/api-action';
import { getReservationList, getReservationLoadingStatus } from '../../store/reservation-data/reservation-data-selectors';
import LoadingPage from '../loading-page/loading-page';
import NoReservedList from '../../components/no-reserved-list/no-reserved-list';


export default function MyQuestsPage() {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getReservationLoadingStatus);
  const reservationList = useAppSelector(getReservationList);

  useEffect(() => {
    dispatch(fetchReservationAction());
  },[dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const iseReservations = reservationList.length > 0;

  return (
    <>
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          {iseReservations ? <CardList /> : <NoReservedList />}
        </div>
      </main>
    </>
  );
}
