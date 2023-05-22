export enum AppRoute {
  Main = '/',
  Booking = '/quest/:id/booking',
  Contacts = '/contacts',
  Login = '/login',
  MyQuests = '/my-quests',
  Quest = '/quest/:id',
}

export const CityLocation = {
  latitude: 59.939099,
  longitude: 30.315877,
  zoom: 10,
} as const;

export const ContactsLocation = {
  lat: 59.968322,
  lng: 30.317359
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  UserProcess = 'USER_PROCESS',
  Quests = 'QUESTS',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
}

export enum ApiRoute {
  Quests = '/quest',
  Login = '/login',
  Reservation = '/reservation',
}

export const QuestType = {
  adventure: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'Sci-fi': 'Sci-fi',
};

export const defaultUserBooking = {
  date: '',
  time: '',
  contactPerson: '',
  phone: '',
  withChildren: false,
  peopleCount: 0,
  placeId: '',
  questId: ''
};

export const questTheme: { [key: string]: string } = {
  adventure: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
};

export const questLevel: { [key: string]: string } = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export const questDate: { [key: string]: string } = {
  today: 'Сегодня',
  tomorrow: 'Завтра',
};

export const URL = 'https://grading.design.pages.academy/v1/escape-room/';
