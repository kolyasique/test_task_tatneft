import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import ArticleList from './components/ArticleList/ArticleList';
import Article from './components/Article/Article';

import logo from './logo.svg';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <Link to={'./articleList'}>
            <img src={logo} className='App-header-logo' alt='logo'/>  
        </Link>
      </header>
    <Routes>
        <Route path="/articlelist" element={<ArticleList />} />
        <Route path="*" element={<Navigate to="/articlelist" />} />
        <Route path="/" element={<Navigate to="/articlelist" />} />
        <Route path="/articlelist/:articleId" element={<Article />}/>
    </Routes>
  </div>
  );
}

export default App;
