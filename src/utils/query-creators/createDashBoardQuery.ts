export const createDashBoardQuery = () => `query {
	dashboard {
		scenarios {
			active,
			inactive,
			completed,
		},
		lists {
			active,
			inactive,
			completed,
		},
		dialogs {
			active,
			inactive,
			completed,
		},
	}
  }`