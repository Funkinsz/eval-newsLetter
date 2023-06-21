import { useEffect, useState } from "react";
import { countNews, readTheme } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import NewsLetter from "../news/NewsLetter";

export default function Theme() {
  const [newsTheme, setNewsTheme] = useState([]);
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search);
  const theme = queryParameters.get("t");
  
  const news = async () => {
    try {
      const resTheme = await readTheme(theme);
      setNewsTheme(resTheme);
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
  }, [theme]);

  return (
    <section className="d-flex">
      <div className={`${s.container}`}>
        {newsTheme.length > 0 && (
          <div className="d-flex flex-column aic">
            <NavLink
              onClick={() => handleCount(newsTheme[0].id)}
              to={`/resume?id=${newsTheme[0].id}`}
              className={`${s.last} m10`}>
              <h1 className="m20">A LA UNE !</h1>
              <h2 className="m20">{newsTheme[0].title}</h2>
              <h3 className="secondary m20">{newsTheme[0].type}</h3>
              <div className="imge">
                <img src={newsTheme[0].img} alt="" />
              </div>
              <p className="m20">{newsTheme[0].content}</p>
            </NavLink>

            <div className={`${s.group} d-flex`}>
              {newsTheme.map((a, i) => (
                <div className={`${s.oneNews}`}>
                  <NavLink
                    onClick={() => handleCount(a.id)}
                    to={`/resume?id=${a.id}`}
                    key={i}>
                    <h2 className="m20">{a.title}</h2>
                    <h3 className="secondary m20">{a.type}</h3>
                    <div className="img">
                      <img src={a.img} alt="" />
                    </div>
                    <p className="m20">{a.content}</p>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div id="container" className={`${s.news} d-flex flex-column jcsb`}>
        <NewsLetter data={newsTheme} />
      </div>
    </section>
  );
}
