import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PostList } from './pages/PostList';
import { PostEditor } from './pages/PostEditor';
import { PageList } from './pages/PageList';
import { PageEditor } from './pages/PageEditor';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="posts" element={<PostList />} />
              <Route path="posts/new" element={<PostEditor />} />
              <Route path="posts/:id/edit" element={<PostEditor />} />
              <Route path="pages" element={<PageList />} />
              <Route path="pages/new" element={<PageEditor />} />
              <Route path="pages/:id/edit" element={<PageEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
