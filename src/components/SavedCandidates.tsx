// src/components/SavedCandidates.tsx
import React, { useState, useEffect } from 'react';
import { Candidate } from '../types'; // Candidate type definition (to be added in the next step)

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  const handleRemoveCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, idx) => idx !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted yet.</p>;
  }

  return (
    <div>
      <h2>Saved Candidates</h2>
      <ul>
        {savedCandidates.map((candidate, index) => (
          <li key={index}>
            <h3>{candidate.name}</h3>
            <p><strong>Username:</strong> {candidate.login}</p>
            <p><strong>Location:</strong> {candidate.location}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Profile:</strong> <a href={candidate.html_url} target="_blank">GitHub Profile</a></p>
            <button onClick={() => handleRemoveCandidate(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
