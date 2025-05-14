import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CarnivalList from '../CarnivalList/CarnivalList';
import './Home.css';
import FavouriteCarnivalList from '../FavouriteCarnivalList/FavouriteCarnivalList';
import { getCarnivals } from '../services/carnivalService';
import { Carnival } from '../Models/Carnival';
import { useSnackbar } from '../context/SnackbarContext';
import { LikedEntityType } from '../types/LikedEntityType';
import { likeEntity, unlikeEntity } from '../services/likeService';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { showSnackbar } = useSnackbar();
    const [tabValue, setTabValue] = React.useState('one');
    const [carnivals, setCarnivals] = React.useState<Carnival[]>([]);
    const entityType = LikedEntityType.Carnival;
    const { currentUser } = useAuth();

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const getTabComponent = () => {
        switch (tabValue) {
            case 'one': {
                return <CarnivalList carnivals={carnivals} handleLikeToggle={handleLikeToggle} />
            }
            case 'two': {
                return <FavouriteCarnivalList carnivals={carnivals} handleLikeToggle={handleLikeToggle} />
            }

            default: {
                return <CarnivalList carnivals={carnivals} handleLikeToggle={handleLikeToggle} />
            }
        }
    }

    useEffect(() => {
        fetchCarnivals();
    }, [currentUser]);
    
    const fetchCarnivals = async () => {
        try {
            var carnivals = await getCarnivals();
            setCarnivals(carnivals);
        }
        catch (error) {
            console.error('Failed to fetch carnivals:', error);
            showSnackbar(error.response.data, 'error');
        }
    }

    const handleLikeToggle = async (carnivalId: string, currentlyLiked: boolean) => {
        try {
            if (currentlyLiked) {
                await unlikeEntity(entityType, carnivalId);
            }
            else {
                await likeEntity(entityType, carnivalId);
            }

            setCarnivals(prev =>
                prev.map(c =>
                    c.id === carnivalId ? { ...c, liked: !currentlyLiked } : c
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);
            showSnackbar(error.response.data || error.response.statusText, 'error');
        }
    }

    return (
        <Layout>
            <div className='home-content-container'>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                >
                    <Tab value="one" label="All Carnivals" />
                    <Tab value="two" label="Saved Carnivals" />
                </Tabs>
                <div>
                    {getTabComponent()}
                </div>
            </div>
        </Layout>
    );
}