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

export type ChangePasswordProps ={
  password:string
  newpassword:string
  confirmPassword: string;
}

export type UserProfile ={
  name: string;
  email: string;
  phone: string;
  address: string;
  imgUrl: string;
}