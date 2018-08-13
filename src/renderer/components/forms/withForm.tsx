import * as React from "react";
import { Field, FieldProps } from "react-final-form";

export default function withForm<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return class WithForm extends React.Component<FieldProps & P> {
    public render() {
      const { name } = this.props;

      return (
        <Field name={name}>
          {({ input }) => <WrappedComponent {...input} {...this.props} />}
        </Field>
      );
    }
  };
}
