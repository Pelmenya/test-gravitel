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

  const refScenarios = useRef(null);
  const refLists = useRef(null);
  const refDialogs = useRef(null);


  return (
    <main className='center-container'>
      <Flex gap={60}>
        <div className={style.container}>
          <Pie
            ref={refScenarios}
            data={dashboardDataScenarios}
            onMouseMove={(e) => {
              if (refScenarios && refScenarios.current) console.log(getElementAtEvent(refScenarios.current, e))
            }} />
          <div className={style.info}></div>
        </div>
        <div className={style.container}>
          <Pie
            ref={refLists}
            data={dashboardDataLists}
            onMouseMove={(e) => {
              if (refLists && refLists.current) console.log(getElementAtEvent(refLists.current, e))
            }} />
          <div className={style.info}></div>
        </div>
        <div className={style.container}>
          <Pie
            ref={refDialogs}
            data={dashboardDataDialogs}
            onMouseMove={(e) => {
              if (refDialogs && refDialogs.current) console.log(getElementAtEvent(refDialogs.current, e))
            }} />
          <div className={style.info}></div>
        </div>
      </Flex>
    </main>
  );
}
