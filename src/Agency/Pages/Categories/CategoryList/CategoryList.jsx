import { React } from "react";
import { useSelector } from "react-redux";
export const CategoryList = ({ categories, handleSelectedCategory, handleDeleteCategory }) => {
	const { selectedCategory } = useSelector((state) => state.CategoriesSlice);
	return (
		<div className=" text-gray-900 mt-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
			{categories.map((category) => (
				<div
					key={category.CategoryId}
					onClick={() => handleSelectedCategory(category)}
					className="flex justify-between items-center py-2 px-4 w-full text-sm font-medium cursor-pointer rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10"
				>
					<span>{category.CategoryName}</span>

					<i
						onClick={() => handleDeleteCategory(category.CategoryId)}
						className="fas fa-trash text-red-400 p-2.5  hover:text-red-500 hover:border hover:rounded-full hover:bg-red-200"
					></i>
					{category.CategoryId == selectedCategory.CategoryId ? (
						<i
							onClick={() => handleDeleteCategory(category.CategoryId)}
							className="fa fa-chevron-right
						text-red-400 p-2.5  hover:text-red-500 hover:border hover:rounded-full hover:bg-red-200"
						></i>
					) : (
						""
					)}
				</div>
			))}
		</div>
	);
};
