
export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

export const banners: Banner[] = [
  {
    id: "deep-cleaning",
    title: "Professional Home Cleaning",
    description: "Get 20% off on your first deep cleaning service",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    bgColor: "bg-teal-50"
  },
  {
    id: "repair-service",
    title: "Home Repair Services",
    description: "Professional repair services starting at just $49",
    image: "/lovable-uploads/bd992dd4-833c-40b2-bd25-4a6e02c6c234.png",
    bgColor: "bg-amber-50"
  },
  {
    id: "salon-service",
    title: "Salon At Home",
    description: "Premium salon services at your doorstep",
    image: "/lovable-uploads/6e5146ef-4d43-4e61-8d34-38df78d306a6.png",
    bgColor: "bg-rose-50"
  }
];
