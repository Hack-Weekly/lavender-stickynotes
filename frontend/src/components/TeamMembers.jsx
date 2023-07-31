import { Card, Typography } from "@material-tailwind/react";
import { AvatarGen } from "./AvatarGen";

export function TeamMembers({ members, owner }) {
  const membersList = [
    { name: owner, role: "owner" },
    ...members.map((memberName) => ({ name: memberName, role: "Member" })),
  ];

  return (
    <Card className="w-full h-full p-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Team Members
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {membersList.map(({ name, role }) => (
          <div key={name} className={"border rounded-lg p-4" }>
            <div className="flex items-center justify-center">
              <AvatarGen username={name} className="h-12 w-12 mb-4" />
            </div>
            <Typography variant="subtitle2" color="blue-gray" className="font-semibold">
              {name}
            </Typography>
            <Typography variant="caption" color="gray" className="mb-2">
              {role}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
}
