import { NextFunction, Request, Response } from "express";
import list from "../database";

const verifyUpdatesTypesExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const parms = Number(req.params.purchaseListId);
  const parmsItem = req.params.itemName;
  const listFind = list.findIndex((list) => list.id === parms);
  const resultItem = list[listFind].data.find((e) => {
    return e.name === parmsItem;
  });
  const resultIndex = list[listFind].data.findIndex((e) => {
    return e.name === parmsItem;
  });

  if (listFind === -1) {
    return res
      .status(404)
      .json({ message: `List with id "${parms}" does not exist` });
  } else if (resultIndex === -1) {
    return res
      .status(404)
      .json({ message: `Item with name "${parmsItem}" does not exist` });
  }

  if (resultItem) {
    req.updateItem = resultItem;
  }
  req.updateItemIndex = resultIndex;

  return next();
};

export { verifyUpdatesTypesExists };
