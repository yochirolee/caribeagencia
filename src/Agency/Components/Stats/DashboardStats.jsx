import { React } from "react";
export const DashboardStats = () => {
	return (
		<div className="p-1 flex flex-shrink-0 flex-col lg:flex-row gap-10">
			<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
				<span className="p-2 bg-yellow-300 rounded-lg text-yellow-800">120</span>
				<h3>Desagrupados</h3>
			</div>
			<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
				<span className="p-2 bg-blue-300 rounded-lg text-blue-800">120</span>
				<h3>Nacionalizados</h3>
			</div>
			<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
				<span className="p-2 bg-orange-300 rounded-lg text-orange-800">120</span>
				<h3>Pendientes de Traslado</h3>
			</div>
			<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
				<span className="p-2 bg-green-300 rounded-lg text-green-800">120</span>
				<h3>En Traslado</h3>
			</div>
			<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
				<span className="p-2 bg-green-300 rounded-lg text-green-800">120</span>
				<h3>Entregados</h3>
			</div>
		</div>
	);
};
