import {
  iData,
  iDataRequired,
  iList,
  iListRequired,
} from "../interfaces/interfaces";
import { typeOf } from "./typeOf";

const validateListData = (payload: any): iList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: iListRequired[] = ["listName", "data"];

  const hasRequiredKeys: boolean = payloadKeys.every((key: any) => {
    return requiredKeys.includes(key);
  });

  const hasRequiredKeysLess: boolean = requiredKeys.every((key: any) => {
    return payloadKeys.includes(key);
  });

  if (!hasRequiredKeysLess) {
    throw new Error('The list fields are: "listName" and "data"');
  }

  if (!hasRequiredKeys) {
    throw new Error('The list fields are: "listName" and "data"');
  }

  payload.data.forEach((e: string) => {
    const payloadDataKeys: string[] = Object.keys(e);
    const requiredDataKeys: iDataRequired[] = ["name", "quantity"];

    const hasRequiredDataKeys: boolean = payloadDataKeys.every((key: any) => {
      return requiredDataKeys.includes(key);
    });

    if (!hasRequiredDataKeys) {
      throw new Error('Updatable fields are: "name" and "quantity"');
    }
  });

  if (!typeOf("string", payload.listName)) {
    throw new Error("The list name need to be a string");
  }

  if (!typeOf("array", payload.data)) {
    throw new Error("The data need to be a array");
  }

  payload.data.forEach((e: iData) => {
    if (!typeOf("string", e.name)) {
      throw new Error("The data values 'name' need to be a string");
    }

    if (!typeOf("string", e.quantity)) {
      throw new Error("The data values 'quantity' need to be a string");
    }
  });

  return payload;
};

export { validateListData };
