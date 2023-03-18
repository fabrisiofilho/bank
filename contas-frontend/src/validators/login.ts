import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .transform((str) => str.trim())
        .required('E-mail ou usuario é obrigatorio!'),
    password: yup
        .string()
        .transform((str) => str.trim())
        .required('Senha é obrigatório!'),
});