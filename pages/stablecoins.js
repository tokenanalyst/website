import React from 'react';

const StableCoins = () => {
  return <div />;
};

StableCoins.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }

  return {};
};

export default StableCoins;
