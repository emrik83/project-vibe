import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

// Create separate stores for different data types
const createStore = (storeName: string) => 
  localforage.createInstance({
    name: 'viLibrary',
    storeName
  });

const stores = {
  models: createStore('models'),
  files: createStore('files'),
  thumbnails: createStore('thumbnails')
};

export const localStorageService = {
  async get(store: keyof typeof stores, key: string) {
    return await stores[store].getItem(key);
  },

  async set(store: keyof typeof stores, key: string, value: any) {
    return await stores[store].setItem(key, value);
  },

  async remove(store: keyof typeof stores, key: string) {
    return await stores[store].removeItem(key);
  },

  async list(store: keyof typeof stores) {
    const items: any[] = [];
    await stores[store].iterate((value) => {
      items.push(value);
    });
    return items;
  },

  generateId() {
    return uuidv4();
  }
};