import React,{useState,useEffect} from 'react'
import { useParams,Link} from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Submissions.css'
const SubmittedSolutions = () => {

  const { titleSlug,title } = useParams();
  const [submission,setsubmission] = useState([]);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userLogin} = useAuthContext();


  useEffect(() => {
    const fetchProblemStatement = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${titleSlug}`);
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        setError('Failed to fetch problem statement');
      } finally {
        setLoading(false);
        
        if (userLogin) {
          const response = await fetch(`/user/solutions/byUser/${userLogin.result._id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setsubmission(data);
          } else {
            console.error('Failed to fetch bookmarked questions');
          }
          //fetchSubmissions(userLogin.result._id);
        }
      }
    };
      fetchProblemStatement();
  }, [titleSlug,userLogin]);


  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const filteredSolutions = submission.filter(sol => sol.titleSlug === titleSlug);
  return (
    <div className='problemStatementContainer'>
      <div className='problemStatement'>
        <Link to={`/practice/${problem.titleSlug}`}><p className='title'>{problem.questionTitle}</p></Link>
        <div className='questionStatement' dangerouslySetInnerHTML={{ __html: problem.question }} />
      </div>
      
      <div className="solution-container">
      <p className='submissions'>Submitted Solutions</p>
        {filteredSolutions.map(sol => (
          <div key={sol._id} className="solution-item">
            <div className="solution-header">
              <p>Language: {sol.language}</p>
              <p>Posted at: {new Date(sol.createdAt).toLocaleString()}</p>
            </div>
            <div className="solution">
              <SyntaxHighlighter language={sol.language} style={okaidia}>
                {sol.solution}
              </SyntaxHighlighter>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default SubmittedSolutions
