import { 
  Route, 
  Routes,
  useLocation 
} from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './components/home/Home';
import LoginForm from './components/forms/LoginForm';
import SignupForm from './components/forms/SignupForm';
import ViewerDocument from './components/document/DocumentViewer';
import EditorDocument from './components/document/DocumentEditor';

import './App.css';

const App = () => {  
  const location = useLocation()
  const state = location.state as { background?: Location }

  return <>
    <Routes location={ state?.background || location }>
      <Route path='/' element={ <Layout /> }>
        <Route index element={<Home />} />
        <Route path="document">
          <Route path="new" element={<EditorDocument />} />
          <Route path="edit/:id" element={<EditorDocument />} />
          <Route path="view/:id" element={<ViewerDocument />} />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    </Routes>
    {
      state?.background && (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      )
    }
  </>
}

export default App
