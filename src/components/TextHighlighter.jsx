import React from "react";
import { useSelector } from "react-redux";
import Styled from "styled-components";

const YellowText = Styled.span`
    background-color: yellow;
`;

export const TextHighlighter = ({ children }) => {
  const search = useSelector((state) => state.filter.value) || "";
  const filterBy = useSelector((state) => state.filter.filterBy);
  if (search.length === 0) {
    return children;
  }
  const regex = toRegex(search);
  const parts = String(children).split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        compareBy(filterBy)(part, search) ? (
          <YellowText key={i}>{part}</YellowText>
        ) : (
          part
        )
      )}
    </span>
  );
};

const compareBy = (filterBy) => {
  switch (filterBy) {
    case "key":
      return (value, search) => value.toLowerCase() === search.toLowerCase();
    case "regex":
      return (value, search) => toRegex(search).test(value);
    default:
      return () => false;
  }
};

const toRegex = (string) => new RegExp(`(${string})`, "gi");
