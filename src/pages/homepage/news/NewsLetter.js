import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import s from "../Homepage.module.scss";
import { countNews } from "../../../apis/news";

export default function NewsLetter(props) {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleCount = async (id) => {
    try {
      await countNews(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`d-flex flex-column`}>
        {currentItems.map((n) => {
          return (
            <div className={`d-flex flex-column m10`}>
              <NavLink onClick={() => handleCount(n.id)} to={`/resume/${n.id}`}>
                <h2>{n.title}</h2>
                <h4>{n.type}</h4>
              </NavLink>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        className={`${s.page} d-flex jcc jcsb`}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </>
  );
}
