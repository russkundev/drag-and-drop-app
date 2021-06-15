export const Autobind = (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const method = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    get() {
      return method.bind(this);
    },
  };

  return newDescriptor;
};
