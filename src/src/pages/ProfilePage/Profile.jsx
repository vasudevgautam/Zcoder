import React,{useContext,useState,useEffect} from 'react'
import styles from './Profile.module.css'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'


// import { useAuthContext } from '../../hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'
const Profile = () => {
 
  // const [user, setUser] = useState(null);
  const [techStacks, setTechStacks] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState('');
  const [newTechStack, setNewTechStack] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newFriend, setNewFriend] = useState('');
  const {isAuthenticated,userLogin,isEdit,userr} = useAuthContext()
  const [handle, setHandle] = useState('');
  const [handles, setHandles] = useState([]);
  
  
 

  useEffect(() => {
    if (userLogin) {
      fetchUserData(userLogin.result._id);
    }
  }, [userLogin]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8008/user/${userId}`);
      // setUser(response.data);
      setTechStacks(response.data.techStacks);
      setLanguages(response.data.languages);
      setFriends(response.data.friends);
      setMessage('');
    } catch (error) {
      setMessage('Error fetching user data');
    }
  };

  const handleDeleteTechStack = async ( index) => {
    try {
      const updatedStacks = [...techStacks];
      updatedStacks.splice(index, 1);
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/techstacks`, { techStacks: updatedStacks });
      setTechStacks(updatedStacks);
      setMessage('Tech stack deleted successfully');
    } catch (error) {
      setMessage('Error deleting tech stack');
    }
  };

  const handleEditTechStack = async (index, updatedStack) => {
    try {
      const updatedStacks = [...techStacks];
      updatedStacks[index] = updatedStack;
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/techstacks`, { techStacks: updatedStacks });
      setTechStacks(updatedStacks);
      setMessage('Tech stack updated successfully');
    } catch (error) {
      setMessage('Error updating tech stack');
    }
  };

  const handleAddTechStack = async () => {
    if (newTechStack === '') return;
    try {
      const updatedStacks = [...techStacks, newTechStack];
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/techstacks`, { techStacks: updatedStacks });
      setTechStacks(updatedStacks);
      setNewTechStack('');
      setMessage('Tech stack added successfully');
    } catch (error) {
      setMessage('Error adding tech stack');
    }
  };

  const handleDeleteLanguage = async (index) => {
    try {
      const updatedLanguages = [...languages];
      updatedLanguages.splice(index, 1);
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/languages`, { languages: updatedLanguages });
      setLanguages(updatedLanguages);
      setMessage('Language deleted successfully');
    } catch (error) {
      setMessage('Error deleting language');
    }
  };

  const handleEditLanguage = async ( index, updatedLanguage) => {
    try {
      const updatedLanguages = [...languages];
      updatedLanguages[index] = updatedLanguage;
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/languages`, { languages: updatedLanguages });
      setLanguages(updatedLanguages);
      setMessage('Language updated successfully');
    } catch (error) {
      setMessage('Error updating language');
    }
  };

  const handleAddLanguage = async () => {
    if (newLanguage === '') return;
    try {
      const updatedLanguages = [...languages, newLanguage];
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/languages`, { languages: updatedLanguages });
      setLanguages(updatedLanguages);
      setNewLanguage('');
      setMessage('Language added successfully');
    } catch (error) {
      setMessage('Error adding language');
    }
  };

  const handleDeleteFriend = async ( friendUsername) => {
    try {
      const updatedFriends = friends.filter(friend => friend !== friendUsername);
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/friends`, { friends: updatedFriends });
      setFriends(updatedFriends);
      alert('Friend deleted successfully')
      // setMessage('Friend deleted successfully');
    } catch (error) {
      setMessage('Error deleting friend');
    }
  };

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/search`, { params: { username: searchUsername } });
      setSearchResult(response.data);
      setMessage('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('User not found');
      } else {
        setMessage('Error searching user');
      }
    }
  };

  const handleAddFriend = async () => {
    if (!searchResult) return;
    try {
      const friendUsername = searchResult.username;
      await axios.put(`http://localhost:8008/user/${userLogin.result._id}/add-friend`, { friendUsername });
      setFriends([...friends, friendUsername]);
      // setMessage('Friend added successfully');
      setSearchUsername('');
      setSearchResult(null);
      alert("Friend added successfully")
    } catch (error) {
      alert('Error adding friend');
    }
  };


  useEffect(() => {
    if(userLogin){
      fetchHandles(userLogin.result._id);
    }
    
  }, [userLogin]);

  const fetchHandles = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8008/user/${userId}/handles`);
      const handlesData = await Promise.all(
        response.data.map(async (handle) => {
          const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
          const ratings = ratingResponse.data.result;
          const currentRating = ratings.length > 0 ? ratings[ratings.length - 1].newRating : 'No rating data';
          return { handle, currentRating };
        })
      );
      setHandles(handlesData);
      setMessage('');
    } catch (error) {
      setMessage('Error fetching handles from the database');
    }
  };

  const handleAddHandle = async () => {
    try {
   // Replace with actual user ID
      await axios.post(`http://localhost:8008/user/${userLogin.result._id}/handles`, { handle } );
      fetchHandles();
      setHandle('');
      setMessage('Handle added successfully');
    } catch (error) {
      setMessage('Error adding handle to the database');
    }
  };

  const handleDeleteHandle = async (handleToDelete) => {
    try {
      await axios.delete(`http://localhost:8008/user/${userLogin.result._id}/handles/${handleToDelete}`);
      fetchHandles();
      setMessage('Handle deleted successfully');
    } catch (error) {
      setMessage('Error deleting handle from the database');
    }
  };

  return (
    <>
    <h1 className={styles.title}>User Profile</h1>
    <div className={styles.Appp}>
      
      {userLogin && (
      <>
        <div className={styles.profile}>
          <div className={styles['user-info']}>
            <div className={styles.userInfo} >
              <p>Username:</p>
              <p>{userLogin.result.username}</p>
            </div>
            <div className={styles.userInfo}>
              <p>Email: </p>
              <p>{userLogin.result.email}</p>
            </div>
          </div>

          <div className={styles.techContainer}>
            <h2 className={styles.ph2} >Tech Stacks</h2>
            <ul className={styles.techStacks} >
              {techStacks.map((stack, index) => (
                <li className={styles.techStack} key={index}>
                  {stack}
                  <div>
                    <button className={styles.pbutton} onClick={() => handleDeleteTechStack(index)}>Delete</button>
                    <button className={styles.pbutton} onClick={() => {
                      const updatedStack = prompt('Edit Tech Stack:', stack);
                      if (updatedStack) handleEditTechStack(index, updatedStack);
                    }}>Edit</button>
                  </div>
                </li>
              ))}
            </ul>
            <input className={styles.pinput}  
              type="text"
              value={newTechStack}
              onChange={(e) => setNewTechStack(e.target.value)}
              placeholder="New Tech Stack"
            />
            <button className={styles.pbutton} onClick={handleAddTechStack}>Add Tech Stack</button>
          </div>
          
          <div className={styles.languageContainer}>
            <h2 className={styles.ph2} >Languages</h2>
            <ul className={styles.languages} >
              {languages.map((language, index) => (
                <li className={styles.languageItem} key={index}>
                  {language}
                  <div>
                    <button className={styles.pbutton} onClick={() => handleDeleteLanguage(index)}>Delete</button>
                    <button className={styles.pbutton} onClick={() => {
                      const updatedLanguage = prompt('Edit Language:', language);
                      if (updatedLanguage) handleEditLanguage(index, updatedLanguage);
                    }}>Edit</button>
                  </div>
                </li>
              ))}
            </ul>
            <input className={styles.pinput} 
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="New Language"
            />
            <button className={styles.pbutton} onClick={handleAddLanguage}>Add Language</button>
          </div>  
        </div>
 
        <div className={styles.friends}>

          <div className={styles.searchUser}>
            <p className={styles.p} >Search User</p>
            <input className={styles.pinput}  
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              placeholder="Search Username"
            />
            <button className={styles.searchButton} onClick={handleSearchUser}>Search</button>
          </div>
          

          <div className={styles.userDisplay}>
            {/* {message && <p className={styles.message}>{message}</p>} */}
            {searchResult && (
              <>
                <p className={styles.pp} >User found: {searchResult.username}</p>
                <button className={styles.pbutton} onClick={handleAddFriend}>Add Friend</button>
              </>
            )}
          </div>
          

          <div className={styles.friendsContainer}>
            <h2 className={styles.ph2} >Friends</h2>
            <ul className={styles.friendsList} >
              {friends.map((friend, index) => (
                <li className={styles.friendsItem} key={index}>
                  {friend}
                  <button className={styles.pbutton} onClick={() => handleDeleteFriend(friend)}>Delete</button>
                </li>
              ))}
            </ul>
            <div className={styles.ratings} >
              <h1>Codeforces Handles and Ratings</h1>
              {handles.map(({ handle, currentRating }) => (
                <div key={handle} >
                  <p>{handle}: {currentRating}</p>
                  <button onClick={() => handleDeleteHandle(handle)}>Delete</button>
                </div>
              ))}
              <div className={styles.input}>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Enter Codeforces handle"
                  className={styles.pinput}
                />
                <button className={styles.pbutton}onClick={handleAddHandle} >
                  Add Handle
                </button>
              </div>
              {message && <p>{message}</p>}
            </div> 
          </div>
      
        </div>
          
      </>
      )}
    </div>
    </>
  );
}

export default Profile