import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import Catalogue from './components/catalogue/Catalogue';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <Header></Header>
      <Catalogue></Catalogue>
    </>
  );
}

export default App;
