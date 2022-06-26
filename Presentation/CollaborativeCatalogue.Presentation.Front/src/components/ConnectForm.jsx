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
    <div className="flex justify-center mt-8">
      <div className="bg-[#efdddc] flex flex-col w-1/2 h-60 justify-center items-center  border border-gray-400 rounded-md">
        <h2 className="text-yellow-600 text-2xl mb-2">Connexion</h2>
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
              className="w-80"
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
              className="w-80 mt-4"
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
              className="rounded-2xl bg-[#b27d71] w-32 h-14 text-white mt-4"
            >
              Login
            </button>
            <Link to="/FormTool"> Nouveau? enregistrez-vous</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
