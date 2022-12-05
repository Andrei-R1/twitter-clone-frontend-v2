import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import React from 'react';
import './App.css';
import Users from './components/Users';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing';
import { setContext } from 'apollo-link-context';
import Signup from './pages/Signup';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });
const authLink = setContext(async(req, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
