import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(webviewRef) {
  useEffect(() => {
    const handler = () => {
      if (webviewRef.current) {
        webviewRef.current.goBack();
        return true; // prevent app exit
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [webviewRef]);
}
