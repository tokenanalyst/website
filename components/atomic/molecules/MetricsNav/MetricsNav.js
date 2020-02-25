import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';

import { Tab } from '../../atoms/Tab';

export const MetricsNav = ({ tabs }) => {
  const router = useRouter();
  const { route } = router;

  return (
    <>
      <div className="tabs">
        <div className="container">
          {tabs.map(tab => {
            const isSelected = tab.route.includes(route);
            const { text, link } = tab;

            return (
              <Tab key={text} text={text} link={link} selected={isSelected} />
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .tabs {
            margin-top: 15px;
            margin-right: -10px;
            margin-left: -10px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(151, 151, 151, 0.15);
          }
          .container {
            display: flex;
            margin-right: 20px;
            margin-left: 20px;
          }
        `}
      </style>
    </>
  );
};

MetricsNav.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MetricsNav.defaultProps = {};
