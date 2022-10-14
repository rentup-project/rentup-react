import React from 'react';
import HomeCard from '../components/HomeCard/HomeCard';
import cards from '../data/homecards.json'

export default function HomeScreen() {
  return (
    <div className='HomeScreen'>
      <section className='property-search'>
        <form action="">

        </form>
      </section>
      <section className='why-rentup'>
        {
          cards.map((card) => (
            <HomeCard key={card.number}
            color={card.color} 
            img_url={card.img_url}
            number={card.number}
            title={card.title}
            text={card.text} />
          ))
        }
      </section>
    </div>
  )
}
