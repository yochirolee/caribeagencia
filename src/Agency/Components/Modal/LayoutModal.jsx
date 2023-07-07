import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const LayoutModal = ({isOpen,setIsOpen,children}) => {
	
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-20" initialFocus={""} onClose={()=>setIsOpen(false)}>
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
								<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
									<h3 className="text-md font-semibold text-gray-900 dark:text-white">Listado de HbL</h3>
									<button
										type="button"
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-toggle="staticModal"
									>
										<i className="fas fa-close text-md text-red-400"></i>
									</button>
								</div>
								<div className="flex flex-col  justify-between gap-2 items-center p-4 lg:p-10">
									{children}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
