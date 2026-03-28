import path from "path";
import { JsonManager } from "./JsonManager";

const productFilePath = path.join("tests/test-data", "ProductData.json");

export class AppDataManager {

  static get(key: string) {
    const data = JsonManager.read(productFilePath);

    if (!data[key]) {
      throw new Error(`Key "${key}" not found in ProductData`);
    }

    return data[key];
  }

  static getAll() {
    return JsonManager.read(productFilePath);
  }
}