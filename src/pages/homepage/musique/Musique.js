import { useEffect, useState } from "react";
import { readMusic } from "../../../apis/news";
import s from "../Homepage.module.scss";
import { NavLink, useParams } from "react-router-dom";

export default function Musique() {
  const { musique } = useParams()

  const [ newsMusic, setNewsMusic ] = useState([])

  const news = async () => {
    try {
      const resMusic = await readMusic();
      setNewsMusic(resMusic);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  console.log(musique);
  return (
    <section>
      <h2>MUSIQUE</h2>

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
