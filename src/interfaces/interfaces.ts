interface iData {
  name: string;
  quantity: string;
}

interface iList {
  listName: string;
  data: iData[];
  id: number;
}

type iClientRequired = "listName" | "data";

export { iList, iClientRequired };
