import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {addNews} from "../../../apis/news";
import { useNavigate } from "react-router";

export default function Insert() {
  const navigate = useNavigate()

  const validationSchema = yup.object({
    title: yup.string().required("Ce champs doit etre saisi"),
    type: yup.string().required("Ce champs doit être saisi"),
    content: yup.string().required("Ce champs doit être saisi"),
  });

  const initialValues = {
    title: "",
    type: "",
    content: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
        await addNews(values);
        navigate("/admin")
    } catch (message) {
      console.error(message);
      setError("generic", {
        type: "generic",
        message: "Insert Error",
      });
    }
  });

  return (
    <section>
      <h1>INSERT</h1>

      <form onSubmit={submit}>

        <div className={`block`}>
          <label htmlFor="title">TITRE</label>
          <input type="text" {...register("title")} />
          {errors?.title && (
            <p className={`error`}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="">TYPE</label>
          <select type="text" {...register("type")}>
            <option value="MUSIQUE">MUSIQUE</option>
            <option value="JEUX VIDEO">JEUX VIDEO</option>
            <option value="CINEMA">CINEMA</option>
            <option value="EVENEMENT">EVENEMENT</option>
          </select>
        </div>

        <div>
          <label htmlFor="">contenu</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            {...register("content")}
          />
        </div>

        {errors.generic && (
          <p className={`error`}>{errors.generic.message}</p>
        )}

        <button disabled={isSubmitting}>Valider</button>
      </form>
    </section>
  );
}
