// @flow
import React from 'react';
import Button from 'component/button';

type Props = {
  claimIsMine: boolean,
  setIsNsfwAknowledged: (boolean) => void,
};

const NsfwContentOverlay = (props: Props) => {
  const { claimIsMine, setIsNsfwAknowledged } = props;

  if (claimIsMine) return null;

  return (
    <div className="nsfw-content-overlay">
      <span>{__('This content is marked as NSWF')}</span>

      <Button button="primary" label={__('View Content')} onClick={() => setIsNsfwAknowledged(true)} />
    </div>
  );
};

export default NsfwContentOverlay;
