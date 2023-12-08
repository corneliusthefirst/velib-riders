import {Formik, FormikProps, FormikValues} from 'formik';
import React, {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import isEqual from 'lodash.isequal';
import {FormProps} from '../utils/types';
import {Text} from 'native-base';
import {Colors} from '../constants/colors';
import {Sizes} from '../constants/sizes';

const getErrorString = (error: any) => {
  if (error && typeof error === 'string') {
    return error;
  }
  return error?.valid || error?.required;
};

const FormComp = (props: FormProps, refs: any) => {
  const formRef = useRef<FormikProps<FormikValues>>({values: {}} as any);
  const scrollViewRef = useRef<ScrollView>(null);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);

  const renderChildren = useCallback(
    function callRender(children: React.ReactNode): React.ReactNode {
      return React.Children.map(children, element => {
        if (React.isValidElement(element)) {
          if (element.props.name) {
            const El = React.cloneElement(
              element as React.ReactElement<{
                name: string;
                onChange: (value: any) => void;
                value: any;
                onBlur: void | ((value: any) => void);
              }>,
              {
                onChange: (value: any) => {
                  formRef.current.setFieldValue(element.props.name, value);
                },
                onBlur: formRef.current.handleBlur(element.props.name),
                value: formRef.current.values[element.props.name],
              },
            );
            return (
              <View style={[styles.formRow]}>
                {El}
                {getErrorString(formRef.current.errors[El.props.name]) ? (
                  props.ErrorComponent ? (
                    <props.ErrorComponent
                      error={formRef.current.errors[El.props.name]}
                    />
                  ) : (
                    <View style={styles.formError}>
                      <Text style={styles.formErrorText}>
                        {getErrorString(formRef.current.errors[El.props.name])}
                      </Text>
                    </View>
                  )
                ) : (
                  <View />
                )}
              </View>
            );
          } else if (element.props.children) {
            const El: React.ReactNode = React.cloneElement(
              element as React.ReactElement,
              {
                children: callRender(element.props.children),
              },
            );
            return El;
          } else {
            return React.cloneElement(element);
          }
        } else {
          return element;
        }
      });
    },
    [props],
  );
  useImperativeHandle(
    refs,
    () => ({
      submit() {
        setSubmitAttempted(true);
        formRef.current.handleSubmit();
      },
      runTransition: () => {},
      isValid: () => submitAttempted && formRef.current.isValid,
      getValues: () => formRef.current.values,
      scrollToTop: () =>
        scrollViewRef.current?.scrollTo({y: 0, animated: true}),
    }),
    [submitAttempted],
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      ref={scrollViewRef}
      style={[styles.mainContainer, props.style]}>
      <Formik
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
        validateOnChange={submitAttempted}
        onChange={props.onChange}
        validateOnBlur={submitAttempted}
        initialValues={props.initialValue}>
        {form => {
          if (!isEqual(form.values, formRef.current?.values)) {
            props.onChange && props.onChange(form.values);
          }

          formRef.current = form;
          return <View>{renderChildren(props.children)}</View>;
        }}
      </Formik>
    </ScrollView>
  );
};
export const Form = forwardRef(FormComp);

const styles = StyleSheet.create({
  formError: {
    backgroundColor: Colors.darkBlue,
    borderRadius: Sizes.fixBorderRadius * 0.5,

    marginTop: Sizes.fixPadding * 0.5,
    padding: Sizes.fixPadding * 0.5,
  },
  formErrorText: {
    color: Colors.errorColor,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  formRow: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    minHeight: 120,
  },
});
