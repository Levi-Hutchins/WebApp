import React from "react";
import { Box, IconButton } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { styled, keyframes } from "@mui/system";

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const IconBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px", 
  padding: "40px", 
  marginTop: "50px", 
});

const AnimatedIcon = styled(IconButton)({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  fontSize: "10rem", 
  "& svg": {
    fontSize: "10rem", 
  }
});

const IconWithLabel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#333", 
});

const icons = [
  { id: 1, component: <SportsEsportsIcon sx={{color:"white" }}/>, label: "Games" },
  { id: 2, component: <MovieIcon  sx={{color:"white" }}/>, label: "Movies" },
  { id: 3, component: <MenuBookIcon  sx={{color:"white" }} />, label: "Books" }
];

const FloatingIconsComponent = () => {
  return (
    <IconBox>
      {icons.map((icon) => (
        <IconWithLabel key={icon.id}>
          <AnimatedIcon size="large">
            {icon.component}
          </AnimatedIcon>
        </IconWithLabel>
      ))}
    </IconBox>
  );
};

export default FloatingIconsComponent;
