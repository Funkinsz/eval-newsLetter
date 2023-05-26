import s from "./log.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router";

export default function Login() {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Ce champs doit être saisi")
      .email("Email non valide"),
    pswd: yup
      .string()
      .required("Ce champs doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractère au minimum"),
  });

  const initialValues = {
    email: "",
    pswd: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema) });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      await signin(values);
    } catch (error) {
      setError("generic", {
        type: "generic",
        message: "Email ou mot de passe incorrect",
      });
    }
  });
  
  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <section className={`d-flex flex-column aic p20`}>
          <h1>CONNEXION</h1>

          <form onSubmit={submit} className={`d-flex flex-column aic jcc m20`}>
            <div className={`${s.blockinput} d-flex flex-column aic`}>
              <label htmlFor="email">EMAIL</label>
              <input type="text" name="email" {...register("email")} />
            </div>

            {errors.email && (
              <p className={`${s.error}`}>{errors.email.message}</p>
            )}

            <div className={`${s.blockinput} d-flex flex-column aic`}>
              <label htmlFor="pswd">MOT DE PASSE</label>
              <input type="password" name="pswd" {...register("pswd")} />
            </div>

            {errors.pswd && (
              <p className={`${s.error}`}>{errors.pswd.message}</p>
            )}

            <button disabled={isSubmitting} className="btn btn-primary">
              Connexion
            </button>
          </form>
        </section>
      )}
    </>
  );
}
