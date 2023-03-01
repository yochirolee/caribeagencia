import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFetchAllContainers } from "../../../hooks/useFetchAllContainers";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}


export default function ContainerSelect({ selectedContainer, setSelectedContainer }) {
	const { data: containers } = useFetchAllContainers();

	return (
		<div className="max-w-sm">
			<Listbox value={selectedContainer} onChange={setSelectedContainer}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium mt-4 text-gray-700">
							Seleccione Contenedor
						</Listbox.Label>
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
								<span className="flex items-center">
									<span className="ml-3 text-xs block truncate">
										{selectedContainer?.ContainerId
											? selectedContainer?.ContainerNumber
											: "Seleccione Contenedor"}
									</span>
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
									<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{containers?.map((container) => (
										<Listbox.Option
											key={container?.ContainerId}
											className={({ active }) =>
												classNames(
													active ? "text-white bg-indigo-600" : "text-gray-900",
													"relative cursor-default select-none py-2 pl-3 pr-9",
												)
											}
											value={container}
										>
											{({ selected, active }) => (
												<>
													<div className="flex items-center">
														<span
															className={classNames(
																selected ? "font-semibold" : "font-normal",
																"ml-3 block truncate",
															)}
														>
															{container?.ContainerNumber}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																active ? "text-white" : "text-indigo-600",
																"absolute inset-y-0 right-0 flex items-center pr-4",
															)}
														>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
}
