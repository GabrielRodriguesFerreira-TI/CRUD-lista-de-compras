import { NextFunction, Request, Response } from "express";
import list from "../database";

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

export { verifyIdExists };
