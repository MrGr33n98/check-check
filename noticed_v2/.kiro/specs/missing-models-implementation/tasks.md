# Implementation Plan

- [ ] 1. Create FeatureGroup model and infrastructure
  - Generate migration for feature_groups table with proper indexes
  - Create FeatureGroup model with validations, scopes, and array manipulation methods
  - Implement ActiveAdmin interface with proper form inputs for array fields
  - Create FactoryBot factory for testing
  - Write comprehensive model tests covering validations, scopes, and methods
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2. Create SponsoredPlan model and infrastructure
  - Generate migration for sponsored_plans table with foreign keys and indexes
  - Create SponsoredPlan model with enums, associations, validations, and business logic
  - Implement custom validation methods for date logic and product/category requirements
  - Create ActiveAdmin interface with proper enum selectors and date pickers
  - Write model tests covering all validations, scopes, and business methods
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 3. Create SmpCompany model and infrastructure
  - Generate migration for smp_companies table with array fields and proper constraints
  - Create SmpCompany model with plan enum, validations, and subscription logic
  - Implement array manipulation methods for domains, departments, and teams
  - Create ActiveAdmin interface with tag inputs for array fields
  - Write comprehensive tests for subscription logic and business calculations
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 4. Create SmpUser model and infrastructure
  - Generate migration for smp_users table with JSONB activity_data and proper indexes
  - Create SmpUser model with company association, activity tracking, and user linking
  - Implement login tracking methods and activity data management
  - Create ActiveAdmin interface with proper company filtering and user selection
  - Write tests for activity tracking, login methods, and organizational features
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5. Implement model associations and integrations
  - Add has_many associations to existing models (CompanyMember, Product, Category, User)
  - Update existing admin interfaces to show related records where appropriate
  - Verify foreign key constraints and cascading behavior work correctly
  - Test cross-model functionality and data integrity
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6. Create comprehensive seed data
  - Add FeatureGroup seed data with realistic feature categorization
  - Create SponsoredPlan seed data with various plan types and date ranges
  - Generate SmpCompany seed data with different subscription plans and company sizes
  - Add SmpUser seed data with activity tracking and organizational structure
  - Verify all seed data creates proper associations and realistic scenarios
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 7. Implement Pundit authorization policies
  - Create FeatureGroupPolicy following existing authorization patterns
  - Implement SponsoredPlanPolicy with company member access control
  - Create SmpCompanyPolicy with proper admin and company-level permissions
  - Implement SmpUserPolicy with company isolation and role-based access
  - Test all policies ensure proper access control and data isolation
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 8. Add performance optimizations and monitoring
  - Verify all database indexes are properly created and utilized
  - Add counter caches where appropriate for association counts
  - Implement efficient scopes and query methods to prevent N+1 problems
  - Add database constraints and check constraints for data integrity
  - Test query performance with large datasets and optimize as needed
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 9. Create integration tests and quality assurance
  - Write integration tests for all admin interfaces and CRUD operations
  - Test model interactions and cross-model functionality
  - Verify data validation works correctly across all scenarios
  - Test error handling and edge cases for all business logic
  - Ensure all tests pass and maintain good code coverage
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 10. Final integration and documentation
  - Run full test suite and fix any integration issues
  - Update API documentation if any endpoints are affected
  - Verify all admin interfaces work correctly with proper permissions
  - Test complete workflow from model creation to admin management
  - Document any new features or changes for future reference
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_