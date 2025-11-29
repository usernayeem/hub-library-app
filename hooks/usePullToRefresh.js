import { useCallback, useState } from 'react';

export default function usePullToRefresh(webviewRef) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  return { refreshing, onRefresh };
}