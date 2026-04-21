const SubStatus = (props) => {

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#343434] rounded-2xl shadow-2xl px-10 py-8 max-w-md w-full">
                
                <h2 className="text-[#F9FF00] font-pixeloid-bold text-lg mb-6">
                    {props.status.ok ? "Inscription confirmée" : "Erreur"}
                </h2>

                <p className={`text-lg mb-6 ${props.status.ok ? "text-white" : "text-white"}`}>
                    {props.status.ok ? "Bravo, tu es bien inscrit au tournoi !" : "L'inscription n'a pas fonctionné, tu es peut-être déjà inscrit."}
                </p>

                <button onClick={props.onClose} className="bg-[#4b4b4b] hover:bg-white hover:text-[#4b4b4b] px-6 py-3 rounded-lg text-white font-semibold transition cursor-pointer">
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default SubStatus;