import { useEffect } from 'react';
import { Flex } from '../../components/flex/flex';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchDashBoardData } from '../../services/redux/slices/dashboard/dashboard';
import { getDashBoardState } from '../../services/redux/selectors/dashboard';
import { DashBoardItem } from '../../components/dashboard/dashboard-item/dashboard-item';
import { Loader } from '../../components/loader/loader';

export const DashBoardPage = () => {
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
  );
}
