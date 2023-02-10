import { React } from "react";
export const TablePagination = () => {
	return (
		<>
			<div className="flex my-4 justify-center">
				<nav aria-label="Page navigation example">
					<ul className="flex list-style-none">
						<li className="page-item disabled">
							<a
								className="page-link text-xs py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
								href="#"
								tabindex="-1"
								aria-disabled="true"
							>
								Prev
							</a>
						</li>
						<li className="page-item">
							<a
								className="page-link text-xs py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								href="#"
							>
								1
							</a>
						</li>
						<li className="page-item active">
							<a
								className="page-link text-xs py-1 px-2 relative block border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
								href="#"
							>
								2 <span className="visually-hidden"></span>
							</a>
						</li>
						<li className="page-item">
							<a
								className="page-link text-xs py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								href="#"
							>
								3
							</a>
						</li>
						<li className="page-item">
							<a
								className="page-link text-xs py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								href="#"
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};
