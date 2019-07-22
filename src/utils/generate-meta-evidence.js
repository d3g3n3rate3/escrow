const CURRENT_TEMPLATE_INDEX = 1

export const metaEvidenceTemplates = [{
  category: 'Escrow',
  question: 'Which party abided by terms of the contract?',
  rulingOptions: {
    type: 'single-select',
    titles: ['Refund Sender', 'Pay Receiver'],
    descriptions: [
      'Select to return funds to the Sender',
      'Select to release funds to the Receiver'
    ]
  },
  evidenceDisplayInterfaceURI: '/ipfs/QmefpKL4fmD84ZeAXaSJ7bHdkJiHVmydGTpAV6hk4ak57z/index.html'
},
{
  category: 'Escrow',
  question: 'Which party abided by terms of the contract?',
  rulingOptions: {
    type: 'single-select',
    titles: ['Refund Sender', 'Pay Receiver'],
    descriptions: [
      'Select to return funds to the Sender',
      'Select to release funds to the Receiver'
    ]
  },
  evidenceDisplayInterfaceURI: '/ipfs/QmfPnVdcCjApHdiCC8wAmyg5iR246JvVuQGQjQYgtF8gZU/index.html'
}]

export default ({
  arbitrableAddress,
  sender,
  receiver,
  title,
  description,
  fileURI,
  fileHash,
  amount,
  timeout,
  subCategory,
  token,
  extraData,
  invoice
}) => ({
  ...{
    subCategory,
    arbitrableAddress,
    title,
    description,
    fileURI,
    fileHash,
    sender,
    receiver,
    amount,
    timeout,
    token,
    extraData,
    invoice
  },
  ...metaEvidenceTemplates[CURRENT_TEMPLATE_INDEX],
  aliases: {
    [sender]: 'sender',
    [receiver]: 'receiver'
  }
})
