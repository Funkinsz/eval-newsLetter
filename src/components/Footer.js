import { useEffect, useState } from "react";
import { countNews, readCine, readEvent, readJV, readMusic } from "../apis/news";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const [resTop5, setResTop5] = useState([]);
  const news = async () => {
    try {
      const resMusic = await readMusic();
      const resJV = await readJV();
      const resCine = await readCine();
      const resEvent = await readEvent();
      setResTop5([resMusic, resJV, resCine, resEvent]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  async function handleCount(id) {
    try {
      await countNews(id)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <footer className={`d-flex jcsb p20`}>
      {resTop5.length > 0 && (
        <>
          <ul className={`m10 d-flex flex-column`}>
            <h4>TOP MUSIQUES</h4>
            {resTop5[0].map((a, i) => (
              <NavLink onClick={() => handleCount(a.id)} key={i} to={`/resume?id=${a.id}`}>{a.title}</NavLink>
            ))}
          </ul>
          <ul className={`m10 d-flex flex-column`}>
            <h4>TOP JEUX VIDEO</h4>
            {resTop5[1].map((a, i) => (
              <NavLink onClick={() => handleCount(a.id)} key={i} to={`/resume?id=${a.id}`}>{a.title}</NavLink>
            ))}
          </ul>
          <ul className={`m10 d-flex flex-column`}>
            <h4>TOP CINEMAS</h4>
            {resTop5[2].map((a, i) => (
              <NavLink onClick={() => handleCount(a.id)} key={i} to={`/resume?id=${a.id}`}>{a.title}</NavLink>
            ))}
          </ul>
          <ul className={`m10 d-flex flex-column`}>
            <h4>TOP EVENEMENTS</h4>
            {resTop5[3].map((a, i) => (
              <NavLink onClick={() => handleCount(a.id)} key={i} to={`/resume?id=${a.id}`}>{a.title}</NavLink>
            ))}
          </ul>
        </>
      )}
    </footer>
  );
}
