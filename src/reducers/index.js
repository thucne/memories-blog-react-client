import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import user from './user';
import getAVTs from './getAVTs';
import cmts from './comments';
import noti from './notification';
import checkEmail from './checkMail';
import wall from './wall';
import meta from './meta';

export default combineReducers({ posts, auth, user, getAVTs, cmts, noti, checkEmail, wall, meta });

