import React from 'react';

function DataTable({ data, visible }) {
  if (!visible) {
    return null;
  }
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]); // Get column names from the first row

  return (
    <table className="text-black">
      <thead>
        <tr>
          {headers.map((header) => {
            if (header === 'Program URL') {
              return null;
            } else {
              return <th key={header}>{header}</th>;
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => {
              // Check if the header is "Program Name" and create a link using "Program URL"
              if (header === 'Program Name') {
                return (
                  <td key={header} className="text-blue-700">
                    <a
                      href={row['Program URL']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row[header]}
                    </a>
                  </td>
                );
              }
              if (header === 'Program URL') {
                return null;
              } else {
                // For all other headers, return the cell data as usual
                return <td key={header}>{row[header]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
