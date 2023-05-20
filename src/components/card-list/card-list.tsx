import { useAppSelector } from '../../store';
import { getQuests } from '../../store/quests-data/quests-data-selectors';
import Card from '../card/card';

export default function CardList() {

  const questsList = useAppSelector(getQuests);

  return (
    <div className="cards-grid">
      {questsList.map((quest) => <Card key={quest.id} quest={quest} />)}
    </div>
  );
}

