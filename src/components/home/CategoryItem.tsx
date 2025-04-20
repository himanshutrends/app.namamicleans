
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  id: string;
  icon: ReactNode;
  name: string;
}

const CategoryItem = ({ id, icon, name }: CategoryItemProps) => {
  return (
    <Link
      to={`/category/${id}`}
      className="flex flex-col items-center gap-1 p-2 transition-all duration-200 active:scale-95"
    >
      <div className="w-14 h-14 bg-white rounded-xl border border-gray-100 card-shadow flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-gray-700 mt-1 text-center">{name}</span>
    </Link>
  );
};

export default CategoryItem;
