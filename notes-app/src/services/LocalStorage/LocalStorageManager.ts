export class LocalStorageManager {
  static saveItemToLocalStorage<T>(key: string, item: T) {
    const items: T[] = JSON.parse(localStorage.getItem(key) || "[]");
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
  }

  static loadItemsFromLocalStorage<T>(key: string): T[] {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  static deleteFromLocalStorage<T extends { id: string }>(
    key: string,
    id: string
  ) {
    const items: T[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
  }

  static updateItemInLocalStorage<T extends { id: string }>(
    key: string,
    updatedItem: T
  ) {
    const items: T[] = JSON.parse(localStorage.getItem(key) || "[]");
    const itemIndex = items.findIndex((item) => item.id === updatedItem.id);
    if (itemIndex !== -1) {
      items[itemIndex] = updatedItem;
    }
    localStorage.setItem(key, JSON.stringify(items));
  }
}
