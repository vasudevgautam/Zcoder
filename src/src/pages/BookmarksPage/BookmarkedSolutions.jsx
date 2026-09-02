import React,{useState,useEffect} from 'react'
import { useParams,Link, useNavigate} from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IoMdBookmark } from "react-icons/io";
import { useAuthContext } from '../../hooks/useAuthContext';
import '../SubmissionsPage/Submissions.css'
import './Bookmarks.css'

const BookmarkedSolutions = () => {
  const navigate = useNavigate()
  const { titleSlug } = useParams();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userLogin,isAuthenticated} = useAuthContext();

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
          const response = await fetch(`/user/bookmarks/${userLogin.result._id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setBookmarkedQuestions(data);
          } else {
            console.error('Failed to fetch bookmarked questions');
          }
          //fetchBookmarkedQuestions(userLogin.result._id);
        }
      }
    };
      fetchProblemStatement();
  }, [titleSlug,userLogin]);

  const deleteBookmark = async ( sol) => {
    try {
        
      const response = await fetch(`/user/bookmarks/${userLogin.result._id}/${titleSlug}/${sol._id}`, {
        method: 'DELETE',
      });
    
      if (response.ok) {



        const updatedBookmarkedQuestions = bookmarkedQuestions.map(question => {
          if (question.titleSlug === titleSlug) {
            // Filter out the solution to delete from the solutions array
            const updatedSolutions = question.solutions.filter(solution => solution.solutionId !== sol._id);
            // Return a new object with updated solutions array
            return {
              ...question,
              solutions: updatedSolutions,
            };
          }
          // Return the unchanged question object if no update is needed
          return question;
        });
  
        // Update the state with the new array of bookmarked questions
        setBookmarkedQuestions(updatedBookmarkedQuestions);
  
        // setBookmarkedQuestions((prevBookmarkedQuestions) => {
        //   const updatedQuestions = prevBookmarkedQuestions.map((question) => {
        //     if (question.titleSlug=== titleSlug) {
        //       return {
        //         ...question,
        //         solutions: question.solutions.filter((solution) => solution._id !== sol._id),
        //       };
        //     }
        //     return question;
        //   });
        //   return updatedQuestions;
        // });
        // setBookmarkedQuestions((prevBookmarkedQuestions) => prevBookmarkedQuestions.filter((id) => id!== sol._id));
        alert('Solution unbookmarked successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Error unbookmarking solution:', errorResponse.error);
        alert('Failed to unbookmark solution');
      }
    } catch (error) {
      console.error('Error unbookmarking solution:', error);
      alert('Failed to unbookmark solution');
    }
  };
  

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

const filteredSolutions = bookmarkedQuestions.filter(sol => sol.titleSlug === titleSlug);
console.log(filteredSolutions)
  return (
    <div className='problemStatementContainer'>
      <div className='problemStatement'>
        <Link to={`/practice/${problem.titleSlug}`}><p className='title'>{problem.questionTitle}</p></Link>
        <div className='questionStatement' dangerouslySetInnerHTML={{ __html: problem.question }} />
      </div>


      <div className='solution-container'>
        <p className='submissions'>Bookmarked Solutions</p>
        {filteredSolutions.map((question) => ( 
          <div key={question._id } className='solution-item' >
              {question.solutions.map((sol) => (
                <li key={sol._id}  >
                  <div className='solution-header'>
                    <p>Language used :{sol.language}</p>
                  </div>
                  
                  <div className="solution">
                    <SyntaxHighlighter language={sol.language} style={okaidia}>
                      {sol.solution}
                    </SyntaxHighlighter>
                  </div>
                  
                </li>
              ))}
           
          </div>
        ))}
      </div> 
    </div>
  )
}

export default BookmarkedSolutions
