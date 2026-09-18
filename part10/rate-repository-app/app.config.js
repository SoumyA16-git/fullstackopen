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
    apolloUri: process.env.APOLLO_URI || 'http://localhost:4000/graphql',
  },
};
