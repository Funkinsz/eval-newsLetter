import { useEffect, useState } from "react";
import {
  readNews,
  readLast,
  countNews,
  readPage,
  readViews,
} from "../../apis/news";
import NewsLetter from "./news/NewsLetter";
import s from "./Homepage.module.scss";
import { NavLink, ScrollRestoration } from "react-router-dom";

export default function Admin() {
  const [newsLetter, setNewLetter] = useState([]);
  const [lastNews, setLastNews] = useState([]);
  const [newsPage, setNewsPage] = useState([]);
  const [moreViews, setMoreViews] = useState([]);

  const news = async () => {
    try {
      const resNews = await readNews();
      const resLast = await readLast();
      const resPage = await readPage();
      const resView = await readViews();
      setNewLetter(resNews);
      setLastNews(resLast);
      setNewsPage(resPage);
      setMoreViews(resView);
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
            <h1 className="m20">A LA UNE !</h1>
            <NavLink
              onClick={() => handleCount(lastNews[0].id)}
              to={`/resume?id=${lastNews[0].id}`}
              className={`${s.last} m10`}
            >
              <div className="imge">
                <img src={lastNews[0].img} alt="" />
              </div>
              <h2 className="m20">{lastNews[0].title}</h2>
              <h3 className="secondary m20">{lastNews[0].type}</h3>
            </NavLink>

            <div className={`d-flex`}>
              <NavLink
                onClick={() => handleCount(lastNews[1].id)}
                to={`/resume?id=${lastNews[1].id}`}
                className={`${s.second} m10`}
              >
                <div className="img">
                  <img src={lastNews[1].img} alt="" />
                </div>
                <h2 className="m20">{lastNews[1].title}</h2>
                <h3 className="secondary m20">{lastNews[1].type}</h3>
              </NavLink>

              <NavLink
                onClick={() => handleCount(lastNews[2].id)}
                to={`/resume?id=${lastNews[2].id}`}
                className={`${s.second} m10`}
              >
                <div className="img">
                  <img src={lastNews[2].img} alt="" />
                </div>
                <h2 className="m20">{lastNews[2].title}</h2>
                <h3 className="secondary m20">{lastNews[2].type}</h3>
              </NavLink>
            </div>

            <div className="divider"></div>

            <h1 className="m20">LES PLUS RECENTS !</h1>
            <div className={`${s.group} d-flex jcse`}>
              {newsLetter.map((a, i) => (
                <div className={`${s.oneNews}`}>
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}
                  >
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <h1 className="m20">LES PLUS VUES !</h1>

            <div className={`${s.group} d-flex jcse`}>
              {moreViews.map((a, i) => (
                <div className={s.oneNews}>
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}
                  >
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div id="container" className={`${s.news} d-flex flex-column jcsb`}>
        <NewsLetter data={newsPage} />
      </div>
      <ScrollRestoration />
    </section>
  );
}
