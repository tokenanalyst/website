import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { Icon } from '@blueprintjs/core';

import { SimpleDialog } from '../../SimpleDialog';
import { LoginContext } from '../../../contexts/Login';
import { colors } from '../../../constants/styles/colors';
import {
  TOKENS_EXCHANGE_SUPPORT,
  LOGGED_OUT_UNSUPPORTED_EXCHANGES,
} from '../../../constants/exchanges';
import { EXCHANGE_IMAGES, TOKEN_IMAGES } from '../../../constants/image-paths';
import { NATIVE_TOKENS } from '../../../constants/tokens';

const FEATURED_TOKENS = [NATIVE_TOKENS.BTC, NATIVE_TOKENS.ETH];

export const ExchangeRegisterDialog = ({ isOpen, closeCb }) => {
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
          closeCb();
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
        <br />
        TokenAnalyst provides a World Class amount of Exchange Flows across all
        major exchanges. <br />
        By signing up you will have access to all of the exchanges and tokens we
        support as well as an unparalleled array of metrics across major
        blockchains
        <br />
        <br />
        Here are the additional exchanges we support for BTC & ETH:
        <br />
        <br />
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td></td>
              {LOGGED_OUT_UNSUPPORTED_EXCHANGES.map(exchange => (
                <td key={exchange}>
                  <img
                    src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
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
                    <td />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        For details regarding Stablecoins and ERC20 tokens support, refer to the{' '}
        <a
          href="https://docs.tokenanalyst.io/#stablecoin-exchange-flows"
          target="_blank"
        >
          docs.
        </a>
      </SimpleDialog>
      <style jsx>{`
        .exchange {
          width: 30px;
          height: 30px;
        }
        .coin {
          width: 30px;
          height: 30px;
        }
        td {
          text-align: center;
        }
      `}</style>
    </>
  );
};
