import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Usertableuser from './Usertableuser';
import RatingCal from './RatingCal'; 
import './userTable.css';
import { Box, Button } from '@mui/material'; 
import Axios from "axios";
import { jsPDF } from 'jspdf';


function Nonregfeedback() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [totalCardContainers, setTotalCardContainers] = useState(0);
    const [ratingsCount, setRatingsCount] = useState({}); 
   
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:8070/api/users')
             .then(response => {
                const feedData = response.data?.response || [];
                setUsers(feedData);
                setTotalCardContainers(feedData.length);
                calculateRatingsCount(feedData); // Calculate ratings count
                setLoading(false); 
             })
             .catch(error => {
                console.error("Axios Error : ", error);
                setLoading(false); 
             });
    }

    const calculateRatingsCount = (data) => {
        // Initialize counts
        let count5Star = 0;
        let count4Star = 0;
        let count3Star = 0;
        let count2Star = 0;

        // Loop through the data to count ratings
        data.forEach(row => {
            switch (row.selectedStarCount) {
                case 5:
                    count5Star++;
                    break;
                case 4:
                    count4Star++;
                    break;
                case 3:
                    count3Star++;
                    break;
                case 2:
                    count2Star++;
                    break;
                default:
                    break;
            }
        });

        // Set the counts in state
        setRatingsCount({
            count5Star,
            count4Star,
            count3Star,
            count2Star
        });
    }

    const deleteUser = (id) => {
        Axios.post('http://localhost:8070/api/deleteuser', { id })
        .then(() => {
            getUsers();
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    }

    // Function to handle download summary
    const handleDownloadSummary = () => {
        const doc = new jsPDF();
        doc.text('Feedback Summary', 10, 10);
        doc.text(`Total Card Containers: ${totalCardContainers}`, 10, 20);
        doc.text(`5-Star Count: ${ratingsCount.count5Star}`, 10, 30);
        doc.text(`4-Star Count: ${ratingsCount.count4Star}`, 10, 40);
        doc.text(`3-Star Count: ${ratingsCount.count3Star}`, 10, 50);
        doc.text(`2-Star Count: ${ratingsCount.count2Star}`, 10, 60);
        doc.save('feedback_summary.pdf');
    }

    return (
        <Box style={{ textAlign: 'center' }}>
            <Header />
            <RatingCal totalCardContainers={totalCardContainers} ratingsCount={ratingsCount} /> {/* Pass totalCardContainers and ratingsCount as props */}
            <Button variant="contained" onClick={handleDownloadSummary} style={{ margin: '20px auto' }}>Download Summary</Button> {/* Button for downloading summary */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Usertableuser 
                    rows={users}
                    deleteUser={deleteUser}
                />
            )}
            
        </Box>
    );
}

export default Nonregfeedback;
