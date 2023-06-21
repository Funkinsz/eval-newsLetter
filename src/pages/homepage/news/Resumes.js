import { useEffect, useState } from "react";
import { readNews, readResume } from "../../../apis/news";
import { useLocation } from "react-router";
import s from "../Homepage.module.scss";
import NewsLetter from "./NewsLetter";

export default function Resume() {
  // recherche l'id dans l'url pour envoyé une requete ciblé sur un article
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const id = Number(queryParameters.get("id"));

  const [newsLetter, setNewLetter] = useState([]);
  const [newsSelected, setNewsSelected] = useState([])

  const news = async () => {
    try {
      const resSelect = await readResume(id);
      const resNews = await readNews();
      setNewsSelected(resSelect);
      setNewLetter(resNews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, [id]);

  return (
    <section>
      <div className={`${s.container}`}>
        {newsSelected.length > 0 && (
          <div className={`${s.last} m10`}>
            <h1 className="m20">A LA UNE !</h1>
            <h2 className="m20">{newsSelected[0].title}</h2>
            <h3 className="secondary m20">{newsSelected[0].type}</h3>
            <div className='imge'>
              <img src={newsSelected[0].img} alt="" />
            </div>
            <p className="m20">{newsSelected[0].content}</p>
          </div>
        )}
      </div>
      <div id="container" className={`${s.news} d-flex flex-column jcsb`}>
        <NewsLetter data={newsLetter} id={id} />
      </div>
    </section>
  );
}
