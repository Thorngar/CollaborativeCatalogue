import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormTool = () => {
  const options = [
    { value: "food", label: "Agriculture et alimentation" },
    { value: "commerce", label: "Commerce équitable" },
    { value: "droit", label: "Droits de l'enfant et droits humain" },
    { value: "developper", label: "Développement durable" },
    { value: "education", label: "Êducation à la diversité" },
    { value: "water", label: "Environnement, eau et climat" },
    { value: "genre", label: "Genre" },
    { value: "pice", label: "Conflits et paix" },
    { value: "handicap", label: "Handicap" },
    { value: "migrate", label: "Migrations et réfugiés" },
    { value: "world", label: "Mondialisation" },
    { value: "value", label: "Valeur" },
  ];

  const MyComponent = () => <Select options={options} />;

  const formik = useFormik({
    initialValues: {
      Name: "",
      Subtitle: "",
      IsDigitalTool: "",
      IsNewTool: "",
      MinAge: "",
      MaxAge: "",
      ToolType: "",
      StartDate: "",
      EndDate: "",
      Price: "",
      Description: "",
      Thematics: [],
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .required("Le titre de l'outil est requis")
        .max(50, "Le titre doit faire maximum 50 caractères"),
      Subtitle: Yup.string().required("Le sous-titre est requis"),
      IsDigitalTool: Yup.string().required("Vous devez faire un choix"),
      IsNewTool: Yup.string().required("Vous devez faire un choix"),
      MinAge: Yup.number(),
      MaxAge: Yup.number(),
      Price: Yup.number(),
      ToolType: Yup.string().required("Le type d'outil est requis"),
      StartDate: Yup.date(),
      EndDate: Yup.date(),
      Description: Yup.string().required("Le type est requis"),
      Thematics: Yup.array().min(1),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const buttonQuiAfficheLesDonnesDuFormulaire = () => {
    console.log(formik.values);
  };

  // const handleChange = (e) => {
  //     const val = e.target.value;
  //     const key = e.target.name;

  //     setSignup((prev) => {
  //       const newState = {
  //         ...prev,
  //         [key]: val,
  //       };

  //       return newState;
  //     });
  //   };

  // const handleSubmit = (e) => {
  //     e.preventDefault();

  //   };

  return (
    <div
      className="flex justify-center"
      style={{
        backgroundImage: `url("https://www.ilesdepaix.org/wp-content/uploads/2021/09/idp_banner_default-1600x900.jpg")`,
      }}>
      <div className="flex flex-col bg-[#efdddc] w-3/2 justify-center p-4 rounded-md text-gray-800 items-center mt-2 border-2 border-[#755342] opacity-95">
        <h1 className="my-8 text-3xl font-bold underline text-center">
          Formulaire d'outil
        </h1>
        <form className="mx-12" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-x-8 mx-12">
            <div className="flex flex-col w-64 relative">
              <label htmlFor="Name">Titre de l'outil :</label>
              <input
                type="text"
                name="Name"
                id="Name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.Name && formik.errors.Name && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.Name}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative">
              <label htmlFor="Subtitle">Sous-titre :</label>
              <input
                type="text"
                name="Subtitle"
                id="Subtitle"
                value={formik.values.Subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.Subtitle && formik.errors.Subtitle && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.Subtitle}
                </div>
              )}
            </div>

            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="MinAge">Âge minimum :</label>
              <input
                type="number"
                id="MinAge"
                name="MinAge"
                value={formik.values.MinAge}
                onChange={formik.handleChange}
                min="0"
                max="18"
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.MinAge && formik.errors.MinAge && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.MinAge}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="MaxAge">Âge maximum :</label>
              <input
                type="number"
                id="MaxAge"
                name="MaxAge"
                value={formik.values.MaxAge}
                onChange={formik.handleChange}
                min="0"
                max="18"
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.MaxAge && formik.errors.MaxAge && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.MaxAge}
                </div>
              )}
            </div>

            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="StartDate">Date de début :</label>
              <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={formik.values.StartDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.StartDate && formik.errors.StartDate && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.StartDate}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="EndDate">Date de fin :</label>
              <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={formik.values.EndDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.EndDate && formik.errors.EndDate && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.EndDate}
                </div>
              )}
            </div>

            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="ToolType">Type d'outil :</label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="ToolType"
                name="ToolType"
                value={formik.values.ToolType}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.ToolType && formik.errors.ToolType && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.ToolType}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative mt-2">
              <label htmlFor="Price">Prix :</label>
              <input
                type="number"
                id="Price"
                name="Price"
                value={formik.values.Price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.Price && formik.errors.Price && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.Price}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative mt-2">
              <p>Thématiques abordées dans l'outil</p>
              <div className="py-1 ">
                <MyComponent />
              </div>
            </div>
            <div className="flex flex-col w-full relative justify-center">
              <label htmlFor="Description">Description</label>
              <textarea
                type="text"
                name="Description"
                id="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                cols="10"
                rows="2"
                onBlur={formik.handleBlur}
                className="px-2 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
              />
              {formik.touched.Description && formik.errors.Description && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.Description}
                </div>
              )}
            </div>

            <div className="flex flex-col w-64 relative mt-2 items-center">
              <h4 className="my-2">S'agit-il d'un outil numérique ?</h4>
              <div className="flex">
                <input
                  type="radio"
                  name="IsDigitalTool"
                  id="toolNumYes"
                  value="true"
                  onChange={formik.handleChange}
                  className="mr-2 px-2 py-1 m-2 rounded accent-[#755342] block"
                />
                <label htmlFor="toolNumYes" className="mr-6">
                  Oui
                </label>
                <input
                  type="radio"
                  name="IsDigitalTool"
                  id="titleNumNo"
                  value="no"
                  onChange={formik.handleChange}
                  className="mr-2 px-2 py-1 m-2 rounded accent-[#755342] block"
                />
                <label htmlFor="titleNumNo">Non</label>
              </div>
              {formik.touched.IsDigitalTool && formik.errors.IsDigitalTool && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.IsDigitalTool}
                </div>
              )}
            </div>
            <div className="flex flex-col w-64 relative mt-2 items-center">
              <h4 className="my-2">S'agit-il d'un nouvel outil ?</h4>
              <div className="flex">
                <input
                  type="radio"
                  name="IsNewTool"
                  id="toolNewYes"
                  value="true"
                  onChange={formik.handleChange}
                  className="mr-2 px-2 py-1 m-2 rounded accent-[#755342] block"
                />
                <label htmlFor="toolNewYes" className="mr-6">
                  Oui
                </label>
                <input
                  type="radio"
                  name="IsNewTool"
                  id="toolNewNo"
                  value="no"
                  onChange={formik.handleChange}
                  className="mr-2 px-2 py-1 m-2 rounded accent-[#755342] block"
                />
                <label htmlFor="toolNewNo">Non</label>
              </div>
              {formik.touched.IsNewTool && formik.errors.IsNewTool && (
                <div className="absolute -bottom-3 text-sm text-red-600">
                  {formik.errors.IsNewTool}
                </div>
              )}
            </div>
          </div>

          <div className=" flex flex-col items-center justify-center mx-auto w-2/3">
            <button
              type="submit"
              className="bg-[#b27d71] hover:bg-[#755342] p-2 mt-4 w-48 rounded text-white"
              onClick={buttonQuiAfficheLesDonnesDuFormulaire}>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormTool;
