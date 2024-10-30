"use client"
import React, { useEffect, useState } from 'react';

interface User {
  id: string;
}

const UserList = ({ users, currentPage }: { users: User[], currentPage: number }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?searchValue=${encodeURIComponent(searchValue)}&page=${currentPage}`);
      const results = await response.json();
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search" 
        onChange={(e) => setSearchValue(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'table', width: 'max-content', borderCollapse: 'collapse' }}>
          {(searchResults.length > 0 ? searchResults : users).map(user => (
            <div key={user.id} style={{ display: 'table-row' }}>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>DENUMIRE: {user.DENUMIRE}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>CUI: {user.CUI}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>COD_INMATRICULARE: {user.COD_INMATRICULARE}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>EUID: {user.EUID}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>STARE_FIRMA: {user.STARE_FIRMA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADRESA_COMPLETA: {user.ADRESA_COMPLETA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_TARA: {user.ADR_TARA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_LOCALITATE: {user.ADR_LOCALITATE}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_JUDET: {user.ADR_JUDET}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_DEN_STRADA: {user.ADR_DEN_STRADA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_DEN_NR_STRADA: {user.ADR_DEN_NR_STRADA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_BLOC: {user.ADR_BLOC}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_SCARA: {user.ADR_SCARA}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_ETAJ: {user.ADR_ETAJ}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_APARTAMENT: {user.ADR_APARTAMENT}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_COD_POSTAL: {user.ADR_COD_POSTAL}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_SECTOR: {user.ADR_SECTOR}</div>
              <div style={{ display: 'table-cell', border: '1px solid #ccc', padding: '8px' }}>ADR_COMPLETARE: {user.ADR_COMPLETARE}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
