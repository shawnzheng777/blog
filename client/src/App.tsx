import 'antd/dist/antd.less';
import { AppLayouts } from '@/presentation/layouts';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routerConfig } from '@/presentation/router';
import { Provider as MobxProvider } from 'mobx-react';
import { stores, StoresContext } from '@/presentation/store';
import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import '@/assets/css/global.scss';

const getHistory = () => createBrowserHistory({});

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    stores.AuthStore.loadLogin(token);
  }, []);

  return (
    <MobxProvider {...stores}>
      <StoresContext.Provider value={stores}>
        <Router history={getHistory()}>
          <Switch>
            {routerConfig.map((route, index) => {
              const { component, ...reset } = route;
              return <Route {...reset} key={index} render={() => <AppLayouts component={component} />} />;
            })}
          </Switch>
        </Router>
      </StoresContext.Provider>
    </MobxProvider>
  );
}

export default App;
