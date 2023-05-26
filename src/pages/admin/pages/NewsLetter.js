import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

export default function NewsLetter(props) {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={`d-flex flex-column m20`}>
        {currentItems.map((n) => {
          return (
            <div className={`d-flex flex-column m20`}>
              <h2>{n.title}</h2>
              <h3>{n.type}</h3>
              <p>{n.content}</p>
              <NavLink to='/update' className={`btn btn-primary`}>Modifier</NavLink>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        className={`d-flex jcc m20`}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
