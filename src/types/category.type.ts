export interface Category {
  id: string;
  name: string;
  description?: string;
  type: "FREE" | "PAID";
  unitName?: string;
  basePrice?: number;
}

export interface CreateServiceRequestFormProps {
  categories?: Category[];
  isLoadingCategories?: boolean;
  initialData?: any; 
  isUpdateMode?: boolean;
}
