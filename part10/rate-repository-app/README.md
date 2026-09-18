# Full Stack Open - Rate Repository App (Part 10)

This is the mobile application developed for **Full Stack Open Part 10: React Native**.

## 📱 EAS Update (Exercise 10.28)

Open the application with Expo Go on your mobile device or emulator by scanning the QR code below:

<!-- Place your EAS QR Code screenshot or link here -->
![EAS Update QR Code](./qr-code.png)

- **EAS Project Branch**: `main`
- **Environment**: `preview`
- **Backend GraphQL API**: [https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/](https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/)

---

## 🛠️ Tech Stack & Features

- **Framework**: React Native with Expo SDK 52
- **Routing**: `react-router-native`
- **Data & Cache**: Apollo Client GraphQL with Relay-style cursor pagination (`relayStylePagination`)
- **State & Storage**: AsyncStorage token persistence
- **Forms & Validation**: Formik + Yup
- **Testing**: Jest + React Native Testing Library (`@testing-library/react-native`)
- **CI/CD**: GitHub Actions automated lint & test pipeline

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
