# Changelog

## [Unreleased]

### Added
- Data Export Feature
  - Added export_log table for tracking export operations
  - Implemented export types (CSV, PDF) and filter criteria
  - Added validation for export logs
  - Created seed data for export logs
  - Enhanced transaction table with export functionality

- Dark Mode Feature
  - Added theme_preference field to users table
  - Implemented theme preference types (light, dark, system)
  - Added validation for theme preferences
  - Created seed data with different theme preferences

- Interactive Charts Feature
  - Added chart and chart_filter tables for storing chart configurations
  - Implemented chart types (line, bar, pie, doughnut)
  - Added support for different data sources (transactions, assets, categories)
  - Created validation functions for chart entities

- Filters and Search Feature
  - Added search_history and filter_preset tables
  - Enhanced transaction table with search capabilities
  - Added support for real-time search across all fields
  - Implemented advanced filtering with multiple criteria
  - Added filter result count functionality
  - Created validation functions for search entities

### Changed
- Updated transaction table schema to include status field
- Enhanced transaction SQL commands with search and filter capabilities
- Updated initialization process to include new tables

### Fixed
- Improved error handling in entity validation
- Fixed type definitions for chart and filter interfaces 