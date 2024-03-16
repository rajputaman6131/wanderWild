"use client"
import { categories } from "@/constants/constants";

const Header = ({ selected, setSelected }) => {
    // Array of category names

    return (
        <div>
            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                <button
                    onClick={() => setSelected('')}
                    type="button"
                    className={`text-gray-900 border border-white hover:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${!selected ? "dark:bg-gray-900 dark:text-white dark:border-gray-900 dark:hover:border-gray-700 dark:focus:ring-gray-800" : "bg-white dark:border-gray-900"
                        }`}
                >
                    All Categories
                </button>
                {categories.map((category, index) => (
                    <button
                        onClick={() => setSelected(category)}
                        key={index}
                        type="button"
                        className={`text-gray-900 border border-white hover:border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${selected === category ? "dark:bg-gray-900 dark:text-white dark:border-gray-900 dark:hover:border-gray-700 dark:focus:ring-gray-800" : "bg-white dark:border-gray-900"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
