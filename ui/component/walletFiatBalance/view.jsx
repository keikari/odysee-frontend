// @flow
import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import React from 'react';
import Button from 'component/button';
import Card from 'component/common/card';
import Icon from 'component/common/icon';
import I18nMessage from 'component/i18nMessage';
import { Lbryio } from 'lbryinc';
import { getStripeEnvironment } from 'util/stripe';
let stripeEnvironment = getStripeEnvironment();

const WalletBalance = () => {
  const [accountStatusResponse, setAccountStatusResponse] = React.useState();

  function getAccountStatus() {
    return Lbryio.call(
      'account',
      'status',
      {
        environment: stripeEnvironment,
      },
      'post'
    );
  }

  // calculate account transactions section
  React.useEffect(() => {
    (async function () {
      try {
        if (!stripeEnvironment) {
          return;
        }
        const response = await getAccountStatus();

        setAccountStatusResponse(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [stripeEnvironment]);

  return (
    <>{<Card
      title={<><Icon size={18} icon={ICONS.FINANCE} />{(accountStatusResponse && ((accountStatusResponse.total_received_unpaid - accountStatusResponse.total_paid_out) / 100)) || 0} USD</>}
      subtitle={accountStatusResponse && accountStatusResponse.total_received_unpaid > 0 ? (
          <I18nMessage>
            This is your pending balance that will be automatically sent to your bank account
          </I18nMessage>) : (
        <I18nMessage>
          When you begin to receive tips your balance will be updated here
        </I18nMessage>)
      }
      actions={
        <>
          <h2 className="section__title--small">
            ${(accountStatusResponse && (accountStatusResponse.total_received_unpaid / 100)) || 0} Total Received Tips
          </h2>

          <h2 className="section__title--small">
            ${(accountStatusResponse && (accountStatusResponse.total_paid_out / 100)) || 0}  Withdrawn
          </h2>

          <div className="section__actions">
            <Button button="secondary" label={__('Account Configuration')} icon={ICONS.SETTINGS} navigate={`/$/${PAGES.SETTINGS_STRIPE_ACCOUNT}`} />
          </div>
        </>
      }
    />}</>
  );
};

export default WalletBalance;
