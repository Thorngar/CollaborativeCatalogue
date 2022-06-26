const ListInfo = () => {
  return (
    <div>
      <div className="bg-[#b27d71]   rounded-md ml-4 my-4 h-60 mr-16 border border-black ">
        <div className="ml-4">
          <h2 className="text-white mb-4">Titre de l'outil</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magnam
            debitis harum tempora repellendus ipsum fugit, in atque modi.Dusto
            suscipit enim dolorum officia dolor quidem earum, facere temporibus
            dolore.
          </span>
          <ul className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 mt-4 cursor-pointer hover:text-lime-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <li className="w-16 h-8  mr-4 rounded-md mt-4 text-center bg-[#b27d71] hover:bg-[#755342] text-white cursor-pointer">
              tag
            </li>
            <li className="w-16 h- mr-4 rounded-md mt-4 text-center bg-[#b27d71] hover:bg-[#755342] text-white cursor-pointer">
              tag
            </li>
            <li className="w-16 h-8 mr-4 rounded-md mt-4   text-center bg-[#b27d71] hover:bg-[#755342] text-white cursor-pointer">
              tag
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListInfo;
