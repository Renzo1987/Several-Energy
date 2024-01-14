import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthProvider";
import { InfoClienteProvider } from "./context/InfoClienteProvider";
import { FranjasProvider } from "./context/FranjasProvider";
import { DataExtraProvider } from "./context/DataExtraProvider";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <InfoClienteProvider>
            <FranjasProvider>
            <DataExtraProvider>
                <Header />
                <Main />
            </DataExtraProvider>
            </FranjasProvider>
          </InfoClienteProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
