import { Entity } from '../shared/entity.type';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut';
export type DataSource = 'transactions' | 'assets' | 'categories';

export interface Chart {
	id: number;
	user_id: number;
	name: string;
	description: string;
	chart_type: ChartType;
	data_source: DataSource;
	config: {
		x_axis?: string;
		y_axis?: string;
		group_by?: string;
		filters?: Record<string, any>;
	};
	created_at: string;
	updated_at: string;
}

export const NULL_CHART: Chart = {
	id: 0,
	user_id: 0,
	name: '',
	description: '',
	chart_type: 'line',
	data_source: 'transactions',
	config: {},
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString()
};

export function validateChart(chart: Chart): boolean {
	if (!chart) return false;
	
	// Check required fields
	if (!chart.name || !chart.chart_type || !chart.data_source) return false;
	
	// Validate name length
	if (chart.name.length < 3 || chart.name.length > 100) return false;
	
	// Validate chart type
	const validChartTypes: ChartType[] = ['line', 'bar', 'pie', 'doughnut'];
	if (!validChartTypes.includes(chart.chart_type)) return false;
	
	// Validate data source
	const validDataSources: DataSource[] = ['transactions', 'assets', 'categories'];
	if (!validDataSources.includes(chart.data_source)) return false;
	
	// Validate config structure if present
	if (chart.config) {
		if (chart.config.x_axis && typeof chart.config.x_axis !== 'string') return false;
		if (chart.config.y_axis && typeof chart.config.y_axis !== 'string') return false;
		if (chart.config.group_by && typeof chart.config.group_by !== 'string') return false;
		if (chart.config.filters && typeof chart.config.filters !== 'object') return false;
	}
	
	return true;
}
