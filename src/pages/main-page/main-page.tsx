import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card-list/card-list';
import FilterForm from '../../components/filter-form/filter-form';
import { getLoadingQuestsStatus, getQuests } from '../../store/quests-data/quests-data-selectors';
import { useAppSelector } from '../../store';
import NoCardList from '../../components/no-card-list/no-card-list';
import LoadingPage from '../loading-page/loading-page';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useHistoryRedirect } from '../../hooks/use-history-redirect';
import { AuthorizationStatus } from '../../const';
import { useLocation } from 'react-router-dom';

export default function MainPage() {

  const location = useLocation();
  const questsList = useAppSelector(getQuests);
  const isLoading = useAppSelector(getLoadingQuestsStatus);
  const isQuests = questsList.length > 0;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const { saveUrl } = useHistoryRedirect();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    saveUrl(location.pathname);
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <FilterForm />
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          {isQuests ? <CardList /> : <NoCardList />}
        </div>
      </main>
    </>
  );
}
