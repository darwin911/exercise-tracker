import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { ACTIVITY_TYPES } from "../../constants";

const activities = Object.values(ACTIVITY_TYPES);

export const ActivityTypes = () => {
  const Cards = () =>
    activities.map((activity) => (
      <InfoCard key={activity.title} {...activity} />
    ));
  return (
    <section className="activity-types">
      <h2 title="https://www.takingcharge.csh.umn.edu/what-physical-activity-fitness">
        Activity Types
      </h2>
      <div className="wrapper">
        <Cards />
      </div>
    </section>
  );
};

const InfoCard = ({ title, description, exampleList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const className = `info-card ${title.toLowerCase()} ${isOpen ? "open" : ""}`;
  return (
    <div className={className} onClick={() => setIsOpen((val) => !val)}>
      <span className="svg-wrapper"></span>
      <h3>{title}</h3>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={spring}
          >
            <p>{description}</p>
            <ul>
              {exampleList.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const spring = {
  type: "spring",
  damping: 300,
  stiffness: 1200,
};
