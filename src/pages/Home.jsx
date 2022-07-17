import InfoPage from "components/InfoPage";
import { Navigate } from "react-router-dom";
import { useWindowSize } from "hooks/useWindowSize";

const Home = () => {
  const size = useWindowSize();
  if (size.width >= 768) {
    return <Navigate to="/login" />;
  }
  return <InfoPage />;
};

export default Home;
