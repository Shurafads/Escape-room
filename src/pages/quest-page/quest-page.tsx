import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getLoadingQuestInfoStatus, getQuestInfo } from '../../store/quests-data/quests-data-selectors';
import { fetchQuestInfoAction } from '../../store/api-action';
import { AuthorizationStatus, QuestLevel, QuestTheme } from '../../const';
import LoadingPage from '../loading-page/loading-page';
import { useHistoryRedirect } from '../../hooks/use-history-redirect';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';

export default function QuestPage() {

  const params = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const currentQuest = useAppSelector(getQuestInfo);
  const isLoading = useAppSelector(getLoadingQuestInfoStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const { saveUrl } = useHistoryRedirect();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    saveUrl(location.pathname);
  }

  useEffect(() => {
    let isMounted = true;

    if (params.id && isMounted) {
      dispatch(fetchQuestInfoAction(params.id));
    }

    return () => {
      isMounted = false;
    };
  }, [params.id, dispatch]);

  if (!currentQuest || isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={currentQuest.coverImgWebp}/>
            <img src={currentQuest.coverImg} srcSet={currentQuest.coverImg} width="1366" height="768" alt=""/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{currentQuest.title}</h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>
              {QuestTheme[currentQuest.type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{currentQuest.peopleMinMax[0]}&ndash;{currentQuest.peopleMinMax[1]}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>
                {QuestLevel[currentQuest.level]}
              </li>
            </ul>
            <p className="quest-page__description">{currentQuest.description}</p>
            <Link className="btn btn--accent btn--cta quest-page__btn" to={`/quest/${currentQuest.id}/booking`}>Забронировать</Link>
          </div>
        </div>
      </main>
    </>
  );
}
