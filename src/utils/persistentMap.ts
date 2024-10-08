export class PersistentMap<K, V> extends Map<K, V> {
  private storageKey: string;
  private storage?: Storage;

  constructor(
    storageKey: string,
    entries?: readonly (readonly [K, V])[] | null,
    useLocalStorage = false
  ) {
    super(entries);
    if (
      typeof window !== "undefined" &&
      typeof sessionStorage !== "undefined"
    ) {
      this.storage = useLocalStorage ? localStorage : sessionStorage;
    }
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (!this.storage) return;

    const storedData = this.storage.getItem(this.storageKey);
    if (storedData) {
      try {
        const parsedData: [K, V][] = JSON.parse(storedData);
        parsedData.forEach(([key, value]) => {
          super.set(key, value);
        });
      } catch (error) {
        console.error("Failed to parse data from storage", error);
      }
    }
  }

  private saveToStorage(): void {
    if (!this.storage) return;

    try {
      const dataToStore: [K, V][] = Array.from(this.entries());
      this.storage.setItem(this.storageKey, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Failed to save data to storage", error);
    }
  }

  set(key: K, value: V): this {
    super.set(key, value);
    this.saveToStorage();
    return this;
  }

  delete(key: K): boolean {
    const result = super.delete(key);
    if (result) {
      this.saveToStorage();
    }
    return result;
  }

  clear(): void {
    super.clear();
    if (this.storage) {
      this.storage.removeItem(this.storageKey);
    }
  }
}
