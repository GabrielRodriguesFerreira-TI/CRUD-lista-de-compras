interface iData {
  name?: string;
  quantity?: string;
}

interface iList {
  listName: string;
  data: iData[];
  id: number;
}

type iListRequired = "listName" | "data";

type iDataRequired = "name" | "quantity";

export { iList, iListRequired, iDataRequired, iData };
