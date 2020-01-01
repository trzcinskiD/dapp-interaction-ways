import React from "react";

const NewsTable = ({ columns, data }) => {
  return (
    <>
      <table className="minimalistBlack">
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            return (
              <tr key={row.sender + row.content}>
                <td>{row.sender}</td>
                <td>{row.content}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        table.minimalistBlack {
          border: 0.15em solid #cccccc;
          text-align: left;
          border-collapse: collapse;
        }
        table.minimalistBlack td,
        table.minimalistBlack th {
          border: 0.15em solid #cccccc;
          padding: 5px 16px;
        }
        table.minimalistBlack thead {
          background: #f0f0f0;
          border: 0.15em solid #cccccc;
        }
        table.minimalistBlack thead th {
          font-weight: bold;
          text-align: left;
        }
      `}</style>
    </>
  );
};

export default NewsTable;
