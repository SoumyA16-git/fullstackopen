#!/usr/bin/env node
// postinstall-patch.js
// Patches jest-expo setup.js to fix compatibility with React Native 0.76+
// In RN 0.76+, NativeModules.js uses `module.exports = NativeModules` directly (no .default)
// but jest-expo@57's setup.js tries to access `.default`, causing TypeError.

const fs = require('fs');
const path = require('path');

const setupFile = path.join(
  __dirname,
  'node_modules',
  'jest-expo',
  'src',
  'preset',
  'setup.js'
);

if (!fs.existsSync(setupFile)) {
  console.log('jest-expo setup.js not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(setupFile, 'utf8');

const oldLine = `const mockNativeModules = require('react-native/Libraries/BatchedBridge/NativeModules').default;`;
const newLine = `const _nativeModulesModule = require('react-native/Libraries/BatchedBridge/NativeModules'); const mockNativeModules = _nativeModulesModule.default || _nativeModulesModule;`;

if (content.includes(newLine)) {
  console.log('jest-expo patch already applied, skipping');
  process.exit(0);
}

if (!content.includes(oldLine)) {
  console.log('jest-expo patch target not found (may have been fixed upstream), skipping');
  process.exit(0);
}

content = content.replace(oldLine, newLine);
fs.writeFileSync(setupFile, content, 'utf8');
console.log('✅ jest-expo setup.js patched successfully');
