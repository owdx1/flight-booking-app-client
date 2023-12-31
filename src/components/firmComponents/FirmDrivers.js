import React from 'react'
import { DeleteIcon } from '../../utils/DeleteIcon';
import { EyeIcon } from '../../utils/EyeIcon';
import {EditIcon} from '../../utils/EditIcon'
import { User } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import { drivers } from '../../data/drivers';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem , Button } from '@nextui-org/react'
const columns = [
  {name: "İSİM", uid: "name"},
  {name: "ROL", uid: "role"},
  {name: "DURUM", uid: "status"},
  {name: "", uid: "actions"},
];



const statusColorMap = {
  onayli: "success",
  onaylidegil: "danger",
};


const FirmDrivers = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.phone}
            name={cellValue}
          >
            {user.phone}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className='flex flex-col'>
      <Dropdown backdrop='blur'>
        <DropdownTrigger>

          <Button 
            className='w-24 text-gray-500 my-3'
            variant='bordered'
          >
            <AddIcon/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
          <DropdownItem key="new" endContent={<AddIcon/>} color='secondary' className='text-secondary'>Şoför ekle</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Table aria-label="drivers">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={drivers}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default FirmDrivers