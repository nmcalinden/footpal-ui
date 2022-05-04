import * as React from 'react';
import { Container } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import './App.css';
import Header from './containers/header/Header';
import Navigation from './containers/navigation/Navigation';
import { AuthProvider } from './lib/auth';
import { queryClient } from './lib/react-query';

class App extends React.Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Container className="App" maxWidth="xl">
          <Header />
          <Navigation/>          
        </Container>   
        </AuthProvider>
      </QueryClientProvider>
     
    );
  }
}
 

export default App;
