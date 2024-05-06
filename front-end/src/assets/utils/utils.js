import moment from "moment";

export const gender = [
  { label: "Male", value: "m" },
  { label: "Female", value: "f" },
  { label: "Non-binary", value: "nb" },
  { label: "I prefer not to say", value: "none" },
];

export const inputAddressList = [
  {
    label: "House number",
    placeholder: "Enter house number",
    key: "houseNumber",
  },
  {
    label: "Street Address*",
    placeholder: "Enter street address",
    key: "streetAddress",
  },
  {
    label: "City*",
    placeholder: "Enter city",
    key: "city",
  },
  {
    label: "County*",
    placeholder: "Enter county",
    key: "county",
  },
  {
    label: "Postal Code*",
    placeholder: "Enter postal code",
    key: "postalCode",
  },
];

export const fontOptions = [
  // { label: "Arial", value: "Arial" },
  // { label: "Helvetica", value: "Helvetica" },
  // { label: "Times New Roman", value: "Times New Roman" },
  // { label: "Courier New", value: "Courier New" },
  // Add more font options as needed
  { value: "Arial", label: "Arial" },
  { value: "Verdana", label: "Verdana" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Courier New", label: "Courier New" },
  { value: "Brush Script MT", label: "Brush Script MT" },
  { value: "Lucida Handwriting", label: "Lucida Handwriting" },
  { value: "Pacifico", label: "Pacifico" },
  { value: "Dancing Script", label: "Dancing Script" },
  { value: "Great Vibes", label: "Great Vibes" },
  { value: "Amatic SC", label: "Amatic SC" },
];

export const convertDateFormat = (dateString) => {
  var dateObj = new Date(dateString);
  var momentObj = moment(dateObj);
  var momentString = momentObj.format("DD-MM-YYYY");
  return momentString;
};

export const statusList = [
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "dispatched",
    label: "Dispatched",
  },
  {
    value: "out-for-delivery",
    label: "Out for Delivery",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];
