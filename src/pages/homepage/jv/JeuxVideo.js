import { useEffect, useState } from "react";
import { readJV } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink } from "react-router-dom";

export default function JV() {
  const [newsMusic, setNewsMusic] = useState([]);

  const news = async () => {
    try {
      const resMusic = await readJV();
      setNewsMusic(resMusic);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  return (
    <section>
      <h2>JV</h2>

      <div>
        {newsMusic.map((a, i) => (
          <NavLink to={`/resume?id)${a.id}`} className={`${s.last} m10`} key={i}>
            <h2 className="m20">{a.title}</h2>
            <h3 className="m20">{a.type}</h3>
            <p className="m20">{a.content}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
