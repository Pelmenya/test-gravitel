import { useEffect } from 'react';
import { RoutesProvider } from '../routes-provider/routes-provider';
import { Modal } from '../modal/modal';
import { BadRequest } from '../bad-request/bad-request';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { clearError } from '../../services/redux/slices/error-request/error-request';

import app from './app.module.css';
import { graphQLClient } from '../../graphql-clients/graphql-client';

export const App = () => {
  const { isError, message } = useAppSelector(getErrorRequestState);
  const dispatch = useAppDispatch();

  const handlerOnCloseErrorModal = () => {
    dispatch(clearError());
  };

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
