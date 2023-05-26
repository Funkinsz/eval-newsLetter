import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";
import { readCount, readNews } from "../../apis/news";
import NewsLetter from "./pages/NewsLetter";

export default function Admin() {
  const { user } = useContext(AuthContext);

  const [newsLetter, setNewLetter] = useState([]);
  const [pages, setPages] = useState([]);

  const news = async () => {
    try {
      const resNews = await readNews();
      const resCount = await readCount();
      setNewLetter(resNews);
      setPages(resCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  console.log(newsLetter);
  console.log(pages);

  const numberPages = pages % 5;

  let items = [];

  for (let i = 1; i <= numberPages; i++) {
    items.push(i);
  }

  console.log(items);
  console.log(numberPages);
  return (
    <section>
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
