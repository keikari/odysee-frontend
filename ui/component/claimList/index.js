import { connect } from 'react-redux';
import ClaimList from './view';
import * as SETTINGS from 'constants/settings';
import { selectClaimsByUri } from 'redux/selectors/claims.js';

import { selectClientSetting } from 'redux/selectors/settings';

const select = (state, props) => ({
  searchInLanguage: selectClientSetting(state, SETTINGS.SEARCH_IN_LANGUAGE),

  test_claims: selectClaimsByUri(state, props.uris), 
});

export default connect(select)(ClaimList);
