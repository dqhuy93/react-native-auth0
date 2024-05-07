import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  app: appReducer,
});

/**
 * For unit test
 */
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

/**
 * For unit test
 */

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
