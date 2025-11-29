import { useRef } from 'react';
import { RefreshControl, View } from 'react-native';
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
    <View style={{ flex: 1 }}>
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
    </View>
  );
}