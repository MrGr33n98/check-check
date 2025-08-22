import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { LeadList } from '@/admin/leads/LeadList';
import { MemberList } from '@/admin/members/MemberList';
import { SponsoredList } from '@/admin/sponsored/SponsoredList';
import { AccessList } from '@/admin/access/AccessList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<LeadList />} />
        <Route path="leads" element={<LeadList />} />
        <Route path="members" element={<MemberList />} />
        <Route path="sponsored" element={<SponsoredList />} />
        <Route path="access" element={<AccessList />} />
      </Route>
    </Routes>
  );
}

export default App;