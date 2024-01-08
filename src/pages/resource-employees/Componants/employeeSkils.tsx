import React, { useState, useEffect } from "react";
import axios from "axios";

interface Skill {
  id: number;
  specification: string;
  level: string;
}

interface EmployeeSkillsViewProps {
  employeeId: number;
}

const EmployeeSkillsView: React.FC<EmployeeSkillsViewProps> = ({ employeeId }) => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/admin/employees/get-skills?employeeId=${employeeId}`);
        if (response.data && response.data.code === 200) {
          setSkills(response.data.data);
        } else {
          console.error("Error fetching skills:", response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error as string);
      }
    };

    fetchSkills();
  }, [employeeId]);

  return (
    <div className="container mx-auto">
      <div className="mb-4">
      <div className="mb-2 text-xs py-1 px-2 bg-sky-600 text-white rounded w-56 text-center">
          Skills
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white p-4 shadow-md rounded-md flex items-center justify-between"
          >
            <div>
              <span className="text-lg font-semibold">{skill.specification}</span>
              <p className="text-gray-500">{`Skill Level: ${skill.level}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSkillsView;
