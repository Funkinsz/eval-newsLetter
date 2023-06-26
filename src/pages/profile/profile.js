import { useContext } from "react";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <section>
      <h1>{user.pseudo}</h1>
      {user.rôle === 1 && <NavLink to={"/admin"}>Espace Admin</NavLink>}
    </section>
  );
}
