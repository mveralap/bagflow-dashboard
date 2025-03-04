
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Upload, 
  Check, 
  AlertTriangle,
  Database,
  RefreshCw,
  FileSpreadsheet 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DataUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState('');

  // Mock data for recent uploads
  const recentUploads = [
    { id: 1, name: 'datos_equipaje_mayo2024.csv', date: '15/05/2024', status: 'success', rows: 12458 },
    { id: 2, name: 'scanner_data_abril.xlsx', date: '30/04/2024', status: 'success', rows: 10234 },
    { id: 3, name: 'inspecciones_marzo.csv', date: '31/03/2024', status: 'error', rows: 0 },
  ];

  // Mock data for database tables
  const databaseTables = [
    { name: 'equipaje', records: 153421, lastUpdate: '20/06/2024' },
    { name: 'scanners', records: 15, lastUpdate: '15/06/2024' },
    { name: 'niveles_inspeccion', records: 450321, lastUpdate: '20/06/2024' },
    { name: 'errores', records: 2145, lastUpdate: '20/06/2024' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileUploaded(true);
    
    // Simulate processing
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUploadComplete(true);
    }, 2000);
  };

  const resetUpload = () => {
    setFileUploaded(false);
    setProcessing(false);
    setUploadComplete(false);
    setFileName('');
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Carga de Datos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="card-dashboard">
            <h2 className="dashboard-subtitle">Subir nuevo archivo</h2>
            
            {!fileUploaded ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl h-60 flex flex-col items-center justify-center p-6 transition-all",
                  dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload size={40} className="text-gray-400 mb-4" />
                <p className="text-center text-lg font-medium mb-2">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Soporta archivos CSV, Excel y JSON
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleChange}
                  accept=".csv,.xlsx,.xls,.json"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Seleccionar archivo
                </label>
              </div>
            ) : (
              <div className="border rounded-xl h-60 flex flex-col items-center justify-center p-6">
                {processing ? (
                  <>
                    <RefreshCw size={40} className="text-primary mb-4 animate-spin" />
                    <p className="text-center text-lg font-medium mb-2">Procesando archivo...</p>
                    <p className="text-center text-sm text-muted-foreground mb-4">{fileName}</p>
                    <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-pulse w-1/2"></div>
                    </div>
                  </>
                ) : uploadComplete ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check size={30} className="text-green-500" />
                    </div>
                    <p className="text-center text-lg font-medium mb-2">¡Archivo procesado correctamente!</p>
                    <p className="text-center text-sm text-muted-foreground mb-4">{fileName}</p>
                    <button
                      onClick={resetUpload}
                      className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      Subir otro archivo
                    </button>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card-dashboard h-full">
            <h2 className="dashboard-subtitle">Requisitos del archivo</h2>
            
            <div className="space-y-4 mt-4 text-sm">
              <div className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                <p>El archivo debe estar en formato CSV, Excel (.xlsx, .xls) o JSON.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                <p>Las columnas deben coincidir con los campos de la base de datos.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                <p>El tamaño máximo permitido es de 50MB.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                <p>Asegúrate de incluir la fecha y la información del scanner para cada registro.</p>
              </div>
              
              <div className="mt-6">
                <a href="#" className="text-primary text-sm hover:underline flex items-center gap-1">
                  <FileSpreadsheet size={14} />
                  Descargar plantilla
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="card-dashboard">
            <h2 className="dashboard-subtitle mb-4">Archivos subidos recientemente</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nombre</th>
                    <th className="text-left py-3 px-4 font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium">Filas</th>
                    <th className="text-left py-3 px-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((upload) => (
                    <tr key={upload.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <FileSpreadsheet size={16} className="text-gray-400" />
                        {upload.name}
                      </td>
                      <td className="py-3 px-4">{upload.date}</td>
                      <td className="py-3 px-4">{upload.rows.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {upload.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <Check size={14} /> Procesado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <AlertTriangle size={14} /> Error
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card-dashboard h-full">
            <h2 className="dashboard-subtitle mb-4">Información de la base de datos</h2>
            
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Database size={16} className="text-primary" />
              <span className="font-medium">PostgreSQL</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Conectado</span>
            </div>
            
            <div className="space-y-3">
              {databaseTables.map((table) => (
                <div key={table.name} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{table.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {table.records.toLocaleString()} registros
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Última actualización: {table.lastUpdate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataUpload;
