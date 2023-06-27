import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";
import { readNews } from "../../apis/news";
import NewsLetter from "./pages/NewsLetter";

export default function Admin() {
  const { user } = useContext(AuthContext);

  const [newsLetter, setNewLetter] = useState([]);

  const news = async () => {
    try {
      const resNews = await readNews();
      setNewLetter(resNews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  return (
    <section className="d-flex aic jcc">
      {user.rôle !== 1 ? (
        <Navigate to="/" />
      ) : (
        <div id="container">
          <h1>ADMIN</h1>
          <nav>
            <ul>
              <NavLink to={"/insert"}>INSERT NEWS</NavLink>
            </ul>
          </nav>

          <NewsLetter data={newsLetter} />
        </div>
      )}
    </section>
  );
}
