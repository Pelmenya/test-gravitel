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
import { IStatistic } from '../../utils/types/dashboard';

ChartJS.register(ArcElement);

function getTotalItems(list: IStatistic | undefined): number | '' {
  if (list) {
    return list.active + list.completed + list.inactive
  }
  return '';
}

export const DashBoard = () => {


  const dispatch = useAppDispatch();
  const {
    dashboardDataScenarios,
    dashboardDataLists,
    dashboardDataDialogs,
    dashboard,
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
        <Flex flexDirection='column' gap={40}>
          <div className={style.container}>
            <Pie
              ref={refScenarios}
              data={dashboardDataScenarios}
              onMouseOut={() => {
              
              }}
              onMouseMoveCapture={(e) => {
                if (refScenarios && refScenarios.current) console.log(getElementAtEvent(refScenarios.current, e)[0]?.index)}}/>
            <div className={style.info}></div>
          </div>
          <Flex className={style.statistic} flexDirection='column' gap={16}>
            <Flex className={style.statistic__item}>
              <p className='text text_type_main-medium'>
                Всего:
              </p>
              <p className={'text constructor-element__price'}>
                {getTotalItems(dashboard?.scenarios)}
              </p>
            </Flex>
            <Flex className={style.statistic__item}>
              <p className='text text_type_main-medium'>
                Активных:
              </p>
              <p className={'text constructor-element__price'}>
                {dashboard?.scenarios.active || '0'}
              </p>
            </Flex>
            <Flex className={style.statistic__item}>
              <p className='text text_type_main-medium'>
                Неактивных:
              </p>
              <p className={'text constructor-element__price'}>
                {dashboard?.scenarios.inactive || '0'}
              </p>
            </Flex>
            <Flex className={style.statistic__item}>
              <p className='text text_type_main-medium'>
                Завершенных:
              </p>
              <p className={'text constructor-element__price'}>
                {dashboard?.scenarios.completed || '0'}
              </p>
            </Flex>
          </Flex>
        </Flex>
        <div className={style.container}>
          <Pie
            ref={refLists}
            data={dashboardDataLists}
            onMouseOut={() => {
              
            }}
            onMouseMoveCapture={(e) => {
              if (refLists && refLists.current) console.log(getElementAtEvent(refLists.current, e)[0]?.index)            }} />
          <div className={style.info}></div>
        </div>
        <div className={style.container}>
          <Pie
            ref={refDialogs}
            data={dashboardDataDialogs}
            onMouseMoveCapture={(e) => {
              if (refDialogs && refDialogs.current) console.log(getElementAtEvent(refDialogs.current, e)[0]?.index)            }} />
          <div className={style.info}></div>
        </div>
      </Flex>
    </main>
  );
}
