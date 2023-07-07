import { React } from "react";
export const SelectedCustomerDetails = ({ selected }) => {
	if (!selected) {
		return;
	}
	return (
		<div className="flex border rounded-lg p-2 ded-lg max-w-xl flex-col items-start justify-between">
			<div className="relative  flex items-center gap-x-4">
				<img
					src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					className="h-10 w-10 rounded-full bg-gray-50"
				/>
				<div className="text-sm leading-6">
					<p className="font-semibold text-gray-900">
						<a>
							<span className="absolute inset-0" />
							{selected.firstName} {selected.lastName}
						</a>
					</p>
					<p className="text-gray-600">{selected.mobile}</p>
				</div>
				<div className="flex items-center gap-x-4 text-xs">
					<time className="text-gray-500">{Date.now()}</time>
					<a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
						Cliente
					</a>
				</div>
			</div>
		</div>
	);
};
