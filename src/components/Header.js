import { NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";

export default function Header() {
  const { user, signout } = useContext(AuthContext);

  return (
    <header>
      <div className={`d-flex jcsb aic main-nav m20`}>
        <nav>
          <ul className={`d-flex`}>
            {!user ? (
              <>
                <NavLink className={"login p10"} to="/login">
                  CONNEXION
                </NavLink>
                <NavLink to="signup" className={"register p10"}>
                  INSCRIPTION
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className={"login p10"} to="profile">USER</NavLink>
                <NavLink className={"register p10"} onClick={() => signout()} to="/login">
                  DECONNEXION
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
          <NavLink
            to="/theme?t=jeux video"
            className={`d-flex aic jcc`}
          >
            JEUX VIDEO
          </NavLink>
          <NavLink to="/theme?t=cinema" className={`d-flex aic jcc`}>
            CINEMA
          </NavLink>
          <NavLink
            to="/theme?t=evenement"
            className={`d-flex aic jcc`}
          >
            EVENEMENTS
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
