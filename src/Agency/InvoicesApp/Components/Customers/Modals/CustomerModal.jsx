import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CustomerForm from "../Forms/CustomerForm";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function CustomerModal({ isOpen, setIsOpen, setSelectedCustomer }) {
	return (
		<div>
			<div className=" flex items-center">
				<label htmlFor="newcustomer" className="sr-only">
					New Customer
				</label>
				<button
					onClick={() => setIsOpen(true)}
					id="newcustomer"
					name="newcustomer"
					className=" h-9   rounded-md  border bg-transparent py-0 pl-3  pr-3 text-gray-500  ring-2 sm:text-sm"
				>
					<UserPlusIcon className="h-5 w-5 hover:text-blue-500" />
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10 " onClose={setIsOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
										Crear Cliente
									</Dialog.Title>
									<div className="mt-2">
										<CustomerForm setIsOpen={setIsOpen} setSelectedCustomer={setSelectedCustomer} />
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
