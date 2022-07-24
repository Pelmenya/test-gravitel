import cn from 'classnames';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pie, getElementAtEvent } from 'react-chartjs-2';
import {
	IDashBoardDataItem,
	setBGColorDialogs,
	setBGColorLists,
	setBGColorScenarios
} from '../../../services/redux/slices/dashboard/dashboard';
import { getTotalItems } from '../../../utils/functions/getTotaltems';
import { IStatistic } from '../../../utils/types/dashboard';
import { Flex } from '../../flex/flex';
import { Title } from '../../title/title';
import style from './dashboard-item.module.css';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import {
	hoverBGAllSectors,
	hoverBGSector0,
	hoverBGSector1,
	hoverBGSector2,
	initialBGcolor
} from '../../../services/redux/slices/dashboard/charts-colors';

ChartJS.register(ArcElement);

export interface IDashBoardItemProps {
	data: IDashBoardDataItem;
	lists: IStatistic;
	name: 'Сценарии' | 'Списки' | 'Диалоги';
}

export const DashBoardItem = ({ data, lists, name }: IDashBoardItemProps) => {
	const dispatch = useAppDispatch();
	const totalCount = useMemo(() => getTotalItems(lists), [lists]);
	const [count, setCount] = useState(totalCount)
	const [sector, setSector] = useState(-1);
	const refCanvas = useRef(null);

	const dispatchBGSectors = useCallback((colors: string[]) => {
		switch (name) {
			case 'Сценарии':
				dispatch(setBGColorScenarios(colors));
				break;
			case 'Списки':
				dispatch(setBGColorLists(colors));
				break;
			case 'Диалоги':
				dispatch(setBGColorDialogs(colors));
				break;
		}
	}, [name, dispatch]);

	const getCountBySector = useCallback((index: number) => {
		switch (index) {
			case 0:
				return lists.active;
			case 1:
				return lists.inactive;
			case 2:
				return lists.completed;
			default:
				return totalCount;
		}
	}, [totalCount, lists]);

	const setInitialState = useCallback(() => {
		setCount(totalCount);
		setSector(-1);
	}, [totalCount])

	const onMouseOutHandler = useCallback(() => {
		dispatchBGSectors(initialBGcolor)
		setInitialState();
	}, [dispatchBGSectors, setInitialState])

	useEffect(() => {
		setCount(totalCount)
	}, [totalCount])

	return (<Flex flexDirection='column' gap={40}>
		<div className={style.container}>
			<Pie
				ref={refCanvas}
				data={data}
				onMouseOut={setInitialState}
				onMouseMoveCapture={(e) => {
					if (refCanvas && refCanvas.current) {
						const sector = getElementAtEvent(refCanvas.current, e)[0]?.index;
						if (sector === undefined) {
							setInitialState();
						}
						if (sector >= 0) {
							if (sector !== count) {
								setSector(sector);
								setCount(getCountBySector(sector));
							}
						}
					}
				}} />
			<div className={style.info}>
				<Flex flexDirection='column' gap={24} className={style.info__statstic}>
					<Title type='h3'>{name}</Title>
					<p className='text text_type_digits-default'>
						<span className={style.info__count}>
							{count}
						</span>
					</p>
				</Flex>
			</div>
		</div>
		<Flex className={style.statistic} flexDirection='column' gap={16}>
			<div
				className={style.statistic__item}
				onMouseOver={() => {
					dispatchBGSectors(hoverBGAllSectors)
					setInitialState();
				}}
				onMouseOut={onMouseOutHandler}
			>
				<p className='text text_type_main-medium'>
					Всего:
				</p>
				<p className={'text constructor-element__price'}>
					{totalCount}
				</p>
			</div>
			<div
				className={
					cn(style.statistic__item,
						sector === 0 && style.statistic__item_hover)
				}
				onMouseOver={() => {
					setCount(getCountBySector(0))
					dispatchBGSectors(hoverBGSector0)
				}
				}
				onMouseOut={onMouseOutHandler}
			>
				<p className='text text_type_main-medium'>
					Активных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.active || '0'}
				</p>
			</div>
			<div className={
				cn(
					style.statistic__item, sector === 1 &&
				style.statistic__item_hover
				)}
				onMouseOver={() => {
					setCount(getCountBySector(1))
					dispatchBGSectors(hoverBGSector1)
				}}
				onMouseOut={onMouseOutHandler}
			>
				<p className='text text_type_main-medium'>
					Неактивных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.inactive || '0'}
				</p>
			</div>
			<div
				className={
					cn(
						style.statistic__item, sector === 2 &&
					style.statistic__item_hover
					)}
				onMouseOver={() => {
					setCount(getCountBySector(2))
					dispatchBGSectors(hoverBGSector2)
				}}
				onMouseOut={onMouseOutHandler}
			>
				<p className='text text_type_main-medium'>
					Завершенных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.completed || '0'}
				</p>
			</div>
		</Flex>
	</Flex>
	)
}