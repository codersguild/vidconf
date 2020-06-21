import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useWindowDimensions from './useWindowDimensions'
import './App.css';

const handleAPI = (JitsiMeetAPI) => {
  JitsiMeetAPI.executeCommand('toggleVideo')
}

const Emoji = props => (
  <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
  >
      {props.symbol}
  </span>
);

function App() {

  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [roomName, setRoomName] = useState('')
  const [onCall, setOnCall] = useState(false)
  const { height, width } = useWindowDimensions();

  return (
    <div className="App">
      <header className="App-header">
        <>
          <h2>VidConf <Emoji symbol="🚀"/></h2>
          {
            onCall ? 
            <>
            <Jitsi 
              roomName={roomName} 
              displayName={displayName} 
              password={password}
              onAPILoad={handleAPI}
              domain="jitsi.nerdonthestreet.com"
              containerStyle={{ 
                width: width / 1.5, 
                height: height / 1.5
              }}
            />
              <h6>Refershing the page <Emoji symbol="🔄"/> will terminate meeting. <Emoji symbol="🥺"/></h6>
            </>
            : 
            <>
              <h5>Your quest to finding a meeting solution end here <Emoji symbol="😃"/></h5>
              <TextField 
                type='text' 
                value={roomName} 
                onChange={e => setRoomName(e.target.value)} 
                required
                id="outlined-required-roomname"
                label="Room Name"
                placeholder="Room Name"
                variant="outlined"
              />
              <hr></hr>
              <TextField 
                type='text' 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)}
                required
                id="outlined-required-displayname"
                label="Your Name"
                placeholder="Participant Name"
                variant="outlined"
              />
              <hr></hr>
              <TextField 
                type='text' 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                id="outlined-password-input"
                label="Password"
                placeholder="You need to share it"
                variant="outlined"
              />
              <hr></hr>
              <Button 
                variant="outlined" 
                color="secondary" 
                size="large"
                onClick={() => {
                  if(roomName === "") alert("Give your Room a hip-hop name");
                  else if(displayName === "") alert("Enter your name");
                  else if(password === "") alert("Secure your meeting by adding a password.");
                  else setOnCall(true)
                }}
              > Start<Emoji symbol="👍"/> 
              </Button>
              <hr></hr>
              <h6 style={{color : "grey"}}><Emoji symbol="📹"/>  Meetings Done Right  <Emoji symbol="✔️"/></h6>
            </>
          }
        </>
      </header>
    </div>
  );
}

export default App;