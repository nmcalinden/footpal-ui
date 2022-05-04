import { Box, Tabs, Tab, Grid } from "@mui/material";
import * as React from "react";
import Profile from "../profile/Profile";
import { TabContent } from "./styled";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabContent
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 1}}>
          {children}
        </Box>
      )}
    </TabContent>
  );
}

function tabProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={10} md={12} >
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
      <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Home" {...tabProps(0)} />
          <Tab label="My Profile" {...tabProps(1)} />
          <Tab label="Book" {...tabProps(2)} />
          <Tab label="Matches" {...tabProps(3)} />
          <Tab label="Squads" {...tabProps(4)} />
        </Tabs>
    
        <TabPanel value={value} index={0}>
          
        </TabPanel>
      
        <TabPanel value={value} index={1}>
          <Profile />
        </TabPanel>
      
        <TabPanel value={value} index={2}>
          
        </TabPanel>
        
        <TabPanel value={value} index={3}>
            
        </TabPanel>
        
        <TabPanel value={value} index={4}>
            
        </TabPanel>
        </Box>
      </Grid>
  )
}

export default Navigation;