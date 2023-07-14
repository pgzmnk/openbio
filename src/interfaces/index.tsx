export interface FormProps {
  onSubmit: (data: FormDataType) => void;
}
export interface FormDataType {
  id: string;
  name: string;
  description: string;
  geometry: string;
  centroid?: string;
  published?: boolean;
  authorId?: string;
}

export interface ApiMessageResponse {
  message: string;
}
