import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import isConnectContext from "../services/isConnect.context";

const ConnectForm = () => {
  const { login } = authService;
  const { setIsConnect } = useContext(isConnectContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Le format de l'email n'est pas correct")
        .required("L'email est requis"),
      password: Yup.string().required("Le mot de passe est requis"),
    }),
    onSubmit: (values) => {
      console.log(values);
      login(values.email, values.password);
      setIsConnect(true);
      navigate(`/Page`);
    },
  });

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url("https://www.ilesdepaix.org/wp-content/uploads/2021/09/idp_banner_default-1600x900.jpg")`,
      }}
    >
      <div className="bg-[#efdddc] flex flex-col w-1/2 h-96 mt-12 justify-center items-center rounded-md border-2 border-[#755342] opacity-95">
        <h2 className="text-gray-800 text-3xl mb-2 font-bold underline">
          Connexion
        </h2>
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="relative mb-8">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              className="w-80 px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? (
              <div className="absolute -bottom-5 text-sm text-red-600">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="relative mb-8">
            <input
              type="password"
              name="password"
              id=""
              placeholder=""
              className="w-80 mt-4 px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div className="absolute -bottom-5 text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="block">
            <button
              type="submit"
              className="rounded-2xl w-32 h-14 text-white m-4 bg-[#b27d71] hover:bg-[#755342] p-2 text-lg"
            >
              Login
            </button>
            <Link to="/FormNewNGO" className="text-[#755342]">
              {" "}
              Nouveau? enregistrez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
