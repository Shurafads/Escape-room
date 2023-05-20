export enum AppRoute {
  Main = '/',
  Booking = '/quest/:id/booking',
  Contacts = '/contacts',
  Login = '/login',
  MyQuests = '/my-quests',
  Quest = '/quest/:id',
}

export const MapParam = {
  latitude: 59.939099,
  longitude: 30.315877,
  zoom: 10,
};

export const ContactsMapParam = {
  lat: 59.968322,
  lng: 30.317359
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  UserProcess = 'USER_PROCESS',
  Quests = 'QUESTS',
}

export enum ApiRoute {
  Quests = '/quest',
}

export const URL = 'https://grading.design.pages.academy/v1/escape-room/';
