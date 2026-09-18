export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
    },
  },
  extra: {
    env: process.env.ENV,
    apolloUri:
      process.env.EXPO_PUBLIC_APOLLO_URI ||
      process.env.APOLLO_URI ||
      'https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/',
    eas: {
      projectId: 'f927a601-67f3-45a9-a4df-7de7b2c2c8a6',
    },
  },
  updates: {
    url: 'https://u.expo.dev/f927a601-67f3-45a9-a4df-7de7b2c2c8a6',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};
