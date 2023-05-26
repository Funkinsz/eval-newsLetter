import s from "./log.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { createUser } from "../../apis/user";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    pseudo: yup
      .string()
      .required("Ce champs doit être saisi")
      .min(2, "Au moins 3 caractères")
      .max(18, "Au max 18 caractères"),
    email: yup
      .string()
      .required("Ce champs doit être saisi")
      .email("Email non valide"),
    pswd: yup
      .string()
      .required("Ce champs doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractères au minimum"),
    confirmpswd: yup
      .string()
      .required("Ce champs doit être saisi")
      .oneOf([yup.ref("pswd"), ""], "Le mot de passe ne correspond pas"),
  });

  const initialValues = {
    pseudo: "",
    email: "",
    pswd: "",
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
      await createUser(values);
      navigate("/login");
    } catch (message) {
      console.error(message);
      setError("generic", {
        type: "generic",
        message: "Adresse email déjà utilisée",
      });
    }
  });

  return (
    <section className={`d-flex flex-column aic p20`}>
      <h1>INSCRIPTION</h1>

      <form onSubmit={submit} className={`d-flex flex-column aic jcc m20`}>
        <div className={`${s.blockinput} d-flex flex-column aic`}>
          <label htmlFor="pseudo">PSEUDO</label>
          <input type="text" name="pseudo" {...register("pseudo")} />
          {errors?.pseudo && (
            <p className={`${s.error}`}>{errors.pseudo.message}</p>
          )}
        </div>

        <div className={`${s.blockinput} d-flex flex-column aic`}>
          <label htmlFor="email">EMAIL</label>
          <input type="email" {...register("email")} />
          {errors?.email && (
            <p className={`${s.error}`}>{errors.email.message}</p>
          )}
        </div>

        <div className={`${s.blockinput} d-flex flex-column aic`}>
          <label htmlFor="pswd">MOT DE PASSE</label>
          <input type="password" {...register("pswd")} />
          {errors?.pswd && (
            <p className={`${s.error}`}>{errors.pswd.message}</p>
          )}
        </div>

        <div className={`${s.blockinput} d-flex flex-column aic`}>
          <label htmlFor="confirmpswd">CONFIRMATION MOT DE PASSE</label>
          <input type="password" {...register("confirmpswd")} />
          {errors?.confirmpswd && (
            <p className={`${s.error}`}>{errors.confirmpswd.message}</p>
          )}
        </div>

        {errors.generic && (
          <p className={`${s.error}`}>{errors.generic.message}</p>
        )}
        <button disabled={isSubmitting} className={`btn btn-primary`}>
          Valider
        </button>
      </form>
    </section>
  );
}
