import { useContext, useEffect, useState } from "react";
import {
  readNews,
  readLast,
  countNews,
  readPage,
  readViews,
  readLike,
} from "../../apis/news";
import NewsLetter from "./news/NewsLetter";
import s from "./Homepage.module.scss";
import { NavLink, ScrollRestoration, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newsLetter, setNewLetter] = useState([]);
  const [lastNews, setLastNews] = useState([]);
  const [newsPage, setNewsPage] = useState([]);
  const [moreViews, setMoreViews] = useState([]);
  const [moreLike, setMoreLike] = useState([]);

  const news = async () => {
    try {
      const resNews = await readNews();
      const resLast = await readLast();
      const resPage = await readPage();
      const resView = await readViews();
      const resLike = await readLike();
      setNewLetter(resNews);
      setLastNews(resLast);
      setNewsPage(resPage);
      setMoreViews(resView);
      setMoreLike(resLike);
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

  function handleLike() {
    if (!user) {
      navigate("/login");
    } else {
      console.log("liked");
    }
  }

  return (
    <section>
      <div className={`${s.container}`}>
        {lastNews.length > 0 && (
          <div className={`d-flex flex-column aic`}>
            <h1 className="m20">A LA UNE !</h1>
            <div
              className={`${s.last} ${s.border} d-flex flex-column flex-fill jcse m10`}
            >
              <NavLink
                onClick={() => handleCount(lastNews[0].id)}
                to={`/resume?id=${lastNews[0].id}`}
                className={`${s.last}`}
              >
                <div className="imge">
                  <img src={lastNews[0].img} alt="" />
                </div>
                <h2 className="m20">{lastNews[0].title}</h2>
                <div className="d-flex aic jcsb">
                  <h3 className="secondary m20">{lastNews[0].type}</h3>
                </div>
              </NavLink>
              <div className="i d-flex aic">
                <i onClick={handleLike} className="fa-regular fa-heart"></i>
                <p>{lastNews[0].liked}</p>
              </div>
            </div>

            <div className={`d-flex`}>
              <div
                className={`${s.second} ${s.border} d-flex flex-fill flex-column jcsb m10`}
              >
                <NavLink
                  onClick={() => handleCount(lastNews[1].id)}
                  to={`/resume?id=${lastNews[1].id}`}
                  className={`d-flex flex-column flex-fill jcsb`}
                >
                  <div className="img">
                    <img src={lastNews[1].img} alt="" />
                  </div>
                  <h2 className="m20">{lastNews[1].title}</h2>
                  <h3 className="secondary m20">{lastNews[1].type}</h3>
                </NavLink>
                <div className="i d-flex aic">
                  <i onClick={handleLike} className="fa-regular fa-heart"></i>
                  <p>{lastNews[1].liked}</p>
                </div>
              </div>

              <div
                className={`${s.second} ${s.border} d-flex flex-fill flex-column jcsb m10`}
              >
                <NavLink
                  onClick={() => handleCount(lastNews[2].id)}
                  to={`/resume?id=${lastNews[2].id}`}
                  className={`d-flex flex-column flex-fill jcsb`}
                >
                  <div className="img">
                    <img src={lastNews[2].img} alt="" />
                  </div>
                  <h2 className="m20">{lastNews[2].title}</h2>
                  <h3 className="secondary m20">{lastNews[2].type}</h3>
                </NavLink>
                <div className="i d-flex aic">
                  <i onClick={handleLike} className="fa-regular fa-heart"></i>
                  <p>{lastNews[2].liked}</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <h1 className="m20">LES PLUS RECENTS !</h1>
            <div className={`${s.group} d-flex jcse`}>
              {newsLetter.map((a, i) => (
                <div className={`${s.oneNews} ${s.border}`}>
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}
                    className={"d-flex flex-column jcsb"}
                  >
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                  <div className="i d-flex aic">
                    <i onClick={handleLike} className="fa-regular fa-heart"></i>
                    <p>{a.liked}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <h1 className="m20">LES PLUS VUES !</h1>
            <div className={`${s.group} d-flex jcse`}>
              {moreViews.map((a, i) => (
                <div
                  className={`${s.oneNews} ${s.border} d-flex flex-fill flex-column jcse`}
                >
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}
                    className={"d-flex flex-fill flex-column jcsb"}
                  >
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                  <div className="i d-flex aic">
                    <i onClick={handleLike} className="fa-regular fa-heart"></i>
                    <p>{a.liked}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <h1 className="m20">LES PLUS LIKE !</h1>
            <div className={`${s.group} d-flex jcse`}>
              {moreLike.map((a, i) => (
                <div
                  className={`${s.oneNews} ${s.border} d-flex flex-fill flex-column jcse`}
                >
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}
                    className={"d-flex flex-fill flex-column jcsb"}
                  >
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                  <div className="i d-flex aic">
                    <i onClick={handleLike} className="fa-regular fa-heart"></i>
                    <p>{a.liked}</p>
                  </div>
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
