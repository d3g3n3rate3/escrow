import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { ClipLoader } from 'react-spinners'

import * as arbitrabletxActions from '../../../actions/arbitrable-transaction'
import * as arbitrabletxSelectors from '../../../reducers/arbitrable-transaction'
import ResumeArbitrableTx from '../../../components/resume-arbitrable-tx'
import Button from '../../../components/button'

import './resume.css'

class Resume extends PureComponent {
  state = {
    copied: false
  }
  static propTypes = {
    arbitrabletxForm: arbitrabletxSelectors.arbitrabletxFormShape.isRequired,
    createArbitrabletx: PropTypes.func.isRequired
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    const { fetchMetaEvidenceArbitrabletx, metaEvidenceIPFSHash } = this.props
    fetchMetaEvidenceArbitrabletx(metaEvidenceIPFSHash)
  }

  render() {
    const {
      createArbitrabletx,
      arbitrabletxForm,
      type,
      metaEvidenceIPFSHash
    } = this.props
    const { copied } = this.state

    const shareLink = `https://escrow.kleros.io/payment/${metaEvidenceIPFSHash}`

    return (
      <>
        {arbitrabletxForm.amount !== undefined && type === 'invoice' && (
          <div>
            <ResumeArbitrableTx
              arbitrabletx={arbitrabletxForm}
              title={'Invoice Details'}
            />
            <div className="link-share" style={{ textAlign: 'left' }}>
              <div className="link-share-email">
                <a
                  href={`
                        mailto:alice%40example.com
                        ?subject=Invoice ${encodeURIComponent(
                          arbitrabletxForm.title
                        )}
                        &body=Hi%2C%0A%0AHere%20is%20the%20link%20to%20the%20${encodeURIComponent(
                          arbitrabletxForm.title
                        )}%20invoice: ${shareLink}.%0A%0ABest%2C%0A
                      `}
                >
                  <Button
                    style={{ border: '1px solid #009aff' }}
                    className="link-share-email-button"
                  >
                    Send Invoice by Email
                  </Button>
                </a>
              </div>
              <div className="link-share-url">
                {`/payment/${metaEvidenceIPFSHash.substring(0, 11)}...`}
              </div>
              {/*
                    Logical shortcut for only displaying the
                    button if the copy command exists
                  */
              document.queryCommandSupported('copy') &&
                (!copied ? (
                  <Button
                    style={{ marginLeft: '-3px', border: '1px solid #009aff' }}
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink) &&
                        this.setState({ copied: true })
                    }}
                  >
                    Copy Invoice Link
                  </Button>
                ) : (
                  <Button
                    style={{ marginLeft: '-3px', border: '1px solid #009aff' }}
                  >
                    Invoice Link Copied
                  </Button>
                ))}
            </div>
          </div>
        )}
        {arbitrabletxForm.amount !== undefined && type === 'payment' && (
          <ResumeArbitrableTx
            arbitrabletx={arbitrabletxForm}
            title={'Payment Details'}
          >
            <Formik
              onSubmit={() =>
                createArbitrabletx(arbitrabletxForm, metaEvidenceIPFSHash)
              }
            >
              {({ isSubmitting }) => (
                <Form className={'PayOrReimburseArbitrableTx'}>
                  <div>Back</div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ position: 'relative', top: '2px' }}
                  >
                    {isSubmitting && (
                      <span
                        style={{
                          position: 'relative',
                          top: '4px',
                          lineHeight: '40px',
                          paddingRight: '4px'
                        }}
                      >
                        <ClipLoader size={20} color={'#fff'} />
                      </span>
                    )}{' '}
                    Submit Payment
                  </Button>
                </Form>
              )}
            </Formik>
          </ResumeArbitrableTx>
        )}
      </>
    )
  }
}

export default connect(
  state => ({
    arbitrabletxForm: state.arbitrabletx.arbitrabletxResumeForm
  }),
  {
    createArbitrabletx: arbitrabletxActions.createArbitrabletx,
    fetchMetaEvidenceArbitrabletx: arbitrabletxActions.fetchMetaEvidence
  }
)(Resume)
