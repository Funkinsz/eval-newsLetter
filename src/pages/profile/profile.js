import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";
import { readMyLikes } from "../../apis/news";
import s from "../homepage/Homepage.module.scss";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [myLikes, setMyLikes] = useState([]);

  const likes = async () => {
    try {
      const resLiked = await readMyLikes(user);
      setMyLikes(resLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    likes();
  }, []);

  return (
    <section className="d-flex">
      <div className={`${s.container} d-flex flex-column aic jcc`}>
        <div className={`${s.group} d-flex m30`}>
          {myLikes.map((a, i) => (
            <div key={i} className={`${s.oneNews} ${s.border} d-flex jcsb`}>
              <NavLink className={"d-flex flex-fill flex-column jcsb"} to={`/resume?id=${a.idNews}`}>
                <div className="img">
                  <img src={a.img} />
                </div>
                <h2 className="m20">{a.title}</h2>
                <h3 className="secondary m20">{a.type}</h3>
                <div className={`${s.primary} m20`}>
                  <i className="fa-solid fa-heart"></i>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div id="container" className={`${s.news} d-flex flex-column`}>
        <div className="d-flex flex-column ais jcs">
        <h1 className="m20">Bonjour {user.pseudo} !</h1>
        {user.rôle === 1 && <NavLink className="m20" to={"/admin"}>Espace Admin</NavLink>}
        </div>
      </div>
    </section>
  );
}
