// App.tsx

import { AuthProvider } from './AuthProvider';
import { ProfileIcon } from '././ProfileIcon';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>React Context Example</h1>
        <ProfileIcon />
      </div>
    </AuthProvider>
  );
}

export default App;