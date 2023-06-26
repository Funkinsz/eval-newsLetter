import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import s from "../Homepage.module.scss";
import { countNews } from "../../../apis/news";

export default function NewsLetter(props) {
  // data récupère le tableau des news
  const { data } = props;
  // id récupère la news ciblé depuis le componant resume
  // const id = props.id;

  // currentItem affiche les éléments présent dans la pagination
  const [currentItems, setCurrentItems] = useState([]);

  // retourne le nombre de page au total
  const [pageCount, setPageCount] = useState(0);

  // récupère le premier id de la page
  const [itemOffset, setItemOffset] = useState(0);

  // permet de générer la pagination si un id est trouver (en lien avec le componant resume)
  // apres quoi, si une intéraction a lieu dans la pagination, knockId bascule a true et ignore la methode en lien avec l'id de resume (usage de la pagination par defaut)
  // const [knockId, setKnockId] = useState(null)

  // nombre de news par page
  const itemsPerPage = 4;

  // match les précédent useState pour générer le contenu de la pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // cette methode recherche la position de la news dans le tableau afin de le retrouver dans la pagination
  // const findId = (data, id) => {
  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index]?.id === id) {
  //       return index;
  //     }
  //   }
  //   // s'il n'est pas trouver, il retourne a 0 a la pagination s'affiche par défaut
  //   return -1;
  // };
  // const position = findId(data, id);
  // on calcule le numero de page ou se trouve l'ID,
  // pour cela divisise la position apr le nombre de news par page et l'arrondit à l'unité on arrondit 
  // const newPosition = ((position - 1) / 3).toFixed(0);

  // prend en compte le numero de page clické et change le contenu de la pagination
  function handlePageClick(e) {
    // setKnockId(true)
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  
  // ce useEffect fonctionne uniquement si un ID est retourvé dans l'URL
  // useEffect(() => {
  //   if (id && knockId !== true) {
  //     const endOffset = itemOffset + itemsPerPage;
  //     setCurrentItems(data.slice(itemOffset, endOffset));
  //     setPageCount(Math.ceil(data.length / itemsPerPage));

  //     const selectedPage = newPosition;
  //     const newOffset = (selectedPage * itemsPerPage) % data.length;
  //     setItemOffset(newOffset);
  //   }
  // }, [itemOffset, itemsPerPage, data]);

  // renvoie le nombre de clic pour généré le top 5 des news les plus vue
  const handleCount = async (id) => {
    try {
      await countNews(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`${s.sidebar} d-flex flex-fill flex-column jcse m10`}>
        <h3 className="d-flex aic jcc">MY NEWS EN CONTINU</h3>

        <div className="divider"></div>
        {currentItems && currentItems.map((n, i) => {
          return (
            <div
              className={`${s.sbarnews} d-flex flex-fill flex-column jcc ${(i % 2) === 1 && 'grey'}`}>
              <NavLink
                onClick={() => handleCount(n.idNews)}
                to={`/resume?id=${n.idNews}`}
                key={i}>
                <h2>{n.type} :</h2>
                <h4>{n.title}</h4>
              </NavLink>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        className={`${s.page} d-flex m10`}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        // forcePage={id ? newPosition +1 -1 : 0} // si un id est trouvé, forcePage cible le numero de page trouver, sinon l'affiche se fait par defaut
      />
    </>
  );
}
