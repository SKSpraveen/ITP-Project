import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import CompAdminTable from './CompAdminTable';
import { Box, TextField } from '@mui/material';
import Axios from "axios";

function ComplaintAdmin() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        getComplaints();
    }, []);

    const getComplaints = () => {
        Axios.get('http://localhost:8070/api/complaints')
            .then(response => {
                const feedData = response.data?.response || [];
                setComplaints(feedData);
                setFilteredComplaints(feedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
                setLoading(false);
            });
    }

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        const filtered = keyword.trim() !== '' ? complaints.filter(compItem =>
            compItem.id && compItem.id.toString().toLowerCase().includes(keyword.toLowerCase())
        ) : complaints;
        setFilteredComplaints(filtered);
    }
    

    return (
        <Box style={{ textAlign: 'center' }}>
           <br></br>
            <TextField
    label={<span style={{ fontWeight: 'bold' }}>Search by ID</span>}
    variant="outlined"
    value={searchKeyword}
    onChange={(e) => handleSearch(e.target.value)}
    InputProps={{
        style: { textAlign: 'center' } 
    }}
    style={{ margin: '0 auto', marginBottom: '20px', display: 'block', maxWidth: '200px' }}
/>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <CompAdminTable
                rows={filteredComplaints}
                searchKeyword={searchKeyword} // Pass the searchKeyword state
              />
              
            )}
        </Box>
    );
}

export default ComplaintAdmin;
