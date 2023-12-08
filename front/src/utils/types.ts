import {TextInputProps} from 'react-native';
import {FieldProps} from 'formik';
import {IInputProps} from 'native-base';
import {InterfaceBadgeProps} from 'native-base/lib/typescript/components/composites/Badge/types';
import {ViewStyle} from 'react-native';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface FieldInterface {
  field: FieldProps['field'];
  form: FieldProps['form'];
  meta: FieldProps['meta'];
}

export interface TokenProps {
  token: string;
  expiresIn: number;
}
export interface AuthPayloadInterface {
  token: TokenProps;
  email: string;
}

export interface searchStationsInterface {
  searchTerm?: string;
  bikeType?: 'all' | 'ebike' | 'mechanical';
  page?: number;
  pageSize?: number;
}

export interface NumBikesAvailableType {
  mechanical?: number;
  ebike?: number;
}

export interface Station {
  stationCode?: string;
  station_id?: number;
  name?: string;
  capacity?: number;
  lat?: number;
  lon?: number;
  num_bikes_available?: number;
  numBikesAvailable?: number;
  num_bikes_available_types?: NumBikesAvailableType[];
  num_docks_available?: number;
  numDocksAvailable?: number;
  is_installed?: number;
  is_returning?: number;
  is_renting?: number;
  last_reported?: number; // in seconds not ms -_-'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QueryPage {
  data: Station[];
  total: number;
  message: string;
}

export interface BadgeComponentProps extends InterfaceBadgeProps {
  children: React.ReactNode;
}

export interface PointProps {
  lat: number | string | undefined;
  lng: number | string | undefined;
}

export interface FormProps {
  /**
   * Required Form Children
   */
  children: React.ReactNode;

  /**
   * optionally listen to any input change into your form.
   * @param {any} value
   */
  onChange?: (value: any) => void;

  /**
   * Form initialValue - this is required, you can still pass in an empty object
   */
  initialValue: {[key: string]: any};

  /**
   * Function that should be called when the form is being submitted.
   * The from can be submitted by calling formRef.submit()
   */
  onSubmit: (value: any) => void;

  /**
   * Yup validation schema of function that returns [Yup](https://github.com/jquense/yup) validation schema
   */
  validationSchema: any;

  /**
   * Form container style
   */
  style?: ViewStyle;

  /**
   * Custom validation error component
   */
  ErrorComponent?: React.ComponentType<{error: any}>;
}

export interface FormRef {
  submit: () => void;
  runTransition: () => void;
  isValid: () => boolean;
  getValues: () => any;
  scrollToTop: () => void;
}

export interface CustomTextInputProps
  extends Omit<TextInputProps, 'ref' | 'onChange'> {
  name: string;
  onChange?: (value: string) => void;
}
