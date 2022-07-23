import axios from "axios";

const getTraining = async () => {
  const { data } = await axios.get("/trainings");
  return data;
};

export default getTraining;
