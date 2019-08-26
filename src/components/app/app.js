import React, { useState, useEffect } from 'react';
import { Link, Route, Switch} from 'react-router-dom'
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import './app.css';
import Home from '../../routes/./home';
import Chat from '../../routes/./chat';

let name='';
const Online = props => props.data.map(m =>{
  if (m[1] !== name) {
    return (<li id={m[0]}>
              <Link to={{pathname:'/chat'}} className='text-link'>{m[1]}</Link>
           </li>)
  } return ''
});

export default () => {

    const [id, setId] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [room, setRoom] = useState('');
    const [input, setInput] = useState('');

    const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
    socket.connect();

    const [messages, setMessages] = useImmer([]);
    const [online, setOnline] = useImmer([]);

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");


    useEffect(()=>{
      socket.on('message que',(nick,message) => {
        setMessages(draft => {
          draft.push([nick,message])
        })
      });

      socket.on('update',message => setMessages(draft => {
        draft.push(['',message]);
      }))

      socket.on('people-list',people => {
        let newState = [];
        for(let person in people){
          newState.push([people[person].id,people[person].nick]);
        }
        setOnline(draft=>{draft.push(...newState)});
      });

      socket.on('add-person',(nick,id)=>{
        setOnline(draft => {
          draft.push([id,nick])
        })
      })

      socket.on('remove-person',id=>{
        setOnline(draft => draft.filter(m => m[0] !== id))
      })

      socket.on('chat message',(nick,message)=>{
        setMessages(draft => {draft.push([nick,message])})
      })
    },0);

    const handleSubmit = e => {
      e.preventDefault();
      if (!nameInput) {
        return alert("Name can't be empty");
      }
      name = nameInput
      setId(nameInput);
      socket.emit("join", nameInput,room);
    };

    var handleSend = e => {
      e.preventDefault();
      if(input !== ''){
        socket.emit('chat message',input,room);
        setInput('');
      }
    }

    return id ? (
      <div className="app-a">
        <div className="logo"><Link to='/' className='text-link'><font><span className="night">iFace</span></font></Link></div>
        <div className="app-c">
          <div className="p-card">
            <div className="card">
              <div className="card-title">
                <h1><font>Perfil</font></h1>
                <h1><font>{name}</font></h1>
              </div>
            </div>
          </div>
          <div className="p-card">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/chat' component={Chat} />
            </Switch>
            <div className="posts">
              <div className="post">1</div>
              <div className="post">2</div>
              <div className="post">3</div>
              <div className="post">4</div>
              <div className="post">5</div>
              <div className="post">6</div>
              <div className="post">7</div>
              <div className="post">8</div>
            </div>
          </div>
          <div className="p-card">
            <div className="card">
              <div className="card-title">
                <h1><font>People Online</font></h1>
              </div>
              <ul id="online"><Online data={online}/></ul>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className ="login-root"><div className="logo1"><font>iFace</font></div>
      <div className="login">
        <div className="card-title">
          <h1><font>Login</font></h1>
        </div>
        <div style={{ textAlign: 'center', margin: "auto 3px" }}>
            <form onSubmit={event => handleSubmit(event)}>
              <input id="name" onChange={e => setNameInput(e.target.value.trim())} required placeholder="What is your name .." /><br />
              <input id="room" onChange={e => setRoom(e.target.value.trim())} placeholder="What is your room .." /><br />
              <button className="submit" type="submit">Sign in</button>
            </form>
        </div>
      </div>

      <script src="/__/firebase/6.4.2/firebase-app.js"></script>
      <script src="/__/firebase/init.js"></script>

      </div>
    )
};
