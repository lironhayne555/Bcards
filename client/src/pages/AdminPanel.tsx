import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { SearchContext } from "../searchContext";
import "../../../client/src/css/AdminPanel.css";
import {
  deleteUser,
  editUserFunction,
  getUsers,
} from "../services/ApiServices";
import { User } from "../auth/SignUp";
import { setUser } from "../auth/TokenManager";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Container,
  CssBaseline,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import EditUser from "../components/EditUser";
import { useForm } from "react-hook-form";
function AdminPanel() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { searchValue } = useContext(SearchContext);
  const defaultUserImage = "http://localhost:8080/images/profile.png";
  const [openModal, setOpenModal] = useState(false);
  const [editfirstName, setEditFirstName] = useState("");
  const [editlastName, setEditLastName] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editmiddleName, setEditMiddleName] = useState("");
  const [editphone, setEditPhone] = useState("");
  const [editimageUrl, setEditImageUrl] = useState("");
  const [editimageAlt, setEditImageAlt] = useState("");
  const [editcountry, setEditCountry] = useState("");
  const [editcity, setEditCity] = useState("");
  const [editstreet, setEditStreet] = useState("");
  const [edithouseNumber, setEditHouseNumber] = useState<string | number>("");
  const [editzip, setEditZip] = useState("");
  const [editisBusiness, setEditIsBusiness] = useState(false);
  const [editisAdmin, setEditIsAdmin] = useState(false);
  const modalStyle1 = {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setEditFirstName(user.firstName ? user.firstName : "");
    setEditLastName(user.lastName ? user.lastName : "");
    setEditMiddleName(user.middleName ? user.middleName : "");
    setEditEmail(user.email ? user.email : "");
    setEditPhone(user.phone ? user.phone : "");
    setEditCountry(user.country ? user.country : "");
    setEditCity(user.city ? user.city : "");
    setEditStreet(user.street ? user.street : "");
    setEditHouseNumber(user.houseNumber ? user.houseNumber : "");
    setEditImageAlt(user.imageAlt ? user.imageAlt : "");
    setEditZip(user.zip ? user.zip : "");
    setEditIsBusiness(user.isBusiness ? user.isBusiness : false);
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

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 10 }}>
        <CssBaseline />
        <Title mainText="ADMIN AREA" />
        <TableContainer sx={{ boxShadow: 3 }}>
          <Table sx={{ width: "100%" }}>
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
                  <TableCell>
                    {" "}
                    <Avatar
                      src={user.imageUrl ? user.imageUrl : defaultUserImage}
                    ></Avatar>
                  </TableCell>
                  <TableCell>
                    {user.firstName} {user.middleName ? user.middleName : ""}{" "}
                    {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {user.street}, {user.city}, {user.houseNumber}, {user.city},{" "}
                    {user.country} {user.zip ? user.zip : ""}
                  </TableCell>
                  {user.isBusiness && (
                    <TableCell>
                      <CheckCircleIcon
                        sx={{ color: "green" }}
                      ></CheckCircleIcon>
                    </TableCell>
                  )}
                  {!user.isBusiness && (
                    <TableCell>
                      <CancelIcon sx={{ color: "red" }}></CancelIcon>
                    </TableCell>
                  )}
                  {user.isAdmin && (
                    <TableCell>
                      <CheckCircleIcon
                        sx={{ color: "green" }}
                      ></CheckCircleIcon>
                    </TableCell>
                  )}
                  {!user.isAdmin && (
                    <TableCell>
                      <CancelIcon sx={{ color: "red" }}></CancelIcon>
                    </TableCell>
                  )}
                  <TableCell>
                    <EditIcon onClick={() => handleOpenModal(user)}></EditIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            overflow: "auto",
            maxHeight: "80vh",
          }}
        >
          <EditUser
            _id={selectedUser?._id}
            firstName={editfirstName}
            setFirstName={setEditFirstName}
            lastName={editlastName}
            setLastName={setEditLastName}
            middleName={editmiddleName}
            setMiddleName={setEditMiddleName}
            email={editemail}
            setEmail={setEditEmail}
            phone={editphone}
            setPhone={setEditPhone}
            country={editcountry}
            setCountry={setEditCountry}
            city={editcity}
            setCity={setEditCity}
            street={editstreet}
            setStreet={setEditStreet}
            houseNumber={edithouseNumber}
            setHouseNumber={setEditHouseNumber}
            zip={editzip}
            setZip={setEditZip}
            isBusiness={editisBusiness}
            setIsBusiness={setEditIsBusiness}
            onCloseModal={handleCloseModal}
          ></EditUser>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}
export default AdminPanel;
