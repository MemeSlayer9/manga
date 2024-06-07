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
      `https://manga-roan-one.vercel.app/manga/comick/latest?&page=${page}&order=new`
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
      <span><i class="fas fa-book"></i> Latest Update</span>
       <Links to="/new/1">
                    <span>View More<i class="fas fa-angle-double-right"></i></span>
                   </Links>
                   </BoxHeader>
    <New>
        {manga.results && manga.results.map(item =>(
          <div key={item.id}>
    <Link key={item.id} to={`/id/${item.slug}`}>
              <img src={item.thumbnail.url}/>
 
                      </Link>
                          <div className="yawa"> 
                              <Links key={item.id} to={`/id/${item.id}`}>

                                     <p>{item.title}</p>
                                     </Links>
                                        <Links to={`/read/manga/comick/chapter/${item.chapterId}`}
                                                 state={{ slug: `${item.slug}` }}
>
                                                         

                                          <p>Chapter {item.chap}</p>
                                           
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
    background: #2f2f2f;
  border-radius: 0.5rem;


     @media screen and (max-width: 1200px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;
const New = styled.div`
   position: relative;
 
display: flex;
    align-items: center;
  margin-bottom: 16px;  
    flex-wrap: wrap;
      margin-left: 20px;

   div {
      width: 50%;
      margin-top: 5px;
 
   }

  

  img {
    width: 140px;
    height: 200px;
     border-radius: 0.5rem;

  object-fit: cover;
  }
  .yawa{
 width: calc(100% - 148px);
    float: right;
    position: relative;
       
     
  }
     @media screen and (max-width: 768px) {
    div {
      width: 100%;
    }
    
     
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
    background-color: #FFFF66; /* Change the background color on hover */
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
  background:   linear-gradient(0deg, rgba(79, 79, 79, 0) 0, #4f4f4f 100%);

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
   display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #fff;
    text-decoration: none;
      font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    overflow: hidden;
  
    :hover{
    color:#FFFF66;
    font-weight: bold;
  }
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

export default Home