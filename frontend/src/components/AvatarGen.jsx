import React from 'react';
import './AvatarGen.css'; // Import your CSS file for avatar styling (create one if needed)

export const AvatarGen = ({ username, className }) => {
  const getInitial = (username) => {
    console.log(username);
    try{
       return username.charAt(0).toUpperCase();
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className={"avatar " + className}>
      {getInitial(username)}
    </div>
  );
};

