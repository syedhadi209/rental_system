import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Dashboard.css";
import Modal from "react-modal";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SyncLoader from "react-spinners/SyncLoader";
import PropertyBox from "../PropertyBox/PropertyBox";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
  },
};

const override = {
  color: "gray",
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: "10000",
};

export default function Dashboard() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [address, setAddress] = useState(null);
  const [collectionDate, setCollectionDate] = useState(null);
  const [rentPrice, setRentPrice] = useState(null);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [properties, setProperties] = useState(null);
  const [renterName, setRenterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [setProperties]);

  console.log("properties", properties);

  const notify = () =>
    toast.success("New Property Alert Created", { icon: true });

  async function handleCreateAlert() {
    if (renterName && address && collectionDate <= 31 && rentPrice) {
      setIsLoading(true);
      try {
        const id = uuidv4();
        const todoRef = doc(db, "properties", id);

        const newDoc = {
          propertyId: id,
          renterName: renterName,
          address: address,
          collectionDate: collectionDate,
          rentPrice: rentPrice,
        };
        properties.push(newDoc);
        await setDoc(todoRef, newDoc);
        notify();
        setIsLoading(false);
        closeModal();
      } catch (error) {
        console.error("Error adding document:", error);
      }
    } else {
      setError("All the fields are required!!");
    }
  }

  async function handleDelete(propertyId) {
    const temp = [];
    properties?.map((property) => {
      if (property.propertyId !== propertyId) {
        temp.push(property);
      }
    });
    setProperties(temp);
    const docRef = doc(db, "properties", propertyId);
    await deleteDoc(docRef);
  }

  async function fetchData() {
    setIsLoading(true);
    try {
      const docRef = collection(db, "properties");
      const q = query(docRef);
      const querySnapshot = await getDocs(q);

      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setIsLoading(false);
      setProperties(temp);
    } catch (err) {
      // setError("Failed to load todos");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="dashboard-container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Rental Alert</h2>
              <button onClick={closeModal}>Close</button>
            </div>
            <h3 style={{ color: "red", textAlign: "center" }}>
              {error ? error : ""}
              {dateError ? dateError : ""}
            </h3>
            <div className="modal-input">
              <div className="input">
                <label htmlFor="renterName">Renter Name</label>
                <input
                  type="text"
                  placeholder="Enter Renter Name"
                  id="renterName"
                  required
                  onChange={(e) => setRenterName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="propertyAddress">Property Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  id="propertyAddress"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="collectionDate">Rent Collection Date</label>
                <input
                  type="number"
                  placeholder="Enter Collection Date"
                  id="collectonDate"
                  min={1}
                  max={31}
                  required
                  onChange={(e) => setCollectionDate(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="rentPrice">Rent Price</label>
                <input
                  type="number"
                  placeholder="Enter Rent Price"
                  id="rentPrice"
                  min={1}
                  required
                  onChange={(e) => setRentPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-button">
              <button onClick={handleCreateAlert}>Create New Alert</button>
            </div>
          </div>
        </Modal>
        <div className="dashboard-heading">
          <h2>Rental Properties</h2>
          <button onClick={openModal}>Add Property</button>
        </div>
        <div className="dashboard-data">
          <SyncLoader
            loading={isLoading}
            size={10}
            cssOverride={override}
            color="grey"
          />
          {properties?.map((ele) => {
            return (
              <PropertyBox
                ele={ele}
                handleDelete={handleDelete}
                date={Number(ele.collectionDate)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
