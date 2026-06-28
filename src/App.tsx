import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import PostList from './components/pages/PostList';
import Tags from './components/pages/Tags';
import PhotoGallery from './components/pages/PhotoGallery';
import PhotoDetail from './components/pages/PhotoDetail';
import About from './components/pages/About';
import PostDetail from './components/pages/PostDetail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tag" element={<Tags />} />
          <Route path="/photography" element={<PhotoGallery />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
