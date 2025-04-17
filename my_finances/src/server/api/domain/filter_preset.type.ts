import { Entity } from '../shared/entity.type';

export interface FilterPreset extends Entity {
    user_id: number;
    name: string;
    description: string;
    filters: string; // JSON string
    is_default: boolean;
}

export const NULL_FILTER_PRESET: FilterPreset = {
    id: 0,
    user_id: 0,
    name: '',
    description: '',
    filters: '{}',
    is_default: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};

export function validateFilterPreset(preset: FilterPreset): boolean {
    if (!preset) return false;

    // Check required fields
    if (!preset.name || !preset.filters) return false;

    // Validate name length
    if (preset.name.length < 3 || preset.name.length > 100) return false;

    // Validate description length if present
    if (preset.description && preset.description.length > 500) return false;

    // Validate filters JSON
    try {
        const filters = JSON.parse(preset.filters);
        if (typeof filters !== 'object') return false;
    } catch (e) {
        return false;
    }

    // Validate is_default
    if (typeof preset.is_default !== 'boolean') return false;

    return true;
} 