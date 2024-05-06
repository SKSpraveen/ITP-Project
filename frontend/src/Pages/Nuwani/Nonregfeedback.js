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
        let count1Star = 0;

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
                case 1:
                    count1Star++;
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
            count2Star,
            count1Star
        });
    }

    // Function to handle generating PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Define table content
        const tableContent = [
            ['Star Rating', 'Count'],
            ['5 Star', ratingsCount.count5Star],
            ['4 Star', ratingsCount.count4Star],
            ['3 Star', ratingsCount.count3Star],
            ['2 Star', ratingsCount.count2Star],
            ['1 Star', ratingsCount.count1Star]
        ];

        // Set header
        doc.text('Feedback Summary', 10, 10);

        // Add table
        doc.autoTable({
            startY: 20,
            head: [tableContent[0]],
            body: tableContent.slice(1),
        });

        // Save PDF
        doc.save('feedback_summary.pdf');
    };

    return (
        <Box style={{ textAlign: 'center' }}>
            <Header />
            <RatingCal totalCardContainers={totalCardContainers} ratingsCount={ratingsCount} />
            <Button variant="contained" onClick={generatePDFReport} style={{ margin: '20px auto' }}>Generate PDF Report</Button>
            <Usertableuser rows={users} />
        </Box>
    );
}

export default Nonregfeedback;
