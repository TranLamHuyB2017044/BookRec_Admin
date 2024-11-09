import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const KeywordAnalysis = ({ keywordData }) => {
  return (
    <TableContainer style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1.5rem' }}><strong>Từ Khóa</strong></TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }} style={{ color: '#4CAF50' }}>Cực kỳ hài lòng</TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }} style={{ color: '#2196F3' }}>Hài lòng</TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }} style={{ color: '#9E9E9E' }}>Bình thường</TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }} style={{ color: '#f44336' }}>Rất không hài lòng</TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }}><strong>Tổng số lần xuất hiện</strong></TableCell>
            <TableCell align="center" sx={{ fontSize: '1.5rem' }}><strong>Tỷ lệ xuất hiện (%)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keywordData.map((row) => (
            <TableRow key={row.keyword}>
              <TableCell sx={{ fontSize: '1.5rem' }}>{row.keyword}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.verySatisfied}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.satisfied}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.neutral}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.veryDissatisfied}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.totalCount}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{row.percentage.toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeywordAnalysis;
