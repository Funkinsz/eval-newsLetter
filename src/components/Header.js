import { NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";

export default function Header() {
  const { user, signout } = useContext(AuthContext);

  return (
    <header>
      <div className={`nav d-flex jcsb aic main-nav m20`}>
        <nav>
          <ul className={`d-flex`}>
            {!user ? (
              <>
                <NavLink className={"login"} to="/login">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </NavLink>
                <NavLink to="signup" className={"register"}>
                  <i className="fa-solid fa-user-plus"></i>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className={"login"} to="profile">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
                <NavLink
                  className={"register"}
                  onClick={() => signout()}
                  to="/login"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
        <NavLink to="/">
          <h1 className={`m10`}>MY NEWS</h1>
        </NavLink>
        <div className="none"></div>
      </div>
      <div className={`secondary-nav d-flex`}>
        <ul className={`d-flex flex-fill jcse`}>
          <NavLink to="/theme?t=musique" className={`d-flex aic jcc`}>
            MUSIQUE
          </NavLink>
          <NavLink to="/theme?t=jeux video" className={`d-flex aic jcc`}>
            JEUX VIDEO
          </NavLink>
          <NavLink to="/theme?t=cinema" className={`d-flex aic jcc`}>
            CINEMA
          </NavLink>
          <NavLink to="/theme?t=evenement" className={`d-flex aic jcc`}>
            EVENEMENTS
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
