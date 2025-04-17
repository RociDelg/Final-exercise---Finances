import { Entity } from '../shared/entity.type';

export interface SearchHistory extends Entity {
    user_id: number;
    search_term: string;
    filters: string; // JSON string
    result_count: number;
}

export const NULL_SEARCH_HISTORY: SearchHistory = {
    id: 0,
    user_id: 0,
    search_term: '',
    filters: '{}',
    result_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};

export function validateSearchHistory(history: SearchHistory): boolean {
    if (!history) return false;

    // Check required fields
    if (!history.search_term || typeof history.result_count !== 'number') return false;

    // Validate search term length
    if (history.search_term.length < 1 || history.search_term.length > 200) return false;

    // Validate filters JSON
    try {
        if (history.filters) {
            JSON.parse(history.filters);
        }
    } catch (e) {
        return false;
    }

    // Validate result count
    if (history.result_count < 0) return false;

    return true;
} 