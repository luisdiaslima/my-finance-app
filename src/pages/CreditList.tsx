import { Button } from "@/components/Button/Component";
import { useCredit } from "@/context/CreditContext";
import { IndividualData, CompanyData as Company } from "@/types/User.interface";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CreditResult {
  max_amount?: number;
  status: string;
}

interface PersonData {
  person: IndividualData;
  credit_result: CreditResult;
}

interface CompanyData {
  company: Company;
  credit_result: CreditResult;
}

export default function CreditList() {
  const navigate = useNavigate();
  const { getCreditList } = useCredit();
  const [visibleItems, setVisibleItems] = useState<
    (PersonData | CompanyData)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await await getCreditList();
        setVisibleItems([...response.persons, ...response.companies]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return !loading ? (
    <div className="h-screen flex items-center flex-col">
      <div className="overflow-x-auto w-250 mt-25 mb-10 bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Nome
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Limite
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Cidade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visibleItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-900">
                  {"person" in item ? item.person.name : item.company.name}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      item.credit_result.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.credit_result.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {item.credit_result.max_amount || "N/A"}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {"person" in item ? item.person.city : item.company.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => navigate("/")}
          variant="primary"
          label="Voltar"
        />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center flex-col">
      Carregando suas consultas...
    </div>
  );
}
