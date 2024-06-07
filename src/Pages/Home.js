import React, { useEffect, useState, useRef } from "react";
 
import styled from "styled-components";
 
import axios from "axios";
 import Top from "../components/Home/Top";
import Carousel from "../components/Home/Carousel";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";

import Hot from "../components/Home/Hot";
 import Latest from "../components/Home/Latest";
 
function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);
 
   
  return (
    <div> 
    
    
        <HomeDiv>
        <Top/> 

             <Hot/>
         <Latest/>

        </HomeDiv>
    </div>
  )
}


const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

 export default Home;

 