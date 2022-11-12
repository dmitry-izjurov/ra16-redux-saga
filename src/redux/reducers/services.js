import { DOWNLOAD_SERVICES_REQUEST, DOWNLOAD_SERVICES_SUCCESS, DOWNLOAD_SERVICES_FAILURE, DOWNLOAD_SERVICES_INIT_STATE } from '../action';

const initialState = {items: [], loading: false, error: null};

function servicesReducer(state = initialState, action) {
    switch (action.type) {
      case DOWNLOAD_SERVICES_REQUEST:
        return {...state, loading: true, error: null};
    
      case DOWNLOAD_SERVICES_SUCCESS:
        const {value} = action.payload;
        return {items: value, loading: false};

      case DOWNLOAD_SERVICES_FAILURE:
        const {error} = action.payload;
        return {...state, loading: false, error};
      
      case DOWNLOAD_SERVICES_INIT_STATE:
        return initialState;

      default:
        return state;
    }
  }
  
  export default servicesReducer;