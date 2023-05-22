export type TBookingInfo = {
  id: string;
  location: {
  address: string;
  coords: number[];
  };
  slots: {
    today: [{
      time: string;
      isAvailable: boolean;
    }];
    tomorrow: [{
      time: string;
      isAvailable: boolean;
    }];
  };
}
