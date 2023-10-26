import { Alert, Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'

function MuiComponentSample() {
  return (
    <>

      <Container maxWidth='sm'>

      <Grid container>
        <Grid item xs={4}>
        <Button onClick={()=> {alert('click')}} variant="outlined" color='primary' sx={{backgroundColor:'red'}} >Text</Button>
        </Grid>
        <Grid item xs={4}>
        <Button onClick={()=> {alert('click')}} variant="contained" color='error' >Text2</Button>
        </Grid>
        <Grid item xs={4}>
        <Button onClick={()=> {alert('click')}} variant="text" color='error' >Text2</Button>
        <Alert onClose={()=> {console.log('kapatıldı')}} severity="warning">This is a warning alert — check it out!</Alert>
        </Grid>
      </Grid>

      <Grid alignContent={'center'}>
        <Grid item sm={12}>
        <TextField onChange={()=> {console.log('text change')}} id="outlined-basic" label="Outlined" variant="standard" />
        </Grid>
      </Grid>

        
    </Container>

    </>
  )
}

export default MuiComponentSample