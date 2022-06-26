const UpdatePasswordForm = () => {
  return (
    <div className="mt-8 flex items-center justify-center ">
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
            className="w-3/4 mt-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className=" mt-2">Acien mot de passe:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Last Password"
            className="w-3/4 mt-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className=" mt-2">Nouveau mot de passe:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="New Password"
            className="w-3/4 mt-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className=" mt-2">Confirmer nouveau mot de passe:</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Confirm New Password"
            className="w-3/4 mt-2 rounded-md"
          />
        </div>
        <button className="bg-[#b27d71] rounded-md p-2 mt-4 w-1/2">
          Valider
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
