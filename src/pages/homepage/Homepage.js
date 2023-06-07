import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { readNews, readLast, countNews } from "../../apis/news";
import NewsLetter from "./news/NewsLetter";
import s from "./Homepage.module.scss";
import { NavLink } from "react-router-dom";

export default function Admin() {
  const [newsLetter, setNewLetter] = useState([]);
  const [lastNews, setLastNews] = useState([]);

  const news = async () => {
    try {
      const resNews = await readNews();
      const resLast = await readLast();
      setNewLetter(resNews);
      setLastNews(resLast);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCount = async (id) => {
    try {
      await countNews(id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  return (
    <section>
      <div className={`${s.container}`}>
        {lastNews.length > 0 && (
          <div className={`d-flex flex-column aic`}>
            <NavLink
              onClick={() => handleCount(lastNews[0].id)}
              to={`/resume?id=${lastNews[0].id}`}
              className={`${s.last} m10`}>
              <h1 className="m20">A LA UNE !</h1>
              <h2 className="m20">{lastNews[0].title}</h2>
              <h3 className="secondary m20">{lastNews[0].type}</h3>
              <p className="m20">{lastNews[0].content}</p>
            </NavLink>

            <div className={`${s.group} d-flex jcse`}>
              {lastNews.map((a, i) => (
                <div className={`${s.oneNews}`}>
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                    <p className="m20">{a.content}</p>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div id="container" className={`${s.news} d-flex flex-column jcsb`}>
        <NewsLetter data={newsLetter} />
      </div>
    </section>
  );
}
