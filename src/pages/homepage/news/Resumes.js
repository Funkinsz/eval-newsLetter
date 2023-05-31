import { useEffect, useState } from "react";
import { readResume } from "../../../apis/news";

export default function Resume() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = Number(queryParameters.get("id"));

  console.log(id);

  const [newsLetter, setNewLetter] = useState([]);

  const news = async () => {
    try {
      const resNews = await readResume(id);
      setNewLetter(resNews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    news();
  }, []);

  return (
    <section>
      {newsLetter.length > 0 && (
        <>
          <h1>{newsLetter[0].title}</h1>
          <h3>{newsLetter[0].type}</h3>
          <p>{newsLetter[0].content}</p>
        </>
      )}
    </section>
  );
}
