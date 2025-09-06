import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Zap, Users, TrendingUp, ArrowRight, Download, Filter } from 'lucide-react';
import { api } from '@/middleware/authMiddleware';
import { toast } from 'sonner';

// Mock data structure
interface DailyStat {
  date: string;
  leads: number;
  profile_views: number;
  impressions: number;
}

interface DashboardData {
  total_leads: number;
  total_profile_views: number;
  total_impressions: number;
  conversion_rate: number;
  daily_stats: DailyStat[];
  top_performing_content: { title: string; views: number }[];
  lead_sources: { source: string; count: number }[];
}

const ModernDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');

  const fetchDashboardData = useCallback(async (period: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/company/dashboard_analytics?period=${period}`);
      if (response.data) {
        setData(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data. Please try again later.");
      setData(null); // Set to null on error to show an error state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(timeframe);
  }, [timeframe, fetchDashboardData]);

  const handleExport = () => {
    toast.info("Exporting data... this may take a moment.");
    api.get(`/company/dashboard_analytics/export?period=${timeframe}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `dashboard-export-${timeframe}-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Data exported successfully!");
      })
      .catch(error => {
        console.error("Export failed:", error);
        toast.error("Failed to export data.");
      });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading dashboard...</div>;
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-red-600">Could not load dashboard data.</h2>
        <p className="text-gray-500">Please try refreshing the page or select a different time frame.</p>
        <Button onClick={() => fetchDashboardData(timeframe)} className="mt-4">Retry</Button>
      </div>
    );
  }

  const formatTooltipDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Performance Dashboard</h1>
          <p className="text-gray-500">Analytics for your company profile.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_leads}</div>
            <p className="text-xs text-muted-foreground">New contacts generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_profile_views}</div>
            <p className="text-xs text-muted-foreground">Visitors to your profile</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_impressions}</div>
            <p className="text-xs text-muted-foreground">Times shown in search</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversion_rate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">From view to lead</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data.daily_stats}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatTooltipDate} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid #ccc',
                  borderRadius: '0.5rem',
                }}
                labelFormatter={formatTooltipDate}
              />
              <Legend />
              <Area type="monotone" dataKey="leads" stroke="#8884d8" fillOpacity={1} fill="url(#colorLeads)" />
              <Area type="monotone" dataKey="profile_views" name="Profile Views" stroke="#82ca9d" fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.top_performing_content.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 truncate pr-4">{item.title}</span>
                  <span className="font-semibold text-gray-800">{item.views.toLocaleString()} views</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.lead_sources.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 capitalize">{item.source.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-gray-800">{item.count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernDashboard;
