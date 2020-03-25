import React from 'react';

import Head from 'next/head';
import { Card } from '@blueprintjs/core';

import { PageHeader } from '../components/atomic/molecules/PageHeader';
import { FAQS } from '../constants/faqs';
import { CollapsibleItem } from '../components/atomic/molecules/CollapsibleItem';

const Faqs = () => {
  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Frequently Asked Questions</title>
      </Head>
      <PageHeader text="FAQs" />
      {FAQS.map(faq => (
        <div className="faq" key={faq.question}>
          <Card>
            <CollapsibleItem header={faq.question} body={faq.answer} />
          </Card>
        </div>
      ))}
      <style jsx>
        {`
          .container {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            font-size: 24px;
          }
          .faq {
            padding-bottom: 20px;
          }
        `}
      </style>
    </>
  );
};

export default Faqs;
