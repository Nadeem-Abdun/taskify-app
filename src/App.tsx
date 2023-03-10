import { Box } from '@mui/material'
import Taskify from './Components/Taskify';


function App() {
  return (
    <>
      <Box height='100vh' width='100vw' display='flex' justifyContent='center' alignItems='center' sx={{ background: 'linear-gradient(to right, #733872, #ca4c7c)' }}>
        <Taskify />
      </Box>
    </>
  );
}

export default App;
