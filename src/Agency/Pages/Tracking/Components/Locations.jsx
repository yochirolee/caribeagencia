import { React } from "react";
export const Locations = ({ setShowModal, trackingList }) => {
	return (
		<div className="grid grid-flow-row grid-cols-4 px-20 gap-20 justify-between w-full ">
			<div
				onClick={() => setShowModal(true)}
				className="border p-3 text-center bg-blue-500 rounded-lg text-white"
			>
				Adicionar a Contenedor
			</div>
			<div className="border p-3 text-center">En Espera de Traslado</div>
			<div className="border p-3 text-center">Transportandose</div>
			<div
				onClick={() => setShowModal(true)}
				className="border flex gap-2 items-center  p-3 justify-center bg-green-500 rounded-lg text-white"
			>
				<h5>Adicionar a Entregados</h5>
			</div>
		</div>
	);
};
