import { useEffect, useState } from "react";
import { readEvent } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink } from "react-router-dom";

export default function Musique() {
  const [newsEvent, setNewsEvent] = useState([]);

  const news = async () => {
    try {
      const resEvent = await readEvent();
      setNewsEvent(resEvent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  return (
    <section>
      <h2>EVENEMENTS</h2>

      <div>
        {newsEvent.map((a, i) => (
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
