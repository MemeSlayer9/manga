import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function SearchResultsSkeleton({ name }) {
  const { height, width } = useWindowDimensions();

  return (
    <Parent>
      <Heading>
        <span>{name === undefined ? "Search" : name}</span>
      </Heading>
      <CardWrapper>
           <div>
            <Skeleton
              width={width <= 600 ? "400px" : "1450px"}
              height={width <= 600 ? "1000px" : "2062px"}
              borderRadius={width <= 600 ? "0.3rem" : "0.5rem"}
              baseColor={"#262539"}
              highlightColor={"#34324D"}
            />
          
          </div>
       </CardWrapper>
    </Parent>
  );
}

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CardWrapper = styled.div`
  
`;

export default SearchResultsSkeleton;
