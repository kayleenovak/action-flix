import { isLoadingReducer } from './isLoadingReducer.js'
import { hasErroredReducer } from './hasErroredReducer.js'
import { fetchDataSuccessReducer } from '.fetchDataSuccessReducer.js'

export const rootReducer = combineReducers({
  isLoading: isLoadingReducer, 
  hasErrored: hasErroredReducer, 
  fetchDataSuccess: fetchDataSuccessReducer
})