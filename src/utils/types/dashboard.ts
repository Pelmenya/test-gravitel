import { Nullable } from "./nullable";

export interface IStatistic {
	active: number;
	inactive: number;
	completed: number;
}

export interface IDashBoardData {
	dashboard: Nullable<{
		scenarios: IStatistic,
		lists: IStatistic,
		dialogs: IStatistic
	}>
}