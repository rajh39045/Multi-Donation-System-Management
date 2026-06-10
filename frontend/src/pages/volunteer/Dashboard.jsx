import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Truck, MapPin, Package, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import MagneticButton from '../../components/ui/MagneticButton';
import { formatDate } from '../../utils/formatDate';
import PageTransition from '../../components/layout/PageTransition';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['volunteer-tasks'],
    queryFn: () => donationService.getMyDonations(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => donationService.updateDonationStatus(id, status),
    onSuccess: () => {
      success('Task status updated!');
      queryClient.invalidateQueries(['volunteer-tasks']);
    },
    onError: (err) => toastError(err.response?.data?.message || 'Update failed'),
  });

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  const myTasks = Array.isArray(data?.data) ? data.data : [];
  const activeTasks = myTasks.filter((t) => ['assigned', 'picked_up'].includes(t.status));
  const completedTasks = myTasks.filter((t) => ['delivered', 'completed'].includes(t.status));

  const handleUpdate = (id, currentStatus) => {
    let nextStatus;

    if (currentStatus === 'assigned') {
      nextStatus = 'picked_up';
    } else if (currentStatus === 'picked_up') {
      nextStatus = 'delivered';
    } else {
      return;
    }

    updateMutation.mutate({ id, status: nextStatus });
  };

  return (
    <PageTransition>
      <div className="space-y-12">
        <header className="relative py-16 px-10 rounded-[2rem] bg-surface border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <h1 className="text-4xl font-heading font-bold text-white mb-2">Volunteer Command</h1>
            <p className="text-muted">
              You have {activeTasks.length} active logistics tasks and {completedTasks.length} completed tasks.
            </p>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white">Active Tasks</h2>
              <p className="text-muted text-sm">Current pickups and deliveries assigned to you.</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-teal/10 text-teal text-xs uppercase tracking-widest font-bold">{activeTasks.length} active</span>
          </div>

          {activeTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeTasks.map((task) => (
              <GlassCard key={task._id} className="flex flex-col gap-6 p-8 border-white/5" hover={false}>
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-teal/10 text-teal">
                    <Truck size={28} />
                  </div>
                  <StatusBadge status={task.status} />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white capitalize">{task.itemType} Pickup</h3>
                    <p className="text-sm text-muted">Ref: {task._id.slice(-8).toUpperCase()}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-4">
                      <MapPin size={18} className="text-teal mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-widest font-bold">Pickup Address</p>
                        <p className="text-sm text-white font-medium">{task.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone size={18} className="text-teal mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-widest font-bold">Contact Donor</p>
                        <p className="text-sm text-white font-medium">{task.donorId?.name} ({task.donorId?.phone})</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Calendar size={18} className="text-teal mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-widest font-bold">Scheduled Date</p>
                        <p className="text-sm text-white font-medium">{formatDate(task.pickupDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <MagneticButton 
                    onClick={() => handleUpdate(task._id, task.status)}
                    disabled={updateMutation.isPending}
                    className="w-full"
                  >
                    {task.status === 'assigned' ? 'Mark as Picked Up' : 'Mark as Delivered'}
                  </MagneticButton>
                </div>
              </GlassCard>
              ))}
            </div>
          ) : (
            <EmptyState
              message="No active tasks assigned to you right now."
              icon={CheckCircle2}
            />
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-white">Completed Work</h2>
              <p className="text-muted text-sm">A full history of donations you have completed.</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-xs uppercase tracking-widest font-bold">{completedTasks.length} completed</span>
          </div>

          {completedTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {completedTasks.map((task) => (
                <GlassCard key={task._id} className="p-8 border-white/5" hover={false}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted">Reference</p>
                      <h3 className="text-xl font-bold text-white capitalize">{task.itemType}</h3>
                      <p className="text-sm text-muted">Ref: {task._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                  <div className="mt-6 space-y-3 text-sm text-muted">
                    <p><span className="text-white font-semibold">Donor:</span> {task.donorId?.name || 'Anonymous'}</p>
                    <p><span className="text-white font-semibold">Pickup:</span> {task.pickupAddress}</p>
                    <p><span className="text-white font-semibold">Completed on:</span> {formatDate(task.updatedAt || task.createdAt)}</p>
                    {typeof task.creditsAwarded === 'number' && task.creditsAwarded > 0 && (
                      <p><span className="text-white font-semibold">Credits awarded:</span> +{task.creditsAwarded}</p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <EmptyState
              message="You have not completed any tasks yet."
              icon={CheckCircle2}
            />
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default VolunteerDashboard;
