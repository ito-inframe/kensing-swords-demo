import React from 'react';
import { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import { createTheme } from '@material-ui/core/styles';
import { API, Storage } from "aws-amplify";
import fakeDataProvider from 'ra-data-fakerest';
import { MeterList } from './components/meters';
import './App.css';
import './containers/Home.css';

const ym = '202506';

// import Dashboard from './dashboard';
const theme = createTheme({
  palette: {
    type: 'light',
  },
});

// データを取得するクライアントとエンドポイントのベースURLの初期化

//const dataProvider = jsonServerProvider('https://xx856cpj6a.execute-api.us-west-2.amazonaws.com');
//const dataProvider = simpleRestProvider('https://xx856cpj6a.execute-api.us-west-2.amazonaws.com');
let dataProvider = null;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {

      try {
        const meters = await loadMeters(ym);
        console.log(meters);
        const jsonstr = '{' + `"${ym}": ${JSON.stringify(meters)}` + '}';
        console.log(jsonstr);
        dataProvider = fakeDataProvider(JSON.parse(jsonstr), true);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    console.log('useEffect called...');
    onLoad();
  }, [loading]);

  function loadMeters(ym) {
    return API.get("kensing", `/meters/${ym}`, {});
  }

  function renderLander() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>KENSING Demo</h1>
          <p className="text-muted">The KENSING OCR Demo app</p>
        </div>
      </div>
    );
  }

  function renderMeters() {
    return (
      <Admin theme={theme} dataProvider={dataProvider}>
        <Resource name={ym} list={MeterList} />
      </Admin>
    );
  }

  return (
    <>
    { loading ? renderLander() :  renderMeters() }
    </>
  );
}

export default App;
