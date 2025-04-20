
export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "🧹",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png"
  },
  {
    id: "repairing",
    name: "Repairing",
    icon: "🔧",
    image: "/lovable-uploads/bd992dd4-833c-40b2-bd25-4a6e02c6c234.png"
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🖌️",
    image: "/lovable-uploads/cfd819b5-55f4-43f9-a8c4-54bdefbbf3cf.png"
  },
  {
    id: "salon",
    name: "Salon",
    icon: "✂️",
    image: "/lovable-uploads/6e5146ef-4d43-4e61-8d34-38df78d306a6.png"
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🚿",
    image: "/lovable-uploads/8e3fcc5c-e5e3-4ea6-873f-512db50bc8bd.png"
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    image: "/lovable-uploads/3c8ac677-b445-4127-9c2a-4ca42fad1afd.png"
  },
  {
    id: "gardening",
    name: "Gardening",
    icon: "🌿",
    image: "/lovable-uploads/08d6a86e-521a-4825-a80d-9a710adba49d.png"
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: "🔌",
    image: "/lovable-uploads/a72bc300-319c-40be-a2cb-14f65bec0e0c.png"
  }
];
