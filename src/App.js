import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import ArticleList from './components/ArticleList/ArticleList';
import Article from './components/Article/Article';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <div>
          dfff
        </div>
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
