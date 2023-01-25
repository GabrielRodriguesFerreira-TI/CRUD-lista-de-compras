import express, { Application, json } from "express";
import {
  createList,
  deleteItem,
  deleteOneItem,
  readLists,
  readOneList,
  updateListItem,
  verifyIdExists,
} from "./logic";

const server: Application = express();
server.use(json());
server.use("/purchaseList/:purchaseListId", verifyIdExists);

server.post("/purchaseList", createList);
server.get("/purchaseList", readLists);
server.get("/purchaseList/:purchaseListId", readOneList);
server.patch("/purchaseList/:purchaseListId/:itemName", updateListItem);
server.delete("/purchaseList/:purchaseListId", deleteItem);
server.delete("/purchaseList/:purchaseListId/:itemName", deleteOneItem);

const runningMsg: string = "Server running on port http://localhost:3000";
server.listen(3000, () => console.log(runningMsg));
