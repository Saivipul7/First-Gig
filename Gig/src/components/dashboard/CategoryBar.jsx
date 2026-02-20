const CATEGORIES = [
    "Graphics & Design",
    "Programming & Tech",
    "Digital Marketing",
    "Video & Animation",
    "Writing & Translation",
    "Music & Audio",
    "Business",
    "Data",
];

const CategoryBar = ({ selectedCategory, onCategoryClick }) => {
    return (
        <div className="border-t border-white/10 py-2.5 overflow-x-auto relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex gap-8 text-sm text-zinc-400 whitespace-nowrap scrollbar-hide">
                {CATEGORIES.map((cat) => (
                    <span
                        key={cat}
                        onClick={() => onCategoryClick(cat)}
                        className={`hover:text-white cursor-pointer transition-colors block border-b-2 pb-0.5 ${selectedCategory === cat
                                ? "text-white border-white"
                                : "border-transparent hover:border-zinc-500"
                            }`}
                    >
                        {cat}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;
