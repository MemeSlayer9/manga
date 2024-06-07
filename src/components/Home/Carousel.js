 import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Carousel({ images, props }) {
  const { height, width } = useWindowDimensions();
const handleWatchNowClick = (itemId) => {
  // Your custom logic for handling the navigation
  console.log(`Navigating to /xd/${itemId}`);
};

  return (
    <Kill>
      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

         spaceBetween={50}
        slidesPerView={3}
        navigation={width <= 600 ? false : true}
         loop={true}
        autoplay={{
          delay: 40000000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 1,
              spaceBetween: 35,
            },
            "@1.30": {
              slidesPerView: 1,
              spaceBetween: 35,
            },
             "@1.48": {
              slidesPerView: 1,
              spaceBetween: 40,
            },
             
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
      >
{images.results && images.results.length > 0 && images.results.map((item) => (

            item.bannerImage !== null && (
              <SwiperSlide key={item.id}>
               <Container> 
                   {width <= 1200 && (
                    <img
                      src={item.thumbnail.url}
                      alt=""
                      style={bannerImageStyleMobile}
                      
                    />
                  )}
                   {width > 600 && (
                                <Wrapper>
                                                                                 <p>{item.title}</p>

                                  <Img>
                                                               <img src={item.thumbnail.url}/>
                </Img>
                  </Wrapper>
                                    )}

                  </Container>
               </SwiperSlide>
            )
))}


      </Swiper>
    </Kill>
  );
}
 
const Kill = styled.div`
 `;

const Hello = styled.div`
  

   
  
`;
const Shit = styled.p`
  font-size: 1rem;
  line-height: 1.3em;
   font-weight: 700;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  WebkitLineClamp: 2;
  WebkitBoxOrient: vertical;
  overflow: hidden;
  @media screen and (max-width: 600px) {
       font-size: 1.2rem;

  }
`;

 const Yawa = styled.p`
  font-size: 0.96em;
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: 2rem;
  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const bannerImgStyle = {
  width: "100%",
  height: "600px",
  objectFit: "cover",
   
   
  
};
const Status = styled.div`{
  display: flex;
 font-size: .8em;
 font-weight: 900;
    @media screen and (max-width: 600px) {
   margin-bottom: 20px;
  }
}`

const bannerImageStyleMobile = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
 };

const Container = styled.div`
  position: relative;
    height: 200px;

 @media screen and (max-width: 600px) {
   margin-bottom: 20px;
       height: auto;

  } 
  
  `;

const Wrapper = styled.div`
 display: flex;
  height: 300px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  align-items: center;
  background: #2f2f2f;
 
  @media screen and (max-width: 992px) {
    
  }
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
 margin-top: 100px;
  
  }
   
`;

const Img = styled.div`
     display: inline-block;
    transform: rotate(15deg);
    border: 5px solid #fff;
    box-shadow: 0 30px 30px rgba(0,0,0,.2);
 height: 300px;
  width: 150px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 2px 3px 15px rgba(252, 56, 56, .1);
  margin-bottom:  100px;
         margin-left:  220px;

    
    
  
  img {
    height: 500px;
  width: 150px;
    object-fit: cover;
    cursor: pointer;
    transition: .6s;
  
    }
    
  @media screen and (max-width: 768px) {
 

  }
`;


const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 6rem 2.3rem 0 2.3rem;

  p {
    font-weight: 600;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    align-items: flex-start;
    margin: 3rem 1.3rem 0 1.3rem;
    p {
      margin-top: 0.5rem;
      font-size: 1.4rem;
    }
  }
`;

const Button = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
  background-color: #DB202C;
  outline: none;
  border: none;
  padding: 0.75rem 1.3rem 0.75rem 1.3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;

  @media screen and (max-width: 600px) {
     margin-top: 2.8rem;
  }
`;

export default Carousel;
