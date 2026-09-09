export interface UserType {
  name: string;
  imageUrl: string;
  imageSize: number;
  height?: number;
}

export interface UserProps {
  user: UserType;
  isProfilePage?: boolean;
}
export interface MyButtonProps {
  children: React.ReactNode;
  handleButtonClick: (e: React.SyntheticEvent) => void;
  buttonClassName?: string;
}

export interface ProductItem {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}
