// import React, { useEffect, useState } from 'react';
// import './Contests.css'
// const Contests = () => {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContests = async () => {
//       const username = 'shraman1507';
//       const apiKey = '738ba004d8e3e434774b366ec26692422912b96f';
//       const currentDate = new Date().toISOString();
//       const url = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&start__gt=${currentDate}&resource__id__in=1,2,102,93&limit=10`;

//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setContests(data.objects);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContests();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Upcoming Contests</h1>
//       <ul>
//         {contests.map((contest) => (
//           <li key={contest.id}>
//             <a href={contest.href} target="_blank" rel="noopener noreferrer">
//               {contest.event} - {new Date(contest.start).toLocaleString()} (Duration: {Math.floor(contest.duration / 3600)} hours)
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Contests;


import React, { useEffect, useState } from 'react';
import './Contests.css'; // Ensure this import statement is present

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      const username = 'shraman1507';
      const apiKey = '738ba004d8e3e434774b366ec26692422912b96f';
      const currentDate = new Date().toISOString();
      const url = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&start__gt=${currentDate}&resource__id__in=1,2,102,93&limit=10`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContests(data.objects);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="contests-container">
      <h1 className="heading">Upcoming Contests</h1>
      <div className="container-box">
        <div className="list-container">
          {/* <ul> */}
            {contests.map((contest) => (
              <li key={contest.id} className="list">
                <a href={contest.href} target="_blank" rel="noopener noreferrer" className="contest-link">
                  <h2>{contest.event}</h2>
                  <div className="contestInfo">
                    <div className="time">
                      <p>Start Time: {new Date(contest.start).toLocaleString()}</p>
                    </div>
                    <div className="duration">
                      <p>Duration: {Math.floor(contest.duration / 3600)} hours</p>
                    </div>
                  </div>   
                </a>
              </li>
            ))}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Contests;