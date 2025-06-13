import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType } from './types';
import { nozzleAssemblyHours } from './data';

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

export const getClosestDiameter = (inputDiameter: number): number | null => {
  const diameterNumber = Number(inputDiameter);
  if (isNaN(diameterNumber)) return null;

  const diameters = Object.keys(nozzleAssemblyHours).map(Number);
  return diameters.reduce((prev, curr) =>
    Math.abs(curr - diameterNumber) < Math.abs(prev - diameterNumber) ? curr : prev
  );
};

export const calculateOptimaAssemblyHours= (formData: NozzleFormDataType) => {
  const result = 25 + Number(formData.segments)
  return result
}

