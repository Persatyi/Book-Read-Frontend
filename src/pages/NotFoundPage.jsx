import { Link } from "react-router-dom";
import Container from "components/Container";

const NotFoundPage = () => {
  return (
    <main>
      <Container>
        <div
          style={{
            textAlign: "center",
            paddingTop: "20px",
          }}
        >
          <h2>Page not found</h2>
          <Link to="/">To home page</Link>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
