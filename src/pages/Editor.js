import React, { useEffect, useState,useRef } from 'react'
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editorcom from '../components/Editorcom';
import { initSocket } from '../socket';
import { useLocation,useParams, useNavigate, Navigate } from 'react-router-dom';
import ACTIONS from '../Actions'



const Editor = () => {
  const socketRef = useRef(null) ;
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  

  useEffect(() => {
    const init = async () => {
      
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));
      

      function handleErrors(e){
        console.log('socket error',e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }


      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      // listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED, 
        ({clients, userName, socketId }) => {
        if(userName !== location.state?.userName){
          toast.success(`${userName} joined the room.`);
          console.log(`${userName} joined`);
        }
        setClients(clients);
        

      });
      //Listening for a disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId,userName}) => {
        toast.success(`${userName} left the room.`);
        setClients((prev) => {
          return prev.filter((client ) => client.socketId !==socketId
        )
        });
        


      });


    };
    init();
    return () =>{
      if (socketRef.current) {
        socketRef.current.disconnect(); 
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    }
  },[]);
  
  
  if(!location.state){
    return <Navigate to="/" />
  }

  
  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
            <div className='logo'>
                <img className='logoImg' src="/code-sync.png" alt='logo'/>

            </div>
            <h3>Connected</h3>
            <div className='clientList'>
                {
                    clients.map((client) => (
                        <Client key={client.socketId} userName={client.userName}/>

                    
                ))}
            </div>

        </div>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editorcom />
      </div>
    </div>
  )
}

export default Editor
