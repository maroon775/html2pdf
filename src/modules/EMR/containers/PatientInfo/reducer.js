import {simpleReducer} from '@/helpers/redux';

import actions, {initState} from './actions';

export default simpleReducer(initState, actions);
