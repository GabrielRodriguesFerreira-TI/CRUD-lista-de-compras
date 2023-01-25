import { NextFunction, Request, Response } from "express";
import list from "./database";
import {
  iList,
  iListRequired,
  iDataRequired,
  iData,
} from "./interfaces/interfaces";

function is(type: string = "", value: unknown) {
  const toStringResult = Object.prototype.toString
    .call(value)
    .toLowerCase()
    .replace(/[\[\]']/g, "")
    .split(" ")[1];
  return type === toStringResult;
}

const verifyIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const parms = Number(req.params.purchaseListId);
  const listFind = list.find((list) => list.id === parms);
  const listFindIndex = list.findIndex((list) => list.id === parms);

  if (listFind === undefined) {
    return res
      .status(404)
      .json({ message: `List with id "${parms}" does not exist` });
  }

  req.listFind = listFind;
  req.listFindIndex = listFindIndex;

  return next();
};

const validateListData = (payload: any): iList => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: iListRequired[] = ["listName", "data"];

  const hasRequiredKeys: boolean = payloadKeys.every((key: any) => {
    return requiredKeys.includes(key);
  });

  if (!hasRequiredKeys) {
    throw new Error('Updatable fields are: "listName" and "data"');
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

  if (!is("string", payload.listName)) {
    throw new Error("The list name need to be a string");
  }

  if (!is("array", payload.data)) {
    throw new Error("The data need to be a array");
  }

  payload.data.forEach((e: iData) => {
    if (!is("string", e.name)) {
      throw new Error("The data values 'name' need to be a string");
    }

    if (!is("string", e.quantity)) {
      throw new Error("The data values 'quantity' need to be a string");
    }
  });

  return payload;
};

const createList = (req: Request, res: Response): Response => {
  try {
    const validate: iList = validateListData(req.body);
    const idNewList: iList = { ...validate, id: 0 };
    if (list.length === 0) {
      idNewList.id = 1;
      list.push(idNewList);
    } else {
      idNewList.id = list[list.length - 1].id + 1;
      list.push(idNewList);
    }
    return res.status(201).json(idNewList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "error" });
  }
};

const readLists = (req: Request, res: Response): Response => {
  return res.status(200).json(list);
};

const readOneList = (req: Request, res: Response): Response => {
  return res.status(200).json(req.listFind);
};

const deleteOneItem = (req: Request, res: Response) => {
  const parms = Number(req.params.purchaseListId);
  const itemName = req.params.itemName;

  const listFind = list.findIndex((list) => list.id === parms);

  if (listFind !== -1) {
    const deleteOneItem = list[listFind].data.findIndex(
      (itemNameFind) => itemNameFind.name === itemName
    );
    if (deleteOneItem !== -1) {
      list[listFind].data.splice(deleteOneItem, 1);
    } else {
      return res
        .status(404)
        .json({ message: `Item with name "${itemName}" does not exist` });
    }
  } else {
    return res
      .status(404)
      .json({ message: `Item with id "${parms}" does not exist` });
  }

  return res.status(204).json({ message: "Item deletado com sucesso!" });
};

const deleteItem = (req: Request, res: Response): Response => {
  list.splice(req.listFindIndex, 1);
  return res.status(204).json({ message: "Item deletado com sucesso!" });
};

const updateListItem = (req: Request, res: Response): Response => {
  const parms = Number(req.params.purchaseListId);
  const parmsItem = req.params.itemName;
  const listFind = list.findIndex((list) => list.id === parms);
  const resultItem = list[listFind].data.find((e) => {
    return e.name === parmsItem;
  });
  const resultIndex = list[listFind].data.findIndex((e) => {
    return e.name === parmsItem;
  });
  const reqKey: string[] = Object.keys(req.body);
  const requiredReqKeys: iDataRequired[] = ["name", "quantity"];

  const hasRequiredReqKeys: boolean = reqKey.every((key: any) => {
    return requiredReqKeys.includes(key);
  });

  if (!hasRequiredReqKeys) {
    return res
      .status(400)
      .json({ message: 'Updatable fields are: "name" and "quantity"' });
  }

  if (listFind === -1) {
    return res
      .status(404)
      .json({ message: `List with id "${parms}" does not exist` });
  } else if (resultIndex === -1) {
    return res
      .status(404)
      .json({ message: `Item with name "${parmsItem}" does not exist` });
  }

  if (!is("string", req.body.quantity)) {
    return res
      .status(400)
      .json({ message: `The data values 'quantity' need to be a string` });
  }

  if (!is("string", req.body.name)) {
    return res
      .status(400)
      .json({ message: "The data values 'name' need to be a string" });
  }

  list[listFind].data[resultIndex] = { ...resultItem, ...req.body };

  return res.status(200).json(list[listFind]);
};

export {
  createList,
  readLists,
  readOneList,
  deleteOneItem,
  deleteItem,
  verifyIdExists,
  updateListItem,
};
