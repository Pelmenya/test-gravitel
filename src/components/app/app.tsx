import { useEffect } from 'react';
import { useQuery } from 'graphql-hooks';
import { RoutesProvider } from '../routes-provider/routes-provider';
import app from './app.module.css';
import { graphQLCLientHooks } from '../../graphql-clients/graphql-client-hooks';
import { Modal } from '../modal/modal';
import { BadRequest } from '../bad-request/bad-request';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { clearError } from '../../services/redux/slices/error-request/error-request';

export const App = () => {
  const { isError, message } = useAppSelector(getErrorRequestState);
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      
    } else console.log("accessToken: ", accessToken);
  }, [accessToken])

  const ME_QUERY = `
  query{
    me{
      username,
      password,
      token
    }
  }
  `
graphQLCLientHooks.setHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJPbmUiLCJwYXNzd29yZCI6IiQyYSQxMCRiM2tYZ0Nud0kxL3pFSWRHZ01PcFQuM0llajZLVW1STkxDL2I3WnMzZGZSWEc2cnByc3F4cSIsImVtYWlsIjoidTFAbG9jYWxob3N0IiwiaWF0IjoxNjU4NTE4MDY0LCJleHAiOjE2NTkxMjI4NjR9.tUi_WDxZoO1janMxkCT7mjLSa7dtETxS-Y9JZkkGw1U')
  const { loading, error, data: loginData } = useQuery(ME_QUERY);
  //const { loading, error, data } = useQuery(DASHBOARD_QUERY);


  const handlerOnCloseErrorModal = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    if (loginData) {
      console.log(loginData)
    }
  }, [loginData]);




  return (
    <div className={app.app}>
      <RoutesProvider />
      {isError && (
        <Modal title='Ошибка' handlerOnClose={handlerOnCloseErrorModal}>
          <BadRequest error={message} />
        </Modal>
      )}

    </div>

  );
};
