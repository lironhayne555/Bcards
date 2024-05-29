import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { SearchContext } from "../searchContext";
import { deleteUser, editUserFunction, getUsers } from "../services/ApiServices";
import { User } from "../auth/SignUp";
import { setUser } from "../auth/TokenManager";
import { toast } from "react-toastify";
import { Avatar, Box, Modal,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Container, CssBaseline } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import EditUser from "../components/EditUser";
import { useForm } from "react-hook-form";
function AdminPanel() {
const [users, setUsers] = useState<Array<User>>([])
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const { searchValue } = useContext(SearchContext);
const defaultUserImage = "http://localhost:8080/images/profile.png" ;
const [openModal, setOpenModal] = useState(false);
const [editfirstName, setEditFirstName] = useState('');
const [editlastName, setEditLastName] = useState('');
const [editemail, setEditEmail] = useState('');
const [editmiddleName, setEditMiddleName] = useState('');
const [editphone, setEditPhone] = useState('');
const [editimageUrl, setEditImageUrl] = useState('');
const [editimageAlt, setEditImageAlt] = useState('');
const [editcountry, setEditCountry] = useState('');
const [editcity, setEditCity] = useState('');
const [editstreet, setEditStreet] = useState('');
const [edithouseNumber, setEditHouseNumber] = useState<string | number>('');
const [editzip, setEditZip] = useState('');
const [editisBusiness, setEditIsBusiness] = useState(false);
const [editisAdmin, setEditIsAdmin] = useState(false);
const modalStyle1 = {
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
}
// const handleEditSubmit = (user : User) => {
//     // Update state with the edited user data
//     if (selectedUser && selectedUser._id) {
//      console.log("Edited user:", selectedUser._id);
//     const editedUser = {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         middleName: user.middleName,
//         phone: user.phone,
//         imageAlt: user.imageAlt,
//         country: user.country,
//         city: user.city,
//         street: user.street,
//         houseNumber: user.houseNumber,
//         zip: user.zip,
//         isBusiness: user.isBusiness
//     };
//     console.log("Edited user:", editedUser); 
//     editUserFunction(selectedUser._id, editedUser).then((res) => {
//     handleCloseModal();
//     }).catch(error => {
//             // Handle error
//             console.error("Error editing user:", error);
//         });
//     } else {
//         console.error("Cannot edit user: selectedUser or its _id property is undefined.");
//     }
// }
const handleOpenModal = (user: User) => {
setSelectedUser(user);
setEditFirstName(user.firstName ? user.firstName : '');
setEditLastName(user.lastName ? user.lastName : '');
setEditMiddleName(user.middleName ? user.middleName : '');
setEditEmail(user.email ? user.email : '');
setEditPhone(user.phone ? user.phone : '');
setEditCountry(user.country ? user.country : '');
setEditCity(user.city ? user.city : '');
setEditStreet(user.street ? user.street : '');
setEditHouseNumber(user.houseNumber ? user.houseNumber :  '' );
setEditImageAlt(user.imageAlt ? user.imageAlt : '')
setEditZip(user.zip ? user.zip : '' )
setEditIsBusiness(user.isBusiness ? user.isBusiness : false)
  setOpenModal(true);
  };
 const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };
 useEffect(() => {
    getUsers().then((json) => {
      setUsers(json);
    });
  }, [users]);
// useEffect(() => {
//     const filtered = users.filter(
//       (item) =>
//         item.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
//         item.firstName?.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setUsers(filtered);
//   }, [searchValue, users]);
async function handleDelete(_id: string) {
    if (window.confirm(`Are you sure to delete ${_id}?`)) {
      await deleteUser(_id);

      const updated = [...users].filter((user) => user._id !== _id);
      setUsers(updated);

      toast.success("User has been deleted.");
    }
  }

    return  (
  <>
 <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <CssBaseline />
 <Title mainText="ADMIN AREA" />
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Adress</TableCell>  
            <TableCell>Is business</TableCell>
            <TableCell>Is Admin</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell> <Avatar src= {user.imageUrl ? user.imageUrl : defaultUserImage }></Avatar></TableCell>
              <TableCell>{user.firstName} {user.middleName ? user.middleName : ""} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.street}, {user.city}, {user.houseNumber}, {user.city}, {user.country} {user.zip ? user.zip : ""}</TableCell>
              {user.isBusiness &&
                            <TableCell> 
                            <CheckCircleIcon sx={{ color: 'green' }} ></CheckCircleIcon> 
                            </TableCell>
              }
              {!user.isBusiness && 
              <TableCell> 
              <CancelIcon  sx={{ color: 'red' }} ></CancelIcon> 
              </TableCell>
              }
              {user.isAdmin &&
                  <TableCell> 
                  <CheckCircleIcon sx={{ color: 'green' }} ></CheckCircleIcon> 
                  </TableCell>
              }
           {!user.isAdmin && 
              <TableCell> 
              <CancelIcon  sx={{ color: 'red' }} ></CancelIcon>  
              </TableCell>
              }
            <TableCell>
            <EditIcon onClick={() =>handleOpenModal(user) }></EditIcon>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>
 <Modal open={openModal} onClose={handleCloseModal}>
        <Box  sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          overflow: 'auto', // Enable scrolling
          maxHeight: '80vh', // Limit max height to 80% of viewport height
        }}>
          <EditUser _id={selectedUser?._id} firstName={editfirstName} setFirstName={setEditFirstName} lastName={editlastName} setLastName={setEditLastName} middleName={editmiddleName} setMiddleName={setEditMiddleName}
email={editemail} setEmail={setEditEmail} phone={editphone} setPhone={setEditPhone} imageAlt={editimageAlt} setImageAlt={setEditImageAlt} country={editcountry} setCountry={setEditCountry} city={editcity} setCity={setEditCity} street={editstreet} 
setStreet={setEditStreet} houseNumber={edithouseNumber} setHouseNumber={setEditHouseNumber} zip={editzip} setZip={setEditZip} isBusiness={editisBusiness} setIsBusiness={setEditIsBusiness} onCloseModal={handleCloseModal} ></EditUser>
  <Button onClick={handleCloseModal}>Close</Button>
        </Box>
          
      </Modal>

</>
 );
}
export default AdminPanel;