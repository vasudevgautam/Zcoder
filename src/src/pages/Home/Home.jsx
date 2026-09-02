import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [recentlyCompletedContests, setRecentlyCompletedContests] = useState([]);
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedContest, setSelectedContest] = useState(null);
  const [selectedDateContests, setSelectedDateContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const username = 'shraman1507';
      const apiKey = '738ba004d8e3e434774b366ec26692422912b96f';
      const currentDate = new Date().toISOString();
      const pastDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();

      const upcomingUrl = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&start__gt=${currentDate}&resource__id__in=1,2,102,93&limit=10`;
      const completedUrl = `https://clist.by/api/v1/contest/?username=${username}&api_key=${apiKey}&end__lt=${currentDate}&start__gt=${pastDate}&resource__id__in=1,2,102,93&limit=10`;

      try {
        const upcomingResponse = await axios.get(upcomingUrl);
        setUpcomingContests(upcomingResponse.data.objects);

        const completedResponse = await axios.get(completedUrl);
        setRecentlyCompletedContests(completedResponse.data.objects);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const onDateClick = (date) => {
    const contestsOnDate = upcomingContests.filter(
      (contest) => new Date(contest.start).toDateString() === date.toDateString()
    );
    setSelectedDateContests(contestsOnDate);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Contest Dashboard</h1>
        <p className="hero-tagline">Stay updated with the latest and upcoming programming contests</p>
      </header>
      
      <section className="contests-section">
        <div className="recent-contests">
            <h2 className="subheading">Recently Completed Contests</h2>
            <ul className="contests-list">
              {recentlyCompletedContests.map((contest) => (
                <li key={contest.id} className="contest-item">
                  <a href={contest.href} target="_blank" rel="noopener noreferrer">
                    {contest.event} - {new Date(contest.start).toLocaleString()} (Duration: {Math.floor(contest.duration / 3600)} hours)
                  </a>
                </li>
              ))}
            </ul>
          </div>
    
        <div className="calendar-container">
          <h2 className="subheading">Upcoming Contests</h2>
          <Calendar
           className='calender'
            onChange={setValue}
            value={value}
            onClickDay={onDateClick}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const contest = upcomingContests.find(
                  (contest) => new Date(contest.start).toDateString() === date.toDateString()
                );
                return contest ? <div className="contest-dot"></div> : null;
              }
            }}
          />
          <p>Dot represents a contest</p>
          {selectedDateContests.length > 0 && (
            <div className="selected-date-contests">
              <h3>Contests on {value.toDateString()}</h3>
              <ul>
                {selectedDateContests.map((contest) => (
                  <li key={contest.id}>
                    <a href={contest.href} target="_blank" rel="noopener noreferrer" className='details'>
                      {contest.event} - {new Date(contest.start).toLocaleString()} (Duration: {Math.floor(contest.duration / 3600)} hours)
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
