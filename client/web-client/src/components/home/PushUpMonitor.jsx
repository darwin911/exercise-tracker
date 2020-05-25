import React from 'react';

export const PushUpMonitor = ({ data }) => {
  if (!data) return null;
  const { week, month, allTime } = data;
  return (
    <div>
      <h3>Push Up Monitor</h3>
      <div className='push-up-monitor'>
        <MonitorView average={week.average} total={week.total} label='Week' />
        <MonitorView average={month.average} total={month.total} label='Month' />
        <MonitorView average={allTime.average} total={allTime.total} label='All-Time' />
      </div>
    </div>
  );
};

const MonitorView = ({ average, total, label = 'DEFAULT' }) => (
  <div className={label.toLowerCase()}>
    <h5>{label}</h5>
    <p>Average: {average}</p>
    <p>Total: {total}</p>
  </div>
);
