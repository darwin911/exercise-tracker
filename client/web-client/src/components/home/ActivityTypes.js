import React from 'react';
import { ACTIVITY_TYPES } from '../../constants';

const activities = Object.values(ACTIVITY_TYPES);

export const ActivityTypes = () => {
  return (
    <section className='activity-types'>
      <h2 title='https://www.takingcharge.csh.umn.edu/what-physical-activity-fitness'>
        Activity Types
      </h2>
      <div className='wrapper'>
        {activities.map(activity => (
          <InfoCard key={activity.title} {...activity} />
        ))}
      </div>
    </section>
  );
};

const InfoCard = ({ title, description, exampleList }) => {
  return (
    <div className={`info-card ${title.toLowerCase()}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {exampleList.map(example => (
          <li key={example}>{example}</li>
        ))}
      </ul>
    </div>
  );
};
