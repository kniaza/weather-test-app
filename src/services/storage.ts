import { CityStorageItem } from '@/types/storage.type';

export default class Storage<T> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get state(): T[] {
    return JSON.parse(localStorage.getItem(this.name) as string);
  }

  set state(data: T[]) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
}

// Name of storages
export const CITIES_KEY = 'savedCities';

// Storage instances
export const citiesStorage = new Storage<CityStorageItem>(CITIES_KEY);
