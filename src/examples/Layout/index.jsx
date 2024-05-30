import React from "react";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Layout = () => {
 return(
    <Box w="100%" mb="30px" display="flex" flexDir="row" justifyContent="center" alignItems="center" bgColor="#5B67A2">
        <Box m="20px" color="#fff" fontWeight="500" fontSize="25px"><NavLink to="/Tinder">TinderCard</NavLink></Box>
        <Box m="20px" color="#fff" fontWeight="500" fontSize="25px"><NavLink to="/AudioABC">AudioABC</NavLink></Box>
        <Box m="20px" color="#fff" fontWeight="500" fontSize="25px"><NavLink to="/DragDrop">SpellWord</NavLink></Box>
        <Box m="20px" color="#fff" fontWeight="500" fontSize="25px"><NavLink to="/Record">Record</NavLink></Box>
    </Box>
 )
}

export default Layout