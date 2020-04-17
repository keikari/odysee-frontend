// @flow
import * as MODALS from 'constants/modal_types';
import React from 'react';
import TxoListItem from './internal/txo-list-item';
import Spinner from 'component/spinner';
import HelpLink from 'component/common/help-link';

type Props = {
  emptyMessage: ?string,
  loading: boolean,
  openModal: (id: string, { tx: Txo, cb: string => void }) => void,
  rewards: {},
  txos: Array<Txo>,
};

function TransactionListTable(props: Props) {
  const { emptyMessage, rewards, loading, txos } = props;
  const REVOCABLE_TYPES = ['channel', 'stream', 'repost', 'support', 'claim'];
  function revokeClaim(tx: any, cb: string => void) {
    props.openModal(MODALS.CONFIRM_CLAIM_REVOKE, { tx, cb });
  }

  return (
    <React.Fragment>
      {!loading && !txos.length && <h2 className="main--empty empty">{emptyMessage || __('No transactions.')}</h2>}
      {loading && (
        <h2 className="main--empty empty">
          <Spinner delayed />
        </h2>
      )}
      {!loading && !!txos.length && (
        <div className="table__wrapper">
          <table className="table table--transactions">
            <thead>
              <tr>
                <th>{__('Date')}</th>
                <th>
                  {
                    <>
                      {__('Type')}
                      <HelpLink href="https://lbry.com/faq/transaction-types" />
                    </>
                  }
                </th>
                <th>{__('Details')} </th>
                <th>{__('Transaction')}</th>
                <th className="table__item--align-right">{__('Amount (LBC)')}</th>
              </tr>
            </thead>
            <tbody>
              {txos &&
                txos.map((t, i) => (
                  <TxoListItem
                    key={`${t.txid}:${t.nout}-${i}`}
                    txo={t}
                    reward={rewards && rewards[t.txid]}
                    isRevokeable={t.is_my_output && !t.is_spent && REVOCABLE_TYPES.includes(t.type)}
                    revokeClaim={revokeClaim}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}

export default TransactionListTable;
