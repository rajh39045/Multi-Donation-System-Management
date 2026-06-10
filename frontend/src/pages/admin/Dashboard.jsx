import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { organizationService } from '../../services/organizationService';
import { Heart, Landmark, Users, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import StatsCard from '../../components/ui/StatsCard';
import GlassCard from '../../components/ui/GlassCard';
import SectionReveal from '../../components/ui/SectionReveal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const { data: donationsData, isLoading: donationsLoading } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: () => donationService.getAllDonations(),
  });

  const { data: orgsData, isLoading: orgsLoading } = useQuery({
    queryKey: ['admin-orgs'],
    queryFn: () => organizationService.getOrganization('all'),
  });

  if (donationsLoading || orgsLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const donations = donationsData?.data || [];
  const orgs = orgsData?.data || [];

  const chartData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 9 },
    { name: 'Sat', count: 15 },
    { name: 'Sun', count: 11 },
  ];

  return (
    <PageTransition>
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Platform Overview</h1>
          <p className="text-muted">Global oversight of the Multi-Donation Ecosystem.</p>
        </header>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard label="Total Donations" value={donations.length} icon={Heart} />
          <StatsCard label="Verified Orgs" value={orgs.filter(o => o.isVerified).length} icon={ShieldCheck} />
          <StatsCard label="Total Volunteers" value={450} icon={Users} />
          <StatsCard label="Platform Growth" value={24} icon={TrendingUp} suffix="%" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Growth Chart */}
          <GlassCard className="lg:col-span-2 p-8 border-white/5" hover={false}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <BarChart3 className="text-teal" size={20} /> Weekly Activity
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#00d4aa' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#00d4aa" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Organizations List */}
          <GlassCard className="p-8 border-white/5" hover={false}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Landmark className="text-gold" size={20} /> Partners
              </h3>
            </div>
            <div className="space-y-4">
              {orgs.slice(0, 6).map((org) => (
                <div key={org._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-teal">
                      <Landmark size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white truncate max-w-[120px]">{org.name}</p>
                      <p className="text-[10px] text-muted uppercase tracking-widest">{org.isVerified ? 'Verified' : 'Pending'}</p>
                    </div>
                  </div>
                  {org.isVerified && <ShieldCheck className="text-teal" size={16} />}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent Donations Table */}
        <GlassCard className="overflow-hidden p-0 border-white/5" hover={false}>
          <div className="p-8 border-b border-white/5">
            <h3 className="text-xl font-bold">Platform Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-4 text-xs uppercase tracking-widest text-muted">Donor</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-widest text-muted">Type</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-widest text-muted">Status</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-widest text-muted">Organization</th>
                  <th className="px-8 py-4 text-xs uppercase tracking-widest text-muted text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {donations.slice(0, 10).map((d) => (
                  <tr key={d._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-bold text-white text-sm">{d.donorId?.name || 'Anonymous'}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-muted uppercase font-mono">{d.itemType}</span>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-8 py-5 text-sm text-muted">
                      {d.organizationId?.name || 'Unassigned'}
                    </td>
                    <td className="px-8 py-5 text-right text-xs font-mono text-muted">
                      {formatDate(d.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
