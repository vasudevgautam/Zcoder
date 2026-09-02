import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import TagFilter from '../../components/TagFilter/TagFilter';
import Pagination from '../../components/Pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import './Submissions.css'

const Submissions = () => {
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const questionsPerPage = 40;
  const [alertShown, setAlertShown] = useState(false);
  const {userLogin,isAuthenticated} = useAuthContext()


  useEffect(() => {
    if(!isAuthenticated){
      if (!alertShown) {
        alert('You need to be logged in to view this page.');
        setAlertShown(true);
        navigate('/login'); // Redirect to login page or another appropriate page
      }
      return;
    }
    if (userLogin,isAuthenticated,alertShown) {
      fetchSubmissions(userLogin.result._id);
    }
  }, [userLogin]); // Run the effect when the user object changes

  const fetchSubmissions = async (userId) => {
    try {
      const response = await fetch(`/user/solutions/byUser/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setSubmissions(data);
      } else {
        console.error('Failed to fetch  questions');
      }
    } catch (error) {
      console.error('Error fetching  questions', error);
    }finally {
      setLoading(false);
    }
  };
  
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const filteredQuestions = submissions.filter(question =>
    selectedTags.length === 0 ||
    question.topicTags.some(tag => selectedTags.includes(tag.name))
  );

  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const allTags = [...new Set(submissions.flatMap(question => question.topicTags.map(tag => tag.name)))];
  
  const handleTagChange = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
    setCurrentPage(1);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);


  return (

    <>
      <div className="questions-list">
        <TagFilter tags={allTags} selectedTags={selectedTags} onTagChange={handleTagChange} />

        {currentQuestions.map((question) => (
          <div key={question._id} className="question-item">
            <Link to={`/submissions/${question.titleSlug}`}>
              {question.title}
              <p className='time'>
                Submitted at: {isNaN(new Date(question.createdAt)) ? 'Invalid Date' : new Date(question.createdAt).toLocaleString()}
              </p>
            </Link>
            
            
            <div className="tags">
              
              
              {question.topicTags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">{tag.name}</span>
              ))}
            
              
            </div>
           

          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </>

    // <div className='submissions'>
    //   <h2>Submissions</h2>
    //   <ul>
       
    //     {submissions.map((submission, index) => (
    //       <li key={index}>{submission.title}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Submissions;