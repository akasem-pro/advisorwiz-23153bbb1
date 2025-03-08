
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.334c9e1dba1e49f0af2edc72ededf4c4',
  appName: 'financial-swipe-connect',
  webDir: 'dist',
  server: {
    url: 'https://334c9e1d-ba1e-49f0-af2e-dc72ededf4c4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFFFFF",
      showSpinner: true,
      spinnerColor: "#17cac3",
    },
  },
};

export default config;
