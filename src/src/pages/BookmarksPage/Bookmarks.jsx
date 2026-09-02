import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import TagFilter from '../../components/TagFilter/TagFilter';
import Pagination from '../../components/Pagination/Pagination';
import './Bookmarks.css';

const Bookmarks = () => {
  const navigate = useNavigate()
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  // const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const questionsPerPage = 40;
  const { userLogin,isAuthenticated } = useAuthContext();
  const [alertShown, setAlertShown] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  console.log(userLogin);

  useEffect(() => {
    if(!isAuthenticated){
      if (!alertShown) {
        alert('You need to be logged in to view this page.');
        setAlertShown(true);
        navigate('/login'); // Redirect to login page or another appropriate page
      }
      return;
    }
    if (userLogin) {
      fetchBookmarkedQuestions(userLogin.result._id);
    }
  }, [userLogin,alertShown,isAuthenticated]); // Run the effect when the user object changes

  const fetchBookmarkedQuestions = async (userId) => {
    try {
      const response = await fetch(`/user/bookmarks/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setBookmarkedQuestions(data);
        
      } else {
        console.error('Failed to fetch bookmarked questions');
      }
    } catch (error) {
      console.error('Error fetching bookmarked questions', error);
    } finally{
      setLoading(false);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const filteredQuestions = bookmarkedQuestions.filter(question =>
    selectedTags.length === 0 ||
    question.topicTags.some(tag => selectedTags.includes(tag.name))
  );

  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const allTags = [...new Set(bookmarkedQuestions.flatMap(question => question.topicTags.map(tag => tag.name)))];

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
    <div className='questions-list'>
      
      <TagFilter tags={allTags} selectedTags={selectedTags} onTagChange={handleTagChange} />


      {currentQuestions.map((question) => (
        <div key={question._id} className="question-item">
          <Link to={`/bookmarks/${question.titleSlug}`}>
            {question.title}
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
  );
};

export default Bookmarks;