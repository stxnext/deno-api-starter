export const CreateUserValidation = {
  validations: [
    { key: 'username', validationOption: 'string' },
    { key: 'email', validationOption: 'string' }
  ],
  bodyRequired: true,
};
