
export default function Table({theadData, tbodyData, onDelete})
{
  if (theadData.length > 0 && tbodyData.length>0)
    return (

    <table className="table table-striped">
      <thead>
        <tr>
          {theadData.map(heading => {return <th key={heading}>{heading}</th>})}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row, index) =>
        {
          return <tr key={index}>
            {theadData.map((key, index) =>
            {
              return <td key={index}>{JSON.stringify(row[key])}</td>
            })}
            <td className="text-end"><button className="btn-close" onClick={()=>{onDelete(row.id)}}/></td>
          </tr>;
        })}
      </tbody>
    </table>
  );
}