import { ToastContainer, Toast} from 'react-bootstrap';

const Toaster = (type, message) => {
  return (
    <ToastContainer className="p-3" position='middle-center'>
    <Toast
        delay={2000} autohide
    >
        <Toast.Header>                    
        <strong className="me-auto">
            {type=="SUCCESS" ?  'SUCCESS 🚀🚀' : 'ERROR ⚠️⚠️' }
        </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
    </Toast>
    </ToastContainer>
  )
}

export default Toaster

