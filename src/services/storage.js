export default class Storage {
  constructor(name) {
    this.name = name;
  }

  get data() {
    return JSON.parse(localStorage.getItem(this.name));
  }

  set data(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
}

// Name of storages
export const CITIES_KEY = 'savedCities';

// Storage instances
export const citiesStorage = new Storage(CITIES_KEY);
