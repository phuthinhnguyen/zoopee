// import React, { useEffect } from 'react';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import Slide from '@mui/material/Slide';
// import {useState } from "react";


// const Alertinfo = ({status,message}) => {
//   // const [open, setOpen] = React.useState(true);

//   const [open, setOpen] = useState(status);

 
//   function SlideTransition(props) {
//     return <Slide {...props} direction="up" />;
//   }
//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false)
//   };

//   return (
//     <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} TransitionComponent={SlideTransition}>
//       <Alert onClose={handleClose} severity="error" sx={{ width: '100%', marginBottom: 4, marginRight: 2, backgroundColor: "var(--backgroundbody)", color: "var(--boldyellow)" }}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// }
// export default Alertinfo;