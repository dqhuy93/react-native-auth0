import React, { PropsWithChildren } from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../app/store';
import { setupStore } from '../app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultQueryFn } from '../helpers/queryClient';
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const testQueryClient = createTestQueryClient();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
