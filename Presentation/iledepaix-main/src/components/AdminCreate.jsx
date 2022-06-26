const AdminCreate = () => {
  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url("https://www.ilesdepaix.org/wp-content/uploads/2021/10/Perou-2-1600x900.jpg")`,
      }}
    >
      <div className="w-3/4 mx-auto mt-12">
        <form
          action=""
          className="flex flex-col bg-[#efdddc] justify-center mx-auto h-80 w-96 items-center rounded mt-2 border-2 border-[#755342] opacity-95"
        >
          <span className=" mt-2">Nom:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Name"
            className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
          />
          <span className=" mt-2">Email:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Email"
            className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
          />
          <span className=" mt-2">Mot de passe:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Password"
            className="px-2 py-1 my-2 rounded focus:outline-none focus:ring-2 focus:ring-[#755342] block"
          />
          <button className="bg-[#b27d71] hover:bg-[#755342] p-2 mt-4 w-48 rounded text-white">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreate;

