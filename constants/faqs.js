export const FAQS = [
  {
    question: 'Why does on-chain data matter?',
    answer:
      "Blockchains by design are open, shared databases governed by consensus rules and all transactions are validated by several computers worldwide. When crypto investors & traders send funds to exchanges (or to each other), it is recorded on the blockchain first before it reaches the exchange itself. As such, keeping an eye on the blockchain to identify significant transactions and large inflows/outflows from/to exchanges gives us a better picture of what is about to happen in the crypto-asset market before it actually happens. Blockchain data is generally also a more trustworthy source of truth than 'reported' exchange data that comes from the exchanges themselves 😉",
    id: 1,
  },
  {
    question: 'How do we calculate 24h Volume?',
    answer:
      'This is sum of the volume for the prior 24 hour period. For example, if it is 1pm UTC on Jan 7th, we sum the volume from 1pm UTC Jan 7th to 1pm UTC Jan 6th',
    id: 2,
  },
  {
    question: 'How do we calculate 24h Percent Change?',
    answer:
      'Percent change between the current 24 hour period and the prior 24 hour period. For example, if it is 1pm UTC on Jan 7th, current = 1pm UTC Jan 7th to 1pm UTC Jan 6th, and prior = 1pm UTC Jan 6th to 1pm UTC Jan 5th',
    id: 3,
  },
  {
    question: 'How did we calculate exchange inflows & outflows?',
    answer:
      "We manually transacted with several large exchanges and then programmatically extrapolated the behaviour we saw in order to map each exchange's client deposit address, their routing addresses, and their hot and cold storage wallets in order to develop a holistic map of as many exchange wallets as possible. Of course, we cannot know with 100% certainty that each wallet we have identified is definitely a given exchange wallet, but we internally assign probability scores to each label, and are working constantly to improve our internal exchange labelling models. Having these exchange addresses mapped, we then see all transactions/token transfers coming into and out of their respective client-facing exchange wallets to derive the 'inflow' and 'outflow' metrics.",
    id: 4,
  },
  {
    question:
      "How do we differentiate between 'real' and 'change' Bitcoin on-chain volume?",
    answer:
      "Our current heuristic for 'change' related volume is for whenever BTC in a transaction is sent back to the same address that sent the BTC. We are actively developing more sophisticated 'shared spending' models to identify what % of transaction volume is 'change' more accurately. The 'real' volume is simply the remainder left over after subtracting the change.",
    id: 5,
  },
  {
    question:
      "How do we differentiate between 'external' and 'internal' Ethereum on-chain volume?",
    answer:
      "'Internal' transactions are transfers of ETH that are initiated by smart contracts. While contracts can't initiate transactions on their own, when certain functions are called on from the outside, the smart contract can generate transfers of ETH towards multiple addresses (other contracts and non-contract addresses). At TokenAnalyst, we track every function call and event that happens on Ethereum and thus we are able to derive an accurate 'internal' ETH on-chain volume (something that is missed by many data providers). The 'external' transaction volume is that which can be seen on the surface by looking at the blockchain using standard web3 calls - 'normal' ETH transactions mined on each block.",
    id: 6,
  },
  {
    question: 'Does exchange inflow or outflow have an impact on price?',
    answer:
      "Yes. Only if funds flow into exchanges can trades actually occur (which drive the price). When money flows out of exchanges, it matters where it flows to (HODL'ers, bots, other exchanges?) - this is something we actively track and offer as a premium service.",
    id: 7,
  },
];
