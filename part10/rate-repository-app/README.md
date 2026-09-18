# Full Stack Open - Rate Repository App (Part 10)

This is the mobile application developed for **Full Stack Open Part 10: React Native** (Exercises 10.1–10.29).

---

## 📱 EAS Update (Exercise 10.28)

Open the application with **Expo Go** on your mobile device or emulator by scanning the QR code below:

<p align="center">
  <img src="./qr-code.png" alt="EAS Update QR Code" width="280" height="280" />
</p>

- **EAS Dashboard**: [https://expo.dev/accounts/soumya16-1/projects/rate-repository-app/updates/87d5e3a4-77a6-46ba-8158-d7707f8786cd](https://expo.dev/accounts/soumya16-1/projects/rate-repository-app/updates/87d5e3a4-77a6-46ba-8158-d7707f8786cd)
- **EAS Project**: `@soumya16-1/rate-repository-app`
- **Branch**: `main`
- **Environment**: `preview`
- **Update Group ID**: `87d5e3a4-77a6-46ba-8158-d7707f8786cd`
- **Backend GraphQL API**: [https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/](https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/)

---

## 🛠️ Features & Implementation

- **Repositories List & Item**: Flexbox layout, avatar, description, language chip, formatted statistics (`k` notation for >= 1000).
- **Navigation**: Top scrollable `AppBar` with `react-router-native` navigation tabs.
- **Authentication**: JWT AsyncStorage persistence with custom hooks (`useSignIn`, `useSignUp`) and `AuthStorageContext`.
- **GraphQL Integration**: Apollo Client with authentication headers, cache normalization, and `relayStylePagination`.
- **Single Repository View**: Detailed repository view with "Open in GitHub" button (`Linking.openURL`) and reviews list.
- **Create & Delete Reviews**: Formik & Yup validated review form, user review list with confirmation dialog (`Alert.alert`) and deletion.
- **Sorting & Searching**: Order picker (Latest / Highest / Lowest rated) and search bar with `use-debounce`.
- **Infinite Scrolling**: Cursor-based pagination using `fetchMore` and `onEndReached`.
- **Automated Tests**: Comprehensive unit tests with Jest and React Native Testing Library (`@testing-library/react-native`).

---

## 🧪 Running Locally

```bash
cd part10/rate-repository-app
npm install --legacy-peer-deps
npm start
```

### Running Tests
```bash
npm test
```

### Running Linter
```bash
npm run lint
```
