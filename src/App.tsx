import { useEffect, useMemo, useState } from "react";
import VehiclesTable from "./pages/vehicles";
import api from "./shared/api/fetch";
import Layout from "./shared/components/layout";
import { columns } from "./shared/constants/columns";
import { Vehicle } from "./shared/interfaces/vehicles.interface";

function App() {
  const [vehicles, setVehicles] = useState<Array<Vehicle> | undefined>(
    undefined
  );
  const [selectedDriver, setSelectedDriver] = useState<string>();

  useEffect(() => {
    // Fetch vehicles
    async function fetchVehicles() {
      const url = selectedDriver
        ? `vehicles?driverId=${selectedDriver}`
        : "vehicles";
      setVehicles(await api<Vehicle[]>(url, "GET"));
    }
    fetchVehicles().catch(console.error);
  }, [selectedDriver]);

  const memoizedColumns = useMemo(() => columns, []);

  return (
    <Layout>
      <div className="my-auto">
        {vehicles && memoizedColumns && (
          <VehiclesTable
            setSelectedDriver={setSelectedDriver}
            data={vehicles}
            columns={memoizedColumns}
            setVehicles={setVehicles}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
