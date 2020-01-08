import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import CustomizedSnackbars from '../addProduct/SnackBar';


export default function MaterialTableDemo(props) {
  console.log("props data ", props);
  let openData = {
    open: false,
    data: ""
  }
  const [open, setOpen] = React.useState(openData);
  const [state, setState] = React.useState({
    columns: [
      { title: 'ProductName', field: 'productName' },
      { title: 'Brand', field: 'brand' },
      { title: 'Price', field: 'price' },
      { title: 'Quantity', field: 'quantity' },
      { title: 'Image', field: 'image' },

    ],
    data: []

  });
  let validation = (data) => {
    console.log("in validation ", data);
    const { productName, brand, price, quantity, image } = data
    if (productName !== undefined || brand !== undefined || price !== undefined || quantity !== undefined || image !== undefined) {
      if (productName.trim().length === 0 || brand.trim().length === 0 || price.trim().length === 0 || price.trim().match(/[a-z]/g) || quantity.trim().match(/[a-z]/g) || quantity.trim().length === 0 || image.trim().length === 0) {
        console.log(" validation failed ");
        setTimeout(() => {
          setOpen({
            open: true,
            variant: "error",
            data: "Invalid Data"
          })
        }, 2000);
        setTimeout(() => {
          setOpen({
            ...open,
            variant: "error",
            open: false,
  
          })
        }, 2000);

      } else {
        props.function(data)
        console.log(" validation success  ");
        setOpen({
          open: true,
          variant: "success",
          data: "Data is Added"
        })
        setTimeout(() => {
          setOpen({
            ...open,
            variant: "success",
            open: false,
  
          })
        }, 2000);

      }

    } else {
      setOpen({
        open: true,
        variant: "error",
        data: "Field Shouldn't be Empty"
      })
      setTimeout(() => {
        setOpen({
          ...open,
          variant: "error",
          open: false,

        })
      }, 2000);

      console.log("failed");

    }


  }
  return (
    <>
      <MaterialTable
        options={{
          headerStyle: { backgroundColor: '#37474f', color: 'white' },


        }}
        title="Product Data"
        columns={state.columns}
        data={props.data}

        editable={{
          onRowAdd: newData =>

            new Promise(resolve => {

              setTimeout(() => {
                resolve();
                setState(prevState => {

                  const data = [...props.data];
                  data.push(newData);
                  validation(newData)
                  // props.function(data)
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>

            new Promise(resolve => {
              setTimeout(() => {

                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...props.data];
                    data[data.indexOf(oldData)] = newData;
                    validation(newData)
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...props.data];
                  data.splice(data.indexOf(oldData), 1);
                  props.function(data)

                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}

      />
      <CustomizedSnackbars open={open} />

    </>
  );
}