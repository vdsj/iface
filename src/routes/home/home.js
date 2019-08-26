import React from 'react';
import './home.css';
function Home() {
  return (
      <div className='card app-main'>
        <div className="images">
          <img src="https://cdnb.artstation.com/p/assets/images/images/016/459/323/large/sparth-sparth-river-red-small.jpg" alt="Exemplo"/>
        </div>
        <div className="product">
          <p className="date-post">SAPATO DE CORRIDA FEMININO</p>
          <h1>Adidas Epic React Flyknit</h1>
          <h2>$150</h2>
          <p className="desc">O amortecimento de espuma Adidas Epic React Flyknit é ágil mas leve, durável e macio. Isso cria uma sensação que não apenas aumenta a sensação de avançar, mas também faz com que a corrida seja divertida.</p>
          <div className="buttons">
            <button className="add">Compartilhar</button>
            <button className="like"><span>♥</span></button>
          </div>
        </div>
      </div>
    );
}

export default Home;
