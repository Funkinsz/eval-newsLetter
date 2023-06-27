import { useContext, useEffect, useState } from "react";
import { countNews, newsLiked, readPage, readTheme } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NewsLetter from "../news/NewsLetter";
import { AuthContext } from "../../../context";

export default function Theme() {
  const [newsTheme, setNewsTheme] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const theme = queryParameters.get("t");
  const { user } = useContext(AuthContext);
  const data = { user: user ? user.id : null, theme };
  const [newsPage, setNewsPage] = useState([]);

  const news = async () => {
    try {
      const resTheme = await readTheme(data);
      const resPage = await readPage(user ? user.id : null);
      setNewsTheme(resTheme);
      setNewsPage(resPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCount = async (idNews) => {
    try {
      await countNews(idNews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, [theme]);

  const handleLike = async (e) => {
    if (!user) {
      navigate("/login");
    } else {
      await newsLiked({ user, e });
      news();
    }
  };

  return (
    <section className="d-flex">
      <div className={`${s.container}`}>
        {newsTheme.length > 0 && (
          <div className="d-flex flex-column aic">
            <div
              className={`${s.last} ${s.border} d-flex flex-column flex-fill jcse m10`}>
              <NavLink
                onClick={() => handleCount(newsTheme[0].idNews)}
                to={`/resume?id=${newsTheme[0].idNews}`}
                className={`${s.last}`}>
                <h1 className="m20">A LA UNE !</h1>
                <div className="imge">
                  <img src={newsTheme[0].img} alt="" />
                </div>
                <h2 className="m20">{newsTheme[0].title}</h2>
                <h3 className="secondary m20">{newsTheme[0].type}</h3>
              </NavLink>
              <div className="i d-flex aic m20">
                {newsTheme[0].isLike === 1 ? (
                  <i
                    onClick={() => handleLike(newsTheme[0])}
                    className="fa-solid fa-heart"></i>
                ) : (
                  <i
                    onClick={() => handleLike(newsTheme[0])}
                    className="fa-regular fa-heart"></i>
                )}
                <p>{newsTheme[0].liked}</p>
              </div>
            </div>

            <div className={`${s.group} d-flex`}>
              {newsTheme.slice(1).map((a, i) => (
                <div
                  key={i}
                  className={`${s.oneNews} ${s.border} d-flex flex-fill flex-column jcsb m10`}>
                  <NavLink
                    onClick={() => handleCount(a.idNews)}
                    to={`/resume?id=${a.idNews}`}>
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                  </NavLink>
                  <div className="i d-flex aic m20">
                    {a.isLike === 1 ? (
                      <i
                        onClick={() => handleLike(a)}
                        className="fa-solid fa-heart"></i>
                    ) : (
                      <i
                        onClick={() => handleLike(a)}
                        className="fa-regular fa-heart"></i>
                    )}
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
    </section>
  );
}
