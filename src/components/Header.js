import { NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { user, signout } = useContext(AuthContext);

  // useEffect(() => {
  //   const refreshPage = setTimeout(() => {
  //     window.location.reload();
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, []);

  return (
    <header>
      <div className={`d-flex jcsb aic main-nav m20`}>
        <NavLink to="/">
          <h1 className={`divider m10`}>MY NEWS</h1>
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
                <NavLink onClick={() => signout()} to="/login">
                  DECONNEXION
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className={`secondary-nav d-flex`}>
        <ul className={`d-flex flex-fill jcse`}>
          <NavLink
            // onClick={refreshPage}
            to="/theme?t=musique"
            className={`d-flex flex-fill aic jcc`}>
            MUSIQUE
          </NavLink>
          <NavLink
            // onClick={refreshPage}
            to="/theme?t=jeux video"
            className={`d-flex flex-fill aic jcc`}>
            JEUX VIDEO
          </NavLink>
          <NavLink
            // onClick={refreshPage}
            to="/theme?t=cinema"
            className={`d-flex flex-fill aic jcc`}>
            CINEMA
          </NavLink>
          <NavLink
            // onClick={refreshPage}
            to="/theme?t=evenement"
            className={`d-flex flex-fill aic jcc`}>
            EVENEMENTS
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
