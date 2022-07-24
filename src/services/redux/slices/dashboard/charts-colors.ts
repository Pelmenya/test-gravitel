export const backgroundColor = 'rgba(255, 206, 86, 0.2)';
export const hoverBackgroundColor = 'rgba(255, 206, 86, 1)';
export const borderColor = 'rgba(255, 206, 86, 1)';
export const borderWidth = 2;

export const hoverBGAllSectors = [
	hoverBackgroundColor,
	hoverBackgroundColor,
	hoverBackgroundColor,
];

export const hoverBGSector0 = [
	hoverBackgroundColor,
	backgroundColor,
	backgroundColor,
];

export const hoverBGSector1 = [
	backgroundColor,
	hoverBackgroundColor,
	backgroundColor,
];

export const hoverBGSector2 = [
	backgroundColor,
	backgroundColor,
	hoverBackgroundColor,
];

export const initialBGcolor = [
	backgroundColor,
	backgroundColor,
	backgroundColor,
];

export const initialBorderColor = [
	borderColor,
	borderColor,
	borderColor
]

export const initialChartData = {
	datasets: [
		{
			data: null,
			backgroundColor: initialBGcolor,
			hoverBackgroundColor: hoverBGAllSectors,
			borderColor: initialBorderColor,
			borderWidth: borderWidth,
		},
	],
}


