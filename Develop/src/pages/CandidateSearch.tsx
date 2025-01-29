import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchCandidate = async (username: string) => {
    setLoading(true);
    const user = await searchGithubUser(username);
    console.log('User data:', user);
    const candidateData: Candidate = {
      Name: user.name,
      Username: user.login,
      Location: user.location,
      Avatar: user.avatar_url,
      Email: user.email,
      Html_url: user.html_url,
      Company: user.company,
    };
    setCurrentCandidate(candidateData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      const transformedData = data.map((user: any) => ({
        Name: user.name,
        Username: user.login,
        Location: user.location,
        Avatar: user.avatar_url,
        Email: user.email,
        Html_url: user.html_url,
        Company: user.company,
      }));
      setCandidates(transformedData);
      setLoading(false);

      // Fetch detailed data for the first candidate
      if (transformedData.length > 0) {
        fetchCandidate(transformedData[0].Username);
      }
    };

    fetchCandidates();
  }, []);

  const handleNextCandidate = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      setCurrentIndex(nextIndex);
      fetchCandidate(candidates[nextIndex].Username);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        currentCandidate && (
          <div>
            <CandidateCard currentCandidate={currentCandidate} />
            <button onClick={handleNextCandidate}>Next Candidate</button>
          </div>
        )
      )}
    </div>
  );
};

export default CandidateSearch;