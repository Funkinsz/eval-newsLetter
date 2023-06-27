import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

export default function NewsLetter(props) {
  const { data } = props;

  return (
    <>
      <div className={`d-flex flex-column m20`}>
        {data.map((n) => {
          return (
            <div className={`d-flex flex-column m20`}>
              <h2>{n.title}</h2>
              <h3>{n.type}</h3>
              <p>{n.content}</p>
              <NavLink to="/update" className={`btn btn-primary`}>
                Modifier
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}
