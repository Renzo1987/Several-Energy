<<<<<<< HEAD
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import './App.css'

function App() {
  

  return (
    <>
    <Header/>
    <Main/>
    <Footer/>
    </>
  )
}

export default App
=======
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthProvider";
import { InfoClienteProvider } from "./context/InfoClienteProvider";
import { FranjasProvider } from "./context/FranjasProvider";
import { DataExtraProvider } from "./context/DataExtraProvider";
import { PowerProvider } from "./context/PowerProvider";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <InfoClienteProvider>
           <DataExtraProvider>   
            <FranjasProvider>             
            <PowerProvider>
                <Header />
                <Main />
             </PowerProvider>
            </FranjasProvider>
          </DataExtraProvider>
          </InfoClienteProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
>>>>>>> dev
