import { AppError } from "../shared/app-error.class";

/**
 * Represents a chart with its properties
 */
export type Chart = {
	chart_id: string;
	user_id: string;
	data: {};
	type: string;
	period: string;
	filters: [];
	created_at: Date;
	updated_at: Date;
};

/**
 * Valid chart types
 */
export const CHART_TYPES = [
	"bar",
	"line",
	"pie"
] as const;
export type ChartType = (typeof CHART_TYPES)[number];

/**
 * Default empty chart object
 */
export const NULL_CHART: Chart = {
	chart_id: "",
	user_id: "",
	data: {},
	type: "",
	period: "",
	filters: [],
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a chart
 * @param chart - The chart to validate
 * @throws AppError if the chart is invalid
 */
export const validateChart = (
	chart: Partial<Chart>,
): void => {
	if (!chart.chart_id) {
		throw new AppError("Chart id is required", "LOGIC");
	}

	if (!chart.user_id) {
		throw new AppError("Chart type is required", "LOGIC");
	}

	if (!CHART_TYPES.includes(chart.type as ChartType)) {
		throw new AppError(
			`Invalid chart type. Must be one of: ${CHART_TYPES.join(", ")}`,
			"LOGIC",
		);
	}

	if (chart.data === undefined) {
		throw new AppError("Chart data must be a object", "LOGIC");
	}
};
