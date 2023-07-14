// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { getAllFarmers } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}
const defaultColumns: GridColDef[] = []
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
const allFarmers = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { allFarmers, createFarmer, deleteFarmer } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    //@ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    let payload = {
      adminId: userData?.id,
      page: paginationModel?.page + 1,
      pageSize: paginationModel?.pageSize
    }
    //@ts-ignore
    dispatch(getAllFarmers(payload))
    localStorage.removeItem('FarmerData')
  }, [createFarmer, deleteFarmer, paginationModel?.page, paginationModel?.pageSize])

  const handleSearch = () => {}
  const handleEdit = (row: any) => {
    localStorage.setItem('FarmerData', JSON.stringify(row?.id))
    router.push('/add-farmer')
  }
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      field: 'firstName',
      minWidth: 320,
      headerName: 'Name',
      renderCell: ({ row }: any) => {
        const { firstName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {firstName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'mobileNumber',
      headerName: 'Phone'
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'villageName',
      headerName: 'Village Name'
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete'>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => handleEdit(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='View'>
            <IconButton
              size='small'
              // component={Link}
              sx={{ color: 'text.secondary' }}
              // href={`/apps/all-company/view/${row?.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip> */}
        </Box>
      )
    }
  ]
  // ** States
  // const [page, setPage] = useState<number>(0)
  // const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Farmers' />
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <TextField
              size='small'
              value={search}
              onChange={handleSearch}
              placeholder='Search…'
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>
                    <Icon icon='tabler:search' fontSize={20} />
                  </Box>
                ),
                endAdornment: (
                  <IconButton size='small' title='Clear' aria-label='Clear'>
                    <Icon icon='tabler:x' fontSize={20} />
                  </IconButton>
                )
              }}
              sx={{
                width: {
                  xs: 1,
                  sm: 'auto'
                },
                '& .MuiInputBase-root > svg': {
                  mr: 2
                }
              }}
            />
            <Button variant='contained' onClick={() => router.push('/add-farmer')}>
              Add farmer
            </Button>
          </Box>

          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
                // color: "red"
              }
            }}
            autoHeight
            pagination
            rowHeight={62}
            rowCount={allFarmers?.totalItems}
            rows={allFarmers?.data && allFarmers?.data ? allFarmers.data : []}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            disableRowSelectionOnClick
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default allFarmers
