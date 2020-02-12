import React from 'react';

const Compare = () => {
  return <div />;
};

Compare.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }

  return {};
};

export default Compare;
