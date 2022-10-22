import { React, useState } from "react";
export const CategoryList = ({ categories, handleSelectedCategory, handleDeleteCategory }) => {
	const [showDelete, setShowDelete] = useState(false);
	const handleDelete = (id) => {
		handleDeleteCategory(id);
		setShowDelete(!showDelete);
	};
	return (
		<div className=" text-gray-900  mt-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
			{categories.map((category) => (
				<div
					key={category.CategoryId}
					onClick={() => handleSelectedCategory(category)}
					className="flex relative justify-between items-center py-2 px-4 w-full text-sm font-medium cursor-pointer rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10"
				>
					<span className="">{category.CategoryName}</span>

					<i
						onClick={() => setShowDelete(!showDelete)}
						className="fa fa-ellipsis-v  text-gray-400 p-2.5  hover:text-gray-500 hover:border hover:rounded-full hover:bg-gray-200"
					></i>

					<div
						className={`${
							showDelete ? "flex" : "hidden"
						} absolute right-4 z-10  flex rounded-md  justify-center w-10 bg-white top-2 border hover:bg-red-100`}
					>
						<i
							onClick={() => handleDelete(category.CategoryId)}
							className="fas fa-trash   text-gray-400 p-2.5  hover:text-red-500 "
						></i>
					</div>
				</div>
			))}
		</div>
	);
};
