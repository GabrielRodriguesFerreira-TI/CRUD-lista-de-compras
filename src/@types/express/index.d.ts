import { iList } from "../../interfaces/interfaces";

declare global {
  namespace Express {
    interface Request {
      listFind: iList;
      listFindIndex: number;
    }
  }
}
