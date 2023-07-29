import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export function ProjectCard({projectInfo}) {
  const {name, description, slug} = projectInfo;
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={"/projects/" + slug }>
        <Button>Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}