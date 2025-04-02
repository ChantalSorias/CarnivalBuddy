import React from 'react';
import TopBar from '../TopBar/TopBar';
import BottomNav from '../BottomNav/BottomNav';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CarnivalList from '../CarnivalList/CarnivalList';
import './Home.css';
import FavouriteCarnivalList from '../FavouriteCarnivalList/FavouriteCarnivalList';

export default function Home() {
    const [tabValue, setTabValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const getTabComponent = () => {
        switch (tabValue) {
            case 'one': {
                return <CarnivalList likedOnly={false} />
            }
            case 'two': {
                return <FavouriteCarnivalList />
            }

            default: {
                return <CarnivalList likedOnly={false} />
            }
        }
    }

    return (
        <div>
            <TopBar />
            <div className='home-content-container'>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="fullWidth"
                >
                    <Tab value="one" label="All Carnivals" />
                    <Tab value="two" label="Saved Carnivals" />
                </Tabs>
                <div>
                    {getTabComponent()}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}