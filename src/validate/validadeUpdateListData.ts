import { iDataRequest } from "../interfaces/interfaces";
import { typeOf } from "./typeOf";

const validateUpdateListData = (payload: iDataRequest): iDataRequest => {
  const reqKey: string[] = Object.keys(payload);
  const requiredReqKeys: string[] = ["name", "quantity"];

  const hasRequiredReqKeys: boolean = reqKey.every((key: string) => {
    return requiredReqKeys.includes(key);
  });

  if (!hasRequiredReqKeys) {
    throw new Error('Updatable fields are: "name" and "quantity"');
  }

  if (!typeOf("string", payload.quantity)) {
    throw new Error(`The data values 'quantity' need to be a string`);
  }

  if (!typeOf("string", payload.name)) {
    throw new Error("The data values 'name' need to be a string");
  }

  return payload;
};

export { validateUpdateListData };
