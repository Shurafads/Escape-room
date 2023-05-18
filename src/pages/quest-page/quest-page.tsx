import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { TQuestInfo } from '../../types/quests-info';

type QuestPageProps = {
  questsInfo: TQuestInfo[];
}

export default function QuestPage({questsInfo}: QuestPageProps) {

  const params = useParams();
  const currentOffer = questsInfo.find((quest) => quest.id === params.id);

  if (!currentOffer) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{currentOffer.title}</h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>
              {currentOffer.type}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>3&ndash;{currentOffer.peopleMinMax}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>
                {currentOffer.level}
              </li>
            </ul>
            <p className="quest-page__description">{currentOffer.description}</p>
            <Link className="btn btn--accent btn--cta quest-page__btn" to="booking.html">Забронировать</Link>
          </div>
        </div>
      </main>
    </>
  );
}
