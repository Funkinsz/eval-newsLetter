import { NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";

export default function Header() {
  const { user, signout } = useContext(AuthContext)
  return (
    <header>
      <div className={`d-flex jcsb aic main-nav m20`}>
        <NavLink to="/">
          <h1 className={`m10`}>MY NEWS</h1>
        </NavLink>
        <nav>
          <ul className={`d-flex`}>
            {!user ? (
              <>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/login">
                  CONNEXION
                </NavLink>
                <NavLink to="signup">INSCRIPTION</NavLink>
              </>
            ) : (
              <>
                <NavLink to="profile">USER</NavLink>
                <NavLink onClick={() => signout()} to="/login">DECONNEXION</NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className={`secondary-nav d-flex`}>
        <ul className={`d-flex flex-fill jcse`}>
          <NavLink to='/musique' className={`d-flex flex-fill aic jcc`}>MUSIQUE</NavLink>
          <NavLink to='/jv' className={`d-flex flex-fill aic jcc`}>JEUX VIDEO</NavLink>
          <NavLink to='/cinema' className={`d-flex flex-fill aic jcc`}>CINEMA</NavLink>
          <NavLink to='/event' className={`d-flex flex-fill aic jcc`}>EVENEMENTS</NavLink>
        </ul>
      </div>
    </header>
  );
}
