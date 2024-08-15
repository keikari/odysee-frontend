// @flow
import React from 'react';
import Button from 'component/button';
import * as MODALS from 'constants/modal_types';

type Props = {
  claimId: string,
  user: ?Object,
  ageConfirmed: boolean,
  claimIsMine: boolean,
  doAknowledgeNsfw: (claimId: string) => void,
  openModal: (string, props?: { cb: () => void }) => void,
};

const NsfwContentOverlay = (props: Props) => {
  const { claimId, user, ageConfirmed, claimIsMine, doAknowledgeNsfw, openModal } = props;
  const hasVerifiedEmail = user && user.has_verified_email;

  if (claimIsMine) return null;

  return (
    <div className="nsfw-content-overlay">
      <span>{__('This content is marked as mature')}</span>

      <Button
        button="primary"
        label={__('View Content')}
        onClick={() =>
          ageConfirmed && hasVerifiedEmail
            ? doAknowledgeNsfw(claimId)
            : openModal(MODALS.CONFIRM_AGE, {
                cb: () => doAknowledgeNsfw(claimId),
              })
        }
      />
    </div>
  );
};

export default NsfwContentOverlay;
