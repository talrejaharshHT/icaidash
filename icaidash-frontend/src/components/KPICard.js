// src/components/KPICard.js

import React from 'react';

const KPICard = ({ label, value, icon }) => (
  <div className="kpi-card">
    <p>
      <i className={`fas ${icon}`} style={{ marginRight: '8px' }} />
      {label}
    </p>
    <h4>{value}</h4>
  </div>
);

export default KPICard;
