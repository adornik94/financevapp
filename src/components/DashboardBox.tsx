import {Box} from "@mui/material";

import {styled} from "@mui/system";
import React from 'react';

/* background "linear-gradient(#42275a, #734b6d)",*/


export const DashboardBox = styled(Box)(({ theme }) => ({
    background: "linear-gradient(#42275a,#734b6d)",
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  }));

