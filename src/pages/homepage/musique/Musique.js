import { useEffect, useState } from "react";
import { countNews, readMusic } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink } from "react-router-dom";
import NewsLetter from "../news/NewsLetter";

export default function Musique() {
  const [newsMusic, setNewsMusic] = useState([]);
  
  const queryParameters = new URLSearchParams(window.location.search);
  const theme = queryParameters.get("t");

  console.log(theme);
  
  const news = async () => {
    try {
      const resMusic = await readMusic(theme);
      setNewsMusic(resMusic);
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
        {newsMusic.length > 0 && (
          <div className="d-flex flex-column aic">
            <NavLink
              onClick={() => handleCount(newsMusic[0].id)}
              to={`/resume?id=${newsMusic[0].id}`}
              className={`${s.last} m10`}>
              <h1 className="m20">A LA UNE !</h1>
              <h2 className="m20">{newsMusic[0].title}</h2>
              <h3 className="secondary m20">{newsMusic[0].type}</h3>
              <p className="m20">{newsMusic[0].content}</p>
            </NavLink>

            <div className={`${s.group} d-flex`}>
              {newsMusic.map((a, i) => (
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
        <NewsLetter data={newsMusic} />
      </div>
    </section>
  );
}
