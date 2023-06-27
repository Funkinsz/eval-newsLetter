import { useContext, useEffect, useState } from "react";
import { newsLiked, readPage, readResume } from "../../../apis/news";
import { useLocation, useNavigate } from "react-router";
import s from "../Homepage.module.scss";
import NewsLetter from "./NewsLetter";
import { AuthContext } from "../../../context";

export default function Resume() {
  // recherche l'id dans l'url pour envoyé une requete ciblé sur un article
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const id = Number(queryParameters.get("id"));
  const { user } = useContext(AuthContext);
  const data = { id, user: user ? user.id : null };

  const [newsLetter, setNewLetter] = useState([]);
  const [newsSelected, setNewsSelected] = useState([]);

  const news = async () => {
    try {
      const resSelect = await readResume(data);
      const resNews = await readPage(user ? user.id : null);
      setNewsSelected(resSelect);
      setNewLetter(resNews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, [id]);

  const handleLike = async (e) => {
    if (!user) {
      navigate("/login");
    } else {
      await newsLiked({ user, e });
      news();
    }
  };

  console.log(newsSelected);
  return (
    <section>
      <div className={`${s.container}`}>
        {newsSelected && newsSelected && (
          <div className={`${s.last} m10`}>
            <h2>{newsSelected.title}</h2>
            <div className="d-flex aic jcsb">
              <h3 className="secondary">{newsSelected.type}</h3>
              <div className="i d-flex aic">
                {newsSelected.isLike === 0 ? (
                  <i
                    onClick={() => handleLike(newsSelected)}
                    className="fa-regular fa-heart"></i>
                ) : (
                  <i
                    onClick={() => handleLike(newsSelected)}
                    className="fa-solid fa-heart"></i>
                )}
                <p>{newsSelected.liked}</p>
              </div>
            </div>
            <div className="imge">
              <img src={newsSelected.img} alt="" />
            </div>
            <p className="m20">{newsSelected.content}</p>
          </div>
        )}
      </div>
      <div id="container" className={`${s.news} d-flex flex-column jcsb`}>
        <NewsLetter data={newsLetter} id={id} />
      </div>
    </section>
  );
}
