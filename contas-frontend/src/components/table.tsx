import { IconButton, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { Pageable } from "../models/pageable";
import { getProps } from "../utils/generic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Value {
    type: TypeColumn
    name: String,
    value: string[]
}

export enum TypeColumn {
    STRING,
    MONEY
}

interface TableProps<T> {
    pageable: Pageable<T>
    values: Value[]
    hasActivity: boolean
    hasExtract: boolean
    hasMovement: boolean
    extract: (id: T) => void
    removeItem: (id: string )=> void
    editItem: (item: T) => void
    alterPage: (page:number) => void
    page: number
}

export function TableCustom<T> ({pageable, values, hasActivity, removeItem, editItem, hasExtract, hasMovement, extract, page, alterPage}: TableProps<T>) {
    return (
        <TableContainer sx={{ backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)', maxHeight: '580px', marginBottom: '30px'}}>
            <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {
                            values?.map(column => (
                                <TableCell sx={{fontWeight: '700', fontSize: '16px' }}>
                                    {column.name}
                                </TableCell>
                            ))
                        }
                        {
                            hasExtract? 
                            <TableCell sx={{fontWeight: '700', fontSize: '16px', width: '100px', textAlign: 'center'}}>
                                Extrato
                            </TableCell>
                            :
                            ''
                        }
                        {
                            hasActivity?
                            <TableCell sx={{fontWeight: '700', fontSize: '16px', width: '100px', textAlign: 'center'}}>
                                Atividades
                            </TableCell>
                            :''
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageable.content?.map((value) => (
                        <TableRow
                            key={value["id"]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: hasMovement? value['type'] == "DEPOSIT" ? "#E4FFEA" : "#FFE4E4" : ''}}
                        >
                            {
                                values?.map((props) => (
                                    <TableCell component="th" scope="row">
                                        {props.type == TypeColumn.MONEY ? getProps(props.value, value).toLocaleString('pt-BR', {
                                                                                                                        style: 'currency',
                                                                                                                        currency: 'BRL',}) : getProps(props.value, value)}
                                    </TableCell>
                                ))
                            }
                            {
                                hasExtract? 
                                <TableCell component="th" scope="row" sx={{textAlign: 'center'}}>
                                    <IconButton aria-label="delete" size="small" sx={{color: 'green'}} onClick={()=> { extract(value) }}>
                                        <FontAwesomeIcon icon={faMoneyBillTransfer} size="sm"/>
                                    </IconButton>
                                </TableCell>
                                :
                                ''
                            }
                            {
                                hasActivity? 
                                <TableCell component="th" scope="row" sx={{textAlign: 'center'}}>
                                    <IconButton aria-label="delete" size="small" onClick={()=> { editItem(value) }} sx={{color: '#1e2023', margin: '0px 5px'}}>
                                        <FontAwesomeIcon icon={faPen} size="sm"/>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" onClick={()=> { removeItem(value["id"]) }} sx={{color: '#1e2023',  margin: '0px 5px'}}>
                                        <FontAwesomeIcon icon={faTrash}  size="sm"/>
                                    </IconButton>
                                </TableCell>
                                :
                                ''
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Stack sx={{height: '60px', justifyContent: 'center', alignItems: 'center', position: 'sticky', bottom: '0', background: '#fff'}}>
                <Pagination count={pageable.totalPages} page={page+1} onChange={(event, page)=> {alterPage(page)}}/>
            </Stack>
        </TableContainer>
    )

}