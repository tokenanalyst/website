import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Popover, Position, Icon } from '@blueprintjs/core';
import find from 'lodash/find';

import { TabDesktop } from '../../atoms/TabDesktop';
import { TabMobile } from '../../atoms/TabMobile';

export const MetricsNav = ({ tabs }) => {
  const router = useRouter();
  const { route } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeTab = find(tabs, o => o.route === route);

  return (
    <>
      <div className="tabs">
        <div className="container-desktop">
          {tabs.map(tab => {
            const isSelected = tab.route.includes(route);
            const { text, link } = tab;

            return (
              <TabDesktop
                key={text}
                text={text}
                link={link}
                selected={isSelected}
              />
            );
          })}
        </div>
        <div className="container-mobile">
          <Popover isOpen={isMenuOpen} minimal position={Position.BOTTOM}>
            <div
              className="mobile-selected-metric"
              onClick={() => setIsMenuOpen(status => !status)}
              onKeyDown={() => setIsMenuOpen(status => !status)}
              role="button"
              tabIndex={0}
            >
              <div className="mobile-selected-metric-icon">
                <Icon
                  icon={isMenuOpen ? 'chevron-up' : 'chevron-down'}
                  iconSize={20}
                />
              </div>
              <div>
                <TabMobile
                  key={activeTab.text}
                  text={activeTab.text}
                  link={activeTab.link}
                  selected
                  disabled
                />
              </div>
            </div>

            <div className="mobile-menu-list">
              {tabs.map(tab => {
                const { text, link } = tab;

                return (
                  <div className="mobile-menu-item" key={text}>
                    <TabMobile
                      key={text}
                      text={text}
                      link={link}
                      selected={text !== activeTab.text}
                      onClick={() => setIsMenuOpen(status => !status)}
                    />
                  </div>
                );
              })}
            </div>
          </Popover>
        </div>
      </div>
      <style jsx>
        {`
          .tabs {
            margin-top: 10px;
            margin-right: -10px;
            margin-left: -10px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(151, 151, 151, 0.15);
          }
          .container-desktop {
            display: flex;
            margin-right: 10px;
            margin-left: 10px;
          }
          .container-mobile {
            display: none;
            margin-right: 10px;
            margin-left: 10px;
          }
          .mobile-selected-metric {
            display: flex;
          }
          .mobile-selected-metric-icon {
            padding-right: 5px;
          }
          .mobile-menu-list {
            display: flex;
            flex-direction: column;
            padding-top: 20px;
            padding-bottom: 10px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: white;
          }
          .mobile-menu-item {
            padding-bottom: 5px;
          }
          @media only screen and (max-width: 769px) {
            .container-desktop {
              display: none;
            }
            .container-mobile {
              display: flex;
            }
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
