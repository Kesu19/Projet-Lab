import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Studiride',
  webDir: 'www',
  server: {
    androidScheme: 'http', 
    iosScheme: 'http',     
    hostname: '192.168.40.218', 
    allowNavigation: ['192.168.40.218'], 
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
