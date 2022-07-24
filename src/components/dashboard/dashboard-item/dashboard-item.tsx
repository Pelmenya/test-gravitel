import cn from 'classnames';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pie, getElementAtEvent } from 'react-chartjs-2';
import { IDashBoardDataItem } from '../../../services/redux/slices/dashboard/dashboard';
import { getTotalItems } from '../../../utils/functions/getTotaltems';
import { IStatistic } from '../../../utils/types/dashboard';
import { Flex } from '../../flex/flex';
import { Title } from '../../title/title';
import style from './dashboard-item.module.css';

ChartJS.register(ArcElement);

export interface IDashBoardItemProps {
	data: IDashBoardDataItem;
	lists: IStatistic;
	name: 'Сценарии' | 'Списки' | 'Диалоги';
}

export const DashBoardItem = ({ data, lists, name }: IDashBoardItemProps) => {
	const totalCount = useMemo(() => getTotalItems(lists), [lists])

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
	}, [lists, totalCount])

	const [count, setCount] = useState(totalCount)
	const [sector, setSector] = useState(-1);

	const refCanvas = useRef(null);

	return (<Flex flexDirection='column' gap={40}>
		<div className={style.container}>
			<Pie
				ref={refCanvas}
				data={data}
				onMouseOut={() => {
					setCount(totalCount);
					setSector(-1);
				}}
				onMouseMoveCapture={(e) => {
					if (refCanvas && refCanvas.current) {
						const sector = getElementAtEvent(refCanvas.current, e)[0]?.index;
						if (sector >= 0 ) {
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
			<Flex className={style.statistic__item}>
				<p className='text text_type_main-medium'>
					Всего:
				</p>
				<p className={'text constructor-element__price'}>
					{getTotalItems(lists)}
				</p>
			</Flex>
			<Flex className={cn(style.statistic__item, sector === 0 && style.statistic__item_hover)}>
				<p className='text text_type_main-medium'>
					Активных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.active || '0'}
				</p>
			</Flex>
			<Flex className={cn(style.statistic__item, sector === 1 && style.statistic__item_hover)}>
				<p className='text text_type_main-medium'>
					Неактивных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.inactive || '0'}
				</p>
			</Flex>
			<Flex className={cn(style.statistic__item, sector === 2 && style.statistic__item_hover)}>
				<p className='text text_type_main-medium'>
					Завершенных:
				</p>
				<p className={'text constructor-element__price'}>
					{lists.completed || '0'}
				</p>
			</Flex>
		</Flex>
	</Flex>
	)
}