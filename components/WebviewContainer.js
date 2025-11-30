import { useRef } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import OfflineScreen from "./OfflineScreen";

import useBackHandler from "../hooks/useBackHandler";
import useNetworkStatus from "../hooks/useNetworkStatus";

export default function WebviewContainer() {
  const webviewRef = useRef(null);

  const isConnected = useNetworkStatus();

  useBackHandler(webviewRef);

  if (!isConnected) return <OfflineScreen />;

  const uri = "https://hublibrary.netlify.app";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <WebView
          ref={webviewRef}
          source={{ uri }}
          pullToRefreshEnabled={true}
          onRefresh={() => webviewRef.current?.reload()}
          overScrollMode="never"
          startInLoadingState
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
