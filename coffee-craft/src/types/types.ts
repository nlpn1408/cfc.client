export interface AddressForm {
  fullName: string;
  phoneNumber: string;
  pincode: number;
  area: string;
  city: string;
  state: string;
}

export interface TextInputProps {
  label: string,
  register: any,
  name: string,
  errors: any,
  type?: string
  placeholder: string
  page?: string
  className?: string
  isRequired?: boolean
  disabled?: boolean
  defaultValue?: string
  validateOptions?: any;
}

export interface TextAreaInputProps {
  label: string,
  register: any,
  name: string,
  errors: any,
  type?: string
  placeholder: string
  className?: string
  disabled?: boolean
  defaultValue?: string
}

export type SelectionInputProps = {
  label: string;
  register: any;
  className?: string;
  name: string;
  options: SelectedProps[];
  placeholder: string;
  setValue: (gender: string, value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
};

export type SelectedProps = {
  label: string;
  value: string;
};

export type DateInputProps = {
  label: string;
  register: any;
  name: string;
  errors: any;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
};

export interface BannerProps {
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export type RegisterInputProps = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

export type UserPageProps = {
  page: string;
  title: string;
  description: string;
  userId?: string;
  formId?: string;
};

export type ChangePasswordProps = {
  password: string
  newpassword: string
  confirmPassword: string;
}

export type UserProfile = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: string;
  imgUrl?: string
}

export type ContactFormProps = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

// export interface Category {
//   id: string;
//   name: string;
//   description: string;
//   parentId: string | null;
//   createdAt: string;
//   updatedAt: string;
//   _count: {
//     products: number;
//   };
// }