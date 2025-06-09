import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType } from './types';

export const downloadExcel = async (formData: NozzleFormDataType) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Form Data');

  // Optional: Add a title row
  worksheet.addRow(['Field', 'Value']);

  // Add data rows
  Object.entries(formData).forEach(([key, value]) => {
    worksheet.addRow([key, String(value)]);
  });

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  saveAs(blob, 'form-data.xlsx');
};

export const copyFormDataToClipboard = (formData: NozzleFormDataType) => {
  const tsv = Object.entries(formData)
    .map(([key, value]) => `${key}\t${value}`)
    .join('\n');

  navigator.clipboard.writeText(tsv).then(() => {
    alert('Form data copied to clipboard!');
  }).catch((err) => {
    console.error('Failed to copy:', err);
  });
};
