

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagFilter from '../../components/TagFilter/TagFilter';
import Pagination from '../../components/Pagination/Pagination';
import './Questions.css';

const Questions = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const questionsPerPage = 40; // Number of questions to display per page

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/problems?limit=${20}`);
        const data = await response.json();
        setProblems(data.problemsetQuestionList);
      } catch (error) {
        setError('Failed to fetch problems');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  // Calculate index of the last question to display on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  // Calculate index of the first question to display on the current page
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  
  // Filter questions based on selected tags
  const filteredProblems = problems.filter(problem =>
    selectedTags.length === 0 ||
    problem.topicTags.some(tag => selectedTags.includes(tag.name))
  );

  // Slice the filtered problems array to get the questions for the current page
  const currentQuestions = filteredProblems.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const allTags = [...new Set(problems.flatMap(problem => problem.topicTags.map(tag => tag.name)))];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  const totalPages = Math.ceil(filteredProblems.length / questionsPerPage);
  // // Calculate the total number of pages
  // const totalPages = Math.ceil(filteredProblems.length / questionsPerPage);

  // // Determine the range of pagination buttons to display
  // let startPage = 1;
  // let endPage = totalPages;
  // if (totalPages > 4) {
  //   if (currentPage <= 2) {
  //     endPage = 4;
  //   } else if (currentPage >= totalPages - 1) {
  //     startPage = totalPages - 3;
  //   } else {
  //     startPage = currentPage - 1;
  //     endPage = currentPage + 1;
  //   }
  // }

  // // Get unique tags
  // const allTags = [...new Set(problems.flatMap(problem => problem.topicTags.map(tag => tag.name)))];

  // const handleTagChange = (tag) => {
  //   setSelectedTags(prevSelectedTags =>
  //     prevSelectedTags.includes(tag)
  //       ? prevSelectedTags.filter(t => t !== tag)
  //       : [...prevSelectedTags, tag]
  //   );
  //   setCurrentPage(1); // Reset to the first page when the filter changes
  // };

  return (
    <>
    <div className="questions-list">
      {/* Tag Filter Checkboxes */}
      <TagFilter tags={allTags} selectedTags={selectedTags} onTagChange={handleTagChange} />
      {/* <div className="tag-filters">
        {allTags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            <span>{tag}</span>
          </label>
        ))}
      </div> */}


      {currentQuestions.map((problem, index) => (
        <div key={index} className="question-item">
          <Link to={`/practice/${problem.titleSlug}`} >
            {problem.title}
          </Link>
          
            <div className="tags">
              
                {problem.topicTags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag.name}</span>
                ))}
              
              
           </div>
          
          
        </div>
      ))}

      {/* Pagination Controls */}
      
      {/* <div className="pagination">
        <button onClick={() => paginate(1)}>First</button>
        {startPage > 1 && <span>...</span>}
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <button 
            key={startPage + index} 
            onClick={() => paginate(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPages && <span>...</span>}
        <button onClick={() => paginate(totalPages)}>Last</button>
      </div> */}
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
  </>
  );
};

export default Questions;
