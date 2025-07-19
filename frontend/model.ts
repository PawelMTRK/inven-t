type Category = {
  id: number,
  name: string,
  description: string
}

type Item = {
  id: number
  name: string,
  amount: number,
  code: string,
  category_id: number
}

type Order = {
  id: number,
  supplier: string
  ordered_date: string,
  amount: number,
  item_id: number
}

export type Data = Category | Item | Order;

export const getLabel = (data: Data): string => {
  if ("supplier" in data) {
    return data.supplier
  } else {
    return data.name
  }
}
