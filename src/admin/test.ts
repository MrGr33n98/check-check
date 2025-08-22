// Test file to verify that all admin components are working correctly

import { AdminLayout } from './layout/AdminLayout';
import { FilterBar } from './components/FilterBar';
import { DataTable } from './components/DataTable';
import { CardList } from './components/CardList';
import { TabNavigator } from './components/TabNavigator';
import { SearchInput } from './components/SearchInput';
import { LeadList } from './leads/LeadList';
import { MemberList } from './members/MemberList';
import { SponsoredList } from './sponsored/SponsoredList';
import { AccessList } from './access/AccessList';
import { useFilterParams } from './hooks/useFilterParams';
import { useApi } from './hooks/useApi';
import { mockLeads, mockMembers, mockSponsored, mockAccess } from './mockData';

// Export all components for testing
export {
  AdminLayout,
  FilterBar,
  DataTable,
  CardList,
  TabNavigator,
  SearchInput,
  LeadList,
  MemberList,
  SponsoredList,
  AccessList,
  useFilterParams,
  useApi,
  mockLeads,
  mockMembers,
  mockSponsored,
  mockAccess
};