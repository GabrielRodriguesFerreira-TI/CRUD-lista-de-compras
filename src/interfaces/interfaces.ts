interface iDataRequest {
  name?: string;
  quantity?: string;
}

interface iList {
  listName: string;
  data: iDataRequest[];
  id: number;
}

interface iListRequest {
  listName: string;
  data: {
    name: string;
    quantity: string;
  }[];
  id: number;
}

export { iList, iDataRequest, iListRequest };
