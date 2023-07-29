import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
export function CardInfo({title, number, color}) {
  return (
    <Card className="flex-grow w-70 max-h-40 mx-4" color={color}>
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2">
          {title}
        </Typography>
        <Typography>
          <p className="text-5xl text-center">{number}</p>
        </Typography>
      </CardBody>
    </Card>
  );
}