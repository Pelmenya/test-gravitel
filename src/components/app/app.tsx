import { useEffect } from 'react';
import { useQuery } from 'graphql-hooks';
import { RoutesProvider } from '../routes-provider/routes-provider';
import app from './app.module.css';
import { grathQLCLient } from '../../graphql-client/graphql-client';



export const App = () => {
  const LOGIN_QUERY = `mutation {
    login(username:"UserOne", password:"pass") {
      username,
      password,
      token
    }
   }`

  const ME_QUERY = `
  query{
    me{
      username,
      password,
      token
    }
  }
  `
grathQLCLient.setHeader('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJPbmUiLCJwYXNzd29yZCI6IiQyYSQxMCRiM2tYZ0Nud0kxL3pFSWRHZ01PcFQuM0llajZLVW1STkxDL2I3WnMzZGZSWEc2cnByc3F4cSIsImVtYWlsIjoidTFAbG9jYWxob3N0IiwiaWF0IjoxNjU4NTE4MDY0LCJleHAiOjE2NTkxMjI4NjR9.tUi_WDxZoO1janMxkCT7mjLSa7dtETxS-Y9JZkkGw1U')
  const { loading, error, data: loginData } = useQuery(ME_QUERY);
  //const { loading, error, data } = useQuery(DASHBOARD_QUERY);


  useEffect(() => {
    if (loginData) {
      console.log(loginData)
    }
  }, [loginData]);

  useEffect(() => {
    if (loginData) {
      console.log(loginData)
    }
  }, [loginData]);


  return (
    <div className={app.app}>
      <RoutesProvider />
    </div>

  );
};
