const AdminForm = () => {
  return (
    <div className="flex justify-center bg-[#b27d71] w-full items-center flex-col h-80">
      <h2 className="text-3xl">Liste des donées en attente:</h2>
      <div className="">
        <h3 className="text-2xl text-white mt-8">Titre de l'outil</h3>
        <p className="mt-4">
          Description de l'outil: Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Nemo fuga quia, assumenda ipsam labore facere ipsa
          quisquam, pariatur provident ad earum eveniet aliquam deserunt itaque
          voluptatibus incidunt distinctio inventore perspiciatis!
        </p>
        <img src="/" alt="Image de l'outil" className="mt-4" />
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
  );
};

export default AdminForm;
