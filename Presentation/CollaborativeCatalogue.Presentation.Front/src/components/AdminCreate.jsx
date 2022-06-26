const AdminCreate = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#10ff03]">
      <div className="w-1/2 m-auto mt-8  bg-[#b27d71] p-4 rounded-xl flex flex-col">
        <h2 className="text-2xl m-auto underline">
          Ajouter un administrateur:
        </h2>
        <form action="" className="grid grid-cols-2 ">
          <div className="flex flex-col items-center">
            <span className=" mt-4">Nom:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Name"
              className="mt-2 rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className=" mt-4">Email:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              className="mt-2 rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className=" mt-4">Mot de passe:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Password"
              className="mt-2 rounded-md"
            />
          </div>
        </form>
        <button className="bg-[#efdddc] rounded-md p-8 m-auto ">Ajouter</button>
      </div>
    </div>
  );
};

export default AdminCreate;
