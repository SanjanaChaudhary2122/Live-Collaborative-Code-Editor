import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [roomId,setRoomId] = useState('')
  const [userName,setUserName] = useState('')
  const createNewRoom = (e) => {
     e.preventDefault();
     
     const id = uuidV4();
     setRoomId(id);
     toast.success('Created a new room ');
     
  }
  const joinRoom = () =>{
    if(!roomId || !userName){
        toast.error('ROOM ID & username is required');
        return;
    }
    // redirect
    navigate(`/editor/${roomId}`,{
        state: {
            userName,
        },
    });
  };
  const handleInputEnter =(e)=>{
    console.log('event',e.code);
    if(e.code === 'Enter'){
        joinRoom();
    }
  }
  return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
            <img className='homePageLogo' src="/code-sync.png" alt="code-synk-logo"></img>
            <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
            <div className='inputGroup'>
                <input
                type = "text"
                className='inputBox'
                placeholder='ROOM ID'
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}
                />
                <input
                type = "text"
                className='inputBox'
                placeholder='USER NAME'
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                onKeyUp={handleInputEnter}
                />
                <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                <span className='createInfo'>
                    If you don't have any invite then create &nbsp;
                    <a onClick={createNewRoom} href='' className='createNewBtn'>
                        new room
                    </a>
                </span>
            </div>
        </div>
        
    </div>
  )
}

export default Home
