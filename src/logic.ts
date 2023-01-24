import { Request, Response } from "express";
import list from "./database";
import { iList } from "./interfaces/interfaces";

const createList = (req: Request, res: Response): Response => {
  try {
    const newList: iList = req.body;
    const idNewList: iList = { ...newList, id: 0 };
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
  const parms = Number(req.params.purchaseListId);
  const listFind = list.find((list) => list.id === parms);

  if (listFind === undefined) {
    return res
      .status(404)
      .json({ message: `List with id "${parms}" does not exist` });
  }

  return res.status(200).json(listFind);
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
  const parms = Number(req.params.purchaseListId);
  const listFind = list.findIndex((list) => list.id === parms);

  if (listFind !== -1) {
    list.splice(listFind, 1);
  } else {
    return res
      .status(404)
      .json({ message: `List with id "${parms}" does not exist` });
  }

  return res.status(204).json({ message: "Item deletado com sucesso!" });
};

export { createList, readLists, readOneList, deleteOneItem, deleteItem };
