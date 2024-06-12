import { connect } from 'react-redux';

import { selectClaimForUri, selectClaimIsMine } from 'redux/selectors/claims';

import NsfwContentOverlay from './view';

const select = (state, props) => {
  const claim = selectClaimForUri(state, props.uri);

  return {
    claimIsMine: selectClaimIsMine(state, claim),
  };
};

export default connect(select)(NsfwContentOverlay);
