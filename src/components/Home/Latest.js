import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,  } from "react-router-dom";
import styled from "styled-components";

function Home() {

    const [loading, setLoading] = useState(true);
    const [manga, setManga] = useState([]);
const [page, setPage] = useState(1);

     const countryLabelMap = {
    kr: "Manwha",
    jp: "Manga",
    cn: "Manhua"
    
  };
const getManga = async (page = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://manga-api-bice.vercel.app/manga/comick/latest?&page=${page}&order=new`
    );
    setManga(data);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching manga:', err);
    setLoading(false);
   }
};
 
const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const difference = now - date;

    const minutes = Math.floor(difference / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
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
      <span><i class="fas fa-book"></i> Latest Update</span>
       <Links to="/new/1">
                    <span>View More<i class="fas fa-angle-double-right"></i></span>
                   </Links>
                   </BoxHeader>
    <New>
        {manga.results && manga.results.map(item =>(
          <div key={item.id} className="gago">
    <Link key={item.id} to={`/id/${item.slug}`}>
              <img src={item.thumbnail.url}/>
 
                      </Link>
                          <div className="yawa"> 
                                           <p className="country"> {countryLabelMap[item.country] || item.country}
                                   </p>

                              <Links key={item.id} to={`/id/${item.id}`}>

                                     <p className="title">{item.title}</p>
                                     </Links>
                                        <Links to={`/read/manga/comick/chapter/${item.chapterId}`}
                                                 state={{ slug: `${item.slug}` }}
> 
                                                    <div className="content">       
                                           <p className="chap">Chapter {item.chap}</p>
                                                                     <p className="time">{timeAgo(item.created_at)}</p> {/* Displaying time only */}
                                                                     </div>

          </Links>
                          </div>
                     </div>

          ))}
          </New>
         
          </HomeDiv>
              </div>
  )
}

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
   border-radius: 0.5rem;
 
     @media screen and (max-width: 1200px) {
    margin: 0;
  }
`;
const New = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    grid-row-gap: 1.5rem;
    justify-content: space-between;
    margin-top: 20px;

  
  
  

 
     @media (max-width: 850px) {
    grid-template-columns: repeat(1, 1fr); 
      
   }
    
   .gago{
    display: flex;
    border: 1px solid #1e2c43;
    border-radius: .5rem;
    transition: background .3s, border .3s;
    flex-grow: 1;
background: #182335;
    }
   
    
  
    
   .yawa{
    margin-left: 20px;
   }
   .content{
    margin: 1rem 0 0 0;
    padding: 0;
    
    
   }
   .country{
    color: #3c8bc6;
    margin-top: 20px;
   }
   .title{
 margin-top: 2px;
   }
    
    img {
      width: 180px;
      height: 100%;
      border-radius: 0.5rem;
      margin-bottom: 0.3rem;
      object-fit: cover;
      @media screen and (max-width: 600px) {
        width: 130px;
       }
      @media screen and (max-width: 400px) {
        width: 160px;
       }
    }

    p {
      font-size: 1rem;
      font-weight: 400;
      
    }
`;

const ItemHead = styled.div`
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

   &:hover {
    background-color: #3c8bc6; /* Change the background color on hover */
    color: black;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
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
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
 
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

const Links = styled(Link)`
    
    -webkit-box-orient: vertical;
    color: #fff;
    text-decoration: none;
      font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
   
    :hover{
    color:#3c8bc6;
    font-weight: bold;
  }
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

export default Home