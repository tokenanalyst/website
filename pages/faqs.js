import { PageHeader } from '../components/PageHeader';
import { FAQS } from '../constants/faqs';

import { CollapsibleItem } from '../components/CollapsibleItem';

const Faqs = () => {
  return (
    <>
      <PageHeader text={'FAQs'} />
      {FAQS.map(faq => (
        <div className="faq">
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
