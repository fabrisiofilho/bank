import * as yup from 'yup';

export const contaSchema = yup.object().shape({
    owner: yup
        .object()
        .nullable()
        .required('Campo do titular é obrigatório!'),
    number: yup
        .string()
        .required('Campo de numero de conta é obrigatório'),
});
