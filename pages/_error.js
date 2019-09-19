import React from 'react';
import Link from 'next/link';

import { colors } from '../constants/styles/colors';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <>
        {this.props.statusCode === 404 ? (
          <div className="container">
            <div>Oops, this page does not exist!</div>
            <Link href="/" passHref>
              <div className="button">To Exchanges</div>
            </Link>
          </div>
        ) : (
          <div className="container">
            <div className="message">Oops, something has gone wrong!</div>
            <div className="message">
              The team has been notified and are working on it
            </div>
            <Link href="/" passHref>
              <div className="button">To Exchanges</div>
            </Link>
          </div>
        )}
        <style jsx>{`
          .container {
            font-family: Space Grotesk;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 30px;
          }
          .message {
            padding-top: 10px;
          }
          .button {
            color: white;
            width: 120px;
            text-align: center;
            background-color: rgba(${colors.primaryGreen});
            max-height: 40px;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 20px;
          }
        `}</style>
      </>
    );
    // return <p>{this.props.statusCode === 404 ? `Page not found` : "Broken"}</p>;
  }
}

export default Error;
