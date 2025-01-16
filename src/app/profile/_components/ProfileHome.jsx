'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function ProfileHome() {
  const { token, user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const { push } = useRouter();

  console.log('user', user);

  const {
    isLoading,
    data: subscriptions,
    refetch,
  } = useQuery(
    'all-subscriptions',
    async () => {
      try {
        const response = await xoomBackendUrl.get('/api/subscriptions');
        return response.status === 200 ? response.data?.data : [];
      } catch (error) {
        toast.error('Failed to fetch subscriptions data.');
        throw new Error('Failed to fetch subscriptions data!');
      }
    },
    { enabled: !!user }
  );

  const handleCancelPayment = async () => {
    if (!token) {
      toast.error('You must be logged in to cancel a payment.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await xoomBackendUrl.post(
        '/api/payment/cancel',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        useAuthStore.getState().logout();
        push('/login');
        refetch();
        toast.success('Subscription cancelled successfully.');
      }
    } catch (error) {
      toast.error('Payment cancellation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 border border-gray-300 rounded-lg p-4 lg:p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-start gap-4">
        <img
          src="/images/default_profile.png"
          alt="Profile"
          className="w-24 rounded-full"
        />
        <p className="text-lg font-semibold text-gray-700">
          Phone: {user?.phone || 'N/A'}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Expires At:{' '}
          {user?.expiresAt ? moment(user.expiresAt * 1000).calendar() : 'N/A'}
        </p>
        <button
          className="btn btn-primary btn-sm btn-outline rounded-md w-40 mt-4"
          onClick={handleCancelPayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Unsubscribe'}
        </button>
      </div>

      {/* Subscription Section */}
      <div className="p-6 max-w-md w-full border rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Active Subscription</h2>

        {user?.reference ? (
          <>
            <div
              className={`border rounded-lg p-4 mb-4 transition-all duration-200 border-red-500 bg-red-100`}
            >
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="plan"
                    checked
                    className="form-radio checkbox-md checkbox-error checkbox"
                    readOnly
                  />
                  <span className="text-lg font-medium">
                    {user?.membershipPlan}
                  </span>
                </div>
              </label>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <p>Loading subscriptions...</p>
            ) : subscriptions?.length > 0 ? (
              subscriptions.map((plan) => {
                return (
                  <div
                    key={plan?._id}
                    className={`border rounded-lg p-4 mb-4 transition-all duration-200 ${
                      plan._id === user?.subscription
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-300'
                    }`}
                  >
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          checked={plan._id === user?.subscription}
                          className="form-radio checkbox-md checkbox-error checkbox"
                          readOnly
                        />
                        <span className="text-lg font-medium">
                          {plan.title}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        ${plan.price} / {plan.duration_type}
                      </span>
                    </label>
                  </div>
                );
              })
            ) : (
              <p>No active subscriptions found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
