
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  price?: number;
  providerType?: string;
  horizontal?: boolean;
}

const ServiceCard = ({
  id,
  name,
  image,
  rating,
  price,
  providerType,
  horizontal = false,
}: ServiceCardProps) => {
  if (horizontal) {
    return (
      <Link
        to={`/service/${id}`}
        className="flex bg-white rounded-xl overflow-hidden card-shadow service-card"
      >
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover"
        />
        <div className="flex-1 p-3">
          <h3 className="font-medium text-gray-900">{name}</h3>
          {providerType && <p className="text-xs text-gray-500">{providerType}</p>}
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
            {price !== undefined && (
              <div className="text-sm font-semibold text-teal-700">
                ${price}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/service/${id}`}
      className="bg-white rounded-xl overflow-hidden service-card"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-medium text-gray-900">{name}</h3>
        {providerType && <p className="text-xs text-gray-500">{providerType}</p>}
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
          {price !== undefined && (
            <div className="text-sm font-semibold text-teal-700">
              ${price}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
