
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeBannerProps {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const HomeBanner = ({ id, title, description, image, bgColor }: HomeBannerProps) => {
  return (
    <div 
      className={`${bgColor} rounded-2xl overflow-hidden relative p-4 h-44 flex items-center`}
    >
      <div className="w-1/2 z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>
        <Link
          to={`/service/${id}`}
          className="bg-teal-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-1 text-sm hover:bg-teal-700 transition-colors"
        >
          Book Now
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
