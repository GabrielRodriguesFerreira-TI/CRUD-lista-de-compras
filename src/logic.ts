import { Request, Response } from "express";
import list from "./database";
import { iList } from "./interfaces/interfaces";
import { validateListData } from "./validate/validateListData";
import { validateUpdateListData } from "./validate/validadeUpdateListData";

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
  try {
    validateUpdateListData(req.body);
    
    const parms = Number(req.params.purchaseListId);
    const listFind = list.findIndex((list) => list.id === parms);
    

    list[listFind].data[req.updateItemIndex] = {
      ...req.updateItem,
      ...req.body,
    };

    return res.status(200).json(list[listFind]);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error });
  }
};

export {
  createList,
  readLists,
  readOneList,
  deleteOneItem,
  deleteItem,
  updateListItem,
};
