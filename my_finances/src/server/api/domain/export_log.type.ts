import { Entity } from '../shared/entity.type';

export interface ExportLog extends Entity {
    user_id: number;
    export_type: 'CSV' | 'PDF';
    filter_criteria: string; // JSON string
    record_count: number;
    export_date: string; // ISO date string
}

export const NULL_EXPORT_LOG: ExportLog = {
    id: 0,
    user_id: 0,
    export_type: 'CSV',
    filter_criteria: '{}',
    record_count: 0,
    export_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};

export function validateExportLog(exportLog: ExportLog): boolean {
    if (!exportLog) return false;

    // Check required fields
    if (!exportLog.user_id || typeof exportLog.user_id !== 'number') return false;
    if (!exportLog.export_type || !['CSV', 'PDF'].includes(exportLog.export_type)) return false;
    if (typeof exportLog.record_count !== 'number' || exportLog.record_count < 0) return false;
    if (!exportLog.export_date || !isValidISODate(exportLog.export_date)) return false;

    // Validate filter criteria JSON
    try {
        if (exportLog.filter_criteria) {
            JSON.parse(exportLog.filter_criteria);
        }
    } catch (e) {
        return false;
    }

    return true;
}

function isValidISODate(dateStr: string): boolean {
    try {
        const date = new Date(dateStr);
        return date instanceof Date && !isNaN(date.getTime());
    } catch (e) {
        return false;
    }
} 