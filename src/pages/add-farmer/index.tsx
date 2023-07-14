//@ts-nocheck
import React, { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import { Button, Card, Divider, Radio, RadioGroup } from '@mui/material'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import { Form, Formik } from 'formik'
import Chip from 'src/@core/components/mui/chip'
import { createFarmer, getAllDistrict, getSingleFarmer, updateFarmer } from 'src/slice/farmers'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const FarmerDetails = () => {
  const { allDistrict, getFarmer } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const farmerData = JSON.parse(localStorage.getItem('FarmerData'))

  const dispatch = useDispatch()
  const router = useRouter()

  const initialValues = !farmerData
    ? {
        firstName: '',
        middleName: '',
        lastName: '',
        DOB: '',
        adharNumber: '',
        mobileNumber: '',
        address: '',
        villageName: '',
        taluka: '',
        district: '',
        state: '',
        pinCode: '',
        caste: '',
        maritalStatus: '',
        gender: '',
        religion: '',
        landDistrict: '',
        subDivision: '',
        circle: '',
        mouza: '',
        landVillage: '',
        pattaType: '',
        latNo: '',
        pattaNo: '',
        landArea: '',
        landType: '',
        farmerLandOwnershipType: ''
      }
    : {
        firstName: getFarmer?.[0]?.firstName,
        middleName: getFarmer?.[0]?.middleName,
        lastName: getFarmer?.[0]?.lastName,
        DOB: getFarmer?.[0]?.DOB,
        adharNumber: getFarmer?.[0]?.adharNumber,
        mobileNumber: getFarmer?.[0]?.mobileNumber,
        address: getFarmer?.[0]?.address,
        villageName: getFarmer?.[0]?.villageName,
        taluka: getFarmer?.[0]?.taluka,
        district: getFarmer?.[0]?.district,
        state: getFarmer?.[0]?.state,
        pinCode: getFarmer?.[0]?.pinCode,
        caste: getFarmer?.[0]?.caste,
        maritalStatus: getFarmer?.[0]?.maritalStatus,
        gender: getFarmer?.[0]?.gender,
        religion: getFarmer?.[0]?.religion,
        landDistrict: getFarmer?.[0]?.landDistrict,
        subDivision: getFarmer?.[0]?.subDivision,
        circle: getFarmer?.[0]?.circle,
        mouza: getFarmer?.[0]?.mouza,
        landVillage: getFarmer?.[0]?.landVillage,
        pattaType: getFarmer?.[0]?.pattaType,
        latNo: getFarmer?.[0]?.latNo,
        pattaNo: getFarmer?.[0]?.pattaNo,
        landArea: getFarmer?.[0]?.landArea,
        landType: getFarmer?.[0]?.landType,
        farmerLandOwnershipType: getFarmer?.[0]?.farmerLandOwnershipType
      }

  const handleSubmit = (values: any) => {
    const userData: any = JSON.parse(localStorage.getItem('userData'))

    const payload = {
      adminId: userData?.id,
      firstName: values?.firstName,
      middleName: values?.middleName,
      lastName: values?.lastName,
      DOB: values?.DOB,
      adharNumber: values?.adharNumber,
      mobileNumber: values?.mobileNumber,
      address: values?.address,
      villageName: values?.villageName,
      taluka: values?.taluka,
      district: values?.district,
      state: values?.state,
      pinCode: values?.pinCode,
      caste: values?.caste,
      maritalStatus: values?.maritalStatus,
      gender: values?.gender,
      religion: values?.religion,
      landDistrict: values?.landDistrict,
      subDivision: values?.subDivision,
      circle: values?.circle,
      mouza: values?.mouza,
      landVillage: values?.landVillage,
      pattaType: values?.pattaType,
      latNo: values?.latNo,
      pattaNo: values?.pattaNo,
      landArea: values?.landArea,
      landType: values?.landType,
      farmerLandOwnershipType: values?.farmerLandOwnershipType
    }
    if (!farmerData) {
      dispatch(createFarmer(payload))
      router.push('/farmers')
    } else {
      payload.id = getFarmer?.[0].id
      dispatch(updateFarmer(payload))
      router.push('/farmers')
    }
  }
  const CustomTextField = ({ value, disabled, onChange, onBlur, name, label, placeholder }) => {
    return (
      <TextField
        disabled={disabled ? true : false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        fullWidth
        label={label}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true
        }}
      />
    )
  }
  useEffect(() => {
    let payload = {
      id: farmerData
    }
    dispatch(getAllDistrict({ state: 'Gujarat' }))
    dispatch(getSingleFarmer(payload))
  }, [])
  return (
    <>
      <Card
        sx={{
          padding: 10
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={values => {
            handleSubmit(values)
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
            <>
              <Form>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                  <Divider>
                    <Chip
                      sx={{ fontSize: '22px', padding: '15px', fontWeight: 'bold', textAlign: 'left' }}
                      label='Farmer Details'
                    />
                  </Divider>
                </Box>
                <Grid
                  container
                  spacing={6}
                  sx={{
                    padding: '10px'
                  }}
                >
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='firstName'
                      fullWidth
                      label='First Name'
                      placeholder='John'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.middleName}
                      name='middleName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Middle Name'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.lastName}
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Last Name'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.DOB}
                      name='DOB'
                      onChange={handleChange}
                      fullWidth
                      type='date'
                      label='Date of birth'
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.adharNumber}
                      name='adharNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Adhar Number'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.mobileNumber}
                      name='mobileNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Mobile Number'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.address}
                      name='address'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Address'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.villageName}
                      name='villageName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Village Name'
                      placeholder='Village Name'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.taluka}
                      name='taluka'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Taluka'
                      placeholder='Taluka'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.district}
                      name='district'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='District'
                      placeholder='District'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.state}
                      name='state'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='State'
                      placeholder='state'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.state}
                      name='pinCode'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Pin Code'
                      placeholder='Pin Code'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <CustomTextField
                      value={values?.caste}
                      name='caste'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Caste'
                      placeholder='caste'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.religion}
                      name='religion'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Religion'
                      placeholder='Religion'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                      Gender{' '}
                    </Typography>
                    <RadioGroup
                      row
                      aria-label='controlled'
                      value={values?.gender}
                      name='gender'
                      onChange={handleChange}
                    >
                      <FormControlLabel value='male' control={<Radio />} label='Male' />
                      <FormControlLabel value='female' control={<Radio />} label='Female' />
                      <FormControlLabel value='both' control={<Radio />} label='Both' />
                    </RadioGroup>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                      Marital Status
                    </Typography>
                    <RadioGroup
                      row
                      aria-label='controlled'
                      value={values?.maritalStatus}
                      name='maritalStatus'
                      onChange={handleChange}
                    >
                      <FormControlLabel value='single' control={<Radio />} label='Single' />
                      <FormControlLabel value='married' control={<Radio />} label='Married' />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                  <Divider>
                    <Chip
                      sx={{ fontSize: '22px', padding: '15px', fontWeight: 'bold', textAlign: 'left' }}
                      label='Land Details'
                    />
                  </Divider>
                </Box>
                <Grid
                  container
                  spacing={6}
                  sx={{
                    padding: '10px'
                  }}
                >
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Land District</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='landDistrict'
                        value={values?.landDistrict && values?.landDistrict}
                        label='landDistrict'
                        onChange={handleChange}
                      >
                        {allDistrict?.map(name => (
                          <MenuItem key={name?.name} value={name?.name}>
                            {name?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.subDivision}
                      name='subDivision'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='SubDivision'
                      placeholder='SubDivision'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.circle}
                      name='circle'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Circle'
                      placeholder='Circle'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.mouza}
                      name='mouza'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Mouza'
                      placeholder='mouza'
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.landVillage}
                      name='landVillage'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='LandVillage'
                      placeholder='LandVillage'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.pattaType}
                      name='pattaType'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='PattaType'
                      placeholder='PattaType'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.latNo}
                      name='latNo'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='LatNo'
                      placeholder='LatNo'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.pattaNo}
                      name='pattaNo'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='PattaNo'
                      placeholder='PattaNo'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.landArea}
                      name='landArea'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Area'
                      placeholder='Land Area'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.landType}
                      name='landType'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Type'
                      placeholder='Land Type'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <CustomTextField
                      value={values?.farmerLandOwnershipType}
                      name='farmerLandOwnershipType'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Farmer LandOwner Ship Type'
                      placeholder='Farmer LandOwner Ship Type'
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    padding: 5
                  }}
                >
                  <Button variant='contained' type='submit' sx={{ mr: 1 }}>
                    Submit
                  </Button>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </Card>
    </>
  )
}

export default FarmerDetails
