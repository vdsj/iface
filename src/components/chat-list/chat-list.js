import React from 'react';
import './chat-list.css';

function ChatList(props) {
  return(props.data.map(
         m => {
           if (m[1] != props.data.name) {
             return <li id={m[0]}>
                      {props.data.name}
                    </li>
          }}
        )
      );
}

export default ChatList;
