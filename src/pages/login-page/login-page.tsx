import cn from 'classnames';
import * as yup from 'yup';
import { GraphQLClient } from 'graphql-request'
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProfileFormContainer } from '../../components/profile-form-container/profile-form-container';
import { ButtonWithChildren } from '../../components/button-with-children/button-with-children';
import { InputText } from '../../components/profile-form-container/components/input-universal/input-universal';
import { InputPassword } from '../../components/profile-form-container/components/input-password/input-password';
import { Navigate, useLocation } from 'react-router';
import { LocationStateType } from '../../utils/types/location-state-type';
import loginPageStyle from './login.module.css';
import { SERVER } from '../../utils/api-constants/server';
import { createLoginQuery } from '../../utils/query-creators/createLoginQuery';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setError } from '../../services/redux/slices/error-request/error-request';
import { parseError } from '../../utils/functions/parseError';

const schema = yup
  .object({
    username: yup.string().min(2).required(),
    password: yup.string().min(4).required(),
  })
  .required();

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('accessToken')


  const location = useLocation() as LocationStateType;

  const from = location?.state?.from || '/';

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FieldValues) => {
    const graphQLClient = new GraphQLClient(SERVER.url)
    setLoading(true);
    try {
      const resData = await graphQLClient.request(createLoginQuery(data.username, data.password))
      console.log(resData)
      setLoading(false);
    } catch (e) {
      setLoading(false);
      dispatch(setError(parseError(String(e))));
    }
  };

  if (accessToken) {
    return (
      <Navigate
        to={from}
      />
    );
  }

  return (
    <main className='center-container'>
      <ProfileFormContainer title='Вход'>
        <>
          <p className={cn('text text_type_main-default', loginPageStyle.intro)}>Уникальная технология доступная для Вашего бизнеса уже сечас!</p>
          <form name='login' className='form' onSubmit={handleSubmit(onSubmit)}>
            <InputText name='username' error={!!errors.username} control={control} />
            <InputPassword error={!!errors.password} control={control} />
            <ButtonWithChildren
              loading={loading}
              type='primary'
              size='medium'
            >
              <span>Войти</span>
            </ButtonWithChildren>
          </form>
        </>
      </ProfileFormContainer>
    </main>
  );
};
