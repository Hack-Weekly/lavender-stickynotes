import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
export function HorizontalCard() {
  return (
    <Card className="flex-grow w-70 max-h-40 mx-4s">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="blue" className="mb-4 uppercase">
          Productivity Dashboard
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          stickyNotes
        </Typography>
        <Typography color="gray" className=" font-sans">
          Manage your tasks and ideas efficiently with stickyNotes Dashboard.
        
         </Typography>
      </CardBody>
    </Card>
  );
}