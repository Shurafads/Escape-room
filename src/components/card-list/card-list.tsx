import { TQuests } from '../../types/quests';
import Card from '../card/card';

type CardListProps = {
  quests: TQuests[];
};

export default function CardList({ quests }: CardListProps) {
  return (
    <div className="cards-grid">
      {quests && quests.map((quest) => <Card key={quest.id} quest={quest} />)}
    </div>
  );
}

