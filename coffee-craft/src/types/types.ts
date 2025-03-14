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
}

export interface TextAreaInputProps {
  label: string,
  register: any,
  name: string,
  errors: any,
  type?: string
  placeholder: string
  className?: string
}

export interface BannerProps {
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export type RegisterInputProps = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: any;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

