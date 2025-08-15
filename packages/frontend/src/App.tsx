import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { createTheme } from '@material-ui/core/styles';
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';
import { MeterList } from './components/meters';
import './App.css';

// import Dashboard from './dashboard';
const theme = createTheme({
  palette: {
    type: 'light',
  },
});

// データを取得するクライアントとエンドポイントのベースURLの初期化

//const dataProvider = jsonServerProvider('https://xx856cpj6a.execute-api.us-west-2.amazonaws.com');
const dataProvider = simpleRestProvider('https://xx856cpj6a.execute-api.us-west-2.amazonaws.com');


const App: React.FC = () => {
  return (
    // dataProviderでクライアントを渡す
    <Admin theme={theme} dataProvider={dataProvider} >
      <Resource name="meters/202506" list={ListGuesser} />
    </Admin>
  );
}

export default App;

