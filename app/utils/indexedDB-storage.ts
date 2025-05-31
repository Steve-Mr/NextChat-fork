import { StateStorage } from "zustand/middleware";
import { get, set, del, clear } from "idb-keyval";
import { safeLocalStorage } from "@/app/utils";

const localStorage = safeLocalStorage();

class IndexedDBStorage implements StateStorage {
  public async getItem(name: string): Promise<string | null> {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const value = (await get(name)) || localStorage.getItem(name);
      return value;
    } catch (error) {
      return localStorage.getItem(name);
    }
  }

  public async setItem(name: string, value: string): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const _value = JSON.parse(value);
      if (!_value?.state?._hasHydrated) {
        console.warn("skip setItem", name);
        return;
      }
      await set(name, value);
    } catch (error) {
      localStorage.setItem(name, value);
    }
  }

  public async removeItem(name: string): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }
    try {
      await del(name);
    } catch (error) {
      localStorage.removeItem(name);
    }
  }

  public async clear(): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }
    try {
      await clear();
    } catch (error) {
      localStorage.clear();
    }
  }
}

export const indexedDBStorage = new IndexedDBStorage();
