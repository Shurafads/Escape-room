export enum AppRoute {
  Main = '/',
  Booking = '/quest/:id/booking',
  Contacts = '/contacts',
  Login = '/login',
  MyQuests = '/my-quests',
  Quest = '/quest/:id',
}

export enum CityLocation {
  latitude = 59.939099,
  longitude = 30.315877,
  zoom = 10,
}

export enum ContactsLocation {
  lat = 59.968322,
  lng = 30.317359
}

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

export enum QuestType {
  adventure = 'Приключения',
  horror = 'Ужасы',
  mystic = 'Мистика',
  detective = 'Детектив',
  'Sci-fi' = 'Sci-fi',
}

export const QuestTheme: { [key: string]: string } = {
  adventure: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
} as const;

export const QuestLevel: { [key: string]: string } = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

export const QuestDate: { [key: string]: string } = {
  today: 'Сегодня',
  tomorrow: 'Завтра',
} as const;

export const URL = 'https://grading.design.pages.academy/v1/escape-room/';
