import React, { useState } from 'react'

import * as arbitrabletxSelectors from '../../reducers/arbitrable-transaction'
import { ReactComponent as PrimaryDocument } from '../../assets/primary-document.svg'
import Attachment from '../../components/attachment'
import { ReactComponent as Arrow } from '../../assets/arrow.svg'

import './resume-arbitrable-tx.css'

const ResumeArbitrableTx = ({ arbitrabletx, title, children, footer }) => {
  const [showAllDescription, setShowAllDescription] = useState(true)
  return (
    <>
      <div className="ResumeArbitrableTx">
        <h1 className="ResumeArbitrableTx-h1">{title}</h1>
        <div className="ResumeArbitrableTx-ContentNewArbitrableTx">
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-title">
            Title
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-title">
            {arbitrabletx.title}
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-otherParty">
            {arbitrabletx.otherParty}
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-otherParty">
            {arbitrabletx.otherPartyAddress}
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-category">
            Escrow Type
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-category">
            {arbitrabletx.subCategory}
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-timeout">
            Timeout Date and Time (Local Time)
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content  ResumeArbitrableTx-ContentNewArbitrableTx-content-timeout">
            {title === 'Invoice Details' || title === 'Payment Details' ? (
              <>
                {new Date(Date.now() + arbitrabletx.timeout * 1000)
                  .toString()
                  .replace(/GMT.+/g, '')
                  .slice(0, -4)}
              </>
            ) : (
              <>
                {new Date(
                  (Number(arbitrabletx.lastInteraction) +
                    Number(arbitrabletx.timeout)) *
                    1000
                )
                  .toString()
                  .replace(/GMT.+/g, '')
                  .slice(0, -4)}
              </>
            )}
          </div>
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-amount">
            Amount
          </div>
          { arbitrabletx.id ? (
            <iframe
              className="ResumeArbitrableTx-ContentNewArbitrableTx-amount"
              frameBorder="0"
              src={`https://ipfs.kleros.io/ipfs/QmUTZnMXfVdtDMyZTymvnJE1BmesJkpEdqTQoS2SEPkfyz/index.html?${encodeURIComponent(
                JSON.stringify({
                  arbitrableContractAddress: arbitrabletx.arbitrableAddress,
                  arbitratorContractAddress: arbitrabletx.arbitratorAddress,
                  transactionID: arbitrabletx.id
                })
              )}`}
              title="Amount Display"
            />) : `${arbitrabletx.amount} ${arbitrabletx.token ? arbitrabletx.token.ticker : ''}`
          }
          {
            !arbitrabletx.token.decimals ? (
              <div>WARNING: We were not able to determine the decimals of this token. It is being assumed at 18, the amount of decimals in ETH. If this is incorrect, please re-create this transaction using a Custom Token with the correct decimal value.</div>
            ) : ''
          }
          {arbitrabletx.file && (
            <>
              <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-name-file">
                Agreement Documents
              </div>
              <div
                className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-file"
                style={{ border: '0' }}
              >
                <a
                  href={arbitrabletx.file}
                  alt="Agreement Documents"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PrimaryDocument />
                </a>
              </div>
            </>
          )}
          {arbitrabletx.description && (
            <>
              <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name-description">
                Description
              </div>
              <div
                className={`ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description`}
                onClick={() => setShowAllDescription(!showAllDescription)}
              >
                <Arrow
                  className={`${
                    showAllDescription
                      ? 'ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description-show-all'
                      : 'ResumeArbitrableTx-ContentNewArbitrableTx-name-all-description-not-show-all'
                  }`}
                  onClick={() => setShowAllDescription(!showAllDescription)}
                />
              </div>
              <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-content-description">
                <p
                  className={`${showAllDescription &&
                    'ResumeArbitrableTx-ContentNewArbitrableTx-content-description-p-short'}`}
                >
                  {arbitrabletx.description}
                </p>
              </div>
            </>
          )}

          {arbitrabletx.evidences && (
            <>
              <div className="ResumeArbitrableTx-ContentNewArbitrableTx-name ResumeArbitrableTx-ContentNewArbitrableTx-evidence-name">
                Evidence
              </div>
              <div className="ResumeArbitrableTx-ContentNewArbitrableTx-content ResumeArbitrableTx-ContentNewArbitrableTx-evidence-container">
                {arbitrabletx.evidences.map((evidence, index) => (
                  <Attachment
                    className={
                      'ResumeArbitrableTx-ContentNewArbitrableTx-evidence-container-item'
                    }
                    URI={evidence.evidenceJSON.fileURI}
                    title={evidence.evidenceJSON.name}
                    description={evidence.evidenceJSON.description}
                    key={index}
                  />
                ))}
              </div>
            </>
          )}
          <div className="ResumeArbitrableTx-ContentNewArbitrableTx-submit">
            {children}
          </div>
        </div>
      </div>
      {footer}
    </>
  )
}

ResumeArbitrableTx.propTypes = {
  // State
  arbitrabletx: arbitrabletxSelectors.arbitrabletxFormShape.isRequired
}

ResumeArbitrableTx.defaultProps = {
  // State
  arbitrableTx: {}
}

export default ResumeArbitrableTx
