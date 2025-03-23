"use client"
import { useState, useEffect } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
    // State to store current time and date
    const [now, setNow] = useState(new Date());
  
    // useEffect to update time every second
    useEffect(() => {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000); // Update every second
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    // Formatting time and date
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);
  
  return (
    <section className="h-[300px] w-full rounded-[20px] bg-dark-5 bg-cover" 
    style={{ backgroundImage: 'url(bg-image/goku2.png)' }}>
      <div className="h-[315px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 ">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal bg-dark-2 text-white-1">
            Upcoming Meeting 
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-100 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;

