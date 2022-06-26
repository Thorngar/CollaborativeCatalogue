const UpdatePasswordForm = () =>{
    return(
        <div className="w-3/4 m-auto mt-8">
            <form action="" className="flex flex-col bg-[#efdddc] justify-center h-80 items-center rounded-3xl">
                
                <span className=" mt-2">Adresse email:</span>
                <input type="text" name="" id="" placeholder="Email" className="w-1/4 mt-2 rounded-md"/>
                <span className=" mt-2">Acien mot de passe:</span>
                <input type="text" name="" id="" placeholder="Last Password" className="w-1/4 mt-2 rounded-md"/>
                <span className=" mt-2">Nouveau mot de passe:</span>
                <input type="text" name="" id="" placeholder="New Password" className="w-1/4 mt-2 rounded-md"/>
                <span className=" mt-2">Confirmer nouveau mot de passe:</span>
                <input type="text" name="" id="" placeholder="Confirm New Password" className="w-1/4 mt-2 rounded-md"/>
                <button className="bg-[#b27d71] rounded-md p-2 mt-4">Valider</button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm