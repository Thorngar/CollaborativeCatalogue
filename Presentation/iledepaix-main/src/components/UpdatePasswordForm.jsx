const UpdatePasswordForm = () => {
  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url("https://www.ilesdepaix.org/wp-content/uploads/2021/11/Ste%E2%95%A0ufanne_Prijot_Uganda_2020_4-1600x900.jpg")`,
      }}
    >
      <div className="mt-20">
        <form
          action=""
          className=" bg-[#efdddc] rounded-3xl p-8 grid grid-cols-2 "
        >
          <div className="flex flex-col">
            <span className=" mt-2">Adresse email:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              className="w-3/4 mt-2 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#755342] block"
            />
          </div>
          <div className="flex flex-col">
            <span className=" mt-2">Ancien mot de passe:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Last Password"
              className="w-3/4 mt-2 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#755342] block"
            />
          </div>
          <div className="flex flex-col">
            <span className=" mt-2">Nouveau mot de passe:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="New Password"
              className="w-3/4 mt-2 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#755342] block"
            />
          </div>
          <div className="flex flex-col">
            <span className=" mt-2">Confirmer nouveau mot de passe:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Confirm New Password"
              className="w-3/4 mt-2 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#755342] block"
            />
          </div>
          <button className="bg-[#b27d71] rounded-md p-2 mt-8 ml-48 w-1/2 text-white hover:bg-[#755342]">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
