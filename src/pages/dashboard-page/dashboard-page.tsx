import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie, getElementAtEvent } from 'react-chartjs-2';

import style from './dashboard-page.module.css';
import { useEffect, useRef } from 'react';
import { Flex } from '../../components/flex/flex';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getErrorRequestState } from '../../services/redux/selectors/error-request';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchDashBoardData } from '../../services/redux/slices/dashboard/dashboard';
import { getDashBoardState } from '../../services/redux/selectors/dashboard';

ChartJS.register(ArcElement);

export const DashBoard = () => {
  const dispatch = useAppDispatch();
  const { 
    dashboardDataScenarios, 
    dashboardDataLists, 
    dashboardDataDialogs 
  } = useAppSelector(getDashBoardState);

  const accessToken = localStorage.getItem('accessToken')
  const { isError } = useAppSelector(getErrorRequestState);

  useEffect(() => {
    if (accessToken)
      dispatch(fetchDashBoardData(accessToken));
  }, [accessToken, dispatch])

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
    }
  }, [ref])

  return (
    <main className='center-container'>
      <Flex gap={60}>
        <div className={style.container}>
          <Pie
            ref={ref}
            data={dashboardDataScenarios}
            onMouseMove={(e) => {
              if (ref && ref.current) console.log(getElementAtEvent(ref.current, e))
            }} />
          <div className={style.info}></div>
        </div>
      </Flex>
    </main>
  );
}
