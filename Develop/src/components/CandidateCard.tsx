import React from 'react';

interface Candidate {
  id: number;
  name: string;
  position: string;
}

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="candidate-card">
      <h3>{candidate.name}</h3>
      <p>{candidate.position}</p>
    </div>
  );
};

export default CandidateCard;