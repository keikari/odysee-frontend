import { connect } from 'react-redux';
import { doUserCheckEmailVerified } from 'redux/actions/user';
import { doToast } from 'redux/actions/notifications';
import SignInVerifyPage from './view';

const select = () => ({});
const perform = {
  doUserCheckEmailVerified,
  doToast,
};

export default connect(select, perform)(SignInVerifyPage);
