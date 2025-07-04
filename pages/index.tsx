import { useState } from 'react';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
};

type ApiResponse = {
  data: any;
  source: string;
  timestamp: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [externalData, setExternalData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Test basic API call
  const testHelloAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/hello');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error calling API');
    } finally {
      setLoading(false);
    }
  };

  // Get all users
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const createUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert('Please enter both name and email');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/users', newUser);
      setNewUser({ name: '', email: '' });
      getUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call external API
  const callExternalAPI = async (source: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/external?source=${source}`);
      setExternalData(response.data);
    } catch (error) {
      console.error('Error calling external API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js Serverless API Demo</h1>
      
      {/* Basic API Test */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Basic API Test</h2>
        <button onClick={testHelloAPI} disabled={loading}>
          {loading ? 'Loading...' : 'Test Hello API'}
        </button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>

      {/* User Management */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>User Management</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Create New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={createUser} disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>

        <div>
          <button onClick={getUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Get All Users'}
          </button>
          
          {users.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Users:</h3>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* External API Calls */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>External API Calls</h2>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => callExternalAPI('jsonplaceholder')} disabled={loading} style={{ marginRight: '10px' }}>
            JSONPlaceholder
          </button>
          <button onClick={() => callExternalAPI('httpbin')} disabled={loading} style={{ marginRight: '10px' }}>
            HTTPBin
          </button>
          <button onClick={() => callExternalAPI('quotes')} disabled={loading}>
            Random Quote
          </button>
        </div>

        {externalData && (
          <div style={{ marginTop: '20px' }}>
            <h3>External API Response:</h3>
            <p><strong>Source:</strong> {externalData.source}</p>
            <p><strong>Timestamp:</strong> {externalData.timestamp}</p>
            <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(externalData.data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* API Documentation */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Available API Endpoints</h2>
        <ul>
          <li><strong>GET /api/hello</strong> - Basic hello message</li>
          <li><strong>GET /api/users</strong> - Get all users</li>
          <li><strong>POST /api/users</strong> - Create a new user</li>
          <li><strong>GET /api/users/[id]</strong> - Get user by ID</li>
          <li><strong>GET /api/external?source=[jsonplaceholder|httpbin|quotes]</strong> - Call external APIs</li>
        </ul>
      </div>
    </div>
  );
} 