import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.crewinsights',
  appName: 'CrewInsights',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.0.11:3000',
    'cleartext': true,
  }
};

export default config;
