import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphQLClient } from '../../../../graphql-clients/graphql-client';
import { createDashBoardQuery } from '../../../../utils/query-creators/createDashBoardQuery';
import { IDashBoardData } from '../../../../utils/types/dashboard';
import { LoadingType } from '../../../../utils/types/loading';
import { Nullable } from '../../../../utils/types/nullable';
import { initialChartData } from './charts-colors';

export interface IDashBoardDataItem {
	datasets: Array<{
		data: Nullable<number[]>,
		backgroundColor: string[],
		hoverBackgroundColor: string[],
		borderColor: string[],
		borderWidth: number
	}>
}

export interface IDashBoardState extends IDashBoardData, LoadingType {
	dashboardDataScenarios: IDashBoardDataItem;
	dashboardDataLists: IDashBoardDataItem;
	dashboardDataDialogs: IDashBoardDataItem;
};

export const initialDashBoardState = {
	loading: 'idle',
	dashboard: null,
	dashboardDataScenarios: { ...initialChartData },
	dashboardDataLists: { ...initialChartData },
	dashboardDataDialogs: { ...initialChartData }
} as IDashBoardState;

export const fetchDashBoardData = createAsyncThunk('dashboard/fetchDashBoardData', async (accessToken: string) => {
	graphQLClient.setHeader('authorization', accessToken);
	const response = await graphQLClient.request(createDashBoardQuery())
	return response.dashboard;
});

const dashBoardSlice = createSlice({
	name: 'dashboard',
	initialState: initialDashBoardState,
	reducers: {
		setBGColorScenarios: (state, action) => {
			state.dashboardDataScenarios.datasets[0].backgroundColor = action.payload;
		},
		setBGColorLists: (state, action) => {
			state.dashboardDataLists.datasets[0].backgroundColor = action.payload;
		},
		setBGColorDialogs: (state, action) => {
			state.dashboardDataDialogs.datasets[0].backgroundColor = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDashBoardData.pending, (state) => {
			state.loading = 'pending';
			state.error = undefined;
		});
		builder.addCase(fetchDashBoardData.fulfilled, (state, action) => {
			state.dashboard = action.payload;
			state.dashboardDataScenarios.datasets[0].data = [
				action.payload.scenarios.active,
				action.payload.scenarios.inactive,
				action.payload.scenarios.completed
			];
			state.dashboardDataDialogs.datasets[0].data = [
				action.payload.dialogs.active,
				action.payload.dialogs.inactive,
				action.payload.dialogs.completed
			];
			state.dashboardDataLists.datasets[0].data = [
				action.payload.lists.active,
				action.payload.lists.inactive,
				action.payload.lists.completed
			];
			state.loading = 'succeeded';
		});
		builder.addCase(fetchDashBoardData.rejected, (state, action) => {
			state.loading = 'failed';
			state.error = action.error.message;
		});
	},
});

export const { 
	setBGColorDialogs, 
	setBGColorLists, 
	setBGColorScenarios 
} = dashBoardSlice.actions;
export const dashBoardReducer = dashBoardSlice.reducer;
