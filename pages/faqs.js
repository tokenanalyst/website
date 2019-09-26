import { PageHeader } from '../components/PageHeader';
import { FAQS } from '../constants/faqs';
import Head from 'next/head';

import { CollapsibleItem } from '../components/CollapsibleItem';

const Faqs = () => {
  return (
    <>
      <Head>
        <title>TokenAnalyst - Frequently Asked Questions</title>
      </Head>
      <PageHeader text={'FAQs'} />
      {FAQS.map(faq => (
        <div className="faq" key={faq.question}>
          <CollapsibleItem header={faq.question} body={faq.answer} />
        </div>
      ))}
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default Faqs;
