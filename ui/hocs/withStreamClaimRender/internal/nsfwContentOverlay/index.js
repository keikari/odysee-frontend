import { connect } from 'react-redux';

import * as SETTINGS from 'constants/settings';
import { selectClientSetting } from 'redux/selectors/settings';
import { selectClaimForUri, selectClaimIsMine } from 'redux/selectors/claims';
import { selectUser } from 'redux/selectors/user';
import { doAknowledgeNsfw } from 'redux/actions/claims';
import { doOpenModal } from 'redux/actions/app';

import NsfwContentOverlay from './view';

const select = (state, props) => {
  const claim = selectClaimForUri(state, props.uri);

  return {
    claimId: claim.claim_id,
    user: selectUser(state),
    ageConfirmed: selectClientSetting(state, SETTINGS.AGE_CONFIRMED),
    claimIsMine: selectClaimIsMine(state, claim),
  };
};

const perform = (dispatch) => ({
  doAknowledgeNsfw: (id) => dispatch(doAknowledgeNsfw(id)),
  openModal: (id, params) => dispatch(doOpenModal(id, params)),
});

export default connect(select, perform)(NsfwContentOverlay);
