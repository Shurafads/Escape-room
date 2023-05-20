export type TQuestPlaces = {
  id: string;
  location: {
    address: string;
    coords: string[];
  };
  slots: {
    today: [
      {
        time: string;
        isAvailable: false;
      }
    ];
    tomorrow: [
      {
        time: string;
        isAvailable: false;
      }
    ];
  };
}
