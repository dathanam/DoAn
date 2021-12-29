import React from 'react';
import {Admin, fetchUtils, Resource} from 'react-admin';
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-simple-rest';
import EmployeeList from './components/employee/EmployeeList'
function App() {
  var options = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByZW1pdW0iLCJlbWFpbCI6InRoYW5oZGF0bXRhOTlAZ21haWwuY29tIiwicm9sZSI6InByZW1pdW0iLCJsb2dpbkZyaXN0IjpmYWxzZSwiaWROViI6MSwiaWF0IjoxNjQwMjQ3ODQxLCJleHAiOjE2NDAyNTE0NDF9.cYHCY4GPJI_nDUhYU7eV43jDSKv6Jov_fmSfPFDhE_Y",
    table: "employee"
  }
  return (
    <Admin
        dataProvider={jsonServerProvider(
            'https://jsonplaceholder.typicode.com'
        )}
    >
        <Resource
            name="posts"
            list={EmployeeList}
        />
    </Admin>
  );
}

export default App;
