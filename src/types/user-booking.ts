export type TBookingForm = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
  questId: string;
  'user-agreement'?: string;
};
