import { Card, CardBody, Typography, Button, CardFooter, Chip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";

export function ProjectCard({ teamSlug, projectInfo }) {
  const { id, name, description, tasks, created_at } = projectInfo;

  return (
    <Card className="hover:shadow-lg">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="truncate">
          {name}
        </Typography>
        <Typography variant="body2" color="gray" className="mt-2 line-clamp-3">
          {description}
        </Typography>
        <div className="flex items-center mt-4">
          <Typography variant="caption" color="gray">
            Created: {formatDate(created_at)}
          </Typography>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between items-center">
          <Button color="blue" size="sm" className="mr-2">
            <Link to={`/teams/${teamSlug}/projects/${id}`}>View Project</Link>
          </Button>
          <div className="flex items-center">
            <Typography variant="body2" color="gray" className="mr-2">
              {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
            </Typography>
            <Chip color={tasks.length > 0 ? "blue" : "red"} size="sm" className="p-2">
            </Chip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
