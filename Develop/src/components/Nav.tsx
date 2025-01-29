import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">Candidate Search</Link>
        <Link to="/SavedCandidates" className="hover:underline">Saved Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;