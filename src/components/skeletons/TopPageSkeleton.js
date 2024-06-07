import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function SearchResultsSkeleton({ name }) {
  const { height, width } = useWindowDimensions();

  return (
    <Parent>
      <Heading>
        <span>{name === undefined ? "Search" : name}</span> Results
      </Heading>
    <Wrapper>
        {[...Array(20)].map((x, i) => (
        <SkeletonWrapper key={i}>
            <Skeleton
               height={width <= 600 ? "300px" : "250px"}
              borderRadius={width <= 600 ? "0.3rem" : "0.5rem"}
              baseColor={"#262539"}
              highlightColor={"#34324D"}
            />
         
          </SkeletonWrapper>
        ))}
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SkeletonWrapper = styled.div`
  flex-basis: calc(100% - 1rem); /* Adjust the width as needed */
  margin-bottom: 1.5rem; /* Adjust the margin as needed */
`;
export default SearchResultsSkeleton;
