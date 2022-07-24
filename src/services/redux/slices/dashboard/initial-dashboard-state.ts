import { IDashBoardState } from './dashboard';

const backgroundColor = 'rgba(255, 206, 86, 0.2)';
const hoverBackgroundColor = 'rgba(255, 206, 86, 1)';
const borderColor = 'rgba(255, 206, 86, 1)';
const borderWidth = 2;
const initialChartData = {
	datasets: [
		{
			data: null,
			backgroundColor: [
				backgroundColor,
				backgroundColor,
				backgroundColor,
			],
			hoverBackgroundColor:
				[
					hoverBackgroundColor,
					hoverBackgroundColor,
					hoverBackgroundColor,
				],
			borderColor: [
				borderColor,
				borderColor,
				borderColor
			],
			borderWidth: borderWidth,
		},
	],
}
export const initialDashBoardState = {
	loading: 'idle',
	dashboard: null,
	dashboardDataScenarios: { ...initialChartData },
	dashboardDataLists: { ...initialChartData },
	dashboardDataDialogs: { ...initialChartData }
} as IDashBoardState;
