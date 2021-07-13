import { getItem } from "../../adapters/lightspeed/lightspeed";

export default async (req, res) => {
  const { itemID } = req.query;
  const response = await getItem(itemID);
  const item = response[0];

  res.json(item);
};
