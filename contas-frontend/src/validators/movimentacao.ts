import * as yup from 'yup';

export const movimentacaoSchema = yup.object().shape({
    type: yup
        .string()
        .required('Campo do tipo é obrigatório!'),
    mount: yup
        .number()
        .moreThan(0, "Tem que ser maior que R$ 0,00")
        .required('Campo do valor é obrigatório!'),
    account: yup
        .object()
        .nullable()
        .required('Campo de conta é obrigatório!'),
});
