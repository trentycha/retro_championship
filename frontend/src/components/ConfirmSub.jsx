const ConfirmSub = (props) => {

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#343434] rounded-2xl shadow-2xl px-10 py-8 max-w-md w-full">

                <h2 className="text-white pb-6">Prêt à rentrer dans le jeu ?</h2>

                <div>
                    <h1 className="text-[#F9FF00] font-pixeloid-bold text-xl">{props.tournament.name}</h1>
                    <p className="text-[#00DEF5] text-base">{props.tournament.tournamentStatus?.label} - Room {props.tournament.channel?.label}</p>
                    <div className="flex gap-6 pt-4">
                        <div>
                            <p className="text-white text-xs">Date début</p>
                            <p className="text-[#00DEF5] text-base">{new Date(props.tournament.startedAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                            <p className="text-white text-xs">Date fin</p>
                            <p className="text-[#00DEF5] text-base">{new Date(props.tournament.endedAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>
                </div>                

                <div className="flex gap-4 justify-center mt-8">
                    <button onClick={props.onConfirm} className="bg-[#c0c700] hover:bg-white hover:text-[#c0c700] px-6 py-3 rounded-lg text-white font-semibold transition cursor-pointer">
                        Confirmer
                    </button>
                    <button onClick={props.onClose} className="bg-[#4b4b4b] hover:bg-white hover:text-[#4b4b4b] px-6 py-3 rounded-lg text-white font-semibold transition cursor-pointer">
                        Annuler
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ConfirmSub;