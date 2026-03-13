declare global {
  interface Window {
    /** MAX Bridge SDK (https://dev.max.ru/docs/webapps/bridge) */
    WebApp?: {
      initData: string;
      initDataUnsafe: {
        query_id?: string;
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
          language_code?: string;
          photo_url?: string;
        };
        auth_date?: number;
        hash?: string;
        start_param?: {
          value?: string;
        };
        chat?: {
          id: number;
          type: string;
        };
      };
      platform: string;
      version: string;
      ready: () => void;
      close: () => void;
      openLink: (url: string) => void;
      openMaxLink: (url: string) => void;
      shareContent: (text: string, link: string) => void;
      shareMaxContent: (params: { text?: string; link?: string } | { mid: string; chatType: string }) => void;
      downloadFile: (url: string, file_name: string) => void;
      requestContact: () => void;
      requestScreenMaxBrightness: () => void;
      restoreScreenBrightness: () => void;
      openCodeReader: (fileSelect?: boolean) => void;
      enableClosingConfirmation: () => void;
      disableClosingConfirmation: () => void;
      onEvent: (eventName: string, callback: () => void) => void;
      offEvent: (eventName: string, callback: () => void) => void;
      BackButton: {
        isVisible: boolean;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
      };
      HapticFeedback: {
        impactOccurred: (style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid', disableVibrationFallback?: boolean) => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning', disableVibrationFallback?: boolean) => void;
        selectionChanged: boolean;
      };
      ScreenCapture: {
        isScreenCaptureEnabled: boolean;
        enableScreenCapture: () => void;
        disableScreenCapture: () => void;
      };
      DeviceStorage: {
        setItem: (key: string, value: string) => void;
        getItem: (key: string) => string;
        removeItem: (key: string) => void;
        clear: () => void;
      };
      SecureStorage: {
        setItem: (key: string, value: string) => void;
        getItem: (key: string) => string;
        removeItem: (key: string) => void;
      };
    };
  }
}

export {};
