import { useEffect } from 'react';
import cn from 'classnames';
import { Flex } from '../../components/flex/flex';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchDashBoardData } from '../../services/redux/slices/dashboard/dashboard';
import { getDashBoardState } from '../../services/redux/selectors/dashboard';
import { DashBoardItem } from '../../components/dashboard/dashboard-item/dashboard-item';
import { Loader } from '../../components/loader/loader';

import style from './dashboard-page.module.css';
import { Title } from '../../components/title/title';
import { useNavigate } from 'react-router';

export const DashBoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    dashboardDataScenarios,
    dashboardDataLists,
    dashboardDataDialogs,
    dashboard,
  } = useAppSelector(getDashBoardState);

  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken)
      dispatch(fetchDashBoardData(accessToken));
  }, [accessToken, dispatch])

  return (
    <>
      <header className={style.header}>
        <Title type='h1'>Сводка</Title>
        <button
          className={style.button}
          onClick={() => {
            localStorage.removeItem('accessToken');
            navigate('/login');
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 45 48" fill="white" stroke="var(--background-alt)" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 23.5L25.5 34.7583L25.5 12.2417L45 23.5Z" />
            <rect x="10" y="17.5" width="16" height="12" />
            <line x1="42.5" y1="4.5" x2="42.5" y2="10.5" stroke-width="5" />
            <line x1="42.5" y1="37.5" x2="42.5" y2="43.5" stroke-width="5" />
            <line x1="2.5" y1="4.5" x2="2.5" y2="43.5" stroke-width="5" />
            <path d="M0 3H45M0 45H45" stroke-width="5" />
          </svg>
        </button>



      </header>
      <main className='center-container'>
        {dashboard ?
          <Flex gap={60}>
            <DashBoardItem name='Сценарии' data={dashboardDataScenarios} lists={dashboard.scenarios} />
            <DashBoardItem name='Списки' data={dashboardDataLists} lists={dashboard.lists} />
            <DashBoardItem name='Диалоги' data={dashboardDataDialogs} lists={dashboard.dialogs} />
          </Flex>
          : <Loader />
        }
      </main>
    </>
  );
}
