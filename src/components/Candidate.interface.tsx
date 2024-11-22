// TODO: Create an interface for the Candidate objects returned by the API
// src/components/CandidateSearch.tsx
import React, { useState, useEffect } from 'react';
import { fetchGitHubUser, searchGitHubUsers } from '../api/API';
import { Candidate } from '../types'; // Candidate type definition (to be added in the next step)

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const users = await searchGitHubUsers('developer'); // Search for developers
        setCandidates(users);
      } catch (error) {
        console.error("Error loading candidates", error);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      setCurrentCandidate(candidates[currentIndex]);
    }
  }, [candidates, currentIndex]);

  const handleSaveCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (currentCandidate) {
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
  };

  const handleRejectCandidate = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
  };

  if (!currentCandidate) return <p>Loading...</p>;

  return (
    <div>
      <h2>{currentCandidate.name}</h2>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
      <p><strong>Username:</strong> {currentCandidate.login}</p>
      <p><strong>Location:</strong> {currentCandidate.location}</p>
      <p><strong>Company:</strong> {currentCandidate.company}</p>
      <p><strong>Email:</strong> {currentCandidate.email}</p>
      <p><strong>Profile:</strong> <a href={currentCandidate.html_url} target="_blank">GitHub Profile</a></p>

      <button onClick={handleSaveCandidate}>+</button>
      <button onClick={handleRejectCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
