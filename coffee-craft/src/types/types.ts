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