import path from "path";
import { JsonManager } from "../core/JsonManager";

const productFilePath = path.join("tests/data", "ProductData.json");

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