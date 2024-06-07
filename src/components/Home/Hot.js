import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,  } from "react-router-dom";
import styled from "styled-components";

function Home() {

    const [loading, setLoading] = useState(true);
    const [manga, setManga] = useState([]);
const [page, setPage] = useState(1);

 
const getManga = async (page = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://manga-roan-one.vercel.app/manga/comick/latest?&page=${page}`
    );
    setManga(data);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching manga:', err);
    setLoading(false);
   }
};
 

     
const handlePrevPage = () => {
  if (page > 1) {
    setPage(page - 1);
    getManga(page - 1);
  }
};

const handleNextPage = () => {
  setPage(page + 1);
};

useEffect(() => {
  getManga(page);
}, [page]);
  return (
    <div>
          <HomeDiv>
<BoxHeader> 
      <span><i class="fas fa-fire-alt"/> Hot Update </span>
       <Links to="/hot/1">
                    <span>View More<i class="fas fa-angle-double-right"></i></span>
                   </Links>
                   </BoxHeader>
    <HotChapter>
        {manga.results && manga.results.slice(0, 12).map(item =>(
          <div key={item.id}>
                                       <Links  to={`/read/manga/comick/chapter/${item.chapterId}`}
                                                 state={{ slug: `${item.slug}` }}>
                                                               <img src={item.thumbnail.url} className="card-img"/>
 
                   
                               <ItemHead> 
 
 
                                                 <p>{item.title}</p>
                                         <p>Chapter {item.chap}</p>
             </ItemHead>  
             </Links>               
                     </div>

          ))}
          </HotChapter>
            </HomeDiv>
              </div>
  )
}

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  background: #2f2f2f;
   border-radius: 0.5rem;

      @media screen and (max-width: 1200px) {
    margin: 1rem 1rem 0rem 1rem;
  }
    @media screen and (max-width: 600px) {
    margin: 0rem 0rem 1rem 0rem;
  }
`;
const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background:   linear-gradient(0deg, rgba(79, 79, 79, 0) 0, #4f4f4f 100%);
 border-radius: 0.5rem;

     padding: 10px 15px;
    color: #fff;
    font-size: 18px;
 span{
        color: #fff;
    text-decoration: none;
      font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    overflow: hidden;
    font-size: 12px;
  
    }
    
`;
const HotChapter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px; /* Adjust the gap as needed */
  margin-left: 20px;
  
  
  @media (max-width: 600px) {
      margin-left: 20px;

   }
     @media (max-width: 500px) {
      margin-left: 32px;

   }
    @media (max-width: 400px) {
      margin-left: 5px;

   }
  div {
    width: 15%; /* Adjust the width as needed */
  }

 img {
     width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
 
    }
      @media (max-width: 1300px) {
    div {
      width: 20%; /* Adjust the width for smaller screens */
    }
  }

  @media (max-width: 1200px) {
    div {
      width: 30%; /* Adjust the width for smaller screens */
    }
  }

  @media (max-width: 768px) {
    div {
      width: 46%; /* Adjust the width for even smaller screens */
       

     }
  }
`;
const ItemHead = styled.p`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  transition: 0.5s ease;
  color: #fff;
  width: 10.8%!important;
  font-size: 14px;
  text-align: center;
      border-radius: 0.5rem;
    margin-bottom: 0.3rem;
   margin-top: -80px; 
 
   :hover {
    background-color: #FFFF66; /* Change the background color on hover */
    color: black;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    margin-top: 7px;
        margin-bottom: 20px;

  }

  
  @media (max-width: 1200px) {
    width: 16% !important; /* Adjust the width for smaller screens */
  }
    @media (max-width: 1000px) {
    width: 17% !important; /* Adjust the width for smaller screens */
  }


  @media (max-width: 768px) {
    width: 34% !important; /* Adjust the width for even smaller screens */
  }
   @media (max-width: 400px) {
    width: 41% !important; /* Adjust the width for even smaller screens */
  }
     
     
`;

const Links = styled(Link)`
   font-size: 1.1rem;
  font-family: "Gilroy-Medium", sans-serif;
  text-decoration: none;
  color: #fff;
     
 
  
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;
export default Home