'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }
  const addItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  useEffect(()=>{
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor='thistle'
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
        position="absolute"
        top="50%" 
        left="50%" 
        width={400}
        bgcolor="white"
        border="2px solid darkmagenta"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%,-50%)',
        }}
        >
          <Typography variant="h6" bgcolor='thistle' color='secondary' textAlign='center'>Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              color='secondary'
              fullWidth
              value={itemName}
              onChange={(e)=>{
                setItemName(e.target.value)
              }}
            />
            <Button
            variant="outlined"
            color='secondary'
              onClick={()=>{
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="outlined"
        size='large'
        color='secondary' 
        onClick={()=>{
          handleOpen()
        }}
      >
        Add New Item
      </Button>
      <Box border='2px solid darkmagenta'>
        <Box
          width="800px"
          height="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant='h2' color='darkmagenta' fontFamily='serif' fontStyle='oblique'>
            Inventory Management
          </Typography>
        </Box>
      
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {inventory.map(({name, quantity}) => ( 
          <Box 
            key={name} 
            width="100%" 
            minHeight="150px" 
            display="flex"
            alignItems="center" 
            justifyContent="space-between"
            bgcolor='white'
            padding={5}
          >
            <Typography variant="h3" color="darkmagenta" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="darkmagenta" textAlign="center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => {
                addItem(name)
              }}
            >
              Add
            </Button> 
            <Button
              variant="outlined"
              color='secondary'
              onClick={() => {
                removeItem(name)
              }}
            >
              Remove
            </Button></Stack>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  )
}
