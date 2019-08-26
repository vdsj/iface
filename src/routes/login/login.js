import React from 'react';

function Login(){
  return (
    <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
      <form onSubmit={event => handleSubmit(event)}>
        {this.props.children}
      </form>
    </div>
  )
}
