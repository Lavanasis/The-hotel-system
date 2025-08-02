import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './services/store.js';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
      <App />
    </ErrorBoundary>
  </Provider>,
);
