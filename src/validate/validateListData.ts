import {
  iDataRequest,
  iList,
  iListRequest,
} from "../interfaces/interfaces";
import { typeOf } from "./typeOf";

const validateListData = (payload: iListRequest): iList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: string[] = ["listName", "data"];

  const hasRequiredKeys: boolean = payloadKeys.every((key: string) => {
    return requiredKeys.includes(key);
  });

  const hasRequiredKeysLess: boolean = requiredKeys.every((key: string) => {
    return payloadKeys.includes(key);
  });

  if (!hasRequiredKeysLess) {
    throw new Error('The list fields are: "listName" and "data"');
  }

  if (!hasRequiredKeys) {
    throw new Error('The list fields are: "listName" and "data"');
  }

  payload.data.forEach(
    (
      e: { name: string; quantity: string },
      index: number,
      array: { name: string; quantity: string }[]
    ) => {
      const payloadDataKeys: string[] = Object.keys(e);
      const requiredDataKeys: string[] = ["name", "quantity"];

      const hasRequiredDataKeys: boolean = payloadDataKeys.every(
        (key: string) => {
          return requiredDataKeys.includes(key);
        }
      );

      if (!hasRequiredDataKeys) {
        throw new Error('Updatable fields are: "name" and "quantity"');
      }
    }
  );

  if (!typeOf("string", payload.listName)) {
    throw new Error("The list name need to be a string");
  }

  if (!typeOf("array", payload.data)) {
    throw new Error("The data need to be a array");
  }

  payload.data.forEach((e: iDataRequest) => {
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
