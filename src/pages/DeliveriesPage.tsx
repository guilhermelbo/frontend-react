import React from 'react';
import CreateDelivery from '../components/CreateDelivery';
import DeliveriesList from '../components/DeliveriesList';

const DeliveriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <CreateDelivery />
      <DeliveriesList />
    </div>
  );
};

export default DeliveriesPage;
