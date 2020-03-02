import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { Icon, Divider } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { SimpleDialog } from '../../atoms/SimpleDialog/SimpleDialog';
import { LoginContext } from '../../../../contexts/Login';
import { colors } from '../../../../constants/styles/colors';
import {
  TOKENS_EXCHANGE_SUPPORT,
  LOGGED_OUT_UNSUPPORTED_EXCHANGES,
} from '../../../../constants/exchanges';
import {
  EXCHANGE_IMAGES,
  TOKEN_IMAGES,
} from '../../../../constants/image-paths';
import { NATIVE_TOKENS } from '../../../../constants/tokens';

const FEATURED_TOKENS = [NATIVE_TOKENS.BTC, NATIVE_TOKENS.ETH];

const DialogText = ({ children }) => (
  <>
    <div className="text">{children}</div>
    <style jsx>
      {`
        .text {
          line-height: 1.5em;
          font-size: 16px;
        }
      `}
    </style>
  </>
);

DialogText.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ExchangeRegisterDialog = ({ isOpen, onClose }) => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();

  return (
    <>
      <SimpleDialog
        header="Sign Up for FREE access to this exchange and many more!"
        ctaText="Sign Up"
        isOpen={isOpen}
        onClose={() => {
          ReactGA.event({
            category: 'User',
            action: `Exchange Page Extra Exchanges Dialog Closed`,
            label: `Funnel`,
          });
          onClose();
        }}
        onCtaClick={() => {
          loginCtx.setPostRegisterRedirectUrl(router.asPath.split('?')[0]);
          ReactGA.event({
            category: 'User',
            action: `Exchange Page Extra Exchanges Dialog Sign Up Clicked`,
            label: `Funnel`,
          });
          router.push('/register?exchange=true');
        }}
      >
        <DialogText>
          <p>
            TokenAnalyst provides a World Class amount of Exchange Flows across
            all major exchanges.
          </p>
          <p>
            By signing up you will have access to all of the exchanges and
            tokens we support as well as an unparalleled array of metrics across
            major blockchains
          </p>
          <p>Here are the additional exchanges we support for BTC & ETH:</p>
        </DialogText>
        <div className="table-container">
          <Divider />
          <table>
            <tbody>
              <tr>
                <td />
                {LOGGED_OUT_UNSUPPORTED_EXCHANGES.map(exchange => (
                  <td key={exchange}>
                    <img
                      src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
                      alt={`exchange-${exchange}`}
                      className="exchange"
                    />
                  </td>
                ))}
              </tr>
              {FEATURED_TOKENS.map(token => (
                <tr key={token}>
                  <td>
                    <img
                      src={`/static/png/coins/${TOKEN_IMAGES[token]}`}
                      alt={`token-${token}`}
                      className="coin"
                    />
                  </td>
                  {LOGGED_OUT_UNSUPPORTED_EXCHANGES.map(exchange =>
                    TOKENS_EXCHANGE_SUPPORT[token][exchange] ? (
                      <td key={`${token}-${exchange}`}>
                        <Icon
                          icon="tick-circle"
                          color={`rgba(${colors.primaryGreen})`}
                        />
                      </td>
                    ) : (
                      <td key={`${token}-${exchange}`} />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Divider />
        </div>
        <DialogText>
          <p>
            For details regarding Stablecoins and ERC20 tokens support, refer to
            the&nbsp;&nbsp;
            <a
              href="https://docs.tokenanalyst.io/#stablecoin-exchange-flows"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation.
            </a>
          </p>
        </DialogText>
      </SimpleDialog>
      <style jsx>
        {`
          .exchange {
            width: 30px;
            height: 30px;
          }
          table {
            margin-top: 10px;
            width: 100%;
          }
          .table-container {
            margin-bottom: 10px;
          }
          .bold {
            font-weight: 700;
          }
          .coin {
            width: 30px;
            height: 30px;
          }
          td {
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

ExchangeRegisterDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
