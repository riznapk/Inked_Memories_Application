import React, { useEffect, useState } from "react";
import { DataGrid, GridOverlay, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import {
  setAllOrderData,
  setAllOrderDataForAdmin,
} from "../redux/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axiosConfig";
import ViewOrderDetails from "./ViewOrderDetails";
import { statusList } from "../assets/utils/utils";
import Loader from "../components/Loader";

const Orders = () => {
  const [rows, setRows] = useState([]);
  //for loading
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state?.order?.orderList);
  //fecting user details
  const user = useSelector((state) => state?.user?.user);
  console.log("isLoading", isLoading);
  //fetching data from db specific to the user
  const getUserOrderDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/orders/${user?.userID}`);
      if (response?.data) {
        dispatch(setAllOrderData(response?.data));
        setRows(response?.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  //fetching data from db of all users
  const getAllOrderDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/orders");
      if (response?.data) {
        dispatch(setAllOrderDataForAdmin(response?.data));
        setRows(response?.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userProfile == "admin") getAllOrderDetails();
    else getUserOrderDetails();
  }, []);

  const handleEditCellChange = async (params) => {
    const { id, field, value, row } = params;
    const newRows = rows.map((r) => {
      if (r.id === row.id) {
        return { ...r, [field]: value };
      }
      return r;
    });
    console.log("newRows", newRows);
    setRows(newRows);
    try {
      const response = await api.put("/orders", { ...row, [field]: value });
      if (response?.data?.message == "success") {
        getAllOrderDetails();
        alert("Status updated");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = (event, row) => {
    const newRows = rows.map((r) => {
      if (r.orderID === row.orderID) {
        return { ...r, status: event.target.value };
      }
      return r;
    });
    setRows(newRows);
  };

  const columns = [
    {
      field: "orderID",
      headerName: "Order ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerAlign: "center",
      align: "center",
      headerName: "Total amount",
      width: 150,
      renderCell: (params) => <div> £{params.row.amount.toFixed(2)}</div>,
    },
    {
      field: "orderPlacedDate",
      headerName: "Order Placed",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: user?.userProfile == "admin" ? false : true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        user?.userProfile === "customer" ? (
          <span>{params.value}</span>
        ) : (
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={params.value}
              onChange={(e) => handleStatusChange(e, params.row)}
              inputProps={{ "aria-label": "Select status" }}
            >
              <MenuItem value="" disabled>
                Select status
              </MenuItem>
              {statusList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
    },
    {
      field: "payment",
      headerName: "Payment Status",
      width: 150,

      headerAlign: "center",
      align: "center",
    },

    {
      field: "viewOrder",
      headerName: "View Order Details",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color="primary"
          style={{ fontSize: "0.8rem", padding: "6px 16px" }}
          onClick={() => handleViewOrder(params.row)}
        >
          View Order
        </Button>
      ),
    },

    {
      field: "updateStatus",
      headerName: "Update Status",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            //handleDelete(params.row.vehicleID);
            handleEditCellChange(params);
          }}
        >
          UPDATE STATUS
        </Button>
      ),
    },
  ];

  //state to handle dialog open and close
  const [isViewOrderDetails, setIsViewOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  // handling viewing order details
  const handleViewOrder = (row) => {
    setSelectedOrder(row);
    setIsViewOrderDetails(true);
  };

  // view dialog box contents
  const ViewDialogBox = (
    <Dialog
      open={isViewOrderDetails}
      onClose={() => setIsViewOrderDetails(false)}
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton
          onClick={() => setIsViewOrderDetails(false)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ViewOrderDetails data={selectedOrder} />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", marginBottom: "30px" }}>
        <Button
          variant="contained"
          onClick={() => setIsViewOrderDetails(false)}
          autoFocus
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Header />
      <div
        style={{
          height: 400,
          width: "65%",
          margin: "0 auto",
          marginTop: "100px",
          maxWidth: "65%",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              //Toolbar: GridToolbarCustom,
              NoRowsOverlay: () => <GridOverlay>No rows found</GridOverlay>,
            }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            style={{ backgroundColor: "#e5e5df" }}
            getRowId={(row) => row.orderID}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  updateStatus: user?.userProfile == "admin" ? true : false,
                },
              },
            }}
          />
        )}
        {ViewDialogBox}
      </div>
    </div>
  );
};

export default Orders;
