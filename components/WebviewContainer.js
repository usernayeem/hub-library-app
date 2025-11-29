import { useRef } from 'react';
import { RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import OfflineScreen from './OfflineScreen';

import useBackHandler from '../hooks/useBackHandler';
import useNetworkStatus from '../hooks/useNetworkStatus';
import usePullToRefresh from '../hooks/usePullToRefresh';

export default function WebviewContainer() {
  const webviewRef = useRef(null);

  const isConnected = useNetworkStatus();
  const { refreshing, onRefresh } = usePullToRefresh(webviewRef);

  useBackHandler(webviewRef);

  if (!isConnected) return <OfflineScreen />;

  const uri = 'https://hublibrary.netlify.app';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <WebView
          ref={webviewRef}
          source={{ uri }}
          pullToRefreshEnabled
          overScrollMode="never"
          startInLoadingState
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}