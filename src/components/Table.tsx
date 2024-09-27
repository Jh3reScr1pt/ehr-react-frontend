import React from 'react';
import { TableProps } from '../interfaces/props/TableProps.interface';

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {headers.map((header, index) => (
              <th
                key={index}
                className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
