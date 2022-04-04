const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    const pool = await sql.connect(AZURE_CONN_STRING);    
    context.log ('Pool :', pool);
    context.log ("bus data function route id :", req.query.rid);
    context.log ("bus data function group id :", req.query.gid);
    const busData = await pool.request()
        .input("routeId", sql.Int, parseInt(req.query.rid))
        .input("geofenceId", sql.Int, parseInt(req.query.gid))
        .execute("web.GetMonitoredBusData");        
  
    context.log ('Context Response :', context.res);
    context.res = {        
        body: JSON.parse(busData.recordset[0]["locationData"])
    };
}

