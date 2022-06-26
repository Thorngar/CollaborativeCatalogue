const AdminForm = () => {
  const image =
    "https://i0.wp.com/www.vivafrik.com/wp-content/uploads/2020/07/De-la-ferme-à-lassiette-les-femmes-qui-défendent-la-transformation-agricole-en-Afrique-.jpg?fit=800%2C500&ssl=1";
  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center bg-[#b27d71] items-center flex-col mt-8 w-1/2 rounded-xl p-10">
        <h2 className="text-3xl">Liste des donées en attente:</h2>
        <h3 className="text-2xl text-white mt-8">Titre de l'outil</h3>
        <div className="flex">
          <img
            src={image}
            alt="Image de l'outil"
            className=" w-30 h-20 rounded-md mr-6 mt-4"
          />
          <p className="mt-4">
            Description de l'outil: Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nemo fuga quia, assumenda ipsam labore facere ipsa
            quisquam, pariatur provident ad earum eveniet aliquam deserunt
            itaque voluptatibus incidunt distinctio inventore perspiciatis!
          </p>
        </div>
        <div className="items-start">
          <button className="bg-[#efdddc] rounded-md hover:bg-[#491c13] hover:text-white p-4 mt-8">
            Mettre sur liste d'attente
          </button>
          <button className="bg-[#efdddc] rounded-md hover:bg-[#491c13] hover:text-white p-4 mt-8 ml-6">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
