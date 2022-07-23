import axios from "axios";

const getResults = async () => {
  const { data } = await axios.get("/results");
  return data;
};

export default getResults;
