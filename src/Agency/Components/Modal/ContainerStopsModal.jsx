import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { StopStats } from "../Stats/StopStats";
import { IncomeStats } from "../Stats/IncomeStats";

export default function ContainerStopsModal({ open, setOpen, selectedContainer }) {
	if (!selectedContainer) return null;
	const cancelButtonRef = useRef(null);
	console.log(selectedContainer);
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
								<div className="flex flex-col items-center justify-center lg:p-20 p-4 gap-20">
									<div className="flex flex-col">
										<span>ContainerId:{selectedContainer.ContainerId}</span>
										<span>Numero de Contenedor:{selectedContainer.ContainerNumber}</span>
										<span>{selectedContainer.Master}</span>
										<span>{selectedContainer.SealedNumber}</span>
										<span>{selectedContainer.Weight}</span>
										<span>{selectedContainer.ProductsQuantity}</span>
										<span>{selectedContainer.StartLoadingDate}</span>
									</div>
									<div className="bg-gray-50 w-full grid lg:grid-cols-2 gap-10 md:mx-20   py-3  sm:px-6">
										<StopStats selectedContainer={selectedContainer} />
										<IncomeStats selectedContainer={selectedContainer} />
									</div>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}