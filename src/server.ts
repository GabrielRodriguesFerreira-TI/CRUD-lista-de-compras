import express, { Application, json } from "express";
import {
  createList,
  deleteItem,
  deleteOneItem,
  readLists,
  readOneList,
} from "./logic";

const server: Application = express();
server.use(json());

server.post("/purchaseList", createList);
server.get("/purchaseList", readLists);
server.get("/purchaseList/:purchaseListId", readOneList);
server.delete("/purchaseList/:purchaseListId/:itemName", deleteOneItem);
server.delete("/purchaseList/:purchaseListId", deleteItem);

const runningMsg: string = "Server running on port http://localhost:3000";
server.listen(3000, () => console.log(runningMsg));