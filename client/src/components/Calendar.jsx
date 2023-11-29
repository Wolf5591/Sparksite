import React from "react";
import { Grid, Container, Typography, Divider } from "@mui/material";
import UserContext from "../User";
import {db} from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CalendarCard from "./CalendarCard";
import CalendarForm from "./CalendarForm";

export default function Calendar() {
    const user = React.useContext(UserContext);
    const [data, loading, error] = useCollectionData(db.collection(`users/${user.userAuth.uid}/assignments`,).orderBy("dueDate", "asc").limit(4), {idField: "id"});


    


    if(loading) {
        return <Typography>Loading...</Typography>
    }
    console.log(data)



    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" textAlign="center">
                        Calendar
                    </Typography>
                </Grid>

                {data.map((assignment) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={assignment.id}>
                        <CalendarCard assignment={assignment} />
                    </Grid>
                ))}
                
            </Grid>
            <Divider 
            sx={{
                my: "20px"
            }}
            />
            <CalendarForm />
        </Container>
    );
}
