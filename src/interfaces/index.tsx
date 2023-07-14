export interface FormProps {
  onSubmit: (data: FormDataType) => void;
}
export interface FormDataType {
  name: string;
  description: string;
  geometry: string;
}

export interface ApiMessageResponse {
  message: string;
}
