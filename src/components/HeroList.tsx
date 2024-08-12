import React from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import {useNavigate} from "react-router-dom";

const HeroList: React.FC<{ heroes: any[], loading: boolean }> = ({ heroes, loading }) => {

    const navigate = useNavigate()

    return (
        <div>
            <List>
                {heroes.map(hero => (
                    <ListItem button key={hero.id} onClick={() => navigate(`/details/${hero.id}`)}>
                        <ListItemText primary={hero.name} />
                    </ListItem>
                ))}
            </List>
            {loading && <CircularProgress />}
        </div>
    );
};

export default HeroList;
