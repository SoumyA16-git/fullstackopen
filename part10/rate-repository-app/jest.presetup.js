// jest.presetup.js
// Sets up global mocks that must exist BEFORE jest-expo and react-native's
// test framework setup files run (i.e., before setupFilesAfterEnv).
//
// React Native 0.76 uses TurboModules (New Architecture). In the Jest/Node.js
// environment there is no native bridge, so TurboModuleRegistry.getEnforcing()
// throws unless we provide a __turboModuleProxy that returns mocks.
//
// This file is listed under jest "setupFiles" which runs before the framework.

// Provide a TurboModule proxy that returns mock objects for every requested module.
global.__turboModuleProxy = (name) => {
  const mocks = {
    SourceCode: {
      getConstants: () => ({ scriptURL: '' }),
    },
    I18nManager: {
      getConstants: () => ({
        isRTL: false,
        doLeftAndRightSwapInRTL: true,
        localeIdentifier: 'en_US',
      }),
      allowRTL: () => {},
      forceRTL: () => {},
      swapLeftAndRightInRTL: () => {},
    },
    DeviceInfo: {
      getConstants: () => ({
        Dimensions: {
          window: { fontScale: 1, height: 812, scale: 2, width: 375 },
          screen: { fontScale: 1, height: 812, scale: 2, width: 375 },
        },
        isIPhoneX_deprecated: false,
      }),
    },
    ExceptionsManager: {
      reportFatalException: () => {},
      reportSoftException: () => {},
      updateExceptionMessage: () => {},
      dismissRedbox: () => {},
      reportException: () => {},
    },
    PlatformConstants: {
      getConstants: () => ({
        reactNativeVersion: { major: 0, minor: 76, patch: 0 },
        isTesting: true,
        osVersion: '14.0',
        systemName: 'iOS',
        interfaceIdiom: 'phone',
        forceTouchAvailable: false,
      }),
    },
    StatusBarManager: {
      getHeight: () => {},
      setStyle: () => {},
      setHidden: () => {},
      setNetworkActivityIndicatorVisible: () => {},
      setBackgroundColor: () => {},
      setTranslucent: () => {},
      getConstants: () => ({ HEIGHT: 44, DEFAULT_BACKGROUND_COLOR: 0 }),
    },
    Timing: {
      createTimer: () => {},
      deleteTimer: () => {},
    },
    UIManager: {
      getConstants: () => ({
        ViewManagerNames: [],
        customBubblingEventTypes: {},
        customDirectEventTypes: {},
      }),
      createView: () => {},
      updateView: () => {},
      manageChildren: () => {},
      setChildren: () => {},
      measure: () => {},
      measureInWindow: () => {},
      measureLayout: () => {},
      dispatchViewManagerCommand: () => {},
      blur: () => {},
      focus: () => {},
      findSubviewIn: () => {},
    },
    AppState: {
      getConstants: () => ({ initialAppState: 'active' }),
      getCurrentAppState: () => {},
      addListener: () => {},
      removeListeners: () => {},
    },
    Networking: {
      sendRequest: () => {},
      abortRequest: () => {},
      addListener: () => {},
      removeListeners: () => {},
    },
    AsyncLocalStorage: {
      multiGet: (keys, cb) => setTimeout(() => cb(null, []), 0),
      multiSet: (entries, cb) => setTimeout(() => cb(null), 0),
      multiRemove: (keys, cb) => setTimeout(() => cb(null), 0),
      multiMerge: (entries, cb) => setTimeout(() => cb(null), 0),
      clear: (cb) => setTimeout(() => cb(null), 0),
      getAllKeys: (cb) => setTimeout(() => cb(null, []), 0),
    },
    KeyboardObserver: {
      addListener: () => {},
      removeListeners: () => {},
    },
    ImageLoader: {
      getSize: () => Promise.resolve([320, 240]),
      getSizeWithHeaders: () => Promise.resolve({ height: 222, width: 333 }),
      prefetchImage: () => Promise.resolve(),
      prefetchImageWithMetadata: () => Promise.resolve(),
      queryCache: () => Promise.resolve({}),
    },
  };

  return mocks[name] || null;
};
