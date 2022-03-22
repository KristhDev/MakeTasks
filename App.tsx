import 'react-native-gesture-handler';

import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import dayjs from 'dayjs';
import 'dayjs/locale/es';

/* Providers */
import AuthProvider from './src/context/auth/AuthProvider';
import StatusProvider from './src/context/status/StatusProvider';
import TasksProvider from './src/context/tasks/TasksProvider';
import PermissionsProvider from './src/context/permissions/PermissionsProvider';

/* Navigators */
import Navigator from './src/navigation/Navigator';

/* Seteo de idioma para las fechas */
dayjs.locale('es');

/* HOC donde están todos los contexts de la aplicación */
const AppState: FC = ({ children }) => {
  return (
    <StatusProvider>
      <PermissionsProvider>
        <AuthProvider>
          <TasksProvider>
            { children }
          </TasksProvider>
        </AuthProvider>
      </PermissionsProvider>
    </StatusProvider>
  );
}

const App = () => {
  /* useEffect para desparecer el splash screen */
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppState>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AppState>
  );
}

export default App;