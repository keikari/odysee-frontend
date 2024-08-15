// @flow
import * as SETTINGS from 'constants/settings';
import React from 'react';
import { Modal } from 'modal/modal';
import Card from 'component/common/card';
import Button from 'component/button';
import { FormField } from 'component/common/form';

type Props = {
  cb: () => void,
  doHideModal: () => void,
  doSetClientSetting: (string, any, boolean) => void,
};

function ModalAffirmPurchase(props: Props) {
  const { cb, doHideModal, doSetClientSetting } = props;
  const [confirmed, setConfirmed] = React.useState(false);

  function handleConfirmAge() {
    doSetClientSetting(SETTINGS.AGE_CONFIRMED, true, true);
    cb();
    doHideModal();
  }

  const title = __('Confirm Your Age');

  return (
    <Modal type="card" isOpen contentLabel={title} onAborted={doHideModal}>
      <Card
        title={title}
        actions={
          <>
            <div className="section">
              <FormField
                name="age-confirmation"
                type="checkbox"
                label={__('I confirm I am over 18 years old.')}
                helper={__(
                  "This is only for regulatory compliance and the data will be stored in your private settings if you're signed in."
                )}
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
              />
            </div>
            <div className="section__actions">
              <Button button="primary" label={'Confirm'} onClick={handleConfirmAge} disabled={!confirmed} />
              <Button button="link" label={__('Cancel')} onClick={doHideModal} />
            </div>
          </>
        }
      />
    </Modal>
  );
}

export default ModalAffirmPurchase;
